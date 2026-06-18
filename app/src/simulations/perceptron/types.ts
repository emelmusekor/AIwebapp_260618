export interface PerceptronPoint {
  x: number   // 0-100 (SVG coord)
  y: number   // 0-100 (SVG coord, 0=top)
  label: 0 | 1
}

export interface PerceptronState {
  points: PerceptronPoint[]
  weights: [number, number]   // [w1, w2]
  bias: number
  learningRate: number
  epoch: number
  loss: number
  accuracy: number
  lossHistory: number[]
  explanation: string
}

export type PresetName = 'linear' | 'hard' | 'xor'
