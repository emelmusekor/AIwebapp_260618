import { type PathfindingState, type Position, posKey } from './types'

const NEIGHBORS = [
  { row: -1, col: 0 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
]

function heuristic(a: Position, b: Position): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

// 방문했거나 frontier에 있는 셀의 gCost만 Record에 포함.
// 포함되지 않은 셀은 undefined → ?? Infinity로 처리되어 항상 갱신 가능.
function buildGCost(state: PathfindingState): Record<string, number> {
  const gCost: Record<string, number> = {}
  gCost[posKey(state.start)] = 0
  for (const key of Object.keys(state.visited)) {
    const [r, c] = key.split(',').map(Number)
    gCost[key] = state.grid[r][c].cost
  }
  for (const p of state.frontier) {
    const key = posKey(p)
    gCost[key] = state.grid[p.row][p.col].cost
  }
  return gCost
}

export function astarStep(state: PathfindingState): PathfindingState {
  if (state.done || state.frontier.length === 0) {
    return { ...state, done: true, explanation: '탐색이 완료되었습니다. 경로를 찾지 못했습니다.' }
  }

  const gCost = buildGCost(state)

  // frontier에서 f = g + h 가장 낮은 셀 선택
  let bestIdx = 0
  let bestF = Infinity
  for (let i = 0; i < state.frontier.length; i++) {
    const p = state.frontier[i]
    const g = gCost[posKey(p)] ?? Infinity
    const h = heuristic(p, state.goal)
    if (g + h < bestF) {
      bestF = g + h
      bestIdx = i
    }
  }

  const newFrontier = [...state.frontier]
  const [current] = newFrontier.splice(bestIdx, 1)
  const key = posKey(current)
  const currentG = gCost[key] ?? 0

  if (current.row === state.goal.row && current.col === state.goal.col) {
    const path = reconstructPath(state.parent, state.start, state.goal)
    return {
      ...state,
      frontier: newFrontier,
      path,
      done: true,
      found: true,
      explanation: `목표 도달! A*는 휴리스틱으로 불필요한 탐색을 줄여 최단경로를 효율적으로 찾습니다. 경로: ${path.length - 1}칸.`,
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
    // A*는 closed set(visited)에 있는 셀을 재방문하지 않음
    if (newVisited[neighborKey]) continue
    if (newGrid[nr][nc].type === 'wall') continue

    const tentativeG = currentG + 1
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

  const h = heuristic(current, state.goal)
  return {
    ...state,
    grid: newGrid,
    frontier: newFrontier,
    visited: newVisited,
    parent: newParent,
    step: state.step + 1,
    explanation: `A*: (${current.row},${current.col}) 처리. g=${currentG}, h=${h}, f=${currentG + h}. 방문: ${Object.keys(newVisited).length}칸.`,
  }
}

function reconstructPath(
  parent: Record<string, string>,
  start: Position,
  goal: Position,
): Position[] {
  const path: Position[] = []
  let current = posKey(goal)
  const startKey = posKey(start)

  while (current !== startKey) {
    const [r, c] = current.split(',').map(Number)
    path.unshift({ row: r, col: c })
    const p = parent[current]
    if (!p) break
    current = p
  }
  path.unshift(start)
  return path
}
