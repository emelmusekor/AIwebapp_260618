import { type PathfindingState, type Position, posKey } from './types'

const NEIGHBORS = [
  { row: -1, col: 0 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
]

export function dfsStep(state: PathfindingState): PathfindingState {
  if (state.done || state.frontier.length === 0) {
    return { ...state, done: true, explanation: '탐색이 완료되었습니다. 경로를 찾지 못했습니다.' }
  }

  // 불변 복사: pop()으로 원본 배열을 직접 변경하지 않도록 먼저 복사
  const newFrontier = [...state.frontier]
  const current = newFrontier.pop()!
  const key = posKey(current)

  if (current.row === state.goal.row && current.col === state.goal.col) {
    const path = reconstructPath(state.parent, state.start, state.goal)
    return {
      ...state,
      frontier: newFrontier,
      path,
      done: true,
      found: true,
      explanation: `목표 도달! DFS는 최단 경로를 보장하지 않습니다. 경로 길이: ${path.length - 1}칸.`,
    }
  }

  const newGrid = state.grid.map((row) => row.map((cell) => ({ ...cell })))
  if (newGrid[current.row][current.col].type !== 'start' && newGrid[current.row][current.col].type !== 'goal') {
    newGrid[current.row][current.col].state = 'visited'
  }

  const newVisited = { ...state.visited }
  const newParent = { ...state.parent }

  for (const delta of NEIGHBORS) {
    const nr = current.row + delta.row
    const nc = current.col + delta.col
    if (nr < 0 || nr >= state.rows || nc < 0 || nc >= state.cols) continue
    const neighborKey = posKey({ row: nr, col: nc })
    if (newVisited[neighborKey]) continue
    if (newGrid[nr][nc].type === 'wall') continue

    newVisited[neighborKey] = true
    newParent[neighborKey] = key
    newFrontier.push({ row: nr, col: nc })
    if (newGrid[nr][nc].type !== 'goal') {
      newGrid[nr][nc].state = 'frontier'
    }
  }

  return {
    ...state,
    grid: newGrid,
    frontier: newFrontier,
    visited: newVisited,
    parent: newParent,
    step: state.step + 1,
    explanation: `DFS: 스택에서 (${current.row}, ${current.col}) 꺼냄. 방문: ${Object.keys(newVisited).length}칸. 깊이 우선으로 탐색합니다.`,
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
