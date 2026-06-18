import { useState, useCallback, useRef, useEffect } from 'react'
import { SimulationPanel } from '@/components/SimulationPanel/SimulationPanel'
import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import { ExperimentQuestion } from '@/components/ExperimentQuestion/ExperimentQuestion'
import {
  initPathfinding, bfsStep, dfsStep, astarStep, dijkstraStep,
  type PathfindingState, type Algorithm, type Position,
} from '@/simulations/pathfinding/index'
import styles from './PathfindingModule.module.css'

const ROWS = 12
const COLS = 16
const CELL_SIZE = 36

const DEFAULT_START: Position = { row: 2, col: 2 }
const DEFAULT_GOAL: Position = { row: 9, col: 13 }

const DEFAULT_WALLS: Position[] = [
  ...[3, 4, 5, 6, 7, 8].map((r) => ({ row: r, col: 6 })),
  ...[3, 4, 5, 6, 7, 8].map((r) => ({ row: r, col: 9 })),
  { row: 3, col: 7 }, { row: 3, col: 8 },
]

type DrawTool = 'wall' | 'erase' | 'weight2' | 'weight5'

const TERRAIN_WEIGHT: Record<DrawTool, number> = { wall: 0, erase: 1, weight2: 2, weight5: 5 }

const WEIGHT_COLORS: Record<number, string> = {
  1: '#f9fafb',   // 보통
  2: '#d1b080',   // 산 (중간 비용)
  5: '#6b8c6b',   // 늪 (높은 비용)
}

const ALGO_LABELS: Record<Algorithm, string> = {
  bfs: 'BFS', dfs: 'DFS', dijkstra: 'Dijkstra', astar: 'A*',
}

function makeInitState(algorithm: Algorithm): PathfindingState {
  return initPathfinding({ rows: ROWS, cols: COLS, start: DEFAULT_START, goal: DEFAULT_GOAL, walls: DEFAULT_WALLS, algorithm })
}

function doStep(prev: PathfindingState): PathfindingState {
  if (prev.done) return prev
  if (prev.algorithm === 'bfs') return bfsStep(prev)
  if (prev.algorithm === 'dfs') return dfsStep(prev)
  if (prev.algorithm === 'dijkstra') return dijkstraStep(prev)
  return astarStep(prev)
}

export function PathfindingModule() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('bfs')
  const [state, setState] = useState<PathfindingState>(() => makeInitState('bfs'))
  const [tool, setTool] = useState<DrawTool | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAuto = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    setIsRunning(false)
  }, [])

  const reset = useCallback((algo: Algorithm) => {
    stopAuto()
    setState(makeInitState(algo))
  }, [stopAuto])

  const step = useCallback(() => {
    setState((prev) => doStep(prev))
  }, [])

  useEffect(() => {
    if (state.done && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    }
  }, [state.done])

  const handleToggleAuto = useCallback(() => {
    if (isRunning) { stopAuto(); return }
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setState((prev) => doStep(prev))
    }, 80)
  }, [isRunning, stopAuto])

  const handleAlgoChange = (algo: Algorithm) => {
    setAlgorithm(algo)
    reset(algo)
  }

  const applyTool = useCallback((row: number, col: number) => {
    if (!tool) return
    setState((prev) => {
      const cell = prev.grid[row][col]
      if (cell.type === 'start' || cell.type === 'goal') return prev
      const newGrid = prev.grid.map((r) => r.map((c) => ({ ...c })))
      if (tool === 'wall') {
        newGrid[row][col].type = 'wall'
        newGrid[row][col].weight = 1
      } else if (tool === 'erase') {
        newGrid[row][col].type = 'empty'
        newGrid[row][col].weight = 1
        newGrid[row][col].state = 'unvisited'
      } else {
        newGrid[row][col].type = 'empty'
        newGrid[row][col].weight = TERRAIN_WEIGHT[tool]
        newGrid[row][col].state = 'unvisited'
      }
      return { ...prev, grid: newGrid }
    })
  }, [tool])

  const cellFill = (row: number, col: number): string => {
    const cell = state.grid[row][col]
    if (cell.type === 'start') return '#10b981'
    if (cell.type === 'goal') return '#ef4444'
    if (cell.type === 'wall') return '#374151'
    if (state.path.some((p) => p.row === row && p.col === col)) return '#fbbf24'
    if (cell.state === 'visited') return '#bfdbfe'
    if (cell.state === 'frontier') return '#93c5fd'
    return WEIGHT_COLORS[cell.weight] ?? '#f9fafb'
  }

  return (
    <div className={styles.module}>
      <div className={styles.workspace}>
        <aside className={styles.controls}>
          <h3 className={styles.controlTitle}>알고리즘</h3>
          <div className={styles.controlGroup}>
            <div className={styles.algoButtons}>
              {(['bfs', 'dfs', 'dijkstra', 'astar'] as Algorithm[]).map((a) => (
                <button
                  key={a}
                  className={`${styles.algoBtn} ${algorithm === a ? styles.active : ''}`}
                  onClick={() => handleAlgoChange(a)}
                  title={
                    a === 'bfs' ? '너비 우선 탐색 — 최소 이동 수' :
                    a === 'dfs' ? '깊이 우선 탐색 — 빠르지만 최단 경로 미보장' :
                    a === 'dijkstra' ? 'Dijkstra — 지형 비용 최소 경로' :
                    'A* — 휴리스틱으로 효율적 탐색'
                  }
                >
                  {ALGO_LABELS[a]}
                </button>
              ))}
            </div>
            {algorithm === 'dijkstra' && (
              <p className={styles.hint}>💡 Dijkstra는 지형 비용을 고려합니다. 산(2)/늪(5) 지형을 그려보세요!</p>
            )}
          </div>

          <h3 className={styles.controlTitle}>그리기 도구</h3>
          <div className={styles.controlGroup}>
            <div className={styles.toolButtons}>
              {([
                { key: 'wall' as DrawTool, label: '🧱 벽', title: '이동 불가' },
                { key: 'weight2' as DrawTool, label: '⛰ 산(2)', title: '이동 비용 2' },
                { key: 'weight5' as DrawTool, label: '🌿 늪(5)', title: '이동 비용 5' },
                { key: 'erase' as DrawTool, label: '🧹 지우기', title: '보통 지형으로' },
              ]).map(({ key, label, title }) => (
                <button
                  key={key}
                  className={`${styles.btn} ${tool === key ? styles.active : ''}`}
                  onClick={() => setTool(tool === key ? null : key)}
                  title={title}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className={styles.hint}>클릭 또는 드래그로 그립니다. 같은 버튼 재클릭 시 해제.</p>
          </div>

          <h3 className={styles.controlTitle}>실행</h3>
          <div className={styles.controlGroup}>
            <div className={styles.runButtons}>
              <button className={styles.btn} onClick={step} disabled={state.done || isRunning}>
                ▶ 한 스텝
              </button>
              <button
                className={`${styles.btn} ${isRunning ? styles.active : ''}`}
                onClick={handleToggleAuto}
                disabled={state.done}
              >
                {isRunning ? '⏸ 일시정지' : '⏩ 자동 실행'}
              </button>
              <button className={`${styles.btn} ${styles.resetBtn}`} onClick={() => reset(algorithm)}>
                ↺ 초기화
              </button>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}><span>스텝</span><strong>{state.step}</strong></div>
            <div className={styles.stat}><span>방문</span><strong>{Object.keys(state.visited).length}</strong></div>
            <div className={styles.stat}>
              <span>경로</span>
              <strong>{state.path.length > 0 ? `${state.path.length - 1}칸` : '—'}</strong>
            </div>
          </div>
        </aside>

        <div className={styles.visualization}>
          <svg
            width={COLS * CELL_SIZE + 1}
            height={ROWS * CELL_SIZE + 1}
            className={styles.grid}
            onMouseLeave={() => {}}
          >
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: COLS }, (_, c) => {
                const cell = state.grid[r][c]
                const onPath = state.path.some((p) => p.row === r && p.col === c)
                const weight = cell.weight ?? 1
                return (
                  <g key={`${r}-${c}`}>
                    <rect
                      x={c * CELL_SIZE + 0.5} y={r * CELL_SIZE + 0.5}
                      width={CELL_SIZE - 1} height={CELL_SIZE - 1}
                      rx={3}
                      fill={cellFill(r, c)}
                      stroke={onPath ? '#f59e0b' : '#d1d5db'}
                      strokeWidth={onPath ? 2 : 0.5}
                      style={{ cursor: tool ? 'crosshair' : 'default' }}
                      onMouseDown={() => applyTool(r, c)}
                      onMouseEnter={(e) => { if (e.buttons === 1) applyTool(r, c) }}
                    />
                    {cell.type === 'start' && (
                      <text x={c * CELL_SIZE + CELL_SIZE / 2} y={r * CELL_SIZE + CELL_SIZE / 2 + 5}
                        textAnchor="middle" fontSize={16}>S</text>
                    )}
                    {cell.type === 'goal' && (
                      <text x={c * CELL_SIZE + CELL_SIZE / 2} y={r * CELL_SIZE + CELL_SIZE / 2 + 5}
                        textAnchor="middle" fontSize={16}>G</text>
                    )}
                    {/* 지형 비용 표시 (가중치 그리드) */}
                    {cell.type === 'empty' && weight > 1 && (
                      <text x={c * CELL_SIZE + CELL_SIZE / 2} y={r * CELL_SIZE + CELL_SIZE / 2 + 5}
                        textAnchor="middle" fontSize={11} fill="#374151" fontWeight="600">{weight}</text>
                    )}
                  </g>
                )
              })
            )}
          </svg>

          <div className={styles.legend}>
            <span className={styles.legendItem}><span style={{ background: '#10b981' }} className={styles.dot} /> 시작(S)</span>
            <span className={styles.legendItem}><span style={{ background: '#ef4444' }} className={styles.dot} /> 목표(G)</span>
            <span className={styles.legendItem}><span style={{ background: '#bfdbfe' }} className={styles.dot} /> 방문</span>
            <span className={styles.legendItem}><span style={{ background: '#93c5fd' }} className={styles.dot} /> 탐색 대기</span>
            <span className={styles.legendItem}><span style={{ background: '#fbbf24' }} className={styles.dot} /> 최종 경로</span>
            <span className={styles.legendItem}><span style={{ background: '#374151' }} className={styles.dot} /> 벽</span>
            <span className={styles.legendItem}><span style={{ background: '#d1b080' }} className={styles.dot} /> 산(2)</span>
            <span className={styles.legendItem}><span style={{ background: '#6b8c6b' }} className={styles.dot} /> 늪(5)</span>
          </div>
        </div>
      </div>

      <SimulationPanel explanation={state.explanation} step={state.step} />

      <ConceptNote title="알고리즘 비교" variant="info">
        <ul>
          <li><strong>BFS</strong>: 이동 횟수가 가장 적은 경로 (모든 칸 비용=1 가정)</li>
          <li><strong>DFS</strong>: 최단 경로 미보장. 빠르게 찾지만 돌아갈 수 있음</li>
          <li><strong>Dijkstra</strong>: 지형 비용을 합산한 최소 비용 경로. 산(2)/늪(5)을 그려서 BFS와 경로를 비교해보세요!</li>
          <li><strong>A*</strong>: 휴리스틱(목표까지 직선 거리 예측)으로 불필요한 탐색을 줄임</li>
        </ul>
      </ConceptNote>

      <ConceptNote title="오답과 한계" variant="limit">
        <ul>
          <li><strong>DFS</strong>는 최단 경로를 보장하지 않습니다. 미로 구조에 따라 멀리 돌아갑니다.</li>
          <li><strong>Dijkstra</strong>는 지형 비용이 없으면(모두 1) BFS와 동일한 경로를 탐색합니다.</li>
          <li><strong>A*</strong>의 휴리스틱이 실제 비용보다 크게 추정되면 최적 경로를 놓칠 수 있습니다.</li>
          <li>이 시뮬레이션은 4방향 이동만 지원합니다(대각선 없음).</li>
        </ul>
      </ConceptNote>

      <ExperimentQuestion
        questions={[
          {
            text: '⛰ 산(2) 지형을 경로 중간에 배치하고 BFS vs Dijkstra를 비교해보세요. 경로가 달라지나요?',
            hint: 'BFS는 칸 수만 세고, Dijkstra는 지형 비용을 더해서 더 긴 우회로가 실제로 더 저렴할 수 있습니다.',
          },
          {
            text: '같은 미로에서 4가지 알고리즘의 방문 칸 수를 비교해보세요. 가장 효율적인 알고리즘은?',
            hint: '목표까지의 휴리스틱 정보 유무가 탐색 효율에 어떤 영향을 미치는지 관찰하세요.',
          },
          {
            text: '늪(5) 지형으로 막혔을 때, Dijkstra가 선택하는 우회 경로를 관찰해보세요. 비용은 얼마인가요?',
            hint: '경로 길이(칸 수)와 총 비용(가중치 합)이 다를 수 있습니다.',
          },
        ]}
      />
    </div>
  )
}
