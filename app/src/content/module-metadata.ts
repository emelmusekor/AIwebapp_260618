export interface LearningModuleMeta {
  id: string
  title: string
  subtitle: string
  domain: 'traditional-ai' | 'ml' | 'neural' | 'llm' | 'rl'
  targetLevel: 'elementary' | 'middle' | 'high' | 'adult'
  coreQuestion: string
  conceptKeywords: string[]
  interactionType: 'grid' | 'draw' | 'classify' | 'drag' | 'text'
  implementationLevel: 'mvp' | 'placeholder'
  color: string
  icon: string
}

export const modules: LearningModuleMeta[] = [
  {
    id: 'pathfinding',
    title: '미로 탐색 AI',
    subtitle: 'BFS · DFS · Dijkstra · A*',
    domain: 'traditional-ai',
    targetLevel: 'middle',
    coreQuestion: 'AI는 어떻게 길을 찾을까?',
    conceptKeywords: ['BFS', 'DFS', 'A*', '휴리스틱', '최단경로'],
    interactionType: 'grid',
    implementationLevel: 'mvp',
    color: '#4361ee',
    icon: '🗺️',
  },
  {
    id: 'linear-regression',
    title: '선형 회귀',
    subtitle: '다항식 회귀 · 과적합 · MSE',
    domain: 'ml',
    targetLevel: 'middle',
    coreQuestion: '데이터로 미래를 예측하려면?',
    conceptKeywords: ['회귀', 'MSE', 'R²', '과적합', '차수'],
    interactionType: 'drag',
    implementationLevel: 'mvp',
    color: '#2a9d8f',
    icon: '📈',
  },
  {
    id: 'kmeans',
    title: 'K-Means 군집',
    subtitle: '비지도학습 · 군집화',
    domain: 'ml',
    targetLevel: 'middle',
    coreQuestion: 'AI는 어떻게 비슷한 것끼리 묶을까?',
    conceptKeywords: ['군집', '거리', '중심점', 'K값', 'Inertia'],
    interactionType: 'drag',
    implementationLevel: 'mvp',
    color: '#7209b7',
    icon: '🔵',
  },
  {
    id: 'supervised-boundary',
    title: '2D 결정경계',
    subtitle: '지도학습 · KNN',
    domain: 'ml',
    targetLevel: 'middle',
    coreQuestion: '학습 데이터가 바뀌면 경계가 어떻게 달라질까?',
    conceptKeywords: ['분류', 'KNN', '결정경계', '라벨', '과적합'],
    interactionType: 'classify',
    implementationLevel: 'mvp',
    color: '#f72585',
    icon: '📊',
  },
  {
    id: 'perceptron',
    title: '단층 퍼셉트론',
    subtitle: '신경망 기초 · 경사하강 · 선형 분리',
    domain: 'neural',
    targetLevel: 'high',
    coreQuestion: '뉴런 하나로 무엇을 배울 수 있을까?',
    conceptKeywords: ['퍼셉트론', '시그모이드', '경사하강', '결정경계', 'XOR'],
    interactionType: 'classify',
    implementationLevel: 'mvp',
    color: '#e63946',
    icon: '🧠',
  },
  {
    id: 'token-attention',
    title: '토큰화와 Attention',
    subtitle: 'LLM 원리 · Transformer',
    domain: 'llm',
    targetLevel: 'high',
    coreQuestion: 'AI는 문장을 어떻게 이해할까?',
    conceptKeywords: ['토큰', '임베딩', 'attention', '가중치', 'Transformer'],
    interactionType: 'text',
    implementationLevel: 'mvp',
    color: '#0096c7',
    icon: '💬',
  },
  {
    id: 'gridworld',
    title: '강화학습 GridWorld',
    subtitle: 'Q-learning · 보상',
    domain: 'rl',
    targetLevel: 'high',
    coreQuestion: 'AI는 어떻게 보상을 통해 배울까?',
    conceptKeywords: ['보상', 'Q-table', '정책', 'epsilon', '에이전트'],
    interactionType: 'grid',
    implementationLevel: 'mvp',
    color: '#f77f00',
    icon: '🤖',
  },
  {
    id: 'mnist-neural',
    title: '숫자 인식 신경망',
    subtitle: 'CNN · MNIST · 준비 중',
    domain: 'neural',
    targetLevel: 'high',
    coreQuestion: 'AI는 어떻게 손글씨를 읽을까?',
    conceptKeywords: ['CNN', 'MNIST', '확률', 'confidence', '오답 분석'],
    interactionType: 'draw',
    implementationLevel: 'placeholder',
    color: '#6c757d',
    icon: '✏️',
  },
]

export function getModule(id: string): LearningModuleMeta | undefined {
  return modules.find((m) => m.id === id)
}

export function getAdjacentModules(id: string): { prev?: LearningModuleMeta; next?: LearningModuleMeta } {
  const idx = modules.findIndex((m) => m.id === id)
  if (idx === -1) return {}
  return {
    prev: idx > 0 ? modules[idx - 1] : undefined,
    next: idx < modules.length - 1 ? modules[idx + 1] : undefined,
  }
}
