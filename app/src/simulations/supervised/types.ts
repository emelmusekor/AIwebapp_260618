export type Label = 0 | 1 | 2

export interface LabeledPoint {
  x: number
  y: number
  label: Label
}

export interface BoundaryCell {
  x: number
  y: number
  predictedLabel: Label
}

export interface SupervisedParams {
  k: number
  resolution: number
}

export interface SupervisedState {
  points: LabeledPoint[]
  k: number
  boundaryGrid: BoundaryCell[]
  resolution: number
  explanation: string
}
