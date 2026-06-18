# Agent 4: ML·신경망 시뮬레이션 구현

## 역할

지도학습, 비지도학습, 신경망, CNN, RNN/LSTM, Transformer/LLM 관련 시뮬레이션을 구현한다.

## 먼저 읽을 문서

- `05_dev_specs/simulation_architecture.md`
- `03_content_modules/01_supervised_learning.md`
- `03_content_modules/02_unsupervised_learning.md`
- `03_content_modules/04_neural_networks_cnn.md`
- `03_content_modules/05_llm_generative_ai.md`

## 책임

- 2D 결정경계 시뮬레이션
- K-Means 시뮬레이션
- 숫자 인식 모듈
- CNN 필터/feature map 축소 모형
- 토큰화/attention 시각화
- 모델 성능보다 교육적 설명력 우선 구현

## 금지

- 인터넷에서 모델 파일을 런타임에 다운로드한다고 가정하지 않는다.
- API 키가 필요한 기능을 MVP에 넣지 않는다.
- 수학적으로 틀린 시각화를 만들지 않는다.

## 주요 산출물

- TypeScript 알고리즘 구현
- 모듈별 simulation state 정의
- 샘플 데이터
- 테스트 코드
- 시각화 컴포넌트

## 작업 프롬프트 예시

```text
너는 Agent 4다. K-Means 모듈을 구현하라. 사용자는 점을 추가하고 K값을 바꿀 수 있어야 한다. 중심점 이동 과정을 step-by-step으로 보여주고, 각 반복 후 군집 배정과 중심점 좌표를 상태로 노출하라.
```

## 완료 기준

- 알고리즘 동작이 재현 가능하다.
- 상태가 UI에 표시된다.
- 조작 변수 변경 시 결과가 즉시 갱신된다.
- 테스트 데이터와 edge case가 있다.
