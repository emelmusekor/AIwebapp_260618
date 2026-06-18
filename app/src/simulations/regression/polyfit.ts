import { type RegressionPoint, type RegressionState } from './types'

// Gaussian elimination (row reduction) — NxN 선형 연립방정식 풀기
function gaussianElim(A: number[][], b: number[]): number[] {
  const n = A.length
  const M = A.map((row, i) => [...row, b[i]])

  for (let col = 0; col < n; col++) {
    // 피벗 선택 (절댓값 최대)
    let maxRow = col
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row
    }
    ;[M[col], M[maxRow]] = [M[maxRow], M[col]]

    if (Math.abs(M[col][col]) < 1e-12) continue

    for (let row = 0; row < n; row++) {
      if (row === col) continue
      const factor = M[row][col] / M[col][col]
      for (let k = col; k <= n; k++) M[row][k] -= factor * M[col][k]
    }
  }

  return M.map((row, i) => (Math.abs(row[i]) < 1e-12 ? 0 : row[n] / row[i]))
}

// 다항식 회귀: x를 [0,1]로 정규화해서 수치 안정성 확보
export function fitPolynomial(points: RegressionPoint[], degree: number): number[] {
  const n = points.length
  if (n === 0) return new Array(degree + 1).fill(0)

  const d = Math.min(degree, n - 1)  // 과결정 방지

  const xs = points.map((p) => p.x / 100)  // normalize to [0,1]
  const ys = points.map((p) => p.y)

  const deg1 = d + 1

  // 정규 방정식: X^T X β = X^T y
  const XtX: number[][] = Array.from({ length: deg1 }, (_, i) =>
    Array.from({ length: deg1 }, (_, j) =>
      xs.reduce((s, x) => s + x ** (i + j), 0)
    )
  )
  const Xty: number[] = Array.from({ length: deg1 }, (_, i) =>
    xs.reduce((s, x, k) => s + x ** i * ys[k], 0)
  )

  return gaussianElim(XtX, Xty)
}

// 다항식 평가: x (0-100 SVG 좌표) → 예측 y (수학 좌표계)
export function evalPoly(x: number, coeffs: number[]): number {
  const xn = x / 100
  return coeffs.reduce((s, c, i) => s + c * xn ** i, 0)
}

// MSE 계산
export function computeMSE(points: RegressionPoint[], coeffs: number[]): number {
  if (points.length === 0) return 0
  return points.reduce((s, p) => s + (p.y - evalPoly(p.x, coeffs)) ** 2, 0) / points.length
}

// 결정계수 R² 계산 (1=완벽, 0=평균과 같음, <0=평균보다 나쁨)
export function computeR2(points: RegressionPoint[], coeffs: number[]): number {
  if (points.length < 2) return 0
  const yMean = points.reduce((s, p) => s + p.y, 0) / points.length
  const ssTot = points.reduce((s, p) => s + (p.y - yMean) ** 2, 0)
  const ssRes = points.reduce((s, p) => s + (p.y - evalPoly(p.x, coeffs)) ** 2, 0)
  return ssTot < 1e-10 ? 0 : 1 - ssRes / ssTot
}

// 상태 초기화
export function initRegression(degree: number): RegressionState {
  return {
    points: [],
    degree,
    coefficients: [],
    mse: 0,
    r2: 0,
    explanation: 'SVG 캔버스를 클릭해서 데이터 포인트를 추가하거나 [프리셋]을 선택하세요.',
  }
}

// 점 추가 후 회귀 재계산
export function addRegressionPoint(state: RegressionState, x: number, y: number): RegressionState {
  const newPoints = [...state.points, { x, y }]
  return refit(newPoints, state.degree)
}

export function removeLastRegressionPoint(state: RegressionState): RegressionState {
  if (state.points.length === 0) return state
  return refit(state.points.slice(0, -1), state.degree)
}

export function changeDegree(state: RegressionState, degree: number): RegressionState {
  return refit(state.points, degree)
}

function refit(points: RegressionPoint[], degree: number): RegressionState {
  if (points.length < 2) {
    return {
      points, degree,
      coefficients: [],
      mse: 0, r2: 0,
      explanation: points.length === 0
        ? '캔버스를 클릭하거나 프리셋을 선택하세요.'
        : `점 1개: 회귀선을 그리려면 최소 2개 필요합니다.`,
    }
  }
  const coeffs = fitPolynomial(points, degree)
  const mse = computeMSE(points, coeffs)
  const r2 = computeR2(points, coeffs)
  const effectiveDegree = Math.min(degree, points.length - 1)
  return {
    points, degree,
    coefficients: coeffs,
    mse, r2,
    explanation: effectiveDegree < degree
      ? `차수 ${degree} 요청 → 점 수(${points.length})가 부족해 차수 ${effectiveDegree}로 피팅. MSE: ${mse.toFixed(2)}, R²: ${r2.toFixed(3)}`
      : `차수 ${degree} 다항식 피팅. MSE: ${mse.toFixed(2)}, R²: ${r2.toFixed(3)}. ${degree >= 4 ? '⚠️ 고차 다항식은 과적합 위험이 있습니다!' : ''}`,
  }
}

// ── 프리셋 데이터셋 ─────────────────────────────────────────────────

function noise(x: number, seed: number): number {
  // 재현 가능한 노이즈
  const s = (x * 1000 + seed) | 0
  let h = s ^ (s >>> 16)
  h = Math.imul(h, 0x45d9f3b)
  h = h ^ (h >>> 16)
  return ((h >>> 0) / 0xffffffff - 0.5) * 14
}

export function generateLinearPoints(): RegressionPoint[] {
  return Array.from({ length: 15 }, (_, i) => {
    const x = 8 + i * 6
    const y = 20 + x * 0.55 + noise(x, 1)
    return { x, y: Math.max(5, Math.min(95, y)) }
  })
}

export function generateQuadraticPoints(): RegressionPoint[] {
  return Array.from({ length: 15 }, (_, i) => {
    const x = 5 + i * 6.2
    const y = 85 - 0.028 * (x - 50) ** 2 + noise(x, 2)
    return { x, y: Math.max(5, Math.min(95, y)) }
  })
}

export function generateSinePoints(): RegressionPoint[] {
  return Array.from({ length: 18 }, (_, i) => {
    const x = 4 + i * 5.2
    const y = 50 + 30 * Math.sin((x / 100) * 2 * Math.PI * 1.5) + noise(x, 3)
    return { x, y: Math.max(5, Math.min(95, y)) }
  })
}

export function generateOutlierPoints(): RegressionPoint[] {
  const base = Array.from({ length: 12 }, (_, i) => {
    const x = 8 + i * 7.5
    const y = 25 + x * 0.5 + noise(x, 4)
    return { x, y: Math.max(5, Math.min(95, y)) }
  })
  // 이상값 추가
  return [...base, { x: 50, y: 90 }, { x: 75, y: 10 }]
}
