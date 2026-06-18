export type CellType = 'empty' | 'wall' | 'start' | 'goal'
export type CellState = 'unvisited' | 'frontier' | 'visited' | 'path'
export type Algorithm = 'bfs' | 'dfs' | 'dijkstra' | 'astar'

export interface Position {
  row: number
  col: number
}

export interface Cell {
  type: CellType
  state: CellState
  cost: number      // A* accumulated g-cost (overwritten during search)
  heuristic: number // precomputed Manhattan distance to goal
  weight: number    // terrain cost: 1=보통, 2=산, 5=늪 (preserved during search)
}

export interface PathfindingParams {
  rows: number
  cols: number
  start: Position
  goal: Position
  walls: Position[]
  algorithm: Algorithm
}

export interface PathfindingState {
  grid: Cell[][]
  rows: number
  cols: number
  start: Position
  goal: Position
  algorithm: Algorithm
  frontier: Position[]
  visited: Record<string, boolean>
  parent: Record<string, string>
  path: Position[]
  step: number
  done: boolean
  found: boolean
  explanation: string
}

export interface PathfindingResult {
  path: Position[]
  visitedCount: number
  steps: number
  found: boolean
}

export function posKey(p: Position): string {
  return `${p.row},${p.col}`
}
