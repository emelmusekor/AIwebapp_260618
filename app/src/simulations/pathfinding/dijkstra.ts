import { type PathfindingState, type Position, posKey } from './types'

const NEIGHBORS = [
  { row: -1, col: 0 }, { row: 1, col: 0 },
  { row: 0, col: -1 }, { row: 0, col: 1 },
]

// 시작점에서 각 셀까지의 누적 최소 비용 맵을 state에서 복원
function buildGCost(state: PathfindingState): Record<string, number> {
  const g: Record<string, number> = {}
  g[posKey(state.start)] = 0
  for (const key of Object.keys(state.visited)) {
    const [r, c] = key.split(',').map(Number)
    g[key] = state.grid[r][c].cost
  }
  for (const p of state.frontier) {
    const key = posKey(p)
    g[key] = state.grid[p.row][p.col].cost
  }
  return g
}

function reconstructPath(parent: Record<string, string>, start: Position, goal: Position): Position[] {
  const path: Position[] = []
  let cur = posKey(goal)
  const startKey = posKey(start)
  while (cur !== startKey) {
    const [r, c] = cur.split(',').map(Number)
    path.unshift({ row: r, col: c })
    const p = parent[cur]
    if (!p) break
    cur = p
  }
  path.unshift(start)
  return path
}

export function dijkstraStep(state: PathfindingState): PathfindingState {
  if (state.done || state.frontier.length === 0) {
    return { ...state, done: true, explanation: '탐색 완료. 목표에 도달할 수 없습니다.' }
  }

  const gCost = buildGCost(state)

  // frontier에서 누적 비용(g)이 가장 낮은 셀 선택
  let bestIdx = 0
  let bestG = Infinity
  for (let i = 0; i < state.frontier.length; i++) {
    const g = gCost[posKey(state.frontier[i])] ?? Infinity
    if (g < bestG) { bestG = g; bestIdx = i }
  }

  const newFrontier = [...state.frontier]
  const [current] = newFrontier.splice(bestIdx, 1)
  const key = posKey(current)
  const currentG = gCost[key] ?? 0

  if (current.row === state.goal.row && current.col === state.goal.col) {
    const path = reconstructPath(state.parent, state.start, state.goal)
    const totalCost = currentG
    return {
      ...state,
      frontier: newFrontier,
      path,
      done: true,
      found: true,
      explanation: `목표 도달! Dijkstra: 지형 비용 합산 최단 경로 = ${totalCost.toFixed(1)}, ${path.length - 1}칸. 비용이 큰 셀(산/늪)을 우회합니다.`,
    }
  }

  const newGrid = state.grid.map((row) => row.map((cell) => ({ ...cell })))
  if (newGrid[current.row][current.col].type !== 'start' && newGrid[current.row][current.col].type !== 'goal') {
    newGrid[current.row][current.col].state = 'visited'
  }

  const newVisited = { ...state.visited }
  const newParent = { ...state.parent }
  const newGCost = { ...gCost }

  for (const delta of NEIGHBORS) {
    const nr = current.row + delta.row
    const nc = current.col + delta.col
    if (nr < 0 || nr >= state.rows || nc < 0 || nc >= state.cols) continue
    const neighborKey = posKey({ row: nr, col: nc })
    if (newVisited[neighborKey]) continue
    if (newGrid[nr][nc].type === 'wall') continue

    // Dijkstra는 이웃 셀의 weight(지형 비용)를 더함
    const terrainCost = newGrid[nr][nc].weight ?? 1
    const tentativeG = currentG + terrainCost
    const existingG = newGCost[neighborKey] ?? Infinity

    if (tentativeG < existingG) {
      newGCost[neighborKey] = tentativeG
      newGrid[nr][nc].cost = tentativeG
      newParent[neighborKey] = key
      if (!newFrontier.some((p) => posKey(p) === neighborKey)) {
        newFrontier.push({ row: nr, col: nc })
        newVisited[neighborKey] = true
      }
      if (newGrid[nr][nc].type !== 'goal') {
        newGrid[nr][nc].state = 'frontier'
      }
    }
  }

  return {
    ...state,
    grid: newGrid,
    frontier: newFrontier,
    visited: newVisited,
    parent: newParent,
    step: state.step + 1,
    explanation: `Dijkstra: (${current.row},${current.col}) 처리. 누적 비용=${currentG.toFixed(1)}. 방문: ${Object.keys(newVisited).length}칸.`,
  }
}
