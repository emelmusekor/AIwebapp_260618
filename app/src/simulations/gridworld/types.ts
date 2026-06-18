export type CellKind = 'empty' | 'wall' | 'goal' | 'trap' | 'start'
export type Action = 'up' | 'down' | 'left' | 'right'

export const ACTIONS: Action[] = ['up', 'down', 'left', 'right']

export interface GridWorldParams {
  rows: number
  cols: number
  goalReward: number
  trapReward: number
  stepReward: number
  gamma: number
  epsilon: number
  alpha: number
}

export interface GridWorldState {
  grid: CellKind[][]
  rows: number
  cols: number
  agentPos: { row: number; col: number }
  qTable: Record<string, Record<Action, number>>
  episode: number
  totalStep: number
  totalReward: number
  done: boolean
  explanation: string
}
