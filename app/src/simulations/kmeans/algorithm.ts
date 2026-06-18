import { type KMeansParams, type KMeansState, type Centroid, type ClusteredPoint, type Point } from './types'

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return ((s >>> 0) / 0x100000000)
  }
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function assignClusters(points: ClusteredPoint[], centroids: Centroid[]): ClusteredPoint[] {
  return points.map((p) => {
    let nearest = 0
    let minDist = Infinity
    for (let i = 0; i < centroids.length; i++) {
      const d = distance(p, centroids[i])
      if (d < minDist) { minDist = d; nearest = i }
    }
    return { ...p, clusterId: nearest }
  })
}

function updateCentroids(points: ClusteredPoint[], k: number, prev: Centroid[]): Centroid[] {
  return Array.from({ length: k }, (_, id) => {
    const cluster = points.filter((p) => p.clusterId === id)
    if (cluster.length === 0) return prev[id]
    const x = cluster.reduce((s, p) => s + p.x, 0) / cluster.length
    const y = cluster.reduce((s, p) => s + p.y, 0) / cluster.length
    return { id, x, y }
  })
}

export function initKMeans(params: KMeansParams): KMeansState {
  const rng = seededRandom(params.seed ?? 42)
  const points: ClusteredPoint[] = params.points.map((p) => ({ ...p, clusterId: 0 }))
  const shuffled = [...points].sort(() => rng() - 0.5)
  const centroids: Centroid[] = Array.from({ length: params.k }, (_, id) => {
    const src = shuffled[id % shuffled.length]
    return { id, x: src.x + (rng() - 0.5) * 1, y: src.y + (rng() - 0.5) * 1 }
  })
  return {
    points: assignClusters(points, centroids),
    centroids,
    k: params.k,
    iteration: 0,
    converged: false,
    explanation: `K=${params.k}로 초기화. 중심점을 데이터 포인트 근처에 배치했습니다. [한 스텝]을 눌러 반복을 시작하세요.`,
  }
}

export function kmeansStep(state: KMeansState): KMeansState {
  if (state.converged) return state
  const newCentroids = updateCentroids(state.points, state.k, state.centroids)
  const newPoints = assignClusters(state.points, newCentroids)
  const moved = newCentroids.some((c, i) => distance(c, state.centroids[i]) > 0.01)
  return {
    points: newPoints,
    centroids: newCentroids,
    k: state.k,
    iteration: state.iteration + 1,
    converged: !moved,
    explanation: moved
      ? `반복 ${state.iteration + 1}: 중심점이 이동했습니다. 각 점을 가장 가까운 중심점에 재배정합니다.`
      : `수렴 완료! ${state.iteration + 1}회 반복 후 중심점이 더 이상 움직이지 않습니다.`,
  }
}

export function computeInertia(state: KMeansState): number {
  if (!state.centroids.length) return 0
  return state.points.reduce((sum, p) => {
    const c = state.centroids[p.clusterId]
    if (!c) return sum
    return sum + (p.x - c.x) ** 2 + (p.y - c.y) ** 2
  }, 0)
}

// ── Elbow Method ───────────────────────────────────────────────────────

function runToConvergence(points: Point[], k: number): KMeansState {
  let state = initKMeans({ k, points, maxIterations: 100, seed: 42 })
  let iter = 0
  while (!state.converged && iter < 80) {
    state = kmeansStep(state)
    iter++
  }
  return state
}

export function computeElbow(points: Point[], maxK = 8): Array<{ k: number; inertia: number }> {
  return Array.from({ length: maxK }, (_, i) => {
    const k = i + 1
    if (points.length < k) return { k, inertia: 0 }
    return { k, inertia: computeInertia(runToConvergence(points, k)) }
  })
}

// ── 프리셋 데이터 생성 ───────────────────────────────────────────────

export function generatePresetPoints(): Point[] {
  const clusters = [{ cx: 25, cy: 25 }, { cx: 72, cy: 30 }, { cx: 48, cy: 73 }]
  let s = 137
  const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return ((s >>> 0) / 0x100000000) }
  return clusters.flatMap(({ cx, cy }) =>
    Array.from({ length: 14 }, () => ({
      x: Math.max(5, Math.min(95, cx + (rand() - 0.5) * 28)),
      y: Math.max(5, Math.min(95, cy + (rand() - 0.5) * 28)),
    }))
  )
}

// 링/동심원 구조 - K-Means의 한계를 보여주는 패턴
export function generateRingPoints(): Point[] {
  let s = 777
  const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return ((s >>> 0) / 0x100000000) }
  const inner: Point[] = Array.from({ length: 10 }, () => ({
    x: Math.max(5, Math.min(95, 50 + (rng() - 0.5) * 18)),
    y: Math.max(5, Math.min(95, 50 + (rng() - 0.5) * 18)),
  }))
  const outer: Point[] = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 2 * Math.PI
    const r = 32 + (rng() - 0.5) * 7
    return {
      x: Math.max(5, Math.min(95, 50 + Math.cos(angle) * r)),
      y: Math.max(5, Math.min(95, 50 + Math.sin(angle) * r)),
    }
  })
  return [...inner, ...outer]
}

// 균일 분포 - K-Means가 임의적 경계를 만드는 패턴
export function generateUniformPoints(): Point[] {
  let s = 333
  const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return ((s >>> 0) / 0x100000000) }
  return Array.from({ length: 40 }, () => ({ x: 5 + rng() * 90, y: 5 + rng() * 90 }))
}
