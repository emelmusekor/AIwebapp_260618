export interface Point {
  x: number
  y: number
}

export interface ClusteredPoint extends Point {
  clusterId: number
}

export interface Centroid extends Point {
  id: number
}

export interface KMeansParams {
  k: number
  points: Point[]
  maxIterations: number
  seed?: number
}

export interface KMeansState {
  points: ClusteredPoint[]
  centroids: Centroid[]
  k: number
  iteration: number
  converged: boolean
  explanation: string
}
