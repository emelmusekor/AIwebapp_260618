import { useState, useRef } from 'react'
import { SimulationPanel } from '@/components/SimulationPanel/SimulationPanel'
import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import { ExperimentQuestion } from '@/components/ExperimentQuestion/ExperimentQuestion'
import {
  initRegression, addRegressionPoint, removeLastRegressionPoint,
  changeDegree, evalPoly, fitPolynomial, computeMSE,
  generateLinearPoints, generateQuadraticPoints,
  generateSinePoints, generateOutlierPoints,
} from '@/simulations/regression/polyfit'
import type { RegressionState } from '@/simulations/regression/types'
import styles from './LinearRegressionModule.module.css'

const PRESETS = [
  { label: '선형', fn: generateLinearPoints, hint: '직선 관계 (차수 1에 최적)' },
  { label: '이차함수', fn: generateQuadraticPoints, hint: '포물선 형태 (차수 2에 최적)' },
  { label: '사인 곡선', fn: generateSinePoints, hint: '주기 패턴 (고차 필요)' },
  { label: '이상값 포함', fn: generateOutlierPoints, hint: '이상값이 회귀에 미치는 영향 관찰' },
]

// SVG y 좌표 ↔ 수학 y 좌표 변환 (SVG: 위=0, 수학: 위=100)
const toSvgY = (mathY: number) => 100 - mathY
const toMathY = (svgY: number) => 100 - svgY

export function LinearRegressionModule() {
  const [state, setState] = useState<RegressionState>(() => initRegression(1))
  const [trainTestMode, setTrainTestMode] = useState(false)
  const [testIndices, setTestIndices] = useState<Set<number>>(new Set())
  const svgRef = useRef<SVGSVGElement>(null)

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const svgY = ((e.clientY - rect.top) / rect.height) * 100
    const y = toMathY(svgY)
    setState((prev) => addRegressionPoint(prev, Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y))))
  }

  const handlePreset = (fn: () => { x: number; y: number }[]) => {
    const pts = fn()
    setState((prev) => {
      const fresh = initRegression(prev.degree)
      return pts.reduce((s, p) => addRegressionPoint(s, p.x, p.y), fresh)
    })
  }

  const handleDegreeChange = (d: number) => {
    setState((prev) => changeDegree(prev, d))
  }

  const handleUndo = () => {
    setState((prev) => removeLastRegressionPoint(prev))
  }

  const handleReset = () => {
    setTrainTestMode(false)
    setTestIndices(new Set())
    setState((prev) => initRegression(prev.degree))
  }

  const handleTrainTestToggle = () => {
    if (trainTestMode) {
      setTrainTestMode(false)
      setTestIndices(new Set())
    } else if (state.points.length >= 4) {
      const newTest = new Set<number>()
      state.points.forEach((_, i) => { if (Math.random() < 0.3) newTest.add(i) })
      // 최소 1개는 test
      if (newTest.size === 0) newTest.add(Math.floor(Math.random() * state.points.length))
      setTestIndices(newTest)
      setTrainTestMode(true)
    }
  }

  // Train/Test 분리 계산
  const trainPoints = trainTestMode
    ? state.points.filter((_, i) => !testIndices.has(i))
    : state.points
  const testPoints = trainTestMode
    ? state.points.filter((_, i) => testIndices.has(i))
    : []

  const displayCoeffs = trainTestMode && trainPoints.length >= 2
    ? fitPolynomial(trainPoints, state.degree)
    : state.coefficients

  const trainMSE = trainTestMode && trainPoints.length >= 2
    ? computeMSE(trainPoints, displayCoeffs)
    : null
  const testMSE = trainTestMode && testPoints.length >= 1
    ? computeMSE(testPoints, displayCoeffs)
    : null

  // 회귀 곡선 포인트 생성 (SVG 좌표계)
  const curvePoints = displayCoeffs.length > 0
    ? Array.from({ length: 101 }, (_, i) => {
        const x = i
        const mathY = evalPoly(x, displayCoeffs)
        const svgY = toSvgY(mathY)
        return `${x},${svgY}`
      }).join(' ')
    : ''

  const isOverfit = state.degree >= 4 && state.r2 > 0.99 && state.points.length <= state.degree + 2
  const showOverfitWarning = trainTestMode && trainMSE !== null && testMSE !== null && testMSE > trainMSE * 3

  return (
    <div className={styles.module}>
      <div className={styles.workspace}>
        <aside className={styles.controls}>
          <h3 className={styles.controlTitle}>프리셋 데이터</h3>
          <div className={styles.controlGroup}>
            <div className={styles.runButtons}>
              {PRESETS.map(({ label, fn, hint }) => (
                <button key={label} className={styles.btn} onClick={() => handlePreset(fn)} title={hint}>
                  📊 {label}
                </button>
              ))}
            </div>
            <p className={styles.hint}>캔버스 클릭으로도 점 추가 가능</p>
          </div>

          <h3 className={styles.controlTitle}>다항식 차수</h3>
          <div className={styles.controlGroup}>
            <div className={styles.degreeRow}>
              <input
                type="range" min={1} max={8} value={state.degree}
                className={styles.slider}
                onChange={(e) => handleDegreeChange(Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{state.degree}</span>
            </div>
            <p className={styles.hint}>
              {state.degree === 1 ? '1차: 직선 (선형 회귀)' :
               state.degree === 2 ? '2차: 포물선 (이차 회귀)' :
               state.degree <= 4 ? `${state.degree}차: 곡선` :
               `${state.degree}차: ⚠️ 과적합 위험!`}
            </p>
          </div>

          <h3 className={styles.controlTitle}>조작</h3>
          <div className={styles.controlGroup}>
            <div className={styles.runButtons}>
              <button
                className={`${styles.btn} ${trainTestMode ? styles.active : ''}`}
                onClick={handleTrainTestToggle}
                disabled={state.points.length < 4}
                title="데이터를 학습(70%)/테스트(30%)로 분리해 과적합을 관찰합니다"
              >
                {trainTestMode ? '✅ Train/Test 모드' : '📊 Train/Test 분리'}
              </button>
              <button className={styles.btn} onClick={handleUndo} disabled={state.points.length === 0}>
                ↩ 마지막 점 삭제
              </button>
              <button className={styles.btn} onClick={handleReset}>
                ↺ 초기화
              </button>
            </div>
            {state.points.length < 4 && !trainTestMode && (
              <p className={styles.hint}>Train/Test 분리는 최소 4개 점이 필요합니다.</p>
            )}
          </div>

          {/* 지표 */}
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span>점 수</span>
              <strong>{state.points.length}</strong>
            </div>
            <div className={styles.metric}>
              <span>차수</span>
              <strong>{state.degree}</strong>
            </div>
            {!trainTestMode ? (
              <>
                <div className={styles.metric}>
                  <span>MSE</span>
                  <strong className={state.mse > 200 ? styles.metricBad : undefined}>
                    {state.mse > 0 ? state.mse.toFixed(1) : '—'}
                  </strong>
                </div>
                <div className={styles.metric}>
                  <span>R²</span>
                  <strong className={state.r2 < 0.5 && state.points.length > 3 ? styles.metricBad : undefined}>
                    {state.r2 > 0 ? state.r2.toFixed(3) : '—'}
                  </strong>
                </div>
              </>
            ) : (
              <>
                <div className={styles.metric}>
                  <span>훈련 MSE</span>
                  <strong>{trainMSE !== null ? trainMSE.toFixed(1) : '—'}</strong>
                </div>
                <div className={styles.metric}>
                  <span>테스트 MSE</span>
                  <strong className={showOverfitWarning ? styles.metricBad : undefined}>
                    {testMSE !== null ? testMSE.toFixed(1) : '—'}
                  </strong>
                </div>
              </>
            )}
          </div>

          {isOverfit && (
            <p className={styles.hint} style={{ color: '#ef4444', marginTop: '0.5rem' }}>
              ⚠️ 과적합: 점 수({state.points.length})에 비해 차수({state.degree})가 너무 높습니다!
            </p>
          )}
          {showOverfitWarning && (
            <p className={styles.hint} style={{ color: '#ef4444', marginTop: '0.5rem' }}>
              ⚠️ 과적합 감지: 테스트 MSE({testMSE?.toFixed(1)})가 훈련 MSE({trainMSE?.toFixed(1)})보다 3배 이상 높습니다!
            </p>
          )}
        </aside>

        {/* 시각화 */}
        <div className={styles.visualization}>
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            width={440}
            height={440}
            className={styles.canvas}
            onClick={handleSvgClick}
          >
            {/* 배경 격자 */}
            {[20, 40, 60, 80].map((v) => (
              <line key={`h${v}`} x1={0} y1={v} x2={100} y2={v} stroke="#e5e7eb" strokeWidth={0.3} />
            ))}
            {[20, 40, 60, 80].map((v) => (
              <line key={`w${v}`} x1={v} y1={0} x2={v} y2={100} stroke="#e5e7eb" strokeWidth={0.3} />
            ))}

            {/* 회귀 곡선 */}
            {curvePoints && (
              <polyline
                points={curvePoints}
                fill="none"
                stroke={isOverfit ? '#f72585' : '#4361ee'}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* 잔차 선 (훈련 데이터 → 회귀선) */}
            {displayCoeffs.length > 0 && trainPoints.map((p, i) => {
              const predMathY = evalPoly(p.x, displayCoeffs)
              const dataSvgY = toSvgY(p.y)
              const predSvgY = toSvgY(predMathY)
              return (
                <line
                  key={`r${i}`}
                  x1={p.x} y1={dataSvgY}
                  x2={p.x} y2={predSvgY}
                  stroke="#ef4444"
                  strokeWidth={0.8}
                  strokeDasharray="1.5,1.5"
                  opacity={0.6}
                />
              )
            })}

            {/* 데이터 포인트 — 훈련 */}
            {state.points.map((p, i) => {
              const isTest = testIndices.has(i)
              return (
                <circle
                  key={i}
                  cx={p.x} cy={toSvgY(p.y)} r={2.5}
                  fill={isTest ? 'none' : '#374151'}
                  stroke={isTest ? '#f77f00' : '#fff'}
                  strokeWidth={isTest ? 1.5 : 0.7}
                />
              )
            })}

            {/* 안내 문구 */}
            {state.points.length === 0 && (
              <text x={50} y={52} textAnchor="middle" fontSize={4.5} fill="#9ca3af">
                클릭해서 점을 추가하세요
              </text>
            )}
          </svg>

          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.legendLine} style={{ background: isOverfit ? '#f72585' : '#4361ee' }} />
              {state.degree}차 회귀선{trainTestMode ? ' (훈련)' : ''}
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#374151' }} />
              {trainTestMode ? '훈련 데이터' : '데이터 포인트'}
            </span>
            {trainTestMode && (
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: 'none', border: '1.5px solid #f77f00' }} />
                테스트 데이터
              </span>
            )}
            <span className={styles.legendItem}>
              <span className={styles.legendDash} />
              잔차 (오차)
            </span>
          </div>
        </div>
      </div>

      <SimulationPanel
        explanation={
          trainTestMode
            ? `Train/Test 분리 모드: 훈련 ${trainPoints.length}개 / 테스트 ${testPoints.length}개. ` +
              (trainMSE !== null && testMSE !== null
                ? `훈련 MSE: ${trainMSE.toFixed(1)}, 테스트 MSE: ${testMSE.toFixed(1)}`
                : '')
            : state.explanation
        }
        extra={
          trainTestMode
            ? showOverfitWarning ? '⚠️ 과적합: 테스트 오차가 훈련 오차보다 훨씬 큽니다!' : '테스트 오차를 줄이는 차수를 찾아보세요'
            : state.r2 > 0 ? `R² = ${state.r2.toFixed(3)} (1.0이 완벽)` : undefined
        }
      />

      <ConceptNote title="오답과 한계" variant="limit">
        <ul>
          <li><strong>차수 1~2</strong>: 데이터 패턴이 단순하면 잘 맞지만, 복잡한 패턴은 못 잡습니다(과소적합).</li>
          <li><strong>차수 6~8</strong>: 훈련 데이터를 완벽히 지나지만, 새 데이터에서 엉뚱한 값을 냅니다(과적합). R²≈1이어도 실제 예측력은 낮습니다.</li>
          <li><strong>이상값(outlier)</strong>: 회귀선이 이상값 쪽으로 크게 당겨집니다. 실제에서는 이상값 제거가 중요합니다.</li>
          <li>이 회귀는 입력(x)이 하나입니다. 실제 예측 문제는 수십~수천 개의 특징(feature)을 사용합니다.</li>
        </ul>
      </ConceptNote>

      <ExperimentQuestion
        questions={[
          {
            text: '[선형] 프리셋에서 차수를 1→2→5→8로 높여보세요. MSE와 R²는 어떻게 변하나요?',
            hint: '차수가 높을수록 R²는 1에 가까워지지만, 실제로 더 좋은 모델일까요?',
          },
          {
            text: '[이상값 포함] 프리셋을 불러오고, 이상값 2개를 찾아보세요. 제거하면 회귀선이 어떻게 달라지나요?',
            hint: '이상값(outlier)이 회귀선을 얼마나 잡아당기는지 관찰하세요.',
          },
          {
            text: '[사인 곡선] 프리셋에서 과적합 없이 잘 맞는 차수를 찾을 수 있나요?',
            hint: '차수를 6~7 정도로 높여보세요. 데이터 사이를 어떻게 연결하는지 관찰하세요.',
          },
        ]}
      />
    </div>
  )
}
