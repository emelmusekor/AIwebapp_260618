# 기술 스택 제안

## 기본

- Vite
- React
- TypeScript
- CSS Modules 또는 Tailwind CSS
- Vitest
- Playwright

## 시각화

- SVG: 결정경계, 그래프, attention 연결선
- Canvas: 숫자 그리기, 이미지 필터
- D3: 필요한 경우 스케일과 force layout 일부

## ML 실행

| 목적 | 권장 |
|---|---|
| 간단 알고리즘 | 순수 TypeScript |
| 숫자 인식 | TensorFlow.js 또는 ONNX Runtime Web |
| 임베딩 데모 | 사전 계산 JSON |
| LLM 데모 | 실제 LLM 호출 없이 토큰·attention 모형 |

## 배포

- 정적 사이트 배포 가능 구조를 유지한다.
- 외부 API 없이도 핵심 모듈이 작동해야 한다.
