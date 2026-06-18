import { type GridWorldState, type GridWorldParams, type CellKind, type Action, ACTIONS } from './types'

function posKey(row: number, col: number): string {
  return `${row},${col}`
}

function getReward(kind: CellKind, params: GridWorldParams): number {
  if (kind === 'goal') return params.goalReward
  if (kind === 'trap') return params.trapReward
  return params.stepReward
}

function getQValue(qTable: Record<string, Record<Action, number>>, key: string, action: Action): number {
  return qTable[key]?.[action] ?? 0
}

function maxQ(qTable: Record<string, Record<Action, number>>, key: string): number {
  return Math.max(...ACTIONS.map((a) => getQValue(qTable, key, a)))
}

function move(row: number, col: number, action: Action, rows: number, cols: number): { row: number; col: number } {
  const delta: Record<Action, [number, number]> = {
    up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1],
  }
  const [dr, dc] = delta[action]
  return {
    row: Math.max(0, Math.min(rows - 1, row + dr)),
    col: Math.max(0, Math.min(cols - 1, col + dc)),
  }
}

export function initGridWorld(_params: GridWorldParams, layout: CellKind[][]): GridWorldState {
  const rows = layout.length
  const cols = layout[0].length
  let startPos = { row: 0, col: 0 }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (layout[r][c] === 'start') startPos = { row: r, col: c }
    }
  }
  return {
    grid: layout,
    rows,
    cols,
    agentPos: startPos,
    qTable: {},
    episode: 0,
    totalStep: 0,
    totalReward: 0,
    done: false,
    explanation: '에이전트(🤖)가 시작 위치에 있습니다. [한 스텝] 또는 [에피소드 실행]을 눌러 학습을 시작하세요.',
  }
}

export function qStep(state: GridWorldState, params: GridWorldParams): GridWorldState {
  if (state.done) return state

  const { row, col } = state.agentPos
  const key = posKey(row, col)
  const qTable = JSON.parse(JSON.stringify(state.qTable)) as Record<string, Record<Action, number>>

  // ε-greedy policy
  const action: Action =
    Math.random() < params.epsilon
      ? ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
      : ACTIONS.reduce((best, a) => (getQValue(qTable, key, a) > getQValue(qTable, key, best) ? a : best), ACTIONS[0])

  const nextPos = move(row, col, action, state.rows, state.cols)
  const nextKind = state.grid[nextPos.row][nextPos.col]

  if (nextKind === 'wall') {
    return {
      ...state,
      totalStep: state.totalStep + 1,
      explanation: `벽에 막혔습니다! (${action}) 이동 불가. Q값 업데이트 없음.`,
    }
  }

  const reward = getReward(nextKind, params)
  const nextKey = posKey(nextPos.row, nextPos.col)
  const oldQ = getQValue(qTable, key, action)
  const maxNextQ = maxQ(qTable, nextKey)
  const newQ = oldQ + params.alpha * (reward + params.gamma * maxNextQ - oldQ)

  if (!qTable[key]) qTable[key] = { up: 0, down: 0, left: 0, right: 0 }
  qTable[key][action] = newQ

  const done = nextKind === 'goal' || nextKind === 'trap'

  return {
    ...state,
    agentPos: nextPos,
    qTable,
    totalStep: state.totalStep + 1,
    totalReward: state.totalReward + reward,
    done,
    explanation: `${action.toUpperCase()} → (${nextPos.row},${nextPos.col}). 보상: ${reward}. Q[${action}]: ${oldQ.toFixed(2)} → ${newQ.toFixed(2)}.`,
  }
}

export function resetEpisode(state: GridWorldState): GridWorldState {
  let startPos = { row: 0, col: 0 }
  for (let r = 0; r < state.rows; r++) {
    for (let c = 0; c < state.cols; c++) {
      if (state.grid[r][c] === 'start') startPos = { row: r, col: c }
    }
  }
  return {
    ...state,
    agentPos: startPos,
    done: false,
    episode: state.episode + 1,
    totalReward: 0,
    explanation: `에피소드 ${state.episode + 1} 시작. 에이전트가 시작점으로 돌아갔습니다.`,
  }
}
