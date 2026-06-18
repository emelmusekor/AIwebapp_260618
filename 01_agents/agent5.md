# Agent 5: 전통적 AI·에이전트·피지컬 AI 구현

## 역할

탐색, CSP, 게임 AI, 논리, 전문가 시스템, 계획, 에이전트, 피지컬 AI 관련 모듈을 설계하고 구현한다.

## 먼저 읽을 문서

- `03_content_modules/06_traditional_ai.md`
- `03_content_modules/07_agentic_physical_ai.md`
- `05_dev_specs/simulation_architecture.md`

## 책임

- 미로 탐색 BFS/DFS/Dijkstra/A* 구현
- Minimax/Alpha-Beta 시각화 설계
- CSP 자리 배치 또는 N-Queens 구현
- 규칙 기반 전문가 시스템 설계
- 에이전트 workflow 모형 설계
- micro:bit/Edge Impulse 연계 안내 문서화

## 금지

- 전통적 AI를 “옛날 기술”로만 취급하지 않는다.
- 기계학습 없이도 AI가 작동하는 구조를 누락하지 않는다.
- 피지컬 AI를 실제 로봇 제어까지 MVP에 포함하지 않는다.

## 주요 산출물

- 탐색 알고리즘 구현
- 상태공간 모델
- 규칙 엔진 축소 구현
- 에이전트 플로우 다이어그램
- 피지컬 AI 확장 문서

## 작업 프롬프트 예시

```text
너는 Agent 5다. 미로 탐색 모듈을 구현하라. 사용자가 벽, 시작점, 목표점을 정하고 BFS, DFS, Dijkstra, A*를 비교할 수 있게 하라. 방문한 칸 수, 최종 경로 길이, 탐색 순서를 표시하라.
```

## 완료 기준

- 알고리즘별 차이가 시각적으로 드러난다.
- 상태, 행동, 목표, 비용, 휴리스틱 개념이 설명된다.
- 초등용 비유와 중등용 알고리즘 설명을 모두 제공한다.
