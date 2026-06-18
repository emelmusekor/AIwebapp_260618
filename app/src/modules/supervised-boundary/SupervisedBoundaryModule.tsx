import { useState, useRef } from 'react'
import { SimulationPanel } from '@/components/SimulationPanel/SimulationPanel'
import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import { ExperimentQuestion } from '@/components/ExperimentQuestion/ExperimentQuestion'
import { initSupervised, addPoint, updateK, removeLastPoint, loadPreset, type PresetName } from '@/simulations/supervised/knn'
import type { SupervisedState, Label } from '@/simulations/supervised/types'
import styles from './SupervisedBoundaryModule.module.css'

const RESOLUTION = 24
const CLASS_COLORS: Record<Label, string> = { 0: '#4361ee', 1: '#ef4444', 2: '#10b981' }
const CLASS_NAMES: Record<Label, string> = { 0: 'A', 1: 'B', 2: 'C' }
const CLASS_BG: Record<Label, string> = {
  0: 'rgba(67,97,238,0.17)',
  1: 'rgba(239,68,68,0.17)',
  2: 'rgba(16,185,129,0.17)',
}

const PRESETS: { label: string; name: PresetName; hint: string }[] = [
  { label: '선형 분리', name: 'linear', hint: '직선으로 나눌 수 있는 데이터' },
  { label: 'XOR 패턴', name: 'xor', hint: '직선으로 나눌 수 없는 패턴' },
  { label: '세 군집', name: 'three', hint: '3개 클래스가 자연스럽게 분리된 데이터' },
]

export function SupervisedBoundaryModule() {
  const [state, setState] = useState<SupervisedState>(() => initSupervised(3, RESOLUTION))
  const [activeClass, setActiveClass] = useState<Label>(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setState((prev) => addPoint(prev, x, y, activeClass))
  }

  const handleKChange = (val: number) => {
    setState((prev) => updateK(prev, val))
  }

  const handleUndo = () => {
    setState((prev) => removeLastPoint(prev))
  }

  const handlePreset = (name: PresetName) => {
    setState(loadPreset(name, state.k, RESOLUTION))
  }

  const handleReset = () => {
    setState(initSupervised(state.k, RESOLUTION))
  }

  const cellSize = 100 / RESOLUTION
  const classCounts: Record<Label, number> = { 0: 0, 1: 0, 2: 0 }
  for (const p of state.points) classCounts[p.label]++
  const needMorePoints = state.points.length < state.k

  return (
    <div className={styles.module}>
      <div className={styles.workspace}>
        <aside className={styles.controls}>
          <h3 className={styles.controlTitle}>조작 패널</h3>

          {/* 프리셋 */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>프리셋 데이터</label>
            <div className={styles.runButtons}>
              {PRESETS.map(({ label, name, hint }) => (
                <button key={name} className={styles.btn} onClick={() => handlePreset(name)} title={hint}>
                  📂 {label}
                </button>
              ))}
            </div>
          </div>

          {/* 클래스 선택 */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>클래스 선택</label>
            <div className={styles.classButtons}>
              {([0, 1, 2] as Label[]).map((l) => (
                <button
                  key={l}
                  className={`${styles.classBtn} ${activeClass === l ? styles.active : ''}`}
                  style={{
                    background: CLASS_BG[l],
                    border: `2.5px solid ${CLASS_COLORS[l]}`,
                    color: CLASS_COLORS[l],
                  }}
                  onClick={() => setActiveClass(l)}
                >
                  {CLASS_NAMES[l]}
                </button>
              ))}
            </div>
            <p className={styles.hint}>선택 후 캔버스 클릭으로 점 추가</p>
          </div>

          {/* K 슬라이더 */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>K (이웃 수)</label>
            <div className={styles.sliderRow}>
              <input
                type="range" min={1} max={15} value={state.k}
                className={styles.slider}
                onChange={(e) => handleKChange(Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{state.k}</span>
            </div>
          </div>

          {/* 조작 버튼 */}
          <div className={styles.controlGroup}>
            <div className={styles.runButtons}>
              <button className={styles.btn} onClick={handleUndo} disabled={state.points.length === 0}>
                ↩ 마지막 점 삭제
              </button>
              <button className={styles.btn} onClick={handleReset}>
                ↺ 초기화
              </button>
            </div>
          </div>

          {/* 통계 */}
          <div className={styles.stats}>
            {([0, 1, 2] as Label[]).map((l) => (
              <div key={l} className={styles.stat}>
                <span style={{ color: CLASS_COLORS[l] }}>{CLASS_NAMES[l]}</span>
                <strong style={{ color: CLASS_COLORS[l] }}>{classCounts[l]}</strong>
              </div>
            ))}
            <div className={styles.stat}>
              <span>합계</span>
              <strong>{state.points.length}</strong>
            </div>
          </div>

          {needMorePoints && state.points.length > 0 && (
            <p className={styles.hint} style={{ marginTop: '0.5rem', color: '#f77f00' }}>
              K={state.k}이므로 {state.k - state.points.length}개 더 필요
            </p>
          )}
        </aside>

        {/* 시각화 */}
        <div className={styles.visualization}>
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            width={420}
            height={420}
            className={styles.canvas}
            onClick={handleSvgClick}
          >
            {/* 결정경계 배경 */}
            {state.boundaryGrid.map((cell, i) => (
              <rect
                key={i}
                x={cell.x - cellSize / 2}
                y={cell.y - cellSize / 2}
                width={cellSize}
                height={cellSize}
                fill={CLASS_BG[cell.predictedLabel]}
              />
            ))}

            {/* 격자 */}
            {[25, 50, 75].map((v) => (
              <line key={`h${v}`} x1={0} y1={v} x2={100} y2={v} stroke="rgba(0,0,0,0.06)" strokeWidth={0.3} />
            ))}
            {[25, 50, 75].map((v) => (
              <line key={`w${v}`} x1={v} y1={0} x2={v} y2={100} stroke="rgba(0,0,0,0.06)" strokeWidth={0.3} />
            ))}

            {/* 학습 데이터 포인트 */}
            {state.points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={3.2} fill={CLASS_COLORS[p.label]} stroke="#fff" strokeWidth={1.2} />
                <text x={p.x} y={p.y + 1.3} textAnchor="middle" fontSize={2.6} fill="#fff" fontWeight="bold">
                  {CLASS_NAMES[p.label]}
                </text>
              </g>
            ))}

            {/* 데이터 없음 안내 */}
            {state.points.length === 0 && (
              <text x={50} y={52} textAnchor="middle" fontSize={4.5} fill="#9ca3af">
                클릭해서 점을 추가하세요
              </text>
            )}
          </svg>

          <div className={styles.legend}>
            {([0, 1, 2] as Label[]).map((l) => (
              <span key={l} className={styles.legendItem}>
                <span className={styles.dot} style={{ background: CLASS_COLORS[l] }} />
                클래스 {CLASS_NAMES[l]}
              </span>
            ))}
            <span className={styles.legendItem} style={{ opacity: 0.7 }}>배경 = KNN 예측 영역</span>
          </div>
        </div>
      </div>

      <SimulationPanel explanation={state.explanation} />

      <ConceptNote title="오답과 한계" variant="limit">
        <ul>
          <li><strong>K=1</strong>: 모든 점에 딱 맞지만 새 데이터에 취약합니다(과적합). 경계가 매우 복잡해집니다.</li>
          <li><strong>XOR 패턴</strong>에서 선형 분류기(직선 경계)는 100% 오답입니다. KNN은 가능하지만 K 선택이 중요합니다.</li>
          <li>KNN은 모든 훈련 데이터를 저장하고 예측 시 전부 비교 → 데이터가 많으면 느립니다.</li>
          <li>이 시뮬레이션은 2차원입니다. 실제 문제는 수백~수천 차원이라 시각화가 불가능합니다.</li>
        </ul>
      </ConceptNote>

      <ExperimentQuestion
        questions={[
          {
            text: '[XOR 패턴] 프리셋을 불러오고 K=1, K=7, K=15로 바꿔보세요. 어떤 K가 패턴을 가장 잘 잡나요?',
            hint: 'K=1은 너무 복잡, K=15는 너무 단순. 적절한 K를 찾는 것이 핵심입니다.',
          },
          {
            text: '같은 프리셋에서 K를 1→15→1로 바꿔보세요. 경계가 어떻게 달라지나요?',
            hint: 'K가 클수록 경계가 부드러워지고(과소적합), K=1이면 매우 복잡해집니다(과적합).',
          },
          {
            text: '두 클래스 경계 바로 옆에 다른 클래스 점 하나를 추가하면 경계가 어떻게 바뀌나요?',
            hint: 'KNN은 근처의 K개 점으로 판단하므로 가까운 곳에 추가된 점의 영향이 큽니다.',
          },
        ]}
      />
    </div>
  )
}
