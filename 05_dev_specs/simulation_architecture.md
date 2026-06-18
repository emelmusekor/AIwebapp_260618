# 시뮬레이션 아키텍처

## 원칙

- 알고리즘 로직과 UI를 분리한다.
- 모든 시뮬레이션은 step 실행이 가능해야 한다.
- 랜덤 요소는 seed를 받을 수 있게 한다.
- 상태는 직렬화 가능해야 한다.

## 권장 구조

```text
simulations/
  kmeans/
    algorithm.ts
    types.ts
    presets.ts
    explain.ts
  pathfinding/
    bfs.ts
    dfs.ts
    dijkstra.ts
    astar.ts
    types.ts
  gridworld/
    qlearning.ts
    environment.ts
    types.ts
```

## 공통 API

```ts
interface SimulationEngine<TParams, TState, TResult> {
  init(params: TParams): TState;
  step(state: TState): TState;
  run(state: TState, maxSteps: number): TResult;
  explain(state: TState): string;
}
```

## 시각화와 설명 연결

각 알고리즘은 결과만 반환하지 말고, 학습용 설명을 만들 수 있는 중간 상태를 반환해야 한다.

예:

- K-Means: 반복별 중심점, 배정 결과
- A*: open set, closed set, heuristic, 경로
- Q-learning: episode, state, action, reward, Q update
- Attention: token pair, weight, highlighted relation
