export interface RegressionPoint {
  x: number  // 0-100 (SVG 좌표계)
  y: number  // 0-100 (수학 좌표계 — 위가 높음, 변환 필요)
}

export interface RegressionState {
  points: RegressionPoint[]
  degree: number
  coefficients: number[]
  mse: number
  r2: number  // 결정계수 (0~1, 1에 가까울수록 좋음)
  explanation: string
}
