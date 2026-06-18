# 직접 접속 확인 링크와 대체 전략

접속 확인일: 2026-06-18

VS Code 에이전트가 인터넷 접속을 못 하는 상황을 전제로 작성했다. 앱 구현은 외부 사이트 의존이 아니라 자체 축소 구현을 우선한다.

## 핵심 링크 검증표

| 이름 | URL | 확인 상태 | 교육 용도 | 자체 대체 전략 |
|---|---|---|---|---|
| Quick, Draw! | https://quickdraw.withgoogle.com/ | 직접 열림. 한국어 포함 다국어 선택과 20초 그리기 게임 문구 확인 | 낙서 인식, 오답 관찰 | Canvas + 샘플 분류 결과 UI |
| Teachable Machine | https://teachablemachine.withgoogle.com/ | 검색/접속 확인. 동적 페이지라 텍스트 추출 제한 | 이미지·소리·포즈 분류 모델 만들기 | 2–3클래스 샘플 데이터 학습 UI |
| TensorFlow Playground | https://playground.tensorflow.org/ | 직접 열림. 학습률, 활성화, 정규화, 데이터셋 UI 확인 | 신경망, 결정경계, 과적합 | 자체 2D MLP 또는 결정경계 모형 |
| CNN Explainer | https://poloclub.github.io/cnn-explainer/ | 접속 확인. 동적 페이지라 텍스트 추출 제한 | CNN 구조, 합성곱, 풀링 | 필터 이동 Canvas/SVG 시각화 |
| Transformer Explainer | https://poloclub.github.io/transformer-explainer/ | 직접 열림. Transformer, token, attention, GPT-2 설명 확인 | LLM 구조, self-attention, next-token | 토큰 카드 + attention mock |
| OpenAI Tokenizer | https://platform.openai.com/tokenizer | 접속 확인. 동적 페이지라 텍스트 추출 제한 | 토큰화 이해 | 간단 BPE 모형 또는 토큰 샘플 테이블 |
| Code.org AI for Oceans | https://code.org/oceans | 검색/접속 확인 | 데이터, 라벨, 편향 | 바다 생물/쓰레기 카드 분류 자체 UI |
| Machine Learning for Kids | https://machinelearningforkids.co.uk/ | 검색 확인. 텍스트·그림·숫자·소리 인식과 Scratch 연계 설명 확인 | 어린이 머신러닝 프로젝트 | 분류 데이터 수집 + Scratch형 이벤트 설명 |
| micro:bit CreateAI | https://createai.microbit.org/ | 검색/접속 확인. 움직임 데이터로 모델 훈련 설명 확인 | 피지컬 AI, 움직임 인식 | 센서 데이터 카드와 LED 반응 mock |
| Entry AI 모델 학습 | https://docs.playentry.org/user/popup_model.html | 직접 검색 확인. 이미지·텍스트·소리·숫자 모델 학습 설명 확인 | 국내 초등 블록코딩 연계 | Entry형 블록 흐름도와 자체 활동지 |
| Reinforcement Learning Playground | https://simulations4all.com/simulations/reinforcement-learning-playground | 검색 확인. Q-Learning, SARSA, Value Iteration, Q-table, policy arrow 설명 확인 | 강화학습 | 자체 GridWorld Q-learning |
| ML Algorithm Visualizer | https://simulations4all.com/simulations/ml-algorithm-visualizer | 검색 확인. 회귀, KNN, K-Means, Decision Tree, SVM 설명 확인 | 알고리즘 비교 | 자체 2D 점·경계 비교 |
| NotebookLM | https://notebooklm.google/ | 검색 확인. 소스 분석, 복잡한 내용 정리 설명 확인 | 성인 업무 적용, 문서 기반 AI | 업로드 문서 기반 Q&A 흐름 설명 mock |
| Data Commons | https://datacommons.org/ | 검색 확인. 자연어 질문으로 공개 데이터 탐색 설명 확인 | 공공 데이터 기반 의사결정 | 정적 공공 데이터 샘플 대시보드 |
| Survival of the Best Fit | https://www.survivalofthebestfit.com/ | 검색 확인. 채용 AI 편향 교육 게임 설명 확인 | 편향·윤리 | 자체 채용 데이터 편향 카드 게임 |
| AISpace2 | https://aispace2.github.io/AISpace2/ | 직접 열림. Search, CSP, Planning, Bayesian Network notebooks 확인 | 전통적 AI | 탐색·CSP·계획 핵심 자체 구현 |

## 구현 판단

- 외부 링크는 “참고 자료”로 제공한다.
- 핵심 학습 경험은 자체 구현한다.
- 동적 페이지는 접속되더라도 크롤링 텍스트가 적을 수 있으므로, 앱에 의존하지 않는다.
- 초등 수업에서는 카메라·마이크 실시간 입력보다 샘플 데이터와 교사 통제형 활동을 우선한다.

## 링크가 죽었을 때의 대체 순서

1. 자체 축소 모형 사용
2. 스크린샷 기반 설명자료 사용
3. 활동지 기반 언플러그드 활동 사용
4. 교사용 참고 링크만 교체
