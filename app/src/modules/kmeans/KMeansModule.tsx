import { useState, useCallback, useRef, useEffect } from 'react'
import { SimulationPanel } from '@/components/SimulationPanel/SimulationPanel'
import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import { ExperimentQuestion } from '@/components/ExperimentQuestion/ExperimentQuestion'
import {
  initKMeans, kmeansStep, computeInertia, computeElbow,
  generatePresetPoints, generateRingPoints, generateUniformPoints,
} from '@/simulations/kmeans/algorithm'
import type { KMeansState, Point } from '@/simulations/kmeans/types'
import styles from './KMeansModule.module.css'

const CLUSTER_COLORS = [
  '#4361ee', '#f72585', '#7209b7', '#f77f00', '#10b981', '#0096c7', '#e63946', '#2a9d8f',
]

type PresetKind = '3군집' | '링/동심원' | '균일분포'

const PRESETS: { label: PresetKind; fn: () => Point[]; hint: string }[] = [
  { label: '3군집', fn: generatePresetPoints, hint: '3개의 뚜렷한 군집 → K=3이 잘 작동함' },
  { label: '링/동심원', fn: generateRingPoints, hint: '안쪽+바깥쪽 원 → K-Means의 한계 확인' },
  { label: '균일분포', fn: generateUniformPoints, hint: '균일하게 분포 → 임의적인 경계 생성' },
]

export function KMeansModule() {
  const [rawPoints, setRawPoints] = useState<Point[]>([])
  const [k, setK] = useState(3)
  const [kState, setKState] = useState<KMeansState | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [seed, setSeed] = useState(42)
  const [elbowData, setElbowData] = useState<Array<{ k: number; inertia: number }> | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAuto = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    setIsRunning(false)
  }, [])

  useEffect(() => {
    if (kState?.converged) stopAuto()
  }, [kState?.converged, stopAuto])

  const startKMeans = useCallback((pts: Point[], kVal: number, seedVal?: number) => {
    stopAuto()
    if (pts.length >= kVal) {
      setKState(initKMeans({ k: kVal, points: pts, maxIterations: 100, seed: seedVal }))
    } else {
      setKState(null)
    }
  }, [stopAuto])

  const handleKChange = (val: number) => {
    setK(val)
    startKMeans(rawPoints, val, seed)
  }

  const handlePreset = (fn: () => Point[]) => {
    const pts = fn()
    setRawPoints(pts)
    const newSeed = Math.floor(Math.random() * 10000)
    setSeed(newSeed)
    startKMeans(pts, k, newSeed)
  }

  const handleReset = () => {
    stopAuto()
    setRawPoints([])
    setKState(null)
    setElbowData(null)
  }

  const handleElbow = () => {
    if (rawPoints.length < 2) return
    setElbowData(computeElbow(rawPoints, Math.min(8, rawPoints.length)))
  }

  const handleReseed = () => {
    const newSeed = Math.floor(Math.random() * 10000)
    setSeed(newSeed)
    startKMeans(rawPoints, k, newSeed)
  }

  const handleStep = () => {
    setKState((prev) => (prev && !prev.converged ? kmeansStep(prev) : prev))
  }

  const handleToggleAuto = () => {
    if (isRunning) { stopAuto(); return }
    if (!kState || kState.converged) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setKState((prev) => {
        if (!prev || prev.converged) return prev
        return kmeansStep(prev)
      })
    }, 250)
  }

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const newPts = [...rawPoints, { x, y }]
    setRawPoints(newPts)
    startKMeans(newPts, k, seed)
  }

  const displayPoints = kState ? kState.points : rawPoints.map((p) => ({ ...p, clusterId: 0 }))
  const centroids = kState?.centroids ?? []
  const inertia = kState ? computeInertia(kState) : null
  const clusterSizes = kState
    ? Array.from({ length: k }, (_, i) => kState.points.filter((p) => p.clusterId === i).length)
    : null

  const explanation = kState?.explanation ??
    (rawPoints.length === 0
      ? '아래 [프리셋] 중 하나를 클릭하거나, SVG 캔버스를 직접 클릭해서 데이터 포인트를 추가하세요.'
      : `${rawPoints.length}개 점 추가됨. K-Means를 시작하려면 [시작/재설정]을 누르세요.`)

  return (
    <div className={styles.module}>
      <div className={styles.workspace}>
        <aside className={styles.controls}>
          <h3 className={styles.controlTitle}>조작 패널</h3>

          {/* 프리셋 */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>프리셋 데이터</label>
            <div className={styles.runButtons}>
              {PRESETS.map(({ label, fn, hint }) => (
                <button
                  key={label}
                  className={styles.btn}
                  onClick={() => handlePreset(fn)}
                  title={hint}
                >
                  🎲 {label}
                </button>
              ))}
            </div>
            <p className={styles.hint}>캔버스 클릭으로도 점 추가 가능</p>
          </div>

          {/* K 슬라이더 */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>K (군집 수)</label>
            <div className={styles.sliderRow}>
              <input
                type="range" min={2} max={8} value={k}
                className={styles.slider}
                onChange={(e) => handleKChange(Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{k}</span>
            </div>
          </div>

          {/* 실행 */}
          <div className={styles.controlGroup}>
            <label className={styles.label}>실행</label>
            <div className={styles.runButtons}>
              <button className={styles.btn} onClick={() => startKMeans(rawPoints, k, seed)} disabled={rawPoints.length < k}>
                ▶ 시작 / 재설정
              </button>
              <button className={styles.btn} onClick={handleReseed} disabled={rawPoints.length < k} title="중심점 위치를 새로 랜덤 설정">
                🎯 중심점 재설정
              </button>
              <button className={styles.btn} onClick={handleStep} disabled={!kState || kState.converged || isRunning}>
                ▶ 한 스텝
              </button>
              <button
                className={`${styles.btn} ${isRunning ? styles.active : ''}`}
                onClick={handleToggleAuto}
                disabled={!kState || kState.converged}
              >
                {isRunning ? '⏸ 일시정지' : '⏩ 자동 실행'}
              </button>
              <button className={`${styles.btn} ${styles.resetBtn}`} onClick={handleReset}>
                ↺ 전체 초기화
              </button>
              <button
                className={styles.btn}
                onClick={handleElbow}
                disabled={rawPoints.length < 2}
                title="K=1~8에 대해 Inertia를 계산해 최적 K를 찾는 방법"
              >
                📉 Elbow 분석
              </button>
            </div>
          </div>

          {/* 지표 */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>반복</span>
              <strong>{kState?.iteration ?? 0}</strong>
            </div>
            <div className={styles.stat}>
              <span>Inertia</span>
              <strong style={{ fontSize: '0.78rem' }}>{inertia !== null ? inertia.toFixed(0) : '—'}</strong>
            </div>
            <div className={styles.stat}>
              <span>상태</span>
              <strong style={{ color: kState?.converged ? '#10b981' : undefined }}>
                {kState?.converged ? '수렴' : kState ? '진행' : '—'}
              </strong>
            </div>
          </div>

          {/* 군집 크기 */}
          {clusterSizes && (
            <div className={styles.clusterSizes}>
              {clusterSizes.map((size, i) => (
                <div key={i} className={styles.clusterItem}>
                  <span
                    className={styles.clusterDot}
                    style={{ background: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
                  />
                  <span>{i + 1}: {size}개</span>
                </div>
              ))}
            </div>
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
            {[20, 40, 60, 80].map((v) => (
              <line key={`h${v}`} x1={0} y1={v} x2={100} y2={v} stroke="#e5e7eb" strokeWidth={0.25} />
            ))}
            {[20, 40, 60, 80].map((v) => (
              <line key={`w${v}`} x1={v} y1={0} x2={v} y2={100} stroke="#e5e7eb" strokeWidth={0.25} />
            ))}

            {/* 중심점까지의 선 (수렴 후) */}
            {kState?.converged && displayPoints.map((p, i) => {
              const c = centroids[p.clusterId]
              if (!c) return null
              return (
                <line key={`l${i}`}
                  x1={p.x} y1={p.y} x2={c.x} y2={c.y}
                  stroke={CLUSTER_COLORS[p.clusterId % CLUSTER_COLORS.length]}
                  strokeWidth={0.2} opacity={0.3}
                />
              )
            })}

            {/* 데이터 포인트 */}
            {displayPoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x} cy={p.y} r={1.9}
                fill={kState ? CLUSTER_COLORS[p.clusterId % CLUSTER_COLORS.length] : '#9ca3af'}
                stroke="#fff" strokeWidth={0.5}
                opacity={0.88}
              />
            ))}

            {/* 중심점 */}
            {centroids.map((c) => (
              <g key={`c${c.id}`}>
                <circle cx={c.x} cy={c.y} r={4.2}
                  fill={CLUSTER_COLORS[c.id % CLUSTER_COLORS.length]}
                  stroke="#1a1a2e" strokeWidth={1.2}
                />
                <text x={c.x} y={c.y + 1.3} textAnchor="middle" fontSize={3.2} fill="#fff" fontWeight="bold">
                  {c.id + 1}
                </text>
              </g>
            ))}

            {/* 수렴 표시 */}
            {kState?.converged && (
              <text x={50} y={97} textAnchor="middle" fontSize={4} fill="#10b981" fontWeight="bold">
                ✓ 수렴 완료
              </text>
            )}
          </svg>

          <div className={styles.legend}>
            {Array.from({ length: k }, (_, i) => (
              <span key={i} className={styles.legendItem}>
                <span className={styles.dot} style={{ background: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }} />
                군집 {i + 1}
              </span>
            ))}
          </div>

          {/* Elbow 차트 */}
          {elbowData && (() => {
            const maxInertia = Math.max(...elbowData.map((d) => d.inertia))
            const W = 260, H = 100, PL = 35, PB = 22, PT = 8
            const chartW = W - PL
            const chartH = H - PB - PT

            // 팔꿈치 찾기: 기울기 변화가 가장 큰 K
            const elbowK = (() => {
              if (elbowData.length < 3) return -1
              let maxDelta = -Infinity, best = -1
              for (let i = 1; i < elbowData.length - 1; i++) {
                const before = elbowData[i - 1].inertia - elbowData[i].inertia
                const after = elbowData[i].inertia - elbowData[i + 1].inertia
                const delta = before - after
                if (delta > maxDelta) { maxDelta = delta; best = elbowData[i].k }
              }
              return best
            })()

            const pts = elbowData.map((d) => {
              const x = PL + ((d.k - 1) / (elbowData.length - 1)) * chartW
              const y = PT + (1 - d.inertia / maxInertia) * chartH
              return { x, y, k: d.k, inertia: d.inertia }
            })

            return (
              <div className={styles.elbowBox}>
                <div className={styles.elbowTitle}>📉 Elbow Method — K별 Inertia</div>
                <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className={styles.elbowChart}>
                  {/* 축 */}
                  <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke="#9ca3af" strokeWidth={0.7} />
                  <line x1={PL} y1={H - PB} x2={W} y2={H - PB} stroke="#9ca3af" strokeWidth={0.7} />

                  {/* 선 */}
                  <polyline
                    points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="none" stroke="#7209b7" strokeWidth={1.5}
                  />

                  {/* 포인트 */}
                  {pts.map((p) => (
                    <g key={p.k}>
                      <circle
                        cx={p.x} cy={p.y} r={p.k === elbowK ? 5 : 3.5}
                        fill={p.k === elbowK ? '#f72585' : '#7209b7'}
                        stroke="#fff" strokeWidth={1}
                      />
                      <text x={p.x} y={H - 6} textAnchor="middle" fontSize={7} fill="#6b7280">{p.k}</text>
                    </g>
                  ))}

                  {/* Elbow 표시 */}
                  {elbowK > 0 && (() => {
                    const ep = pts.find((p) => p.k === elbowK)!
                    return (
                      <text x={ep.x + 4} y={ep.y - 5} fontSize={7} fill="#f72585" fontWeight="bold">
                        K={elbowK}
                      </text>
                    )
                  })()}

                  {/* y 축 레이블 */}
                  <text x={PL - 3} y={PT + 6} textAnchor="end" fontSize={6} fill="#9ca3af">
                    {maxInertia.toFixed(0)}
                  </text>
                  <text x={PL - 3} y={H - PB} textAnchor="end" fontSize={6} fill="#9ca3af">0</text>
                  <text x={2} y={H / 2} textAnchor="middle" fontSize={6} fill="#9ca3af"
                    transform={`rotate(-90, 7, ${H / 2})`}>Inertia</text>
                  <text x={W / 2 + PL / 2} y={H - 2} textAnchor="middle" fontSize={6} fill="#9ca3af">K</text>
                </svg>
                {elbowK > 0 && (
                  <p className={styles.elbowHint}>
                    🎯 권장 K = <strong>{elbowK}</strong> — 이 지점에서 Inertia 감소율이 가장 크게 꺾입니다.
                  </p>
                )}
              </div>
            )
          })()}
        </div>
      </div>

      <SimulationPanel
        explanation={explanation}
        extra={kState ? `반복 ${kState.iteration}회${inertia !== null ? ` · Inertia: ${inertia.toFixed(1)}` : ''}` : undefined}
      />

      <ConceptNote title="오답과 한계" variant="limit">
        <ul>
          <li><strong>링/동심원</strong> 프리셋을 K=2로 실행해보세요. K-Means는 원형 군집을 제대로 인식하지 못합니다.</li>
          <li><strong>균일분포</strong> 프리셋은 군집 구조가 없지만 K-Means는 억지로 군집을 만듭니다.</li>
          <li><strong>중심점 재설정</strong>을 여러 번 클릭하면 같은 K 값이어도 결과가 달라집니다(초기값 민감성).</li>
          <li>Inertia가 낮을수록 군집이 응집되어 있지만, K가 클수록 항상 낮아집니다(K=데이터수이면 0).</li>
        </ul>
      </ConceptNote>

      <ExperimentQuestion
        questions={[
          {
            text: '[링/동심원] 프리셋에서 K=2로 실행하면 어떤 문제가 생기나요? K를 바꿔보세요.',
            hint: '진짜 두 군집(안쪽/바깥쪽)이 있지만 K-Means는 위/아래로 나누려 할 것입니다.',
          },
          {
            text: '[시작/재설정]을 같은 데이터로 여러 번 눌러보세요. 수렴 결과가 항상 같나요?',
            hint: '[중심점 재설정]을 누르면 초기 중심점 위치가 달라져서 결과가 달라질 수 있습니다.',
          },
          {
            text: 'Inertia 값이 낮으면 군집화가 좋은 것일까요? K를 늘리면 Inertia는 어떻게 변하나요?',
            hint: 'K=데이터 수이면 Inertia=0이지만 그게 좋은 군집화일까요? (Elbow Method 개념)',
          },
        ]}
      />
    </div>
  )
}
