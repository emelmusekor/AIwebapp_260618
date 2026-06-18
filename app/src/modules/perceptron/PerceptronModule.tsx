import { useState, useRef, useCallback } from 'react'
import { SimulationPanel } from '@/components/SimulationPanel/SimulationPanel'
import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import { ExperimentQuestion } from '@/components/ExperimentQuestion/ExperimentQuestion'
import {
  initPerceptron, addPerceptronPoint, removeLastPoint, resetWeights,
  setLearningRate, trainStep, trainNSteps, loadPreset,
} from '@/simulations/perceptron/perceptron'
import type { PerceptronState } from '@/simulations/perceptron/types'
import type { PresetName } from '@/simulations/perceptron/types'
import styles from './PerceptronModule.module.css'

const GRID_RES = 20  // 배경 신뢰도 그리드 해상도

// 결정경계 계산: w1*xn + w2*yn + b = 0 → 두 끝점 반환 (SVG 좌표계)
function decisionBoundaryLine(
  w: [number, number], b: number
): { x1: number; y1: number; x2: number; y2: number } | null {
  const [w1, w2] = w
  if (Math.abs(w2) < 1e-6 && Math.abs(w1) < 1e-6) return null

  if (Math.abs(w2) < 1e-6) {
    // 수직선: w1*xn + b = 0 → xn = -b/w1
    const xSvg = (-b / w1) * 100
    if (xSvg < 0 || xSvg > 100) return null
    return { x1: xSvg, y1: 0, x2: xSvg, y2: 100 }
  }

  // 일반 경우: yn = -(w1*xn + b) / w2
  const y0 = (-b / w2) * 100           // xn=0 일 때
  const y1 = (-(w1 + b) / w2) * 100    // xn=1 일 때

  // 좌표 클리핑 (SVG 범위 0-100 밖으로 나가는 경우 처리)
  const pts: Array<[number, number]> = []
  const pushIfValid = (x: number, y: number) => {
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) pts.push([x, y])
  }
  pushIfValid(0, y0)
  pushIfValid(100, y1)

  // 경계선이 위/아래 엣지를 지나는 경우 추가
  if (y0 < 0 || y0 > 100) {
    // y=0 (or y=100) 에서의 x 계산: 0 = -(w1*xn + b)/w2 → xn = -b/w1 (잘못됨, 다시)
    // yn=0: w1*xn + b = 0 → xn = -b/w1
    if (Math.abs(w1) > 1e-6) pushIfValid((-b / w1) * 100, 0)
    // yn=1: w1*xn + w2 + b = 0 → xn = -(w2+b)/w1
    if (Math.abs(w1) > 1e-6) pushIfValid((-(w2 + b) / w1) * 100, 100)
  }

  if (pts.length < 2) return null
  return { x1: pts[0][0], y1: pts[0][1], x2: pts[1][0], y2: pts[1][1] }
}

const PRESETS: { label: string; name: PresetName; hint: string }[] = [
  { label: '선형 분리', name: 'linear', hint: '두 클래스가 뚜렷이 분리됨 → 잘 수렴함' },
  { label: '경계 근처', name: 'hard', hint: '겹치는 데이터 → 완벽 분리 어려움' },
  { label: 'XOR 한계', name: 'xor', hint: '대각선 패턴 → 단층 퍼셉트론으로 선형 분리 불가!' },
]

export function PerceptronModule() {
  const [state, setState] = useState<PerceptronState>(() => initPerceptron(0.5))
  const [activeClass, setActiveClass] = useState<0 | 1>(0)
  const [isRunning, setIsRunning] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAuto = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    setIsRunning(false)
  }, [])

  const handleToggleAuto = useCallback(() => {
    if (isRunning) { stopAuto(); return }
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setState((prev) => trainStep(prev))
    }, 60)
  }, [isRunning, stopAuto])

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setState((prev) => addPerceptronPoint(prev, x, y, activeClass))
  }

  const handlePreset = (name: PresetName) => {
    stopAuto()
    setState(loadPreset(name, state.learningRate))
  }

  const handleReset = () => {
    stopAuto()
    setState(initPerceptron(state.learningRate))
  }

  const handleLrChange = (lr: number) => {
    setState((prev) => setLearningRate(prev, lr))
  }

  // 배경 신뢰도 그리드 (20×20 셀 → SVG viewBox 0-100)
  const bg: number[][] = Array.from({ length: GRID_RES }, (_, row) =>
    Array.from({ length: GRID_RES }, (_, col) => {
      const xn = (col + 0.5) / GRID_RES
      const yn = (row + 0.5) / GRID_RES
      return 1 / (1 + Math.exp(-(state.weights[0] * xn + state.weights[1] * yn + state.bias)))
    })
  )

  const boundary = state.epoch > 0 || state.points.length > 0
    ? decisionBoundaryLine(state.weights, state.bias)
    : null

  const cellSize = 100 / GRID_RES

  // 손실 그래프
  const lossMax = Math.max(0.01, ...state.lossHistory)
  const lossPoints = state.lossHistory.map((v, i) => {
    const x = (i / Math.max(1, state.lossHistory.length - 1)) * 180
    const y = (1 - v / lossMax) * 60
    return `${x},${y}`
  }).join(' ')

  return (
    <div className={styles.module}>
      <div className={styles.workspace}>
        {/* 조작 패널 */}
        <aside className={styles.controls}>
          <h3 className={styles.controlTitle}>조작 패널</h3>

          <div className={styles.controlGroup}>
            <label className={styles.label}>프리셋 데이터</label>
            <div className={styles.runButtons}>
              {PRESETS.map(({ label, name, hint }) => (
                <button key={name} className={styles.btn} onClick={() => handlePreset(name)} title={hint}>
                  🎲 {label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>입력 클래스 선택</label>
            <div className={styles.classToggle}>
              <button
                className={`${styles.classBtn} ${activeClass === 0 ? styles.classActive0 : ''}`}
                onClick={() => setActiveClass(0)}
              >
                ● 클래스 0 (파랑)
              </button>
              <button
                className={`${styles.classBtn} ${activeClass === 1 ? styles.classActive1 : ''}`}
                onClick={() => setActiveClass(1)}
              >
                ✕ 클래스 1 (빨강)
              </button>
            </div>
            <p className={styles.hint}>캔버스 클릭으로 해당 클래스 추가</p>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>학습률 (α)</label>
            <div className={styles.sliderRow}>
              <input
                type="range" min={0.05} max={2} step={0.05}
                value={state.learningRate}
                className={styles.slider}
                onChange={(e) => handleLrChange(Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{state.learningRate.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>학습</label>
            <div className={styles.runButtons}>
              <button className={styles.btn} onClick={() => setState((p) => trainStep(p))}
                disabled={state.points.length < 2 || isRunning}>
                ▶ 한 스텝
              </button>
              <button className={styles.btn} onClick={() => setState((p) => trainNSteps(p, 10))}
                disabled={state.points.length < 2 || isRunning}>
                ▶▶ 10 스텝
              </button>
              <button
                className={`${styles.btn} ${isRunning ? styles.active : ''}`}
                onClick={handleToggleAuto}
                disabled={state.points.length < 2}
              >
                {isRunning ? '⏸ 일시정지' : '⏩ 자동 학습'}
              </button>
              <button className={styles.btn} onClick={() => setState((p) => resetWeights(p))}
                disabled={isRunning}>
                🔄 가중치 초기화
              </button>
              <button className={`${styles.btn} ${styles.resetBtn}`} onClick={handleReset}>
                ↺ 데이터 초기화
              </button>
              <button className={styles.btn}
                onClick={() => setState((p) => removeLastPoint(p))}
                disabled={state.points.length === 0 || isRunning}>
                ↩ 마지막 점 삭제
              </button>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>에포크</span><strong>{state.epoch}</strong>
            </div>
            <div className={styles.stat}>
              <span>손실</span>
              <strong>{state.loss > 0 ? state.loss.toFixed(3) : '—'}</strong>
            </div>
            <div className={styles.stat}>
              <span>정확도</span>
              <strong style={{ color: state.accuracy >= 1 ? '#10b981' : undefined }}>
                {state.accuracy > 0 ? `${(state.accuracy * 100).toFixed(0)}%` : '—'}
              </strong>
            </div>
          </div>

          {/* 가중치 */}
          {state.epoch > 0 && (
            <div className={styles.weightsBox}>
              <div className={styles.weightRow}><span>w₁</span><code>{state.weights[0].toFixed(3)}</code></div>
              <div className={styles.weightRow}><span>w₂</span><code>{state.weights[1].toFixed(3)}</code></div>
              <div className={styles.weightRow}><span>b</span><code>{state.bias.toFixed(3)}</code></div>
            </div>
          )}
        </aside>

        {/* 시각화 */}
        <div className={styles.visualization}>
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            width={420} height={420}
            className={styles.canvas}
            onClick={handleSvgClick}
          >
            {/* 배경 신뢰도 */}
            {bg.map((row, ri) =>
              row.map((p, ci) => {
                const alpha = Math.abs(p - 0.5) * 0.55
                const fill = p >= 0.5
                  ? `rgba(247,37,133,${alpha.toFixed(2)})`
                  : `rgba(67,97,238,${alpha.toFixed(2)})`
                return (
                  <rect
                    key={`${ri}-${ci}`}
                    x={ci * cellSize} y={ri * cellSize}
                    width={cellSize} height={cellSize}
                    fill={fill}
                  />
                )
              })
            )}

            {/* 격자 */}
            {[20, 40, 60, 80].map((v) => (
              <line key={`h${v}`} x1={0} y1={v} x2={100} y2={v} stroke="#e5e7eb" strokeWidth={0.25} />
            ))}
            {[20, 40, 60, 80].map((v) => (
              <line key={`w${v}`} x1={v} y1={0} x2={v} y2={100} stroke="#e5e7eb" strokeWidth={0.25} />
            ))}

            {/* 결정경계선 */}
            {boundary && (
              <line
                x1={boundary.x1} y1={boundary.y1}
                x2={boundary.x2} y2={boundary.y2}
                stroke="#1a1a2e" strokeWidth={1.8}
                strokeDasharray={state.accuracy >= 1 ? 'none' : '3,2'}
                opacity={0.9}
              />
            )}

            {/* 데이터 포인트 */}
            {state.points.map((p, i) => (
              p.label === 0 ? (
                <circle key={i} cx={p.x} cy={p.y} r={3.2}
                  fill="#4361ee" stroke="#fff" strokeWidth={1} opacity={0.9} />
              ) : (
                <g key={i}>
                  <line x1={p.x - 2.5} y1={p.y - 2.5} x2={p.x + 2.5} y2={p.y + 2.5}
                    stroke="#f72585" strokeWidth={2} strokeLinecap="round" />
                  <line x1={p.x + 2.5} y1={p.y - 2.5} x2={p.x - 2.5} y2={p.y + 2.5}
                    stroke="#f72585" strokeWidth={2} strokeLinecap="round" />
                </g>
              )
            ))}

            {/* 안내 문구 */}
            {state.points.length === 0 && (
              <text x={50} y={52} textAnchor="middle" fontSize={4.5} fill="#9ca3af">
                클릭해서 데이터를 추가하세요
              </text>
            )}
          </svg>

          {/* 손실 그래프 */}
          {state.lossHistory.length > 2 && (
            <div className={styles.lossChart}>
              <span className={styles.lossLabel}>손실 추이</span>
              <svg viewBox="0 0 180 70" width={220} height={80} className={styles.lossCanvas}>
                <line x1={0} y1={60} x2={180} y2={60} stroke="#d1d5db" strokeWidth={0.5} />
                <polyline points={lossPoints} fill="none" stroke="#4361ee" strokeWidth={1.5} />
                <text x={0} y={9} fontSize={6} fill="#9ca3af">{lossMax.toFixed(2)}</text>
                <text x={0} y={65} fontSize={6} fill="#9ca3af">0</text>
              </svg>
            </div>
          )}

          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.dot} style={{ background: '#4361ee' }} /> 클래스 0
            </span>
            <span className={styles.legendItem}>
              <span className={styles.crossIcon}>✕</span> 클래스 1
            </span>
            <span className={styles.legendItem}>
              <span className={styles.lineIcon} /> 결정경계
            </span>
          </div>
        </div>
      </div>

      <SimulationPanel explanation={state.explanation} step={state.epoch} />

      <ConceptNote title="개념 설명" variant="info">
        <p><strong>퍼셉트론</strong>은 신경망의 가장 기본 단위입니다. 두 특징(x, y)을 입력받아 선형 결합 <em>w₁·x + w₂·y + b</em>를 계산하고, 시그모이드 함수 σ를 통해 0~1 확률로 변환합니다. 경사하강법으로 손실을 최소화하면 결정경계가 두 클래스를 나누도록 조정됩니다.</p>
        <p style={{ marginTop: '0.5rem' }}><strong>한계</strong>: XOR처럼 선형으로 분리할 수 없는 패턴에서는 아무리 학습해도 두 클래스를 완벽히 구분할 수 없습니다. → 이 문제를 해결하기 위해 다층 신경망(MLP)이 등장했습니다.</p>
      </ConceptNote>

      <ConceptNote title="오답과 한계" variant="limit">
        <ul>
          <li><strong>XOR 패턴</strong>을 불러와 학습해보세요. 손실이 특정 값 아래로 내려가지 않습니다.</li>
          <li>학습률이 너무 크면(α≥1.5) 손실이 진동하며 수렴하지 않을 수 있습니다.</li>
          <li>이 퍼셉트론은 특징이 2개(x, y)뿐입니다. 실제 신경망은 수천~수백만 개의 파라미터를 가집니다.</li>
          <li>단층 퍼셉트론은 <em>선형</em> 결정경계만 그릴 수 있습니다(직선 하나).</li>
        </ul>
      </ConceptNote>

      <ExperimentQuestion
        questions={[
          {
            text: '[선형 분리] → [XOR 한계] 순으로 프리셋을 바꿔보세요. 학습 결과가 어떻게 다른가요?',
            hint: 'XOR에서 에포크를 200~500번 돌려도 정확도가 75% 위로 올라가지 않는 이유가 뭘까요?',
          },
          {
            text: '학습률을 0.1과 2.0으로 각각 설정하고 자동 학습을 시작해보세요. 손실 그래프 형태가 어떻게 다른가요?',
            hint: '학습률이 너무 크면 최솟값을 지나쳐버립니다(발산). 너무 작으면 너무 느립니다.',
          },
          {
            text: '캔버스 중앙에 두 클래스 점을 번갈아 섞어 추가해보세요. 결정경계가 어디에 그어지나요?',
            hint: '두 클래스가 섞인 경우 퍼셉트론은 오차를 최소화하는 위치에 경계를 긋습니다.',
          },
        ]}
      />
    </div>
  )
}
