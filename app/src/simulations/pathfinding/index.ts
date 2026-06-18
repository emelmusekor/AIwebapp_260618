export * from './types'
export { bfsStep } from './bfs'
export { dfsStep } from './dfs'
export { astarStep } from './astar'
export { dijkstraStep } from './dijkstra'

import { type PathfindingParams, type PathfindingState, type CellType, type CellState, posKey } from './types'

export function initPathfinding(params: PathfindingParams): PathfindingState {
  const { rows, cols, start, goal, walls } = params

  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      type: 'empty' as CellType,
      state: 'unvisited' as CellState,
      cost: 0,
      heuristic: Math.abs(r - goal.row) + Math.abs(c - goal.col),
      weight: 1,
    })),
  )

  grid[start.row][start.col].type = 'start'
  grid[goal.row][goal.col].type = 'goal'
  for (const w of walls) {
    if (w.row >= 0 && w.row < rows && w.col >= 0 && w.col < cols) {
      grid[w.row][w.col].type = 'wall'
    }
  }

  const startKey = posKey(start)
  return {
    grid,
    rows,
    cols,
    start,
    goal,
    algorithm: params.algorithm,
    frontier: [start],
    visited: { [startKey]: true },
    parent: {},
    path: [],
    step: 0,
    done: false,
    found: false,
    explanation: `${params.algorithm.toUpperCase()} 탐색 준비. 시작점 (${start.row},${start.col})에서 목표점 (${goal.row},${goal.col})까지 탐색합니다.`,
  }
}
