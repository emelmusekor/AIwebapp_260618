# MVP 로드맵

## 0단계: 문서와 구조 정비

- README, CLAUDE.md, 폴더 구조 확정
- 20개 모듈 인덱스 확정
- MVP 6개 모듈 요구사항 확정
- 링크 검증표와 대체 구현안 정리

## 1단계: 앱 골격

- Vite + React + TypeScript 프로젝트 생성
- 라우팅 구조 생성
- 모듈 카드 UI 생성
- 공통 SimulationPanel, ParameterControl, ConceptNote 컴포넌트 생성

## 2단계: 쉬운 알고리즘 모듈 구현

1. 미로 탐색
2. K-Means
3. 2D 지도학습 결정경계

이 단계에서는 외부 ML 라이브러리 없이 자체 JS/TS 구현을 우선한다.

## 3단계: 신경망·LLM 모듈 구현

1. 숫자 인식 신경망
2. 토큰·Attention
3. TensorFlow Playground형 MLP 축소판

숫자 인식은 두 가지 옵션을 병행 검토한다.

- 옵션 A: TensorFlow.js로 사전 학습 MNIST 모델 로드
- 옵션 B: 가벼운 샘플 기반 KNN/선형모델로 숫자 유사도 설명

교육용 MVP는 옵션 B를 먼저 만들고, 이후 옵션 A를 붙이는 것이 안전하다.

## 4단계: 강화학습 모듈

- GridWorld 생성
- 보상 위치, 벽, 시작점 조작
- Q-learning 반복 실행
- Q-table과 policy arrow 표시

## 5단계: 콘텐츠·평가 연결

- 각 모듈에 학습 질문 추가
- 교사용 활동지 문구 추가
- 산출물 예시 추가
- 오개념 방지 설명 추가

## 6단계: QA와 배포

- 모바일 화면 확인
- 조작 불능 상태 테스트
- 브라우저 콘솔 오류 제거
- 모듈별 수동 QA 체크리스트 작성
- 정적 배포 가능성 확인
