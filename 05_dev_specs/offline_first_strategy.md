# 오프라인 우선 전략

## 전제

VS Code 에이전트 또는 일부 개발 환경은 인터넷 접속이 안 될 수 있다.

## 대응 원칙

1. 외부 사이트는 참고자료로만 둔다.
2. 핵심 학습 기능은 자체 구현한다.
3. 모델 파일은 사전에 `public/models`에 배치한다.
4. 외부 API 키가 필요한 기능은 MVP에서 제외한다.
5. 링크는 `07_link_research/verified_links.md`에 접속 확인 결과를 기록한다.

## 대체 방식

| 외부 도구 | 자체 대체 |
|---|---|
| Quick, Draw! | Canvas 낙서 + 단순 패턴 분류 또는 예시 기반 설명 |
| Teachable Machine | 2–3클래스 이미지 샘플 분류 UI |
| TensorFlow Playground | 2D 데이터 + 작은 MLP 또는 결정경계 모형 |
| CNN Explainer | 필터 합성곱 축소 애니메이션 |
| Transformer Explainer | 토큰 카드 + attention mock/소형 계산 |
| RL Playground | 직접 구현 GridWorld Q-learning |
| AIspace | 탐색·CSP 핵심 알고리즘 직접 구현 |
