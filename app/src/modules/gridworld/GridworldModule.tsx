import { useState, useCallback, useRef } from 'react'
import { SimulationPanel } from '@/components/SimulationPanel/SimulationPanel'
import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import { ExperimentQuestion } from '@/components/ExperimentQuestion/ExperimentQuestion'
import { initGridWorld, qStep, resetEpisode } from '@/simulations/gridworld/qlearning'
import type { GridWorldState, GridWorldParams, CellKind, Action } from '@/simulations/gridworld/types'
import styles from './GridworldModule.module.css'

const CELL = 58
const LOCAL_ACTIONS: Action[] = ['up', 'down', 'left', 'right']
const ARROW: Record<Action, string> = { up: '↑', down: '↓', left: '←', right: '→' }

const LAYOUTS: { label: string; desc: string; grid: CellKind[][] }[] = [
  {
    label: '기본',
    desc: '목표와 함정이 명확히 분리된 기본 환경',
    grid: [
      ['empty', 'empty', 'empty', 'trap',  'goal' ],
      ['empty', 'wall',  'empty', 'wall',  'empty'],
      ['empty', 'empty', 'empty', 'empty', 'trap' ],
      ['wall',  'empty', 'wall',  'empty', 'empty'],
      ['start', 'empty', 'empty', 'trap',  'empty'],
    ],
  },
  {
    label: '미로',
    desc: '벽이 많아 최적 경로 탐색이 중요한 환경',
    grid: [
      ['empty', 'wall',  'empty', 'empty', 'goal' ],
      ['empty', 'wall',  'empty', 'wall',  'empty'],
      ['empty', 'empty', 'empty', 'wall',  'trap' ],
      ['wall',  'wall',  'empty', 'empty', 'empty'],
      ['start', 'empty', 'trap',  'wall',  'empty'],
    ],
  },
  {
    label: '함정 가득',
    desc: '함정이 많아 탐험 전략이 중요한 환경',
    grid: [
      ['empty', 'trap',  'empty', 'trap',  'goal' ],
      ['empty', 'empty', 'trap',  'empty', 'empty'],
      ['trap',  'empty', 'empty', 'empty', 'trap' ],
      ['empty', 'empty', 'trap',  'empty', 'empty'],
      ['start', 'trap',  'empty', 'trap',  'empty'],
    ],
  },
]

const DEFAULT_PARAMS: GridWorldParams = {
  rows: 5, cols: 5,
  goalReward: 10, trapReward: -5, stepReward: -0.1,
  gamma: 0.9, epsilon: 0.2, alpha: 0.3,
}

const CELL_EMOJI: Record<CellKind, string> = { empty: '', wall: '🧱', goal: '🏆', trap: '💥', start: '🏁' }
const CELL_BG: Record<CellKind, string> = {
  empty: '#f9fafb', wall: '#374151', goal: '#d1fae5', trap: '#fee2e2', start: '#dbeafe',
}

function getQValue(qTable: Record<string, Record<Action, number>>, key: string, action: Action): number {
  return qTable[key]?.[action] ?? 0
}

function bestAction(qTable: Record<string, Record<Action, number>>, key: string): Action | null {
  const values = LOCAL_ACTIONS.map((a) => getQValue(qTable, key, a))
  const max = Math.max(...values)
  if (max === 0 && values.every((v) => v === 0)) return null
  return LOCAL_ACTIONS[values.indexOf(max)]
}

function maxQValue(qTable: Record<string, Record<Action, number>>, key: string): number {
  return Math.max(0, ...LOCAL_ACTIONS.map((a) => getQValue(qTable, key, a)))
}

export function GridworldModule() {
  const [params, setParams] = useState<GridWorldParams>(DEFAULT_PARAMS)
  const [layoutIdx, setLayoutIdx] = useState(0)
  const [state, setState] = useState<GridWorldState>(() => initGridWorld(DEFAULT_PARAMS, LAYOUTS[0].grid))
  const [isRunning, setIsRunning] = useState(false)
  const [episodeHistory, setEpisodeHistory] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAuto = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    setIsRunning(false)
  }, [])

  const handleStep = () => {
    if (state.done) return
    setState((prev) => qStep(prev, params))
  }

  const handleEpisode = () => {
    setState((prev) => {
      let s = prev.done ? resetEpisode(prev) : prev
      let steps = 0
      while (!s.done && steps < 300) { s = qStep(s, params); steps++ }
      if (!s.done) s = { ...s, done: true, explanation: `에피소드 ${s.episode}: 300스텝 초과.` }
      setEpisodeHistory((h) => [...h.slice(-29), parseFloat(s.totalReward.toFixed(1))])
      return s
    })
  }

  const handleToggleAuto = () => {
    if (isRunning) { stopAuto(); return }
    setIsRunning(true)
    let count = 0
    // 파라미터를 클로저에 캡처
    const capturedParams = { ...params }
    intervalRef.current = setInterval(() => {
      count++
      if (count > 100) { stopAuto(); return }
      setState((prev) => {
        let s = prev.done ? resetEpisode(prev) : prev
        let steps = 0
        while (!s.done && steps < 300) { s = qStep(s, capturedParams); steps++ }
        if (!s.done) s = { ...s, done: true, explanation: `에피소드 ${s.episode}: 300스텝 초과.` }
        setEpisodeHistory((h) => [...h.slice(-29), parseFloat(s.totalReward.toFixed(1))])
        return s
      })
    }, 60)
  }

  const handleNextEpisode = () => {
    stopAuto()
    setState((prev) => resetEpisode(prev))
  }

  const handleReset = () => {
    stopAuto()
    setState(initGridWorld(params, LAYOUTS[layoutIdx].grid))
    setEpisodeHistory([])
  }

  const handleLayoutChange = (idx: number) => {
    stopAuto()
    setLayoutIdx(idx)
    setState(initGridWorld(params, LAYOUTS[idx].grid))
    setEpisodeHistory([])
  }

  const updateParam = <K extends keyof GridWorldParams>(key: K, val: number) => {
    setParams((p) => ({ ...p, [key]: val }))
  }

  const rows = state.rows
  const cols = state.cols
  const svgW = cols * CELL + 1
  const svgH = rows * CELL + 1

  // Q값 최대치 (히트맵 정규화용)
  const allQMax = Math.max(0.1, ...Object.keys(state.qTable).map((k) => maxQValue(state.qTable, k)))

  // 에피소드 히스토리 차트
  const histMax = Math.max(10, ...episodeHistory.map(Math.abs))
  const histW = 280
  const histH = 60

  return (
    <div className={styles.module}>
      <div className={styles.workspace}>
        <aside className={styles.controls}>
          <h3 className={styles.controlTitle}>환경 선택</h3>
          <div className={styles.controlGroup}>
            <div className={styles.layoutBtns}>
              {LAYOUTS.map((l, i) => (
                <button
                  key={l.label}
                  className={`${styles.layoutBtn} ${layoutIdx === i ? styles.active : ''}`}
                  onClick={() => handleLayoutChange(i)}
                  title={l.desc}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <p className={styles.hint}>{LAYOUTS[layoutIdx].desc}</p>
          </div>

          <h3 className={styles.controlTitle}>하이퍼파라미터</h3>

          <div className={styles.controlGroup}>
            <label className={styles.label}>
              <span>학습률 α</span>
              <span className={styles.labelValue}>{params.alpha.toFixed(2)}</span>
            </label>
            <input type="range" min={0.01} max={1} step={0.01} value={params.alpha} className={styles.slider}
              onChange={(e) => updateParam('alpha', Number(e.target.value))} />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>
              <span>탐험률 ε</span>
              <span className={styles.labelValue}>{params.epsilon.toFixed(2)}</span>
            </label>
            <input type="range" min={0} max={1} step={0.01} value={params.epsilon} className={styles.slider}
              onChange={(e) => updateParam('epsilon', Number(e.target.value))} />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>
              <span>할인율 γ</span>
              <span className={styles.labelValue}>{params.gamma.toFixed(2)}</span>
            </label>
            <input type="range" min={0} max={0.99} step={0.01} value={params.gamma} className={styles.slider}
              onChange={(e) => updateParam('gamma', Number(e.target.value))} />
          </div>

          <h3 className={styles.controlTitle} style={{ marginTop: '0.75rem' }}>실행</h3>
          <div className={styles.runButtons}>
            <button className={styles.btn} onClick={handleStep} disabled={state.done || isRunning}>▶ 한 스텝</button>
            <button className={styles.btn} onClick={handleEpisode} disabled={isRunning}>⏩ 에피소드 1회</button>
            <button
              className={`${styles.btn} ${isRunning ? styles.activeBtn : ''}`}
              onClick={handleToggleAuto}
            >
              {isRunning ? '⏸ 정지' : '⏭ 자동 (100회)'}
            </button>
            {state.done && !isRunning && (
              <button className={styles.btn} onClick={handleNextEpisode}>↺ 다음 에피소드</button>
            )}
            <button className={`${styles.btn} ${styles.resetBtn}`} onClick={handleReset}>↺ 전체 초기화</button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}><span>에피소드</span><strong>{state.episode}</strong></div>
            <div className={styles.stat}><span>스텝</span><strong>{state.totalStep}</strong></div>
            <div className={styles.stat}>
              <span>보상</span>
              <strong style={{ color: state.totalReward >= 0 ? '#10b981' : '#ef4444' }}>
                {state.totalReward.toFixed(1)}
              </strong>
            </div>
          </div>
        </aside>

        {/* 시각화 */}
        <div className={styles.visualization}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH} className={styles.gridCanvas}>
            {Array.from({ length: rows }, (_, r) =>
              Array.from({ length: cols }, (_, c) => {
                const kind = state.grid[r][c]
                const isAgent = state.agentPos.row === r && state.agentPos.col === c
                const key = `${r},${c}`
                const best = kind !== 'wall' && kind !== 'goal' && kind !== 'trap'
                  ? bestAction(state.qTable, key) : null
                const qVal = maxQValue(state.qTable, key)
                const heatIntensity = allQMax > 0 ? qVal / allQMax : 0

                return (
                  <g key={`${r}-${c}`}>
                    <rect
                      x={c * CELL + 0.5} y={r * CELL + 0.5}
                      width={CELL - 1} height={CELL - 1} rx={4}
                      fill={isAgent ? '#fef3c7' : CELL_BG[kind]}
                      stroke={isAgent ? '#f59e0b' : '#d1d5db'}
                      strokeWidth={isAgent ? 2.5 : 0.8}
                    />
                    {/* Q값 히트맵 오버레이 (빈 셀만) */}
                    {kind === 'empty' && heatIntensity > 0.05 && !isAgent && (
                      <rect
                        x={c * CELL + 0.5} y={r * CELL + 0.5}
                        width={CELL - 1} height={CELL - 1} rx={4}
                        fill={`rgba(67, 97, 238, ${(heatIntensity * 0.35).toFixed(2)})`}
                      />
                    )}
                    {/* 셀 이모지 */}
                    {CELL_EMOJI[kind] && (
                      <text x={c * CELL + CELL / 2} y={r * CELL + CELL / 2 + 7}
                        textAnchor="middle" fontSize={20}>{CELL_EMOJI[kind]}</text>
                    )}
                    {/* 에이전트 */}
                    {isAgent && (
                      <text x={c * CELL + CELL / 2} y={r * CELL + CELL / 2 + 7}
                        textAnchor="middle" fontSize={20}>🤖</text>
                    )}
                    {/* 최적 행동 화살표 */}
                    {best && !isAgent && kind === 'empty' && (
                      <text x={c * CELL + CELL / 2} y={r * CELL + CELL / 2 - 10}
                        textAnchor="middle" fontSize={15} fill="#374151" opacity={0.6}>
                        {ARROW[best]}
                      </text>
                    )}
                    {/* Q값 숫자 */}
                    {kind === 'empty' && qVal > 0.1 && (
                      <text x={c * CELL + CELL / 2} y={r * CELL + CELL - 5}
                        textAnchor="middle" fontSize={7} fill="#6b7280">
                        {qVal.toFixed(1)}
                      </text>
                    )}
                  </g>
                )
              })
            )}
          </svg>

          {/* 에피소드 보상 히스토리 */}
          {episodeHistory.length > 1 && (
            <div className={styles.historyWrap}>
              <p className={styles.historyTitle}>에피소드별 총 보상 (최근 {episodeHistory.length}회)</p>
              <svg width={histW} height={histH + 20} className={styles.historyChart}>
                {/* 기준선 (y=0) */}
                <line x1={0} y1={histH / 2 + 10} x2={histW} y2={histH / 2 + 10}
                  stroke="#e5e7eb" strokeWidth={1} />
                {/* 막대 */}
                {episodeHistory.map((val, i) => {
                  const barH = Math.abs(val) / histMax * (histH / 2)
                  const isPos = val >= 0
                  const barX = (i / (episodeHistory.length - 1)) * (histW - 8)
                  return (
                    <rect
                      key={i}
                      x={barX} y={isPos ? histH / 2 + 10 - barH : histH / 2 + 10}
                      width={Math.max(2, histW / episodeHistory.length - 2)}
                      height={Math.max(1, barH)}
                      fill={isPos ? '#10b981' : '#ef4444'}
                      opacity={0.8} rx={1}
                    />
                  )
                })}
                {/* 축 레이블 */}
                <text x={2} y={9} fontSize={7} fill="#9ca3af">+{histMax.toFixed(0)}</text>
                <text x={2} y={histH + 18} fontSize={7} fill="#9ca3af">-{histMax.toFixed(0)}</text>
              </svg>
            </div>
          )}

          <div className={styles.legend}>
            <span className={styles.legendItem}>🏁 시작</span>
            <span className={styles.legendItem}>🏆 목표(+10)</span>
            <span className={styles.legendItem}>💥 함정(-5)</span>
            <span className={styles.legendItem}>🧱 벽</span>
            <span className={styles.legendItem}>🤖 에이전트</span>
            <span className={styles.legendItem} style={{ opacity: 0.7 }}>↑↓←→ 최적정책 / 파란 음영 = Q값</span>
          </div>
        </div>
      </div>

      <SimulationPanel
        explanation={state.explanation}
        extra={`에피소드 ${state.episode} / 총 스텝 ${state.totalStep}`}
      />

      <ConceptNote title="오답과 한계" variant="limit">
        <ul>
          <li>학습 초기에는 에이전트가 무작위로 움직여서 함정에 자주 빠집니다. 화살표가 점점 목표 방향을 가리키는지 관찰하세요.</li>
          <li>탐험률(ε)=0으로 하면 기존에 아는 것만 활용 → 더 좋은 경로를 찾지 못할 수 있습니다.</li>
          <li>Q-learning은 상태 수에 비례해 메모리가 필요합니다. 현실의 연속 상태는 Deep RL(DQN)로 해결합니다.</li>
          <li>이 GridWorld는 결정론적(deterministic)입니다. 실제 환경은 노이즈와 불확실성이 있습니다.</li>
        </ul>
      </ConceptNote>

      <ExperimentQuestion
        questions={[
          {
            text: '[자동 100회] 실행 전후 화살표 방향을 비교해보세요. 어떻게 달라지나요?',
            hint: '초기에는 화살표가 없다가 학습 후에는 목표를 향하는 경로가 형성됩니다. 파란 음영(Q값)도 확인하세요.',
          },
          {
            text: '탐험률(ε)을 0과 1.0으로 각각 설정하고 학습하면 어떻게 다른가요?',
            hint: 'ε=0: 이미 아는 것만 활용. ε=1: 항상 무작위. 둘 다 학습이 잘 안 됩니다.',
          },
          {
            text: '[함정 가득] 환경에서 같은 횟수 학습 후 보상 히스토리가 어떻게 다른가요?',
            hint: '환경이 어려울수록 초기 음의 보상이 많고 수렴하는 데 더 오래 걸립니다.',
          },
        ]}
      />
    </div>
  )
}
