# 20개 핵심 모듈 인덱스

## 설계 기준

- 교수님이 말한 “0–9 숫자인식 신경망 모듈”을 대표 원형으로 삼는다.
- 모든 모듈은 개념, 은유, 조작, 작동, 적용을 가진다.
- 실제 구현 난도에 따라 MVP, 확장, 연구형으로 분류한다.

## 전체 모듈 목록

| 번호 | 모듈명 | 영역 | 핵심 개념 | 구현 단계 |
|---:|---|---|---|---|
| 1 | AI가 그림을 맞히고 틀리는 이유 | AI 감각 형성 | 패턴, 오답, 학습 데이터 | 확장 |
| 2 | 바다 쓰레기 분류 AI | 데이터·편향 | 라벨, 데이터 편향, 분류 기준 | 확장 |
| 3 | 내가 AI를 가르치는 이미지 분류 | 지도학습 | train/test, 클래스, 일반화 | MVP 후보 |
| 4 | 소리·자세 인식 AI | 지도학습 확장 | 음성/센서 데이터, 포즈 | 확장 |
| 5 | 2D 결정경계 실험실 | 지도학습 | KNN, 로지스틱, SVM, 의사결정나무 | MVP |
| 6 | 회귀와 예측 모델 | 지도학습 | 선형회귀, 손실, 예측 | 확장 |
| 7 | K-Means 군집 지도 | 비지도학습 | 거리, 중심점, 반복, K값 | MVP |
| 8 | 임베딩 공간 탐험 | 비지도·표현학습 | 벡터, 유사도, 차원축소 | 확장 |
| 9 | 퍼셉트론과 OR/AND/XOR | 신경망 기초 | 가중치, 편향, 선형분리 | MVP 후보 |
| 10 | 작은 신경망 학습률 실험 | MLP | 은닉층, 손실, 역전파, 과적합 | MVP 후보 |
| 11 | 0–9 숫자 인식 신경망 | CNN/분류 | MNIST, 확률, 오답 분석 | MVP |
| 12 | CNN 필터와 특징맵 | CNN | convolution, kernel, pooling | 확장 |
| 13 | AI는 사진의 어디를 봤나 | CNN 해석 | Grad-CAM, 편향, 배경 단서 | 확장 |
| 14 | 순서를 기억하는 RNN/LSTM | 순차 모델 | hidden state, gate, 장기 의존성 | 확장 |
| 15 | 토큰화와 Attention | Transformer/LLM | token, embedding, self-attention | MVP |
| 16 | LLM 활용과 한계 | LLM·평가 | 프롬프트, 환각, 검증, RAG | 확장 |
| 17 | 생성형 AI 노이즈 제거 | Diffusion/GAN | latent, denoising, seed | 확장 |
| 18 | 미로 탈출 탐색 AI | 전통적 AI | BFS, DFS, Dijkstra, A* | MVP |
| 19 | 게임·조건·규칙 AI | 전통적 AI | Minimax, CSP, 전문가 시스템 | 확장 |
| 20 | 도구를 쓰는 에이전트와 피지컬 AI | Agentic/Physical | tool use, planning, sensor, action | 연구형 |

## MVP 6개 추천

1. 0–9 숫자 인식 신경망
2. 2D 결정경계 실험실
3. K-Means 군집 지도
4. 미로 탈출 탐색 AI
5. 강화학습 GridWorld
6. 토큰화와 Attention

강화학습 GridWorld는 20개 표에서는 18번과 20번 사이에 별도 구현 항목으로 넣어야 하므로, 실제 앱에서는 `reinforcement-gridworld`를 독립 모듈로 둔다. 기획상 20개 수를 유지하기 위해 19번의 하위 구현으로 둘 수도 있다.

## 모듈 카드 공통 필드

```ts
interface LearningModuleMeta {
  id: string;
  title: string;
  domain: 'ml' | 'neural' | 'cnn' | 'llm' | 'traditional-ai' | 'agentic-ai' | 'ethics';
  targetLevel: 'elementary' | 'middle' | 'high' | 'adult' | 'university';
  coreQuestion: string;
  conceptKeywords: string[];
  interactionType: 'draw' | 'classify' | 'drag' | 'simulate' | 'compare' | 'text' | 'grid';
  implementationLevel: 'mvp' | 'extension' | 'research';
  sourceInspiration: string[];
}
```
