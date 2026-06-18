import { type Label, type LabeledPoint, type BoundaryCell, type SupervisedState } from './types'

function distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function knnPredict(point: { x: number; y: number }, data: LabeledPoint[], k: number): Label {
  if (data.length === 0) return 0
  const sorted = [...data].sort((a, b) => distance(point, a) - distance(point, b))
  const neighbors = sorted.slice(0, Math.min(k, sorted.length))
  const counts: Record<number, number> = {}
  for (const n of neighbors) counts[n.label] = (counts[n.label] ?? 0) + 1
  return Number(Object.keys(counts).reduce((a, b) => (counts[Number(a)] > counts[Number(b)] ? a : b))) as Label
}

export function computeBoundary(points: LabeledPoint[], k: number, resolution: number): BoundaryCell[] {
  if (points.length < k) return []
  const cells: BoundaryCell[] = []
  for (let xi = 0; xi < resolution; xi++) {
    for (let yi = 0; yi < resolution; yi++) {
      const x = ((xi + 0.5) / resolution) * 100
      const y = ((yi + 0.5) / resolution) * 100
      cells.push({ x, y, predictedLabel: knnPredict({ x, y }, points, k) })
    }
  }
  return cells
}

export function initSupervised(k: number, resolution: number): SupervisedState {
  return {
    points: [],
    k,
    boundaryGrid: [],
    resolution,
    explanation: '캔버스를 클릭해서 학습 데이터를 추가하세요. 클래스 A(파랑) B(빨강) C(초록) 중 선택 후 점을 찍으면 KNN 결정경계가 즉시 그려집니다.',
  }
}

export function addPoint(state: SupervisedState, x: number, y: number, label: Label): SupervisedState {
  const newPoints = [...state.points, { x, y, label }]
  const boundary = computeBoundary(newPoints, state.k, state.resolution)
  const needMore = newPoints.length < state.k
  return {
    ...state,
    points: newPoints,
    boundaryGrid: boundary,
    explanation: needMore
      ? `${newPoints.length}개 점 추가됨. K=${state.k}이므로 최소 ${state.k}개 필요 (${state.k - newPoints.length}개 더 필요).`
      : `점 추가 (${x.toFixed(1)}, ${y.toFixed(1)}) 클래스 ${['A','B','C'][label]}. KNN k=${state.k}으로 경계 재계산. 총 ${newPoints.length}개.`,
  }
}

export function removeLastPoint(state: SupervisedState): SupervisedState {
  if (state.points.length === 0) return state
  const newPoints = state.points.slice(0, -1)
  const boundary = computeBoundary(newPoints, state.k, state.resolution)
  return {
    ...state,
    points: newPoints,
    boundaryGrid: boundary,
    explanation: newPoints.length === 0
      ? '모든 점을 삭제했습니다. 캔버스를 클릭하거나 프리셋을 불러오세요.'
      : `마지막 점 삭제. 데이터 ${newPoints.length}개 남음.`,
  }
}

export function updateK(state: SupervisedState, k: number): SupervisedState {
  const boundary = computeBoundary(state.points, k, state.resolution)
  return {
    ...state,
    k,
    boundaryGrid: boundary,
    explanation: `K=${k}으로 변경. ${state.points.length < k ? `경계를 그리려면 ${k}개 필요 (현재 ${state.points.length}개).` : '이웃 수가 많을수록 경계가 부드러워집니다.'}`,
  }
}

// ── 프리셋 데이터셋 ─────────────────────────────────────────────────

const PRESET_LINEAR: LabeledPoint[] = [
  { x: 15, y: 20, label: 0 }, { x: 22, y: 35, label: 0 }, { x: 18, y: 55, label: 0 },
  { x: 30, y: 18, label: 0 }, { x: 10, y: 42, label: 0 }, { x: 35, y: 48, label: 0 },
  { x: 20, y: 70, label: 0 }, { x: 28, y: 78, label: 0 }, { x: 12, y: 82, label: 0 },
  { x: 70, y: 25, label: 1 }, { x: 80, y: 40, label: 1 }, { x: 65, y: 55, label: 1 },
  { x: 75, y: 65, label: 1 }, { x: 85, y: 75, label: 1 }, { x: 62, y: 35, label: 1 },
  { x: 88, y: 22, label: 1 }, { x: 72, y: 82, label: 1 }, { x: 90, y: 55, label: 1 },
]

const PRESET_XOR: LabeledPoint[] = [
  // 클래스 A: 오른쪽 위 + 왼쪽 아래
  { x: 68, y: 18, label: 0 }, { x: 78, y: 28, label: 0 }, { x: 82, y: 15, label: 0 },
  { x: 72, y: 38, label: 0 }, { x: 88, y: 32, label: 0 },
  { x: 18, y: 70, label: 0 }, { x: 28, y: 82, label: 0 }, { x: 14, y: 85, label: 0 },
  { x: 35, y: 75, label: 0 }, { x: 22, y: 62, label: 0 },
  // 클래스 B: 왼쪽 위 + 오른쪽 아래
  { x: 18, y: 18, label: 1 }, { x: 28, y: 30, label: 1 }, { x: 14, y: 35, label: 1 },
  { x: 25, y: 15, label: 1 }, { x: 35, y: 38, label: 1 },
  { x: 70, y: 68, label: 1 }, { x: 82, y: 78, label: 1 }, { x: 65, y: 85, label: 1 },
  { x: 85, y: 65, label: 1 }, { x: 75, y: 78, label: 1 },
]

const PRESET_THREE: LabeledPoint[] = [
  { x: 20, y: 20, label: 0 }, { x: 28, y: 25, label: 0 }, { x: 15, y: 30, label: 0 },
  { x: 25, y: 35, label: 0 }, { x: 32, y: 18, label: 0 }, { x: 12, y: 15, label: 0 },
  { x: 75, y: 18, label: 1 }, { x: 82, y: 28, label: 1 }, { x: 70, y: 32, label: 1 },
  { x: 85, y: 18, label: 1 }, { x: 78, y: 38, label: 1 }, { x: 88, y: 12, label: 1 },
  { x: 48, y: 75, label: 2 }, { x: 55, y: 82, label: 2 }, { x: 42, y: 85, label: 2 },
  { x: 52, y: 68, label: 2 }, { x: 58, y: 78, label: 2 }, { x: 38, y: 78, label: 2 },
]

export type PresetName = 'linear' | 'xor' | 'three'

export function loadPreset(name: PresetName, k: number, resolution: number): SupervisedState {
  const presets: Record<PresetName, LabeledPoint[]> = {
    linear: PRESET_LINEAR,
    xor: PRESET_XOR,
    three: PRESET_THREE,
  }
  const names: Record<PresetName, string> = {
    linear: '선형 분리',
    xor: 'XOR 패턴',
    three: '세 군집',
  }
  const points = presets[name]
  const boundary = computeBoundary(points, k, resolution)
  return {
    points,
    k,
    boundaryGrid: boundary,
    resolution,
    explanation: `프리셋 "${names[name]}" 로드. ${points.length}개 데이터 포인트. K=${k}으로 결정경계를 계산합니다.`,
  }
}
