import { type PerceptronPoint, type PerceptronState, type PresetName } from './types'

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z))
}

function predict(xn: number, yn: number, w: [number, number], b: number): number {
  return sigmoid(w[0] * xn + w[1] * yn + b)
}

export function initPerceptron(lr = 0.5): PerceptronState {
  return {
    points: [],
    weights: [0.5, 0.5],
    bias: 0,
    learningRate: lr,
    epoch: 0,
    loss: 0,
    accuracy: 0,
    lossHistory: [],
    explanation: '캔버스에 클릭해서 두 클래스(파란 원 / 빨간 X)를 추가하세요.',
  }
}

export function addPerceptronPoint(state: PerceptronState, x: number, y: number, label: 0 | 1): PerceptronState {
  const newPoints = [...state.points, { x, y, label }]
  const c0 = newPoints.filter((p) => p.label === 0).length
  const c1 = newPoints.filter((p) => p.label === 1).length
  return {
    ...state,
    points: newPoints,
    explanation: `포인트 ${newPoints.length}개 (클래스 0: ${c0}개, 클래스 1: ${c1}개). [학습 시작]을 눌러보세요.`,
  }
}

export function removeLastPoint(state: PerceptronState): PerceptronState {
  if (state.points.length === 0) return state
  return { ...state, points: state.points.slice(0, -1) }
}

export function resetWeights(state: PerceptronState): PerceptronState {
  return { ...state, weights: [0.5, 0.5], bias: 0, epoch: 0, loss: 0, accuracy: 0, lossHistory: [] }
}

export function setLearningRate(state: PerceptronState, lr: number): PerceptronState {
  return { ...state, learningRate: lr }
}

export function trainStep(state: PerceptronState): PerceptronState {
  if (state.points.length === 0) return state

  let dw1 = 0, dw2 = 0, db = 0, totalLoss = 0, correct = 0
  const n = state.points.length

  for (const p of state.points) {
    const xn = p.x / 100
    const yn = p.y / 100
    const pred = predict(xn, yn, state.weights, state.bias)
    const err = pred - p.label
    dw1 += err * xn
    dw2 += err * yn
    db += err
    totalLoss += -p.label * Math.log(pred + 1e-7) - (1 - p.label) * Math.log(1 - pred + 1e-7)
    if ((pred >= 0.5) === (p.label === 1)) correct++
  }

  const lr = state.learningRate
  const newW1 = state.weights[0] - lr * dw1 / n
  const newW2 = state.weights[1] - lr * dw2 / n
  const newB = state.bias - lr * db / n
  const avgLoss = totalLoss / n
  const acc = correct / n

  return {
    ...state,
    weights: [newW1, newW2],
    bias: newB,
    epoch: state.epoch + 1,
    loss: avgLoss,
    accuracy: acc,
    lossHistory: [...state.lossHistory.slice(-79), avgLoss],
    explanation: `에포크 ${state.epoch + 1}: 손실=${avgLoss.toFixed(3)}, 정확도=${(acc * 100).toFixed(0)}%${acc >= 1 ? ' — 완벽 분류!' : acc < 0.6 ? ' — 분리 어려운 데이터입니다.' : ''}`,
  }
}

export function trainNSteps(state: PerceptronState, steps: number): PerceptronState {
  let s = state
  for (let i = 0; i < steps; i++) s = trainStep(s)
  return s
}

// ── 프리셋 데이터 ──────────────────────────────────────────────────────

const PRESET_LINEAR: PerceptronPoint[] = [
  // 클래스 0: 좌상단 영역
  { x: 18, y: 22, label: 0 }, { x: 25, y: 30, label: 0 }, { x: 32, y: 18, label: 0 },
  { x: 15, y: 42, label: 0 }, { x: 38, y: 35, label: 0 }, { x: 22, y: 55, label: 0 },
  { x: 10, y: 62, label: 0 }, { x: 42, y: 48, label: 0 },
  // 클래스 1: 우하단 영역
  { x: 70, y: 55, label: 1 }, { x: 78, y: 68, label: 1 }, { x: 62, y: 72, label: 1 },
  { x: 85, y: 45, label: 1 }, { x: 72, y: 80, label: 1 }, { x: 58, y: 62, label: 1 },
  { x: 88, y: 58, label: 1 }, { x: 65, y: 85, label: 1 },
]

const PRESET_HARD: PerceptronPoint[] = [
  // 클래스 0 (경계 근처, 분리 어려움)
  { x: 25, y: 30, label: 0 }, { x: 35, y: 40, label: 0 }, { x: 20, y: 50, label: 0 },
  { x: 40, y: 55, label: 0 }, { x: 30, y: 65, label: 0 }, { x: 45, y: 35, label: 0 },
  { x: 55, y: 42, label: 0 },
  // 클래스 1 (경계 근처)
  { x: 50, y: 50, label: 1 }, { x: 60, y: 40, label: 1 }, { x: 65, y: 55, label: 1 },
  { x: 55, y: 65, label: 1 }, { x: 70, y: 45, label: 1 }, { x: 42, y: 70, label: 1 },
  { x: 48, y: 38, label: 1 },
]

// XOR: 단층 퍼셉트론으로 선형 분리 불가!
const PRESET_XOR: PerceptronPoint[] = [
  { x: 22, y: 25, label: 0 }, { x: 28, y: 32, label: 0 }, { x: 18, y: 30, label: 0 },
  { x: 72, y: 72, label: 0 }, { x: 78, y: 68, label: 0 }, { x: 68, y: 78, label: 0 },
  { x: 22, y: 72, label: 1 }, { x: 28, y: 68, label: 1 }, { x: 18, y: 78, label: 1 },
  { x: 72, y: 25, label: 1 }, { x: 78, y: 32, label: 1 }, { x: 68, y: 22, label: 1 },
]

export function loadPreset(name: PresetName, lr = 0.5): PerceptronState {
  const pointsMap: Record<PresetName, PerceptronPoint[]> = {
    linear: PRESET_LINEAR,
    hard: PRESET_HARD,
    xor: PRESET_XOR,
  }
  const hintMap: Record<PresetName, string> = {
    linear: '선형 분리 가능 데이터 — 잘 수렴할 것입니다.',
    hard: '경계 근처에 겹치는 데이터 — 완벽 분리가 어렵습니다.',
    xor: 'XOR 패턴 — 단층 퍼셉트론으로는 선형 분리 불가! 손실이 수렴하지 않습니다.',
  }
  return {
    points: pointsMap[name],
    weights: [0.5, 0.5],
    bias: 0,
    learningRate: lr,
    epoch: 0,
    loss: 0,
    accuracy: 0,
    lossHistory: [],
    explanation: hintMap[name],
  }
}
