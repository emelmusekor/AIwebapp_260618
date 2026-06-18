# 원천 자료 통합 보존본

이 문서는 기획 누락을 막기 위해 채팅 원문과 HWPX 추출 텍스트를 그대로 이어 붙인 보존 문서다. 구조화 문서는 02_planning, 03_content_modules, 05_dev_specs를 우선 본다.

# 카카오톡 기획 대화 원문

출처: 사용자 제공 채팅 내용

[한선관 교수님] [오후 5:35] 기본 컨셉  
기존 인공지능 시뮬레이션 모방

[한선관 교수님] [오후 5:35] 그것의 은유적 표현과 학습내용  
실제 적용 쪽으로 응용

[한선관 교수님] [오후 5:36] 0ㅡ9의 숫자인식 신경망 모듈  
이것의 학습과정으로 공부  
숫자인식의 응용 연계

[한선관 교수님] [오후 5:37] 이런식으로 20개 정도 만들기

[한선관 교수님] [오후 5:37] 머신러닝  
지도학습  
비지도학습  
강화학습  
신경망  
cnn인식  
LLM언어  
등등

유형별로

[도용] [오후 7:57] 엄 실제로 작동해야되는거면 좀 빡센데

[도용] [오후 7:57] 해보겠습니다

[한선관 교수님] [오후 10:04] 파일: 머신러닝 알고리즘의 교육과정과 실습사이트.hwpx

[한선관 교수님] [오후 10:04] 파일: 초등학생을 위한 인공지능 이해 사이트.hwpx

[한선관 교수님] [오후 10:04] 파일: 일반 성인을 위한 인공지능 교육.hwpx

[한선관 교수님] [오후 10:38] 파일: 전통적인 인공지능 이해 실습 사이트.hwpx

[한선관 교수님] [오후 11:03] 파일: 신경망에서 딥러닝 에이전트 피지컬까지.hwpx

## 기획 해석

교수님 요청의 핵심은 다음이다.

1. 기존 AI 시뮬레이션을 단순 링크로 소개하지 말고, 그 작동 방식을 은유적으로 표현한 자체 학습 모듈로 재구성한다.
2. 숫자 인식 신경망처럼 실제 작동하는 조작형 모듈을 만들고, 학습 과정 자체가 교육 내용이 되게 한다.
3. 각 모듈은 개념 이해에서 끝나지 않고 실제 적용 사례로 확장한다.
4. 지도학습, 비지도학습, 강화학습, 신경망, CNN, LLM 등 AI 유형별로 약 20개 모듈을 구성한다.
5. 개발 난도는 높다. 따라서 MVP에서는 모든 모델을 실제 학습시키기보다, 일부는 브라우저 기반 시뮬레이션, 일부는 사전 계산/샘플 데이터, 일부는 외부 도구 연계형으로 나눈다.



---


# 원본 파일: 머신러닝 알고리즘의 교육과정과 실습사이트.extracted.md


# 머신러닝 알고리즘의 교육과정과 실습사이트

인공지능 알고리즘의 교육과정

좋아요. 아래는 “초등학생부터 대학생까지, 인공지능 알고리즘을 직접 만지고 조작하며 이해하도록 설계한 체험형 AI 교육과정”입니다. 핵심은 사이트를 나열하는 것이 아니라, 학습 방식 → 알고리즘 → 시각화 실습 → 응용 프로젝트로 자연스럽게 올라가게 만드는 것입니다.

0. 먼저 큰 분류: AI 알고리즘은 이렇게 나누면 이해하기 쉽습니다

인공지능 알고리즘은 한 줄로 나누면 헷갈립니다. 지도학습·비지도학습·강화학습은 “어떻게 배우는가”에 대한 구분이고, 신경망·CNN·RNN·Transformer·LLM은 “어떤 구조로 배우는가”에 대한 구분입니다.

| 구분 | 쉬운 설명 | 대표 알고리즘·구조 | 학생이 직접 해볼 질문 |
| --- | --- | --- | --- |
| 지도학습 | 정답이 붙은 예시를 보고 새 데이터를 맞히는 학습 | 분류, 회귀, KNN, 의사결정나무, SVM, 로지스틱 회귀 | “고양이/강아지 사진을 보여주면 구분할 수 있을까?” |
| 비지도학습 | 정답 없이 데이터 속 무리나 구조를 찾는 학습 | K-Means, DBSCAN, PCA, t-SNE, 임베딩, 오토인코더 | “비슷한 친구끼리 자동으로 묶을 수 있을까?” |
| 강화학습 | 행동을 해보고 보상을 받으며 더 나은 전략을 찾는 학습 | Q-Learning, SARSA, Value Iteration, Policy Gradient | “미로에서 보상을 받으며 길을 배울 수 있을까?” |
| 신경망 기본 | 여러 층의 계산을 통해 복잡한 패턴을 배우는 구조 | 퍼셉트론, MLP, 역전파, 활성화 함수 | “뉴런 수와 층을 바꾸면 결정경계가 어떻게 바뀔까?” |
| CNN | 이미지처럼 공간 구조가 있는 데이터를 잘 보는 신경망 | 합성곱, 필터, 특징맵, 풀링, Grad-CAM | “AI는 사진의 어디를 보고 판단할까?” |
| RNN/LSTM | 순서가 있는 데이터를 기억하며 처리하는 신경망 | RNN, LSTM, GRU, hidden state | “앞 단어가 뒤 단어 판단에 영향을 줄까?” |
| Transformer/LLM | attention으로 문맥을 보고 다음 토큰을 예측하는 언어 모델 구조 | Self-Attention, Token, Embedding, GPT, BERT | “ChatGPT류 모델은 문장을 어떻게 쪼개고 다음 단어를 고를까?” |
| 해석·윤리·평가 | AI가 왜 맞고 틀렸는지, 공정한지 살피는 영역 | 혼동행렬, 편향, 설명가능 AI, fairness | “AI가 틀렸을 때 누구에게 피해가 갈까?” |

1. 전체 교육과정 로드맵

AI 체험형 교육과정: 초등 → 대학

| 단계 | 대상 | 핵심 목표 | 중심 개념 | 대표 실습 사이트 | 최종 산출물 |
| --- | --- | --- | --- | --- | --- |
| 1단계: AI와 데이터 감각 만들기 | 초3–초4 | AI가 “마법”이 아니라 데이터를 보고 맞히는 시스템임을 체험 | 데이터, 예시, 예측, 오답 | Quick, Draw!, AutoDraw, AI for Oceans | AI 관찰 일지, AI가 틀린 사례 모음 |
| 2단계: 내가 직접 AI 가르치기 | 초5–중1 | 라벨이 붙은 데이터를 모아 지도학습 체험 | 라벨, 학습 데이터, 테스트 데이터, 편향 | Teachable Machine, Machine Learning for Kids, Scratch | 이미지·소리·자세 인식 AI 프로젝트 |
| 3단계: 지도학습 알고리즘 비교 | 중1–고1 | 알고리즘마다 판단 경계가 달라짐을 이해 | 분류, 회귀, 결정경계, 과적합 | ML Algorithm Visualizer, Decision Boundary Playground, TensorFlow Playground | 알고리즘 비교 보고서 |
| 4단계: 비지도학습과 데이터 구조 찾기 | 중2–고2 | 정답 없이 데이터가 스스로 묶이는 원리 이해 | 군집, 중심점, 거리, 차원축소, 임베딩 | K-Means Visualizer, Embedding Projector, Clustering Studio | 데이터 군집 분석 포스터 |
| 5단계: 신경망 원리 조작하기 | 고1–대1 | 뉴런, 층, 학습률, 활성화 함수, 역전파 감각 형성 | MLP, 손실, 학습률, 활성화 함수, 일반화 | TensorFlow Playground, Neural Network Explorer, ML Visualizer | 신경망 실험 노트 |
| 6단계: 딥러닝 구조별 이해 | 고2–대2 | CNN, RNN, LSTM, 강화학습을 구조별로 비교 | CNN, RNN, LSTM, RL, Q-table | CNN Explainer, RNN Interactive Playground, LSTM Gates, RL Playground | 이미지 인식·시퀀스·미로 AI 프로젝트 |
| 7단계: LLM과 생성형 AI 이해 | 고3–대학 | 토큰, attention, next-token prediction, 프롬프트와 한계 이해 | Tokenization, Self-Attention, Transformer, LLM | Transformer Explainer, OpenAI Tokenizer, LLM Visualization, BertViz, LIT | LLM 분석 보고서, 미니 챗봇 설계 |
| 8단계: 응용·윤리·설명가능 AI | 고등–대학 | AI를 실제 문제에 적용하고 오류·편향·책임을 분석 | 평가, 공정성, 설명가능성, 인간중심 AI | What-If Tool, LIT, PAIR Guidebook, Google ML Crash Course | AI 서비스 기획서 또는 캡스톤 |

2. 단계별 상세 교육과정

1단계. 초등 저학년: “AI는 어떻게 맞히고 틀릴까?”

목표

초등 저학년에게는 알고리즘 이름보다 AI가 예시를 보고 추측한다는 감각이 먼저입니다. 이 단계에서는 “AI도 틀린다”, “AI가 많이 봐야 잘한다”, “데이터가 이상하면 판단도 이상해진다”를 경험하게 합니다.

| 실습 사이트 | 무엇을 배우나 | 학습 방법 | 응용 예시 |
| --- | --- | --- | --- |
| Quick, Draw! | 내가 그린 낙서를 신경망이 맞히는 게임입니다. 학생은 “AI가 어떤 선을 보고 맞히는지” 관찰할 수 있습니다. (Quick, Draw!) | 같은 단어를 여러 방식으로 그려보고, AI가 빨리 맞히는 그림과 못 맞히는 그림을 비교합니다. | “AI가 잘 아는 그림 사전 만들기”, “AI가 헷갈리는 그림 찾기” |
| AutoDraw | 사용자의 대략적인 그림을 AI가 인식해 더 정돈된 그림으로 제안합니다. (AutoDraw) | 일부러 이상하게 그려보고, AI가 어떤 후보를 제안하는지 기록합니다. | AI 포스터 만들기, 아이콘 디자인 |
| Code.org AI for Oceans | 학생이 바다 생물과 쓰레기를 분류하며 학습 데이터와 편향을 경험합니다. Code.org는 초등 AI 교육과정과 예측 데이터 모델 활동을 제공합니다. (Code.org) | “물고기/물고기 아님”으로 시작한 뒤, 데이터 기준을 바꾸면 AI 판단이 어떻게 달라지는지 확인합니다. | “바다 쓰레기 분류 AI”, “학교 쓰레기 분리수거 AI” |

수업 운영

처음에는 “AI가 왜 맞혔을까?”보다 **“AI가 왜 틀렸을까?”**를 묻는 것이 좋습니다. 아이들은 오답을 통해 데이터의 중요성을 훨씬 잘 이해합니다.

활동 예시

“강아지를 그렸는데 AI가 고양이라고 했다. 왜 그랬을까?”

2단계. 초등 고학년–중1: “내가 직접 AI를 훈련시킨다”

목표

이 단계에서는 지도학습을 체험합니다. 정답이 붙은 예시, 즉 라벨 데이터를 모으고, 모델을 학습시키고, 새로운 예시로 테스트합니다.

| 실습 사이트 | 무엇을 배우나 | 학습 방법 | 응용 예시 |
| --- | --- | --- | --- |
| Teachable Machine | 이미지, 소리, 포즈 데이터를 직접 모아 모델을 훈련할 수 있는 노코드 도구입니다. 사이트 설명처럼 이미지·소리·자세를 인식하는 모델을 빠르게 만들 수 있습니다. (Teachable Machine) | 클래스 2–3개를 만들고 각 클래스별 데이터를 30개 이상 모읍니다. 배경, 조명, 거리, 사람을 바꿔가며 정확도가 변하는지 봅니다. | 마스크 착용 여부 분류, 악기 소리 구분, 바른 자세 알림 |
| Machine Learning for Kids | 학생이 텍스트, 그림, 숫자, 소리 데이터를 모아 모델을 훈련하고 Scratch와 연결해 게임을 만들 수 있습니다. (Machine Learning for Kids) | “데이터 모으기 → 모델 훈련 → Scratch 게임에 연결” 순서로 진행합니다. | 감정 인식 챗봇, 동물 분류 게임, 단어 분류 퀴즈 |
| Scratch | 무료 블록 코딩 환경으로 이야기, 게임, 애니메이션을 만들 수 있습니다. (Scratch) | Teachable Machine 또는 Machine Learning for Kids의 결과를 Scratch 프로젝트와 연결합니다. | AI가 맞히면 캐릭터가 움직이는 게임, 음성 명령 게임 |

핵심 개념

이 단계의 가장 중요한 질문은 이것입니다.

“AI가 잘못 맞힌 것은 알고리즘이 나빠서일까, 데이터가 부족해서일까?”

학생에게 같은 모델을 두 번 만들게 합니다.
데이터 품질과 일반화 개념이 자연스럽게 나옵니다.

활동 예시

“교실 물건 분류 AI”

3단계. 중학생–고1: 지도학습 알고리즘 비교

목표

이제 학생은 “AI가 배운다”를 넘어서 알고리즘마다 판단 방식이 다르다는 것을 배워야 합니다. 같은 데이터라도 KNN, SVM, 의사결정나무, 로지스틱 회귀는 서로 다른 결정경계를 만듭니다.

| 실습 사이트 | 적합한 알고리즘 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| ML Algorithm Visualizer | 선형회귀, 로지스틱 회귀, KNN, K-Means, 의사결정나무, SVM 등을 한 화면에서 시각화합니다. 데이터 포인트를 추가하고 결정경계와 학습 과정을 볼 수 있습니다. (Simulations4All) | 같은 데이터셋을 여러 알고리즘으로 돌려보고 경계 모양, 정확도, 과적합 여부를 비교합니다. | 학생 성향 분류, 간단한 질병 위험 예측, 합격/불합격 예측 |
| Decision Boundary Playground | 로지스틱 회귀, SVM, kNN, 의사결정나무의 결정경계를 moons, circles, blobs 데이터셋에서 비교할 수 있습니다. (8gwifi.org) | 점을 직접 찍고 알고리즘을 바꾸며 “왜 이 경계가 생겼는가?”를 토론합니다. | “AI 심판의 판정선 그리기” 활동 |
| SVM Playground / SVM Kernels | SVM의 margin, kernel, C값을 시각적으로 이해하는 데 적합합니다. SVM 도구들은 선형·RBF·다항 커널과 마진 변화를 보여줍니다. (EngineersOfAI) | 선형으로 안 나뉘는 데이터를 만든 뒤 RBF 커널을 적용해 봅니다. | 스팸 분류, 품질 이상 탐지, 이미지 특징 분류 |
| Google Machine Learning Crash Course | 분류, 일반화, 신경망, 임베딩, 공정성 등을 애니메이션·시각화·실습으로 다룹니다. 한국어 페이지도 제공됩니다. (Google for Developers) | 사이트 설명 → 시각화 → 짧은 퀴즈 → Colab 실습 순서로 진행합니다. | 고등 심화 또는 대학 입문 이론 보강 |

수업 핵심 질문

“어떤 알고리즘이 가장 좋은가?”가 아니라

활동 예시

“달 모양 데이터 분류 대회”

4단계. 중2–고2: 비지도학습과 데이터 속 구조 찾기

목표

비지도학습은 초반에 어려워 보이지만, 사실 학생들이 좋아합니다. 정답이 없는데 AI가 비슷한 것끼리 묶기 때문입니다. 이 단계에서는 거리, 군집, 중심점, 차원축소, 임베딩을 배웁니다.

| 실습 사이트 | 배우는 개념 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| K-Means Clustering Interactive 3D | K-Means가 각 점을 가장 가까운 중심점에 배정하고, 중심점을 이동시키며 반복하는 과정을 보여줍니다. (EngineersOfAI) | 점을 직접 추가하고 K값을 바꾸며 군집 결과를 비교합니다. | 고객 유형 분류, 학생 학습 유형 묶기 |
| K-Means Clustering Visualizer | K값 조절, 중심점 표시, 반복 애니메이션, 군집 통계 등을 제공합니다. (Selqio) | K=2, 3, 4를 바꿔가며 “너무 적은 군집/너무 많은 군집”을 비교합니다. | 설문 응답자 유형 분석 |
| Clustering Studio | K-Means, DBSCAN, Hierarchical clustering을 2D 데이터에서 비교하고 elbow, silhouette 시각화를 제공합니다. (8gwifi.org) | 원형, 달 모양, 잡음 있는 데이터에서 K-Means와 DBSCAN 결과를 비교합니다. | 위치 기반 상권 분석, 이상치 탐지 |
| TensorFlow Embedding Projector | 고차원 임베딩을 2D/3D로 시각화해 유사도와 차원축소를 이해할 수 있습니다. (TensorFlow) | 숫자 이미지, 단어 임베딩을 2D로 펼쳐 비슷한 것끼리 가까운지 확인합니다. | 추천 시스템, 문서 검색, 이미지 검색 |

핵심 개념

비지도학습은 “정답 맞히기”가 아니라 패턴 발견입니다. 학생에게 “정답이 없을 때 AI가 할 수 있는 일”을 묻는 것이 좋습니다.

활동 예시

“우리 반 취향 지도 만들기”

5단계. 고1–대1: 신경망 원리 조작하기

목표

신경망은 수식으로 먼저 들어가면 어렵습니다. 먼저 학생이 뉴런 수, 은닉층, 학습률, 활성화 함수, 정규화를 직접 바꿔보게 해야 합니다.

| 실습 사이트 | 배우는 개념 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| TensorFlow Playground | 작은 신경망의 은닉층, 뉴런 수, 입력 특성, 학습률, 활성화 함수, 정규화 등을 바꾸며 결정경계를 관찰할 수 있습니다. 배경색은 각 영역에 대한 모델 예측과 확신 정도를 보여줍니다. (TensorFlow Playground) | XOR, circle, spiral 데이터셋에서 은닉층과 뉴런 수를 바꿔 봅니다. loss와 결정경계를 함께 관찰합니다. | 과적합 실험, 신경망 구조 설계 |
| Neural Network Explorer | MLP, Hopfield, RNN, SOM, CNN, Autoencoder, LSTM, VAE 등 여러 네트워크 구조를 실시간으로 보여줍니다. (Simulations4All) | 네트워크 종류를 바꿔가며 “구조가 달라지면 어떤 문제가 쉬워지는가?”를 비교합니다. | 신경망 계통도 만들기 |
| ML Visualizer | 퍼셉트론, MLP, 오토인코더, VAE, CNN Encoder-Decoder, Transformer 등 다양한 AI 구조를 인터랙티브하게 보여줍니다. (ML Visualizer) | 각 구조가 어떤 데이터에 강한지 비교합니다. | 모델 구조 비교 발표 |

핵심 질문

“층을 많이 쌓으면 무조건 좋아질까?”

학생은 TensorFlow Playground에서 은닉층을 많이 늘리면 학습 데이터에는 잘 맞지만 테스트 데이터에는 이상한 결정경계가 생길 수 있음을 봅니다. 여기서 과적합, 일반화, 정규화 개념을 자연스럽게 연결합니다.

활동 예시

“가장 단순한 신경망으로 circle 데이터 분류하기”

6단계. 고2–대2: CNN, RNN, 강화학습으로 확장

6-1. CNN: 이미지를 보는 AI

| 실습 사이트 | 배우는 개념 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| CNN Explainer | CNN을 비전문가도 이해할 수 있도록 convolution, ReLU, pooling, fully connected layer 흐름으로 시각화합니다. (조지아텍 데이터 과학 폴로 클럽) | 입력 이미지가 합성곱층, ReLU, pooling, fully connected layer를 거쳐 분류되는 흐름을 따라갑니다. | 손글씨 숫자 인식, 동물 이미지 분류 |
| CNN Feature Visualizer | 필터가 이미지 위를 이동하며 feature map을 만드는 과정을 보여주고, kernel size, stride, padding, pooling을 조작할 수 있습니다. (Simulations4All) | edge, blur, sharpen 필터를 바꾸며 특징맵이 어떻게 달라지는지 봅니다. | 엣지 검출, 결함 탐지, 의료 영상 기초 |
| CNN Playground | MNIST 숫자 인식, ImageNet 분류, ResNet50 Grad-CAM, YOLO 기반 객체탐지·세그멘테이션을 체험할 수 있습니다. (CNN Playground) | 숫자를 직접 그려보고 예측과 Grad-CAM을 확인합니다. | 불량품 탐지, 안전모 착용 탐지, 식물 병해 분류 |
| Distill Feature Visualization / Activation Atlas | CNN 내부 뉴런·채널이 어떤 특징에 반응하는지, 모델이 보는 특징 공간을 시각화합니다. (Distill) | “AI가 고양이를 볼 때 귀를 보는가, 배경을 보는가?”를 토론합니다. | 모델 해석, 편향 분석 |

CNN 수업 핵심

CNN은 “이미지를 통째로 외우는 것”이 아니라 작은 필터로 지역 특징을 찾고, 층이 깊어질수록 더 복잡한 특징을 조합합니다.

활동 예시

“AI가 숫자 8을 왜 3으로 착각했을까?”

6-2. RNN/LSTM: 순서를 기억하는 AI

| 실습 사이트 | 배우는 개념 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| RNN Interactive Playground | 하나의 RNN cell이 시간 단계마다 반복 사용되고 hidden state가 전달되는 과정을 보여줍니다. (virtual-labs.github.io) | 글자 “RNN” 같은 짧은 시퀀스를 넣고 hidden state가 어떻게 변하는지 봅니다. | 다음 글자 예측, 간단한 문장 분류 |
| LSTM Gates Playground | forget gate, input gate, output gate가 cell state에 어떤 영향을 주는지 슬라이더로 조작할 수 있습니다. (nipunbatra.github.io) | 각 gate 값을 조절해 기억을 지우거나 유지하는 과정을 실험합니다. | 감정 분석, 날씨·주가 같은 시계열 예측 |
| LSTM & RNN Visualizer | RNN과 LSTM의 hidden state, gate 구조를 시각적으로 설명합니다. (Sampooni) | 같은 문장을 RNN과 LSTM으로 비교하며 장기 기억 차이를 봅니다. | 문장 감성 분석, 음악 패턴 예측 |
| Distill: Visualizing Memorization in RNNs | 기본 RNN은 긴 시간 간격의 정보를 기억하는 데 어려움이 있고, LSTM·GRU가 이를 보완하려는 구조임을 설명합니다. (Distill) | 긴 문장 앞부분의 정보가 뒤쪽 판단에 얼마나 남는지 토론합니다. | 번역, 챗봇, 음성 인식의 역사적 구조 이해 |

RNN 수업 핵심

RNN은 “지금 입력”만 보는 것이 아니라 이전 입력의 흔적을 hidden state로 들고 다니는 구조입니다. LSTM은 그 기억을 더 오래 유지하기 위해 gate를 사용합니다.

활동 예시

“문장 순서를 바꾸면 감정이 바뀔까?”

6-3. 강화학습: 보상으로 배우는 AI

| 실습 사이트 | 배우는 개념 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| Reinforcement Learning Playground | Q-Learning, SARSA, Expected SARSA, Value Iteration, Policy Iteration, Monte Carlo를 grid world에서 실행하고 Q-table, policy arrow, value heatmap을 실시간으로 볼 수 있습니다. (Simulations4All) | 보상, 장애물, 학습률, 탐험률을 바꿔가며 에이전트의 경로 변화를 봅니다. | 미로 찾기, 로봇 이동, 게임 AI |
| RL Playground | TensorFlow Playground에서 영감을 받은 웹 기반 RL 도구로, 에이전트 구현과 강화학습 전문 강의 자료를 기반으로 합니다. (Alazareva) | 에이전트가 처음에는 헤매다가 점점 최적 경로를 찾는 과정을 관찰합니다. | 게임 캐릭터 학습, 경로 최적화 |
| RL Interactive Lab | Bandit, GridWorld, CartPole, Rocket Landing 환경에서 여러 알고리즘을 실시간으로 학습시킬 수 있고, 내장 코스도 제공합니다. (GitHub) | Bandit에서 탐험/활용을 배우고, GridWorld에서 정책과 가치함수를 배웁니다. | 광고 추천, 자율주행 기초, 로봇 제어 |
| Gymnasium | 강화학습 환경을 표현하는 파이썬 인터페이스로, 대학 수준 실습에서 표준적인 환경 구성에 적합합니다. (Gymnasium) | 웹 실습 뒤 Colab/Python으로 CartPole, LunarLander 등을 실습합니다. | 강화학습 연구·캡스톤 |

강화학습 수업 핵심

강화학습은 “정답을 알려주는 학습”이 아닙니다.

활동 예시

“청소 로봇 보상 설계하기”

7단계. 고3–대학: Transformer와 LLM 이해

목표

LLM을 단순히 “챗봇”으로 쓰는 단계에서 벗어나, 토큰화 → 임베딩 → attention → 다음 토큰 예측 → 생성 결과 흐름을 이해하게 합니다.

| 실습 사이트 | 배우는 개념 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| OpenAI Tokenizer | 언어 모델이 텍스트를 token이라는 단위로 처리하며, 주어진 텍스트가 어떻게 토큰화되는지 확인할 수 있습니다. (OpenAI 플랫폼) | 한국어, 영어, 이모지, 띄어쓰기 차이에 따라 토큰 수가 어떻게 달라지는지 비교합니다. | 프롬프트 비용·문맥 길이 이해 |
| Hugging Face Tokenizer Playground | 여러 tokenizer가 텍스트를 토큰과 ID로 나누는 과정을 브라우저에서 실험할 수 있습니다. (Hugging Face) | 같은 문장을 GPT 계열, BERT 계열 tokenizer로 비교합니다. | 검색, 번역, 문서 분류 전처리 |
| Transformer Explainer | GPT 같은 Transformer 기반 LLM이 next-token prediction과 self-attention을 어떻게 사용하는지 인터랙티브하게 보여줍니다. (조지아텍 데이터 과학 폴로 클럽) | 짧은 프롬프트를 입력하고 attention, token prediction, layer/head 변화를 관찰합니다. | LLM 원리 설명, 프롬프트 실험 |
| Transformer Attention Visualizer | 문장을 입력하면 tokenization, Q/K/V 행렬, attention heatmap, single-head/multi-head attention을 단계별로 보여줍니다. (Simulations4All) | “나는 은행에 갔다”처럼 중의적 문장을 넣고 attention 변화를 봅니다. | 문맥 이해, 의미 연결 시각화 |
| LLM Visualization | GPT 스타일 Transformer의 구조와 데이터 흐름을 3D로 탐색할 수 있는 walkthrough입니다. (Bbycroft) | embedding, attention layer, MLP, logits 흐름을 순서대로 따라갑니다. | 대학 LLM 구조 수업 |
| BertViz | BERT, GPT-2, T5 등 Transformer 모델의 attention을 Jupyter/Colab에서 시각화할 수 있습니다. (GitHub) | Hugging Face 모델을 불러와 문장별 attention head를 분석합니다. | 논문 읽기, NLP 모델 해석 |
| Hugging Face LLM Course | Transformers, Datasets, Tokenizers, Accelerate, Hub 등을 사용해 LLM/NLP를 학습하는 과정입니다. (Hugging Face) | 대학생은 웹 시각화 후 Colab 실습으로 이어갑니다. | 감성분석, 요약, 질의응답, 미세조정 |

LLM 수업 핵심

LLM은 문장을 “단어 그대로” 이해하는 것이 아니라, 텍스트를 토큰으로 쪼개고, 문맥 속 관계를 attention으로 계산하며, 다음에 올 가능성이 높은 토큰을 예측합니다.

활동 예시

“한국어는 왜 토큰 수가 많이 나올까?”

8단계. 고등–대학: AI 해석, 평가, 윤리, 응용

목표

AI 교육의 마지막은 “모델 만들기”가 아니라 믿을 수 있는 모델인지 평가하고, 사회적으로 안전하게 적용하는 것입니다.

| 실습 사이트 | 배우는 개념 | 학습 방법 | 응용 사례 |
| --- | --- | --- | --- |
| Learning Interpretability Tool, LIT | 텍스트·이미지·표 데이터에 대해 모델 행동을 시각적·인터랙티브하게 분석하는 도구입니다. (Pair Code) | 입력 문장을 바꿔가며 예측이 왜 달라지는지 봅니다. | 챗봇 오류 분석, 문서 분류 모델 점검 |
| What-If Tool | 모델의 가상 입력을 바꿔보고, 특징 중요도·모델 행동·공정성 지표를 분석할 수 있습니다. (Google Research) | 나이, 성별, 점수 등 민감한 변수 변화가 결과에 영향을 주는지 분석합니다. | 입학·채용·대출 모델의 공정성 토론 |
| PAIR Guidebook | 인간중심 AI 제품 설계를 위한 실용 가이드입니다. (Pair) | AI 서비스가 사용자에게 오류를 어떻게 설명해야 하는지 설계합니다. | AI 학습 도우미, 의료 보조 앱, 행정 챗봇 설계 |
| Google ML Crash Course Fairness | ML 공정성, 데이터 편향, 모델 감사 전략을 다룹니다. (Google for Developers) | 혼동행렬, 데이터 불균형, 편향 완화 방안을 학습합니다. | 학교 AI 생활기록부 보조 시스템 윤리 토론 |

활동 예시

“공정한 AI 면접관 만들기”

3. 알고리즘별 수업 설계안

A. 지도학습 수업안

| 항목 | 내용 |
| --- | --- |
| 핵심 개념 | 라벨, 학습 데이터, 테스트 데이터, 분류, 회귀, 일반화, 과적합 |
| 추천 도구 | Teachable Machine, Machine Learning for Kids, ML Algorithm Visualizer, Decision Boundary Playground |
| 초등 활동 | 내 표정 분류 AI, 교실 물건 분류 AI |
| 중등 활동 | KNN과 의사결정나무 결정경계 비교 |
| 고등 활동 | SVM 커널 바꾸기, 과적합 실험 |
| 대학 활동 | scikit-learn으로 분류 모델 구현, 교차검증, confusion matrix 분석 |
| 응용 사례 | 스팸 메일 분류, 질병 위험 예측, 제품 불량 분류, 학생 맞춤형 학습 추천 |

수업 흐름

학생이 데이터를 만든다.

라벨을 붙인다.

모델을 학습시킨다.

새로운 데이터로 테스트한다.

틀린 사례를 분석한다.

데이터 수집 방식을 개선한다.

B. 비지도학습 수업안

| 항목 | 내용 |
| --- | --- |
| 핵심 개념 | 거리, 유사도, 군집, 중심점, 차원축소, 임베딩 |
| 추천 도구 | K-Means Visualizer, Clustering Studio, Embedding Projector |
| 초등 활동 | 비슷한 물건끼리 묶기 |
| 중등 활동 | 취향 설문 데이터를 군집화하기 |
| 고등 활동 | K-Means와 DBSCAN 비교 |
| 대학 활동 | PCA/t-SNE/UMAP으로 고차원 데이터 시각화 |
| 응용 사례 | 고객 세분화, 추천 시스템, 문서 묶기, 이상치 탐지 |

수업 흐름

정답 없는 데이터를 제시한다.

사람이 먼저 묶어본다.

K-Means로 자동 군집화한다.

K값을 바꿔본다.

DBSCAN 등 다른 방식과 비교한다.

“AI가 만든 그룹을 사람이 어떻게 해석할 것인가?”를 토론한다.

C. 강화학습 수업안

| 항목 | 내용 |
| --- | --- |
| 핵심 개념 | 에이전트, 상태, 행동, 보상, 정책, 가치함수, Q-table |
| 추천 도구 | Reinforcement Learning Playground, RL Interactive Lab, Gymnasium |
| 초등 활동 | 종이 미로에서 보상 스티커 붙이기 |
| 중등 활동 | GridWorld에서 보상 설계하기 |
| 고등 활동 | Q-Learning과 SARSA 비교 |
| 대학 활동 | CartPole, LunarLander, DQN 기초 실습 |
| 응용 사례 | 게임 AI, 로봇 제어, 경로 최적화, 광고 추천, 자율주행 기초 |

수업 흐름

미로와 목표를 만든다.

보상과 벌점을 정한다.

에이전트가 무작위로 움직이는 모습을 본다.

반복 학습 후 정책이 바뀌는 것을 관찰한다.

보상 설계를 바꿔 행동 변화를 비교한다.

D. 신경망 기본 수업안

| 항목 | 내용 |
| --- | --- |
| 핵심 개념 | 뉴런, 가중치, 편향, 손실, 학습률, 활성화 함수, 역전파 |
| 추천 도구 | TensorFlow Playground, Neural Network Explorer, ML Visualizer |
| 중등 활동 | 신경망 결정경계 관찰 |
| 고등 활동 | 학습률이 너무 크거나 작을 때 비교 |
| 대학 활동 | NumPy로 MLP 구현, PyTorch/TensorFlow로 확장 |
| 응용 사례 | 이미지 분류, 소리 분류, 문서 분류, 예측 모델 |

수업 흐름

단순 데이터셋을 고른다.

은닉층 0개에서 시작한다.

뉴런 수와 층을 늘린다.

학습률과 정규화를 바꾼다.

학습 손실과 테스트 손실을 비교한다.

E. CNN 수업안

| 항목 | 내용 |
| --- | --- |
| 핵심 개념 | 합성곱, 필터, 특징맵, ReLU, 풀링, flatten, Grad-CAM |
| 추천 도구 | CNN Explainer, CNN Feature Visualizer, CNN Playground, Distill |
| 초등 확장 | Teachable Machine으로 이미지 분류 |
| 중등 활동 | 손글씨 숫자 분류 |
| 고등 활동 | 필터와 특징맵 관찰 |
| 대학 활동 | PyTorch로 CNN 구현, Grad-CAM 해석 |
| 응용 사례 | 불량품 탐지, 의료 영상, 얼굴 인식, 자율주행 카메라, 농작물 병해 탐지 |

수업 흐름

이미지를 픽셀 격자로 본다.

필터가 지나가며 특징을 찾는 것을 본다.

층이 깊어질수록 단순 선 → 모양 → 물체 특징으로 바뀜을 설명한다.

Grad-CAM으로 모델이 본 위치를 확인한다.

F. RNN/LSTM 수업안

| 항목 | 내용 |
| --- | --- |
| 핵심 개념 | 순서, hidden state, memory, vanishing gradient, gate |
| 추천 도구 | RNN Interactive Playground, LSTM Gates Playground, LSTM & RNN Visualizer, Distill RNN |
| 중등 활동 | 단어 순서가 의미를 바꾸는 사례 찾기 |
| 고등 활동 | RNN hidden state 변화 관찰 |
| 대학 활동 | 문자 생성 모델, 감성 분석, 시계열 예측 |
| 응용 사례 | 날씨 예측, 주가 흐름, 문장 감성 분석, 음성 인식, 음악 생성 |

수업 흐름

순서가 중요한 데이터와 중요하지 않은 데이터를 비교한다.

RNN cell이 시간마다 반복되는 모습을 본다.

hidden state가 기억 역할을 함을 설명한다.

LSTM gate로 기억을 지우고 유지하는 과정을 조작한다.

G. LLM/Transformer 수업안

| 항목 | 내용 |
| --- | --- |
| 핵심 개념 | 토큰, 임베딩, attention, Q/K/V, multi-head attention, next-token prediction |
| 추천 도구 | OpenAI Tokenizer, Hugging Face Tokenizer Playground, Transformer Explainer, LLM Visualization, BertViz |
| 중등 활동 | 문장이 토큰으로 쪼개지는 과정 보기 |
| 고등 활동 | attention heatmap 해석 |
| 대학 활동 | BERT/GPT attention 분석, Hugging Face 모델 실습 |
| 응용 사례 | 챗봇, 문서 요약, 검색, 번역, 질의응답, 코딩 보조, RAG 시스템 |

수업 흐름

문장을 토큰으로 쪼갠다.

토큰마다 ID가 생기는 것을 본다.

attention으로 단어 사이 관계를 본다.

다음 토큰 후보가 어떻게 나오는지 본다.

프롬프트를 바꿔 결과 변화를 비교한다.

4. 학년군별 실제 운영 예시

초등 3–4학년: 4차시 미니 과정

| 차시 | 주제 | 도구 | 활동 |
| --- | --- | --- | --- |
| 1 | AI가 그림을 맞힌다 | Quick, Draw! | AI가 빨리 맞히는 그림과 못 맞히는 그림 비교 |
| 2 | AI도 데이터가 필요하다 | AI for Oceans | 바다 생물과 쓰레기 분류 |
| 3 | AI가 틀리는 이유 | Quick, Draw! / AutoDraw | 오답 사례 모으기 |
| 4 | AI 사용 약속 만들기 | 토론 | “AI를 믿어도 되는 때와 안 되는 때” 포스터 |

초등 5–6학년: 8차시 과정

| 차시 | 주제 | 도구 | 활동 |
| --- | --- | --- | --- |
| 1 | 지도학습이란? | Teachable Machine | 이미지 클래스 만들기 |
| 2 | 좋은 데이터란? | Teachable Machine | 조명·배경 바꿔 데이터 수집 |
| 3 | 테스트 데이터 | Teachable Machine | 친구 데이터로 검증 |
| 4 | 편향 | AI for Oceans | 한쪽 데이터만 많을 때 결과 비교 |
| 5 | Scratch 연결 | Machine Learning for Kids | 분류 결과로 게임 만들기 |
| 6 | 소리 인식 | Teachable Machine | 박수·말소리·악기 구분 |
| 7 | 자세 인식 | Teachable Machine | 바른 자세 알림 |
| 8 | 발표 | 전체 | “내가 만든 AI와 한계” 발표 |

중학생: 12차시 과정

| 단원 | 주제 | 도구 | 산출물 |
| --- | --- | --- | --- |
| 1 | 지도학습 복습 | Teachable Machine | 분류 모델 |
| 2 | 결정경계 | ML Algorithm Visualizer | 알고리즘 비교표 |
| 3 | KNN·SVM·Decision Tree | Decision Boundary Playground | 결정경계 보고서 |
| 4 | 비지도학습 | K-Means Visualizer | 군집 분석 |
| 5 | 차원축소·임베딩 | Embedding Projector | 유사도 지도 |
| 6 | 신경망 입문 | TensorFlow Playground | 신경망 실험 노트 |
| 7 | AI 윤리 | What-If Tool / 토론 | 편향 사례 분석 |
| 8 | 미니 프로젝트 | 선택 도구 | 생활 문제 해결 AI 기획서 |

고등학생: 16차시 과정

| 단원 | 주제 | 도구 | 산출물 |
| --- | --- | --- | --- |
| 1 | 분류·회귀·평가 | Google MLCC, Kaggle | 모델 평가 실습 |
| 2 | 신경망 구조 | TensorFlow Playground | 학습률·과적합 실험 |
| 3 | CNN | CNN Explainer, CNN Playground | 이미지 분류 분석 |
| 4 | RNN/LSTM | RNN Interactive, LSTM Gates | 순차 데이터 분석 |
| 5 | 강화학습 | RL Playground | 보상 설계 보고서 |
| 6 | Transformer | Transformer Explainer | attention 분석 |
| 7 | LLM 활용과 한계 | OpenAI Tokenizer, LLM Visualization | 프롬프트·토큰 분석 |
| 8 | 프로젝트 | 자유 선택 | AI 서비스 프로토타입 |

대학생: 15주 강의형 과정

| 주차 | 주제 | 실습 |
| --- | --- | --- |
| 1 | AI·ML·DL 전체 지도 | 알고리즘 계통도 작성 |
| 2 | 데이터와 평가 | train/test split, confusion matrix |
| 3 | 지도학습 1 | kNN, Logistic Regression |
| 4 | 지도학습 2 | SVM, Decision Tree, Random Forest |
| 5 | 비지도학습 | K-Means, DBSCAN, PCA |
| 6 | 신경망 기초 | MLP, backpropagation |
| 7 | CNN | CNN 구현, Grad-CAM |
| 8 | RNN/LSTM | 시계열 또는 텍스트 분류 |
| 9 | 강화학습 | GridWorld, Q-Learning |
| 10 | Transformer | attention 구현·시각화 |
| 11 | LLM 활용 | tokenizer, prompt, embedding |
| 12 | Hugging Face 실습 | sentiment analysis, summarization |
| 13 | 해석가능 AI | LIT, What-If Tool |
| 14 | 윤리·공정성 | 편향 분석, 위험 평가 |
| 15 | 캡스톤 발표 | 실제 문제 해결 AI 프로젝트 |

5. 추천 캡스톤 프로젝트 예시

| 수준 | 프로젝트 | 사용하는 알고리즘 | 추천 도구 |
| --- | --- | --- | --- |
| 초등 | 교실 물건 분류 AI | 지도학습, 이미지 분류 | Teachable Machine |
| 초등 | 바른 자세 알림 AI | 지도학습, 포즈 인식 | Teachable Machine |
| 중등 | 우리 반 취향 군집 지도 | 비지도학습, K-Means | K-Means Visualizer |
| 중등 | AI 분리수거 도우미 | 이미지 분류, 데이터 편향 | Teachable Machine, AI for Oceans |
| 고등 | 손글씨 숫자 인식 분석 | CNN | CNN Explainer, CNN Playground |
| 고등 | 미로 탈출 에이전트 | 강화학습, Q-Learning | RL Playground |
| 고등 | 문장 감정 분석 | RNN/LSTM 또는 Transformer | RNN Visualizer, Hugging Face |
| 대학 | 불량품 탐지 시스템 | CNN, Grad-CAM | PyTorch, CNN Playground |
| 대학 | 학교 민원 챗봇 | LLM, RAG, embedding | Hugging Face, LIT |
| 대학 | 공정한 예측 모델 만들기 | 지도학습, fairness | What-If Tool, Google MLCC |

6. 수업 설계의 핵심 원칙

1. 설명보다 조작을 먼저 둡니다

“CNN은 합성곱 신경망이다”라고 시작하지 말고, 먼저 필터를 움직여 특징맵이 생기는 장면을 보여주는 것이 좋습니다. 이후에 convolution, stride, padding이라는 용어를 붙입니다.

2. AI의 정답보다 오답을 더 중요하게 다룹니다

AI 교육에서 가장 좋은 학습 자료는 AI가 틀린 사례입니다. 오답을 분석하면 데이터 부족, 편향, 과적합, 일반화, 설명가능성까지 연결됩니다.

3. 같은 데이터를 여러 알고리즘으로 비교합니다

학생은 “AI가 하나의 방식으로 판단한다”고 생각하기 쉽습니다. Decision Boundary Playground나 ML Algorithm Visualizer로 같은 데이터를 KNN, SVM, Decision Tree에 넣어 보면 알고리즘별 성격이 바로 보입니다.

4. 초등은 노코드, 중등은 시각화, 고등은 파라미터 조작, 대학은 코드 구현으로 갑니다

초등학생에게 수식을 먼저 주면 AI가 멀어집니다. 반대로 대학생에게 시각화만 주면 얕아집니다. 같은 개념도 학년군에 따라 깊이를 달리해야 합니다.

5. 마지막은 반드시 윤리와 적용으로 끝냅니다

AI 모델을 만드는 것보다 중요한 것은 어디에 쓰면 되는지, 어디에 쓰면 위험한지, 틀렸을 때 누가 책임지는지입니다.

7. 가장 추천하는 핵심 사이트 15개

수업 전체를 운영할 때는 아래 15개만 있어도 충분히 강력한 커리큘럼을 만들 수 있습니다.

| 우선순위 | 사이트 | 가장 적합한 용도 |
| --- | --- | --- |
| 1 | Teachable Machine | 초중등 지도학습 입문 |
| 2 | Quick, Draw! | 초등 AI 감각 형성 |
| 3 | Code.org AI for Oceans | 데이터·편향·윤리 입문 |
| 4 | Machine Learning for Kids | Scratch와 AI 연결 |
| 5 | ML Algorithm Visualizer | 지도학습 알고리즘 비교 |
| 6 | Decision Boundary Playground | 결정경계 시각화 |
| 7 | K-Means Visualizer | 비지도학습 군집화 |
| 8 | Embedding Projector | 임베딩·차원축소 이해 |
| 9 | TensorFlow Playground | 신경망 기본 원리 |
| 10 | CNN Explainer | CNN 구조 이해 |
| 11 | CNN Playground | 이미지 분류·Grad-CAM·객체탐지 |
| 12 | RNN Interactive Playground | 순차 데이터와 hidden state |
| 13 | RL Playground | 강화학습과 보상 |
| 14 | Transformer Explainer | Transformer와 LLM 구조 |
| 15 | OpenAI Tokenizer / Hugging Face Tokenizer | 토큰화와 LLM 입력 이해 |

8. 최종 교육과정 이름 제안

이 과정을 하나의 프로그램으로 만든다면 다음과 같이 이름 붙일 수 있습니다.

“AI를 만지고 이해하는 알고리즘 탐험: 데이터에서 LLM까지”

하위 모듈은 이렇게 구성하면 좋습니다.

AI는 어떻게 보고 틀릴까?

내가 직접 AI를 가르치기

정답 있는 학습: 지도학습

정답 없는 발견: 비지도학습

보상으로 배우는 AI: 강화학습

신경망은 어떻게 경계를 그릴까?

이미지를 보는 AI: CNN

순서를 기억하는 AI: RNN/LSTM

문맥을 보는 AI: Transformer와 LLM

믿을 수 있는 AI: 평가, 편향, 윤리, 설명가능성

이 구조로 가면 초등학생은 “AI가 데이터를 보고 배운다”를 몸으로 이해하고, 중학생은 “알고리즘마다 판단 방식이 다르다”를 시각적으로 이해하며, 고등학생은 “신경망과 딥러닝 구조”를 조작해 보고, 대학생은 “수식·코드·응용·윤리”까지 연결할 수 있습니다.

기계학습 실습 사이트 모음

아래는 티처블머신, CNN Explainer, TensorFlow Playground처럼 웹에서 직접 조작하며 기계학습을 이해할 수 있는 사이트를 유형별로 정리한 목록입니다. 수업용으로는 입문 → 지도/비지도/강화학습 → 신경망 → CNN/RNN/LLM 순서로 배치하면 좋습니다.

1. 전체 입문·통합형

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| Teachable Machine | 이미지, 소리, 포즈 데이터를 직접 모아 모델을 훈련하고 테스트할 수 있는 노코드 도구입니다. (Teachable Machine) | 머신러닝의 “데이터 수집 → 학습 → 예측” 흐름을 처음 보여줄 때 |
| TensorFlow Playground | 입력 특성, 은닉층, 뉴런 수, 학습률 등을 바꾸며 작은 신경망의 결정경계를 확인할 수 있습니다. (TensorFlow Playground) | 신경망, 과적합, 학습률, 은닉층 개념 설명 |
| Google Machine Learning Crash Course | 애니메이션, 시각화, 실습 문제를 포함한 구글의 머신러닝 입문 과정입니다. (Google for Developers) | 이론+간단 실습을 함께 진행할 때 |
| MLU-Explain | Amazon Machine Learning University의 시각적 설명 자료로, 핵심 ML 개념을 비주얼 에세이 형식으로 제공합니다. (MLU-Explain) | 개념 설명용 보조 자료 |
| ML Visualizer | 퍼셉트론, MLP, 오토인코더, VAE, CNN, Transformer, Hopfield Network 등 다양한 모델을 한곳에서 시각화합니다. (ML Visualizer) | 여러 알고리즘을 비교해 보여줄 때 |

2. 지도학습: 분류·회귀·결정경계

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| Machine Learning Playground | KNN, Perceptron, SVM, ANN, Decision Tree 등을 직접 데이터 포인트를 찍어가며 비교할 수 있습니다. (ML Playground) | 분류 알고리즘별 결정경계 비교 |
| ML Algorithm Visualizer | Linear Regression, Logistic Regression, KNN, K-Means, Decision Tree, SVM을 실시간 결정경계와 함께 보여줍니다. (Simulations4All) | 지도학습과 비지도학습을 함께 비교 |
| Decision Boundary Playground | Logistic Regression, SVM, kNN, Decision Tree를 blobs, moons, circles 데이터셋에서 비교합니다. (8gwifi.org) | “모델마다 경계가 왜 다르게 생기는가?” 설명 |
| SVM Playground | SVM의 커널, 마진, 다중분류 전략을 시각적으로 설명하고 시뮬레이터를 제공합니다. (SVM Playground) | SVM의 margin, kernel 개념 설명 |
| Teachable Machine | 사용자가 만든 이미지·오디오·포즈 데이터를 라벨별로 학습시키는 전형적인 지도학습 체험 도구입니다. (Teachable Machine) | 초·중등 또는 비전공자 대상 분류 실습 |

3. 비지도학습: 군집화·차원축소·표현학습

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| TensorFlow Embedding Projector | 고차원 임베딩을 2D/3D로 시각화하여 PCA, t-SNE, UMAP류 차원축소 개념을 설명하기 좋습니다. (Embedding Projector) | 임베딩, 유사도, 차원축소 설명 |
| K-Means Clustering Interactive 3D | 점을 추가하고 중심점이 이동하는 과정을 단계별로 볼 수 있는 K-Means 시각화 도구입니다. (EngineersOfAI) | 군집화의 반복 과정 설명 |
| K-Means Clustering Visualizer | K값 조절, 점 추가, centroid 통계, 애니메이션 등을 지원합니다. (Selqio) | K값 변화가 군집 결과에 미치는 영향 |
| BinaryVisual Unsupervised Learning | K-Means, PCA, clustering을 대화형 예제와 퀴즈 형태로 다룹니다. (Binary Visual) | 비지도학습 개념 정리용 |
| ML Visualizer: Autoencoder/VAE/RBM | 오토인코더, VAE, Restricted Boltzmann Machine 등 비지도·생성 모델을 시각화합니다. (ML Visualizer) | 압축, 잠재공간, 생성모델 입문 |

4. 강화학습: 에이전트·보상·정책

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| Reinforcement Learning Playground – Simulations4All | Q-Learning, SARSA, Expected SARSA, Value Iteration, Policy Iteration, Monte Carlo를 grid world에서 실시간으로 시각화합니다. (Simulations4All) | 상태, 행동, 보상, Q-table 설명 |
| RL Playground – GitHub Pages | 미로 환경에서 에이전트가 Q-table과 정책을 이용해 목표로 이동하는 과정을 보여줍니다. (Alazareva) | Q-learning 입문 실습 |
| RL Interactive Lab | Bandit, GridWorld, CartPole, Rocket Landing 환경에서 여러 강화학습 알고리즘을 실시간 학습시킬 수 있습니다. (GitHub) | 심화 수업 또는 프로젝트형 실습 |
| The Reinforcement Learning Playground | 강화학습 이론을 인터랙티브 북 형태로 설명하고 코드 예제를 함께 제공합니다. (Lars Quaedvlieg) | 이론+코드 병행 학습 |
| Deep Reinforcement Learning – RawWeights | Q-Learning, Policy Gradient, 브라우저 기반 에이전트 학습을 다룹니다. (원자 GPT 놀이터) | 딥러닝 기반 강화학습 맛보기 |

5. 신경망 기본: 퍼셉트론·MLP·역전파

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| TensorFlow Playground | 은닉층, 활성화 함수, 학습률, 정규화, 데이터셋 형태를 바꿔가며 신경망 학습을 관찰합니다. (TensorFlow Playground) | 가장 추천하는 신경망 입문 도구 |
| Neural Network Visualizer | 은닉층 구성, 실제 데이터 학습, forward/backpropagation을 단계별로 보여줍니다. (NN Visual) | 순전파·역전파 설명 |
| ML Visualizer – Perceptron/MLP | 퍼셉트론과 MLP를 포함한 여러 신경망 구조를 한곳에서 탐색할 수 있습니다. (ML Visualizer) | 퍼셉트론에서 딥러닝으로 확장 |
| Interactive Neural Network Playground | 데이터 포인트를 직접 그리고 신경망 구조를 바꿔 결정경계를 확인할 수 있습니다. (Raj Neelam) | 분류 문제와 신경망 연결 설명 |

6. CNN: 합성곱·필터·특징맵·이미지 분류

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| CNN Explainer | CNN 구조, convolution, ReLU, pooling, fully connected layer 등을 단계별 시각화로 설명합니다. 논문에서도 비전문가 학습자를 위한 인터랙티브 CNN 도구로 소개됩니다. (arXiv) | CNN 수업의 핵심 자료 |
| CNN Playground | MNIST 숫자 인식, ImageNet 분류, ResNet50 Grad-CAM, YOLO 기반 탐지·세그멘테이션을 체험할 수 있습니다. (CNN Playground) | 이미지 분류·객체탐지 확장 설명 |
| Distill – Feature Visualization | CNN 내부 뉴런이나 채널이 어떤 시각적 특징에 반응하는지 설명합니다. (Distill) | “CNN은 무엇을 보고 있는가?” 설명 |
| Distill – Activation Atlas | 이미지 분류 네트워크의 활성화 공간을 탐색해 CNN이 학습한 개념을 시각화합니다. (Distill) | CNN 해석 가능성 수업 |
| ML Visualizer – CNN Encoder-Decoder | 이미지 처리용 convolutional encoder-decoder 구조를 시각화합니다. (ML Visualizer) | segmentation, autoencoder와 연결 |

7. RNN·LSTM: 순차 데이터·기억·hidden state

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| RNN Interactive Playground | 하나의 RNN cell이 여러 time step에서 재사용되고 hidden state가 전달되는 과정을 보여줍니다. (Virtual Labs) | RNN unrolling 설명 |
| LSTM & RNN Visualizer | RNN과 LSTM의 hidden state, gate 구조를 시각화합니다. (Sampooni) | LSTM의 forget/input/output gate 설명 |
| Distill – Visualizing Memorization in RNNs | RNN이 긴 시간 간격의 정보를 기억하는 문제와 LSTM/GRU의 필요성을 설명합니다. (Distill) | vanishing gradient, 장기 의존성 설명 |
| RNN/LSTM Memory Visualizer | 토큰을 단계별로 넣으며 hidden state와 LSTM gate activation 변화를 확인할 수 있습니다. (GitHub) | 텍스트·시계열 데이터 수업 |

8. LLM·Transformer: attention·token·GPT 구조

| 사이트 | 다루는 내용 | 추천 활용 |
| --- | --- | --- |
| Transformer Explainer – Polo Club | GPT 같은 텍스트 생성 Transformer가 next-token prediction과 self-attention을 어떻게 사용하는지 인터랙티브하게 보여줍니다. (조지아텍 데이터 과학 폴로 클럽) | LLM 구조 입문 최우선 추천 |
| LLM Visualization – Brendan Bycroft | LLM 내부 구조를 3D 애니메이션과 walkthrough로 설명합니다. (Bbycroft) | LLM 구조를 직관적으로 보여줄 때 |
| BertViz | BERT, GPT-2, T5 등 Transformer 모델의 attention을 Jupyter/Colab에서 시각화할 수 있습니다. (GitHub) | attention head 분석 실습 |
| exBERT | BERT의 attention과 contextual representation을 문장 입력 기반으로 탐색할 수 있습니다. (ExBERT) | BERT 내부 표현 설명 |
| Learning Interpretability Tool, LIT | 텍스트·이미지·표 데이터를 지원하는 시각적·인터랙티브 모델 해석 도구입니다. (Pair Code) | 모델 예측 이유, 오류 분석, counterfactual 실습 |
| Transformer Attention Visualizer – Simulations4All | 문장을 입력하면 tokenization, Q/K/V 행렬, attention heatmap, single-head/multi-head attention을 단계별로 보여줍니다. (Simulations4All) | attention 수식과 시각화 연결 |

수업용 추천 순서

처음 배우는 학생에게는 다음 순서가 가장 자연스럽습니다.

Teachable Machine으로 “데이터를 넣으면 모델이 학습한다”는 감각 만들기

Machine Learning Playground / Decision Boundary Playground로 지도학습 분류 이해

K-Means Visualizer / Embedding Projector로 비지도학습 이해

TensorFlow Playground로 신경망 구조와 학습률·은닉층·과적합 이해

CNN Explainer로 이미지 인식의 합성곱 구조 이해

RNN Interactive Playground로 순차 데이터와 hidden state 이해

Transformer Explainer / LLM Visualization으로 LLM의 token, attention, next-token prediction 이해

RL Playground로 보상 기반 학습과 에이전트 개념 이해

가장 실습 친화적인 “핵심 10개”만 고르면 Teachable Machine, TensorFlow Playground, Machine Learning Playground, ML Algorithm Visualizer, K-Means Interactive 3D, RL Playground, CNN Explainer, RNN Interactive Playground, Transformer Explainer, LLM Visualization을 추천합니다.


---


# 원본 파일: 신경망에서 딥러닝 에이전트 피지컬까지.extracted.md


# 신경망에서 딥러닝 에이전트 피지컬까지

신경망에서 딥러닝 에이전트 피지컬까지

아래는 신경망의 탄생부터 딥러닝, LLM, 에이전틱 AI, 피지컬 AI까지를 하나의 흐름으로 가르치기 위한 교육과정안입니다.

뉴런을 흉내 낸 계산 장치 → 학습하는 퍼셉트론 → 여러 층의 신경망 → 깊은 신경망 → 이미지·언어·생성 모델 → 도구를 쓰는 에이전트 → 실제 세계에서 행동하는 피지컬 AI

1. 전체 발전 흐름 한눈에 보기

| 시기 | 발전 단계 | 꼭 알아야 할 핵심 | 대표 개념·알고리즘 |
| --- | --- | --- | --- |
| 1943–1958 | 인공 뉴런의 탄생 | 뇌의 뉴런을 논리·계산 단위로 모델링하려는 시도 | McCulloch-Pitts neuron, Hebbian learning |
| 1958–1969 | 퍼셉트론 시대 | 기계가 예시를 보고 가중치를 조정해 분류할 수 있다는 발상 | Perceptron, 선형 분류, OR/AND/XOR |
| 1969–1986 | 한계와 침체 | 단일 퍼셉트론은 XOR 같은 비선형 문제를 풀 수 없음 | 선형분리, hidden layer 필요성 |
| 1986–1998 | 역전파와 다층 신경망 | 오차를 뒤로 보내 가중치를 조정하면서 여러 층을 학습 | Backpropagation, MLP, gradient descent |
| 1998–2011 | 초기 딥러닝 구조 | 이미지·순차 데이터에 맞는 구조가 등장 | CNN, LeNet, RNN, LSTM |
| 2012–2016 | 딥러닝 혁명 | GPU, 대규모 데이터, 깊은 CNN이 이미지 인식 성능을 폭발적으로 높임 | AlexNet, ReLU, Dropout, ResNet, YOLO |
| 2017–2020 | Transformer와 사전학습 | RNN 중심 언어처리에서 attention 중심 구조로 전환 | Self-Attention, Transformer, BERT, GPT |
| 2020–2023 | Foundation Model·생성형 AI | 거대 모델이 언어·이미지·코드·멀티모달 작업을 범용적으로 수행 | GPT-3, CLIP, DALL·E, Diffusion, RAG |
| 2023–2026 | 에이전틱 AI | LLM이 도구를 쓰고, 계획하고, 여러 단계 작업을 수행 | Tool use, memory, planning, multi-agent, guardrails |
| 2024–2026 | 피지컬 AI | AI가 텍스트·이미지 이해를 넘어 실제 로봇 행동으로 연결 | VLA, robot foundation model, world model, sim-to-real |

1943년 McCulloch와 Pitts의 수리적 뉴런 모델은 현대 신경망의 출발점으로 자주 언급되고, 1958년 Rosenblatt의 퍼셉트론은 “예시로부터 학습하는 기계”라는 아이디어를 보여준 초기 신경망이었습니다. 이후 1969년 Minsky와 Papert의 Perceptrons는 퍼셉트론의 계산 능력을 분석하며 단층 신경망의 한계를 부각했고, 1986년 Rumelhart·Hinton·Williams의 역전파 논문은 다층 신경망 학습의 부활을 이끌었습니다. (Machine Learning UChicago)

2. 교육과정 전체 구조

이 과정은 12개 모듈로 설계하면 가장 자연스럽습니다.

| 모듈 | 주제 | 핵심 질문 |
| --- | --- | --- |
| 1 | 인공 뉴런과 퍼셉트론 | 뉴런 하나로 판단한다는 것은 무엇인가? |
| 2 | OR, AND, XOR와 선형분리 | 왜 단일 뉴런으로는 XOR가 안 되는가? |
| 3 | 다층 신경망과 역전파 | 여러 층은 어떻게 스스로 가중치를 조정하는가? |
| 4 | 학습률, 손실, 최적화 | AI는 어떻게 “틀린 정도”를 줄여가는가? |
| 5 | 표현학습과 임베딩 | AI는 데이터를 어떤 공간에 배치해 이해하는가? |
| 6 | CNN과 이미지 인식 | AI는 이미지를 어떻게 부분 특징으로 보는가? |
| 7 | RNN/LSTM과 순차 데이터 | AI는 이전 정보를 어떻게 기억하는가? |
| 8 | Transformer와 LLM | ChatGPT류 모델은 문맥과 다음 토큰을 어떻게 다루는가? |
| 9 | 생성형 AI | AI는 이미지·음악·영상을 어떻게 생성하는가? |
| 10 | 강화학습과 의사결정 | 에이전트는 보상으로 어떻게 행동을 배우는가? |
| 11 | 에이전틱 AI | LLM이 도구를 쓰고 계획하는 시스템은 어떻게 구성되는가? |
| 12 | 피지컬 AI | AI가 실제 로봇과 센서·행동으로 연결되려면 무엇이 필요한가? |

3. 모듈별 교육과정, 핵심 개념, 실습 자료

모듈 1. 인공 뉴런과 퍼셉트론

핵심 개념

인공 뉴런은 입력값에 가중치를 곱해 더하고, 기준을 넘으면 1, 넘지 못하면 0을 출력하는 구조입니다. 퍼셉트론은 이 아이디어를 실제 학습 알고리즘으로 만든 초기 모델이며, 현대 신경망의 조상으로 이해하면 좋습니다. Rosenblatt의 1958년 퍼셉트론 연구는 기계가 예시를 통해 패턴을 구분할 수 있다는 가능성을 보여주었습니다. (UIC 수학 홈페이지)

점수 = x1 × w1 + x2 × w2 + b

점수 >= 0 → 1

점수 < 0  → 0

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| 가중치 | 입력이 결과에 미치는 중요도 |
| 편향 | 기준선을 이동시키는 값 |
| 활성화 함수 | 계산 결과를 출력값으로 바꾸는 함수 |
| 선형 분류 | 직선 또는 평면으로 데이터를 나누는 방식 |
| 퍼셉트론 학습 규칙 | 틀린 예시에 대해 가중치를 조금씩 고치는 방식 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| Perceptron Interactive Playground | OR/AND 데이터에서 퍼셉트론이 오분류를 만날 때마다 가중치를 어떻게 업데이트하고 결정경계를 이동시키는지 단계별로 볼 수 있습니다. (Virtual Labs) |
| Perceptron Visualizer | 점을 직접 찍고 퍼셉트론이 두 클래스를 나누는 직선을 학습하는 과정을 볼 수 있습니다. (Perceptron Demo) |
| ML Visualizer | 퍼셉트론, MLP, 오토인코더, Transformer 등 여러 신경망 구조를 한곳에서 비교할 수 있습니다. (ML Visualizer) |

몸으로 체득하는 활동

학생을 입력, 가중치, 뉴런, 출력 역할로 나눕니다.

모듈 2. OR, AND, XOR와 신경망의 필요성

핵심 개념

OR와 AND는 단일 뉴런으로 해결할 수 있지만, XOR는 한 개의 직선으로 0과 1을 나눌 수 없습니다. 이것이 은닉층이 왜 필요한가를 설명하는 가장 좋은 예입니다. Minsky와 Papert의 Perceptrons는 퍼셉트론의 계산 능력과 한계를 분석한 대표적 저작입니다. (MIT Press Direct)

| 입력 x1 | 입력 x2 | OR | AND | XOR |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 |

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| 선형분리 | 직선 하나로 클래스를 나눌 수 있는 상태 |
| 비선형 문제 | 직선 하나로는 나눌 수 없는 문제 |
| 은닉층 | 중간 판단을 만들어 복잡한 문제를 풀게 하는 층 |
| MLP | 여러 층의 퍼셉트론으로 구성된 다층 신경망 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| Neural Network XOR Visualizer | XOR가 왜 단일 뉴런으로 안 되고, 은닉층이 생기면 어떻게 해결되는지 볼 수 있습니다. (Iris) |
| TensorFlow Playground | 은닉층과 뉴런 수를 바꾸며 XOR, circle, spiral 같은 비선형 데이터의 결정경계를 조작합니다. (TensorFlow Playground) |
| Neural Network Visualizer | 순전파와 역전파를 단계별로 보고, 은닉층이 학습 과정에서 어떤 역할을 하는지 관찰합니다. (NN Visual) |

놀이 활동

좌표평면 네 귀퉁이에 학생 네 명을 세웁니다.

(0,1)     (1,1)

(0,0)     (1,0)

OR, AND, XOR에 따라 1인 학생은 빨간 카드, 0인 학생은 파란 카드를 듭니다.

모듈 3. 다층 신경망과 역전파

핵심 개념

다층 신경망은 입력층, 은닉층, 출력층으로 구성됩니다. 순전파는 입력에서 출력까지 계산하는 과정이고, 역전파는 출력의 오차를 뒤로 보내 각 가중치를 얼마나 고쳐야 하는지 계산하는 과정입니다. 1986년 Nature 논문은 역전파가 신경망의 출력과 목표값 사이 차이를 줄이도록 연결 가중치를 반복 조정한다고 설명합니다. (Nature)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Forward propagation | 입력이 층을 통과해 예측값이 되는 과정 |
| Loss function | 예측값과 정답의 차이 |
| Backpropagation | 오차를 뒤로 전파해 가중치 수정량을 계산 |
| Gradient descent | 손실을 줄이는 방향으로 조금씩 이동 |
| Activation function | sigmoid, tanh, ReLU 등 비선형성을 주는 함수 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| TensorFlow Playground | 학습률, 활성화 함수, 은닉층, 정규화, 입력 특성을 바꿔가며 손실과 결정경계를 관찰합니다. (TensorFlow Playground) |
| Backpropagation Visualizer | gradient flow와 파라미터 업데이트를 시각적으로 따라가며 역전파를 이해할 수 있습니다. (Jason Hand) |
| Google ML Crash Course | 애니메이션, 시각화, 실습 문제로 신경망과 머신러닝 기본기를 다질 수 있습니다. (Google for Developers) |

몸으로 체득하는 활동

**“오차 되돌리기 릴레이”**를 합니다.

입력 학생들이 숫자를 전달합니다.

은닉층 학생들이 계산해 출력 학생에게 전달합니다.

출력이 정답과 다르면 교사가 “오차 카드”를 뒤쪽으로 보냅니다.

각 학생은 자기 가중치 카드를 조금씩 수정합니다.

이 활동으로 “AI가 틀렸을 때 앞에서부터 다시 생각하는 것이 아니라, 오차를 뒤로 보내며 고친다”는 감각을 만들 수 있습니다.

모듈 4. 학습률, 최적화, 과적합

핵심 개념

학습률이 너무 크면 목표를 지나치고, 너무 작으면 학습이 느립니다. 모델이 너무 복잡하면 학습 데이터는 잘 맞히지만 새로운 데이터에는 약해질 수 있습니다. 이것이 과적합입니다.

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Learning rate | 한 번에 가중치를 얼마나 크게 바꿀지 |
| Epoch | 전체 데이터를 한 번 학습한 횟수 |
| Overfitting | 훈련 데이터에만 지나치게 맞춘 상태 |
| Regularization | 모델이 너무 복잡해지는 것을 막는 기법 |
| Dropout | 학습 중 일부 뉴런을 꺼서 일반화를 돕는 기법 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| TensorFlow Playground | 뉴런 수를 늘리고 정규화 여부를 바꾸며 과적합과 일반화를 비교합니다. (TensorFlow Playground) |
| Google ML Crash Course Neural Network Exercises | 노드, 은닉층, 활성화 함수를 조절하며 신경망을 직접 구성하는 연습을 제공합니다. (Google for Developers) |
| D2L: Dive into Deep Learning | 수학·그림·코드·토론이 결합된 실행 가능한 딥러닝 교재입니다. (Dive into Deep Learning) |

활동 예시

TensorFlow Playground에서 circle 데이터셋을 선택합니다.

“훈련 데이터에 딱 맞는 구불구불한 경계가 좋은 모델일까요, 아니면 새로운 점도 잘 맞히는 단순한 경계가 좋은 모델일까요?”

모듈 5. 표현학습과 임베딩

핵심 개념

딥러닝의 강점은 사람이 직접 특징을 정하지 않아도, 모델이 데이터를 좋은 표현으로 바꾸어 학습한다는 점입니다. 이미지는 픽셀에서 특징맵으로, 단어는 토큰에서 벡터로, 문서는 임베딩 공간의 점으로 바뀝니다.

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Representation learning | 원본 데이터를 모델이 쓰기 좋은 표현으로 바꾸는 학습 |
| Embedding | 단어, 이미지, 문서 등을 벡터 공간의 점으로 표현 |
| Autoencoder | 데이터를 압축했다가 다시 복원하는 신경망 |
| Latent space | 압축된 의미 공간 |
| Similarity search | 가까운 벡터끼리 비슷하다고 보는 검색 방식 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| TensorFlow Embedding Projector | 고차원 임베딩을 2D/3D로 시각화해 비슷한 데이터가 가까이 모이는지 확인합니다. (TensorFlow Projector) |
| Autoencoder Interactive Playground | 입력 이미지가 encoder를 지나 2D latent space로 압축되고 decoder로 복원되는 과정을 볼 수 있습니다. (Virtual Labs) |
| VAE Latent Space Explorer | 잠재공간에서 위치를 움직이면 생성되는 숫자 이미지가 어떻게 변하는지 체험합니다. (Taylor Denouden) |

조작 활동

학생들에게 여러 동물 그림 카드를 줍니다.

“딥러닝은 이런 기준을 사람이 하나하나 정하지 않아도, 데이터 속에서 비슷한 것끼리 가까이 놓는 표현을 배웁니다.”

모듈 6. CNN과 이미지 인식

핵심 개념

CNN은 이미지를 한 번에 보는 것이 아니라 작은 필터를 움직이며 선, 모서리, 질감, 부분 형태를 찾고, 깊은 층으로 갈수록 더 복잡한 특징을 조합합니다. LeNet-5는 손글씨 숫자·문자 인식에서 CNN의 대표적 초기 성공 사례로 소개할 수 있고, LeCun의 MNIST 데모는 CNN이 픽셀 이미지에서 시각 패턴을 직접 인식하도록 설계되었다고 설명합니다. (Yann LeCun)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Convolution | 필터를 이미지 위에 움직이며 특징을 계산 |
| Kernel / Filter | 엣지, 질감 등을 찾는 작은 행렬 |
| Feature map | 필터가 반응한 결과 이미지 |
| Pooling | 특징맵을 줄여 중요한 정보만 남김 |
| Grad-CAM | 모델이 이미지의 어느 부분을 보고 판단했는지 시각화 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| CNN Explainer | convolution, ReLU, pooling, fully connected layer를 한 흐름으로 볼 수 있는 대표적 CNN 설명 도구입니다. (폴로 데이터 사이언스 클럽) |
| CNN Feature Visualizer | kernel size, stride, padding, pooling을 조작하며 필터가 특징맵을 만드는 과정을 볼 수 있습니다. (Simulations4All) |
| CNN Playground | MNIST 숫자 인식, ImageNet 분류, ResNet50 Grad-CAM, YOLO 객체탐지와 세그멘테이션을 체험할 수 있습니다. (CNN Playground) |
| Distill Feature Visualization | CNN 내부 뉴런이 어떤 시각적 특징에 반응하는지 탐구할 수 있습니다. (Distill) |

몸으로 체득하는 활동

**“사람 필터 놀이”**를 합니다.

바닥에 5×5 격자 이미지를 놓습니다.

3×3 투명 필터 카드를 겹칩니다.

학생들이 필터와 격자의 곱셈 결과를 합산합니다.

필터를 한 칸씩 밀며 feature map을 만듭니다.

이 활동을 한 뒤 CNN Feature Visualizer를 보면 convolution의 의미가 훨씬 쉽게 들어옵니다.

모듈 7. 깊은 CNN, ResNet, 객체탐지

핵심 개념

2012년 AlexNet은 ImageNet 대규모 이미지 분류에서 깊은 CNN의 힘을 보여준 상징적 사건입니다. AlexNet 논문은 1000개 클래스의 대규모 고해상도 이미지 분류에 깊은 CNN을 사용해 당시 이전 방식보다 훨씬 낮은 오류율을 달성했다고 보고했습니다. 이후 ResNet은 매우 깊은 네트워크 학습을 쉽게 만들기 위해 residual learning을 제안했고, 152층까지 깊어진 네트워크로 ImageNet 2015에서 우수한 성과를 냈습니다. (NeurIPS Papers)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| AlexNet | GPU 기반 대규모 CNN 성공 사례 |
| ReLU | 깊은 신경망 학습을 쉽게 만든 활성화 함수 |
| Dropout | 과적합 방지 |
| ResNet | 입력을 건너뛰어 더 깊은 네트워크를 학습하는 구조 |
| Object detection | 이미지 안의 객체 위치와 종류를 함께 찾는 기술 |
| YOLO | 이미지를 한 번에 보고 객체 위치와 클래스를 예측하는 객체탐지 계열 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| CNN Playground ImageNet / Grad-CAM | 이미지를 업로드해 ResNet50이 어떤 클래스로 분류하는지, Grad-CAM이 어느 부분을 강조하는지 확인합니다. (CNN Playground) |
| CNN Playground Object Detection | YOLO 기반 객체탐지·세그멘테이션을 이미지나 카메라 입력으로 체험할 수 있습니다. (CNN Playground) |
| tfjs-yolo demo | 브라우저에서 YOLO 객체탐지가 어떻게 실행되는지 보여줍니다. (Shaqian) |

실습 과제

“AI는 사진의 무엇을 봤을까?”

고양이, 컵, 자동차 사진을 넣습니다.

분류 결과를 확인합니다.

Grad-CAM으로 강조된 영역을 봅니다.

배경만 바꾸거나 일부를 가려 다시 테스트합니다.

결론은 이렇게 잡습니다.

이미지 AI는 사물을 완전히 이해한다기보다, 학습한 특징과 패턴을 근거로 예측합니다. 그래서 배경 편향이나 우연한 단서에 속을 수 있습니다.

모듈 8. RNN, LSTM과 순차 데이터

핵심 개념

RNN은 순서가 있는 데이터를 처리하기 위해 이전 입력의 흔적을 hidden state에 저장합니다. 그러나 기본 RNN은 긴 시간 간격의 정보를 오래 기억하기 어렵고, 이를 보완하기 위해 LSTM과 GRU 같은 구조가 등장했습니다. LSTM 논문은 긴 시간 간격의 정보를 학습하기 어려운 문제를 다루기 위해 input, forget, output gate를 포함한 구조를 제안했습니다. (MIT Press Direct)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| RNN | 같은 셀을 시간 단계마다 반복 사용 |
| Hidden state | 이전 입력의 정보를 담은 기억 |
| Vanishing gradient | 뒤쪽 오차가 앞쪽까지 잘 전달되지 않는 문제 |
| LSTM | gate를 이용해 기억을 유지·삭제하는 구조 |
| GRU | LSTM보다 단순한 순차 모델 구조 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| RNN Interactive Playground | 하나의 RNN cell이 시간 단계마다 재사용되고 hidden state가 이동하는 과정을 볼 수 있습니다. (Virtual Labs) |
| LSTM Gates Playground | forget, input, output gate 값을 조작하며 cell state가 어떻게 유지·삭제되는지 볼 수 있습니다. (Nipun Batra) |
| Distill: Visualizing Memorization in RNNs | RNN, LSTM, GRU가 단기·장기 기억을 어떻게 사용하는지 시각적으로 탐구합니다. (Distill) |
| RNN Architecture Visualizer | embedding, hidden state, weight matrix, next-token prediction을 단계별로 살펴볼 수 있습니다. (Exploring Artificial Intelligence) |

몸으로 체득하는 활동

“문장 기억 릴레이”

학생들이 줄을 섭니다.

이후 질문합니다.

“처음 정보가 뒤까지 잘 전달되었나요? 중간에 사라진 정보는 없나요?”

여기서 hidden state, 장기 의존성, LSTM gate를 설명합니다.

모듈 9. Transformer와 LLM

핵심 개념

Transformer는 recurrence나 convolution 대신 attention만으로 sequence를 처리하는 구조입니다. 2017년 Attention Is All You Need 논문은 Transformer가 recurrence와 convolution 없이 self-attention 중심으로 sequence transduction을 수행하며, 병렬화가 쉽고 번역 성능도 우수하다고 제안했습니다. (arXiv)

LLM은 텍스트를 토큰으로 쪼개고, 앞 문맥을 바탕으로 다음 토큰 확률을 예측합니다. OpenAI Tokenizer 설명에 따르면 OpenAI의 대규모 언어 모델은 텍스트를 문자 그대로가 아니라 token이라는 일반적 문자 시퀀스로 처리하고, 모델은 이 토큰 사이의 통계적 관계를 학습합니다. (OpenAI 플랫폼)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Tokenization | 문장을 토큰 단위로 쪼개기 |
| Embedding | 토큰을 벡터로 바꾸기 |
| Self-Attention | 문장 안의 각 토큰이 다른 토큰을 얼마나 참고할지 계산 |
| Q/K/V | Query, Key, Value로 attention을 계산하는 구조 |
| Multi-head attention | 여러 관점에서 관계를 동시에 보는 구조 |
| Pretraining | 대규모 데이터로 일반 언어 능력을 학습 |
| Fine-tuning / instruction tuning | 특정 목적이나 지시 따르기에 맞게 조정 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| OpenAI Tokenizer | 한국어·영어·이모지·전문용어가 어떻게 토큰으로 쪼개지는지 비교합니다. (OpenAI 플랫폼) |
| Transformer Explainer | GPT 계열 모델의 next-token prediction, self-attention, layer 구조를 인터랙티브하게 볼 수 있습니다. (폴로 데이터 사이언스 클럽) |
| LLM Visualization | GPT 스타일 Transformer 내부를 3D walkthrough로 살펴볼 수 있습니다. (Francesco Papagni) |
| BertViz | BERT, GPT-2, T5 등 Transformer 모델의 attention head를 Jupyter/Colab에서 시각화할 수 있습니다. (GitHub) |
| Hugging Face LLM Course | Transformers, Datasets, Tokenizers, Accelerate, Hub를 활용해 NLP·LLM 실습을 할 수 있습니다. (Hugging Face) |

놀이 활동

“Attention 스티커 활동”

문장:

철수는 영희에게 책을 주었다. 그녀는 고마워했다.

학생들에게 “그녀”가 누구를 가리키는지 스티커로 연결하게 합니다.

모듈 10. 생성형 AI: GAN, VAE, Diffusion, 멀티모달

핵심 개념

생성형 AI는 분류만 하는 모델이 아니라 새로운 데이터를 만들어내는 모델입니다. GAN은 generator와 discriminator가 경쟁하며 더 그럴듯한 데이터를 만들고, VAE와 autoencoder는 잠재공간을 학습합니다. Diffusion 모델은 노이즈에서 시작해 점차 노이즈를 제거하면서 이미지를 생성합니다. Diffusion Explainer는 Stable Diffusion이 텍스트 프롬프트를 이미지로 바꾸는 과정을 브라우저에서 설명하는 도구입니다. (제랄디 카사얀 포트폴리오)

2021년 CLIP은 이미지와 텍스트 쌍을 이용해 자연어로 시각 개념을 지정하고 zero-shot 분류를 가능하게 한 대표적 멀티모달 모델이고, DALL·E는 텍스트-이미지 데이터를 하나의 토큰 흐름으로 다루어 이미지 생성을 수행했습니다. (OpenAI)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Autoencoder | 압축과 복원 |
| VAE | 확률적 잠재공간을 이용한 생성 |
| GAN | 생성자와 판별자의 경쟁 |
| Diffusion | 노이즈 추가와 제거를 통한 생성 |
| CLIP | 이미지와 텍스트를 같은 의미 공간에 연결 |
| Text-to-image | 텍스트 프롬프트로 이미지 생성 |
| Text-to-video / world model | 시간과 물리 변화를 포함한 생성·예측 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| GAN Lab | 2D 데이터 분포에서 generator와 discriminator가 서로 영향을 주며 학습하는 과정을 시각화합니다. (제랄디 카사얀 포트폴리오) |
| Diffusion Explainer | Stable Diffusion이 프롬프트를 latent representation과 denoising 과정을 거쳐 이미지로 바꾸는 흐름을 보여줍니다. (폴로 데이터 사이언스 클럽) |
| Autoencoder Playground | encoder, latent space, decoder, reconstruction을 한눈에 볼 수 있습니다. (Virtual Labs) |
| DiffusionDemo Activity Guide | 노이즈에서 이미지가 드러나는 과정, latent space 이동, seed 차이를 활동지 기반으로 다룹니다. (AI4K12) |

실습 과제

“프롬프트 하나 바꾸면 이미지가 어떻게 달라질까?”

Diffusion Explainer에서 다음처럼 프롬프트를 바꿉니다.

a cute rabbit

a cute rabbit wearing sunglasses

a cute rabbit wearing sunglasses in a classroom

학생은 어떤 단어가 이미지의 어느 요소를 바꾸는지 관찰합니다.

모듈 11. 강화학습과 딥러닝 에이전트

핵심 개념

강화학습은 정답 라벨을 직접 주는 방식이 아니라, 에이전트가 행동을 하고 보상을 받으며 더 나은 정책을 학습하는 방식입니다. 딥러닝과 결합하면 고차원 입력을 처리하는 딥 강화학습이 됩니다.

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Agent | 행동을 선택하는 주체 |
| Environment | 에이전트가 상호작용하는 세계 |
| State | 현재 상황 |
| Action | 선택 가능한 행동 |
| Reward | 행동 결과로 받은 보상 |
| Policy | 상태에서 행동을 고르는 전략 |
| Q-learning / SARSA | 상태-행동 가치 학습 |
| DQN / Policy Gradient / PPO | 딥러닝 기반 강화학습 계열 |

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| Reinforcement Learning Playground | Q-Learning, SARSA, Value Iteration, Policy Iteration 등을 grid world에서 실행하고 Q-table, policy arrow, value heatmap을 봅니다. (Simulations4All) |
| RL Interactive Lab | Bandit, GridWorld, CartPole, Rocket Landing에서 여러 강화학습 알고리즘을 실시간으로 비교합니다. (GitHub) |
| Gymnasium | 강화학습 환경을 위한 표준 API와 다양한 reference environment를 제공합니다. (체육관) |
| MuJoCo | 로봇·생체역학·물리 기반 시뮬레이션을 위한 오픈소스 물리 엔진입니다. (MuJoCo) |

몸으로 체득하는 활동

“보상 설계 게임”

교실 격자판에서 학생 한 명이 로봇 역할을 합니다.

목표 도착: +10

벽 충돌: -5

한 칸 이동: -1

보물 획득: +3

학생들이 보상표를 바꾸면 로봇 행동이 어떻게 달라지는지 관찰합니다.

모듈 12. 에이전틱 AI: LLM이 도구를 쓰는 시대

핵심 개념

에이전틱 AI는 단순히 질문에 답하는 LLM이 아니라, 목표를 이해하고, 계획을 세우고, 도구를 호출하고, 중간 결과를 확인하며 여러 단계 작업을 수행하는 시스템입니다. OpenAI Agents SDK 문서는 agent를 instructions, tools, handoffs, guardrails, structured outputs 등을 갖춘 LLM 기반 앱의 핵심 building block으로 설명합니다. (OpenAI 개발자)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Tool use | 검색, 코드 실행, API 호출 등 외부 도구 사용 |
| Planning | 목표를 작은 단계로 나눔 |
| Memory | 이전 대화나 작업 상태를 보존 |
| RAG | 외부 문서 검색 결과를 LLM 답변에 결합 |
| Multi-agent | 여러 역할의 에이전트가 협력 |
| Handoff | 한 에이전트가 다른 에이전트에게 작업 넘김 |
| Guardrails | 안전·정확성·정책 위반을 막는 제어 장치 |
| Human-in-the-loop | 사람이 중간 승인·검토를 담당 |

RAG는 2020년 논문에서 사전학습된 parametric memory와 Wikipedia 같은 외부 dense index를 결합하는 방식으로 소개되었고, 2020년대 LLM 응용에서 “모델이 외부 지식에 근거해 답하도록 돕는 구조”로 중요해졌습니다. (arXiv)

추천 실습 자료

| 자료 | 활용 방법 |
| --- | --- |
| OpenAI Agents SDK | LLM에 instructions, tools, handoffs, guardrails를 붙여 실제 agent workflow를 구현합니다. (OpenAI 개발자) |
| Agently | OpenAI Agents SDK 예제를 브라우저에서 직접 실행하며 agent 코드를 배울 수 있습니다. (AI Agents Playground) |
| AutoGen Studio | Microsoft AutoGen 기반 multi-agent workflow를 빠르게 프로토타입하기 위한 UI입니다. 공식 문서는 production-ready 앱이 아니라 프로토타입과 데모용이라고 명시합니다. (Microsoft GitHub) |
| LangGraph | 장기 실행, 상태 유지, 디버깅이 필요한 agent workflow를 구성하는 프레임워크입니다. (LangChain) |
| CrewAI Crew Studio | drag-and-drop 방식으로 agents, tasks, tools를 canvas에 배치해 workflow를 구성합니다. (CrewAI) |

놀이 활동

“사람 에이전트 워크플로우”

학생을 다음 역할로 나눕니다.

Planner: 할 일 목록 작성

Researcher: 자료 찾기

Coder: 계산 또는 코드 작성

Critic: 오류 검토

Reporter: 최종 보고서 작성

Human reviewer: 승인 또는 수정 지시

이 활동 뒤 AutoGen Studio나 Crew Studio에서 같은 구조를 시각적으로 구성합니다.

모듈 13. 피지컬 AI: 로봇, 센서, 시뮬레이션, VLA

핵심 개념

피지컬 AI는 AI가 텍스트나 이미지 안에서만 작동하는 것이 아니라, 센서로 현실을 보고, 세계의 물리적 변화를 예측하고, 실제 행동을 수행하는 단계입니다. 여기에는 로봇 제어, imitation learning, reinforcement learning, sim-to-real, digital twin, vision-language-action model이 포함됩니다.

2026년 기준으로 피지컬 AI는 빠르게 확장되는 영역입니다. NVIDIA는 Physical AI Learning을 통해 자율 로봇, 디지털 트윈, AI-powered system을 배우는 무료 self-paced 과정을 제공하고, Isaac Lab은 로봇 정책을 대규모로 학습시키기 위한 GPU 가속 시뮬레이션 프레임워크로 소개됩니다. (NVIDIA Docs)

Google DeepMind의 Gemini Robotics는 vision-language-action 모델로, 시각 입력과 사용자 지시를 처리해 로봇이 물리적 공간에서 추론하고 행동하도록 설계된 모델군입니다. NVIDIA의 Isaac GR00T는 언어와 이미지 같은 멀티모달 입력을 받아 다양한 환경에서 조작 작업을 수행하는 humanoid robot foundation model로 소개됩니다. (Google DeepMind)

핵심 알고리즘·기술

| 개념 | 설명 |
| --- | --- |
| Embodied AI | 몸을 가진 에이전트가 환경과 상호작용하는 AI |
| Sensor fusion | 카메라, LiDAR, IMU, 마이크 등 센서 정보를 통합 |
| Imitation learning | 사람이 시범 보인 행동을 따라 배우기 |
| Reinforcement learning for robotics | 보상으로 로봇 행동 정책 학습 |
| VLA | Vision-Language-Action 모델 |
| World model | 세계가 어떻게 변할지 예측하는 모델 |
| Digital twin | 현실 세계를 가상 시뮬레이션으로 복제 |
| Sim-to-real | 시뮬레이션에서 배운 정책을 실제 로봇으로 옮기기 |
| Edge AI | AI 모델을 클라우드가 아니라 기기 안에서 실행 |

추천 실습 자료: 입문·교육용

| 자료 | 활용 방법 |
| --- | --- |
| micro:bit CreateAI | 학생이 박수, 흔들기, 점프 같은 움직임 데이터를 모아 모델을 학습시키고, micro:bit가 그 움직임에 반응하도록 만들 수 있습니다. (Micro:bit) |
| Edge Impulse Studio | 센서·카메라·마이크 데이터를 모아 edge device에서 실행할 수 있는 모델을 학습·배포합니다. (Edge Impulse) |
| Open Roberta Lab | 브라우저 기반 그래픽 프로그래밍 환경으로 로봇과 센서를 제어하고, 일부 로봇은 시뮬레이션에서 테스트할 수 있습니다. (Roberta) |
| VEXcode VR | 실제 로봇 없이 가상 로봇을 블록 또는 Python으로 제어하며 STEM·로봇 개념을 배울 수 있습니다. (VEX Robotics) |
| UAIbot | 브라우저 기반 3D 로봇 시뮬레이터로, 로봇 구성·운동·작업 전략을 실시간으로 조작할 수 있습니다. (UAIbot) |

추천 실습 자료: 심화·대학·연구형

| 자료 | 활용 방법 |
| --- | --- |
| NVIDIA Isaac Sim | 로봇, 센서, 물리 속성, 합성 데이터, 고정밀 시뮬레이션을 구성합니다. (NVIDIA Developer) |
| NVIDIA Isaac Lab | 강화학습, demonstration learning, motion planning 같은 로봇 학습 workflow를 통합합니다. (Isaac Sim) |
| Gymnasium-Robotics | Gymnasium API 기반의 로봇 강화학습 환경 모음으로, MuJoCo 물리 엔진을 사용합니다. (파라마 로보틱스) |
| MuJoCo Playground | MJX 기반 robot learning 프레임워크로 sim-to-real 연구에 초점을 둡니다. (MuJoCo Playground) |
| Hugging Face LeRobot | 실제 로봇을 위한 모델, 데이터셋, 도구를 제공하며 imitation learning과 reinforcement learning을 포함합니다. (Hugging Face) |
| NVIDIA Cosmos | autonomous system이 세계를 이해·시뮬레이션·행동하도록 돕는 physical AI용 world foundation model 플랫폼입니다. (NVIDIA) |

몸으로 체득하는 활동

“VLA 역할극”

학생을 세 그룹으로 나눕니다.

Vision: 카메라 역할, 주변 물체 설명

Language: 사람 명령 해석

Action: 로봇 팔 역할, 실제 행동 수행

명령:

“빨간 컵을 집어서 파란 상자 안에 넣어.”

Vision 학생은 “빨간 컵은 오른쪽 앞에 있음”을 말하고, Language 학생은 목표를 단계로 나누며, Action 학생은 실제로 컵을 집어 옮깁니다.

이후 이렇게 정리합니다.

피지컬 AI는 말만 잘하는 AI가 아니라, 보고 이해하고 계획하고 실제 세계에서 안전하게 행동해야 하는 AI입니다.

4. 발전사 중심 교육과정 표

아래 표는 “역사 → 핵심 기술 → 실습 자료 → 수업 활동”을 한 줄로 연결한 버전입니다.

| 시대 | 핵심 내용 | 꼭 가르칠 개념 | 추천 자료 |
| --- | --- | --- | --- |
| 1943–1958 인공 뉴런 | 뇌의 뉴런을 계산 단위로 모델링 | 입력, 가중치, 임계값, 출력 | Perceptron Visualizer, Perceptron Playground (Perceptron Demo) |
| 1958–1969 퍼셉트론 | 예시로부터 선형 분류 학습 | OR, AND, 선형분리 | TensorFlow Playground, ML Visualizer (TensorFlow Playground) |
| 1969–1986 XOR 문제 | 단층 신경망의 한계 | XOR, 은닉층, 비선형성 | XOR Neural Network Visualizer (Iris) |
| 1986 역전파 | 오차를 뒤로 보내 가중치 수정 | loss, gradient, backprop | Backpropagation Visualizer, NN Visualizer (Jason Hand) |
| 1998 CNN | 이미지의 지역 특징 학습 | convolution, pooling, feature map | CNN Explainer, CNN Feature Visualizer (폴로 데이터 사이언스 클럽) |
| 1997–2015 RNN/LSTM | 순차 데이터 기억 | hidden state, gate, long-term dependency | RNN Playground, LSTM Gates (Virtual Labs) |
| 2012–2016 딥러닝 혁명 | 깊은 CNN과 대규모 데이터 | AlexNet, ResNet, object detection | CNN Playground, Distill Feature Visualization (CNN Playground) |
| 2017 Transformer | attention으로 문맥 처리 | token, self-attention, Q/K/V | Transformer Explainer, OpenAI Tokenizer (폴로 데이터 사이언스 클럽) |
| 2020–2023 Foundation Model | 대규모 사전학습과 범용성 | GPT-3, BERT, CLIP, RAG | Hugging Face Course, BertViz, Embedding Projector (Hugging Face) |
| 2021–2024 생성형 AI | 텍스트·이미지·영상 생성 | GAN, VAE, diffusion, text-to-image | GAN Lab, Diffusion Explainer, Autoencoder Playground (제랄디 카사얀 포트폴리오) |
| 2023–2026 에이전틱 AI | LLM이 도구를 쓰고 workflow 수행 | tools, memory, multi-agent, guardrails | OpenAI Agents SDK, AutoGen Studio, LangGraph, CrewAI Studio (OpenAI 개발자) |
| 2024–2026 피지컬 AI | AI가 실제 세계에서 행동 | VLA, robot learning, world model, sim-to-real | micro:bit CreateAI, Isaac Lab, LeRobot, Gemini Robotics, GR00T (Micro:bit) |

5. 학습자 수준별 운영안

입문자·초중등용 8차시

| 차시 | 주제 | 활동 |
| --- | --- | --- |
| 1 | 뉴런 하나로 판단하기 | 학생이 입력·가중치·뉴런 역할을 맡아 계산 |
| 2 | OR, AND, XOR | 네 점 색칠하고 직선으로 나눠보기 |
| 3 | 신경망 학습 | TensorFlow Playground에서 뉴런 수 바꾸기 |
| 4 | 이미지 AI | CNN Explainer로 필터와 풀링 보기 |
| 5 | 순서 기억 AI | RNN 릴레이 활동과 LSTM gate 보기 |
| 6 | LLM 원리 | Tokenizer와 Transformer Explainer 체험 |
| 7 | 생성형 AI | Diffusion Explainer로 노이즈 제거 과정 보기 |
| 8 | AI 에이전트와 로봇 | 역할극으로 도구 사용 agent와 VLA 로봇 흉내내기 |

고등·대학 입문용 15주 과정

| 주차 | 주제 | 핵심 실습 |
| --- | --- | --- |
| 1 | 신경망 발전사 | 타임라인 만들기 |
| 2 | 퍼셉트론 | OR/AND/XOR 구현 |
| 3 | MLP와 역전파 | XOR를 은닉층으로 해결 |
| 4 | 손실과 최적화 | 학습률 실험 |
| 5 | 표현학습 | autoencoder와 embedding projector |
| 6 | CNN 기초 | convolution, pooling 조작 |
| 7 | CNN 심화 | ResNet, Grad-CAM, object detection |
| 8 | RNN/LSTM | hidden state, gate 시각화 |
| 9 | Attention | attention score 손계산 |
| 10 | Transformer | Transformer Explainer 분석 |
| 11 | LLM | tokenization, prompt, RAG |
| 12 | 생성형 AI | GAN과 Diffusion 비교 |
| 13 | 강화학습 | GridWorld에서 Q-learning |
| 14 | 에이전틱 AI | 도구 사용 agent workflow 구성 |
| 15 | 피지컬 AI | micro:bit/Edge Impulse/로봇 시뮬레이션 프로젝트 |

6. 캡스톤 프로젝트 예시

| 프로젝트 | 연결 개념 | 추천 도구 |
| --- | --- | --- |
| XOR를 해결하는 작은 신경망 만들기 | 퍼셉트론, 은닉층, 역전파 | TensorFlow Playground, XOR Visualizer |
| 손글씨 숫자 인식 설명하기 | CNN, feature map, Grad-CAM | CNN Explainer, CNN Playground |
| 문장 기억 실험 | RNN, LSTM, hidden state | RNN Playground, LSTM Gates |
| 한국어 토큰 분석 보고서 | tokenization, LLM, context length | OpenAI Tokenizer |
| Attention 지도 만들기 | self-attention, Q/K/V | Transformer Explainer, BertViz |
| 이미지 생성 원리 설명 영상 만들기 | diffusion, latent space, prompt | Diffusion Explainer |
| 문서 검색 챗봇 설계 | RAG, embedding, agent | Hugging Face, LangGraph, OpenAI Agents SDK |
| AI 운동 타이머 | sensor AI, edge AI, physical AI | micro:bit CreateAI |
| 스마트 분류 장치 | edge AI, sensor, deployment | Edge Impulse |
| 가상 로봇 배송 미션 | robot control, planning, RL | VEXcode VR, Open Roberta, UAIbot |
| 로봇 팔 모방학습 기획 | imitation learning, LeRobot, VLA | LeRobot, Isaac Lab |

7. 핵심 사이트 TOP 25

| 순위 | 자료 | 가장 좋은 용도 |
| --- | --- | --- |
| 1 | Perceptron Interactive Playground | 퍼셉트론과 OR/AND 학습 |
| 2 | XOR Neural Network Visualizer | XOR와 은닉층 필요성 |
| 3 | TensorFlow Playground | 신경망 구조·학습률·과적합 |
| 4 | Neural Network Visualizer | 순전파·역전파 |
| 5 | Google ML Crash Course | 기초 개념과 인터랙티브 실습 |
| 6 | Embedding Projector | 임베딩 공간 시각화 |
| 7 | Autoencoder Playground | 압축·복원·잠재공간 |
| 8 | CNN Explainer | CNN 전체 구조 |
| 9 | CNN Feature Visualizer | 필터·stride·padding·pooling |
| 10 | CNN Playground | MNIST, ResNet, YOLO, Grad-CAM |
| 11 | Distill Feature Visualization | CNN 내부 해석 |
| 12 | RNN Interactive Playground | hidden state와 sequence |
| 13 | LSTM Gates Playground | forget/input/output gate |
| 14 | OpenAI Tokenizer | 토큰화 이해 |
| 15 | Transformer Explainer | GPT식 Transformer 구조 |
| 16 | BertViz | attention head 분석 |
| 17 | Hugging Face LLM Course | Transformer·LLM 코드 실습 |
| 18 | GAN Lab | 생성자·판별자 경쟁 |
| 19 | Diffusion Explainer | Stable Diffusion 원리 |
| 20 | RL Playground | 보상 기반 에이전트 학습 |
| 21 | OpenAI Agents SDK | agent workflow 구현 |
| 22 | AutoGen Studio / LangGraph / CrewAI Studio | multi-agent와 workflow 시각화 |
| 23 | micro:bit CreateAI | 움직임 데이터 기반 피지컬 AI |
| 24 | Edge Impulse Studio | 센서·카메라 모델을 edge device에 배포 |
| 25 | Isaac Lab / LeRobot / Gemini Robotics / GR00T | 2026년 기준 로봇 foundation model과 피지컬 AI 심화 |

8. 이 교육과정의 핵심 내용

이 과정을 관통하는 문장은 다음입니다.

신경망은 처음에는 선 하나를 긋는 단순한 뉴런에서 출발했지만, 은닉층과 역전파를 만나 복잡한 패턴을 학습하게 되었고, CNN은 이미지를, RNN은 순서를, Transformer는 문맥을, 생성 모델은 새로운 데이터를, 에이전틱 AI는 도구 사용과 계획을, 피지컬 AI는 실제 세계의 행동을 다루게 되었습니다.

수업에서는 기술 이름을 외우게 하기보다 다음 흐름을 몸으로 느끼게 하는 것이 좋습니다.

입력 → 가중치 → 출력

출력 오차 → 가중치 수정

얕은 신경망 → 깊은 신경망

픽셀 → 특징 → 객체

토큰 → 임베딩 → attention → 다음 토큰

프롬프트 → 생성

목표 → 계획 → 도구 사용

시각·언어 → 행동 → 실제 세계

가장 추천하는 전체 실습 흐름은 다음입니다.

Perceptron Playground

→ TensorFlow Playground

→ CNN Explainer

→ RNN / LSTM Visualizer

→ Transformer Explainer

→ Diffusion Explainer

→ RL Playground

→ OpenAI Agents SDK 또는 AutoGen Studio

→ micro:bit CreateAI / Edge Impulse

→ Isaac Lab / LeRobot / GR00T

이 순서로 진행하면 학습자는 “AI가 똑똑하다”는 막연한 인상에서 벗어나, 어떤 구조가 어떤 문제를 풀기 위해 등장했고, 그 구조가 다음 시대의 AI로 어떻게 확장되었는지를 체계적으로 이해할 수 있습니다.


---


# 원본 파일: 일반 성인을 위한 인공지능 교육.extracted.md


# 일반 성인을 위한 인공지능 교육

일반 성인을 위한 인공지능 교육

아래는 인공지능을 잘 모르는 일반 성인이 “개념을 이해하고 → 직접 만져보고 → 현실 문제 해결에 적용”할 수 있도록 정리한 체험형 AI 학습 자료 목록입니다.
업무 효율, 생활 문제 해결, 데이터 기반 의사결정, 콘텐츠 제작, 윤리적 판단까지 연결되도록 구성하는 것이 좋습니다.

1. 일반 성인 대상 AI 이해의 큰 흐름

일반 성인에게 인공지능을 가르칠 때는 알고리즘 이름부터 들어가면 어렵습니다. 다음 순서가 가장 자연스럽습니다.

| 단계 | 핵심 질문 | 배울 내용 | 추천 활동 |
| --- | --- | --- | --- |
| 1단계 | AI는 무엇을 잘하고 못하는가? | AI, 머신러닝, 생성형 AI, LLM의 기본 개념 | AI 기초 강의, 간단한 챗봇 실습 |
| 2단계 | AI는 어떻게 배워서 판단하는가? | 데이터, 라벨, 예측, 분류, 오류 | 그림·소리·이미지 모델 직접 학습 |
| 3단계 | AI 모델은 어떻게 선을 긋고 구분하는가? | 지도학습, 결정경계, 과적합 | 시각화 시뮬레이션 조작 |
| 4단계 | 생성형 AI는 문장을 어떻게 처리하는가? | 토큰, 프롬프트, attention, LLM | 토크나이저, Transformer 시각화 |
| 5단계 | 내 업무에 어떻게 적용할 수 있는가? | 문서 요약, 회의 정리, 자료 분석, 디자인, 자동화 | ChatGPT, Copilot, NotebookLM, Canva 등 |
| 6단계 | AI 결과를 어떻게 믿고 검증할 것인가? | 환각, 편향, 개인정보, 책임, 공정성 | AI 윤리 게임, 편향 시뮬레이션 |

2. 성인 입문자에게 추천하는 자료 20개

A. AI 개념을 처음 이해하는 자료

| 자료 | 적합한 대상 | 무엇을 해볼 수 있나 | 현실 문제 연결 |
| --- | --- | --- | --- |
| OpenAI Academy – AI Foundations / Prompting | ChatGPT나 생성형 AI를 처음 쓰는 일반 성인 | AI, 대규모 언어 모델, ChatGPT의 기본을 배우고, 명확한 지시·맥락 제공·출력 검토·책임 있는 사용을 연습합니다. OpenAI Academy는 “AI, LLM, ChatGPT의 기초”와 “일상 업무에서 책임 있게 AI를 쓰는 방법”을 다룹니다. (OpenAI Academy) | 보고서 초안 작성, 이메일 정리, 아이디어 발상, 회의 준비 |
| Elements of AI | 비전공 성인, 시민 AI 리터러시 교육 | 프로그래밍이나 복잡한 수학 없이 AI가 무엇이고 무엇이 가능한지, 삶과 일에 어떤 영향을 주는지 배웁니다. 공식 사이트는 “비전문가를 위한 무료 AI 입문 과정”이라고 설명합니다. (Elements of AI) | AI 뉴스를 비판적으로 읽기, 조직 내 AI 도입 판단 |
| Google AI Essentials / Prompting Essentials | 직장인, 자영업자, 교사, 행정가 | 생성형 AI 도구 사용법, 프롬프트 작성, 책임 있는 AI 활용을 영상·읽기 자료·인터랙티브 연습으로 배웁니다. Google AI Essentials는 기술 경험이 없어도 시작할 수 있는 자기주도 과정으로 소개됩니다. (Grow with Google US) | 반복 업무 줄이기, 자료 초안 만들기, AI 활용 습관 만들기 |
| Microsoft 365 Copilot 학습 자료 / Prompt Gallery | Microsoft 365를 쓰는 직장인 | Word, Excel, PowerPoint, Outlook, Teams에서 Copilot을 어떻게 쓰는지 영상과 프롬프트 예시로 배웁니다. Microsoft는 Copilot Prompt Gallery를 Word, Excel, PowerPoint 등에서 바로 쓸 수 있는 프롬프트 모음으로 제공합니다. (Microsoft 지원) | 메일 요약, 회의록 정리, 제안서 초안, 프레젠테이션 작성 |
| Google Machine Learning Crash Course 한국어판 | 조금 더 원리를 알고 싶은 성인 | 애니메이션, 대화형 시각화, 실습으로 머신러닝 개념을 익힙니다. Google은 이 과정을 “머신러닝에 대한 빠르고 실용적인 소개”로 설명하며 한국어 페이지도 제공합니다. (Google for Developers) | 데이터 분석·AI 프로젝트 입문, 사내 AI 교육 심화 과정 |

B. AI가 데이터를 보고 판단하는 원리를 조작하는 자료

| 자료 | 조작 방법 | 배울 수 있는 개념 | 현실 문제 연결 |
| --- | --- | --- | --- |
| R2D3 – A Visual Introduction to Machine Learning | 스크롤을 내리며 의사결정나무가 데이터를 어떻게 나누는지 시각적으로 봅니다. R2D3는 통계적 사고를 인터랙티브 디자인으로 표현하는 프로젝트이며, 의사결정나무와 bias/variance를 시각화합니다. (R2D3) | 예측, 조건 분기, 의사결정나무, 과적합 | 고객 이탈 예측, 대출 심사, 진단 보조, 가격 예측 |
| TensorFlow Playground | 은닉층, 뉴런 수, 학습률, 활성화 함수, 입력 특성을 바꾸며 결정경계를 관찰합니다. 배경색은 모델의 예측과 확신 정도를 보여줍니다. (TensorFlow Playground) | 신경망, 학습률, 과적합, 일반화 | “모델을 복잡하게 만들수록 항상 좋은가?” 실험 |
| ML Algorithm Visualizer – Simulations4All | 직접 데이터 포인트를 찍고, 선형회귀·로지스틱 회귀·KNN·K-Means·의사결정나무·SVM의 결과를 비교합니다. (Simulations4All) | 지도학습, 비지도학습, 알고리즘별 판단 차이 | 고객 분류, 불량품 분류, 수요 예측, 설문 분석 |
| K-Means Clustering Visualizer | 점을 추가하고 K값을 바꾸며 군집이 어떻게 생기는지 봅니다. 이 도구는 점 찍기, K값 조절, 군집 애니메이션, 중심점 표시를 제공합니다. (Selqio) | 비지도학습, 군집화, 고객 세분화 | 고객 유형 나누기, 지역 상권 분류, 설문 응답자 그룹화 |
| Reinforcement Learning Playground | 미로형 grid world에서 보상, 장애물, 학습률, 탐험률을 조작하며 에이전트가 학습하는 모습을 봅니다. 이 도구는 Q-Learning, SARSA, Value Iteration 등을 실시간 시각화합니다. (Simulations4All) | 강화학습, 보상, 정책, 시행착오 | 배송 경로, 로봇 이동, 게임 AI, 반복 의사결정 최적화 |

C. 직접 AI 모델을 만들어보는 노코드·저코드 자료

| 자료 | 난이도 | 무엇을 만들 수 있나 | 현실 문제 연결 |
| --- | --- | --- | --- |
| Teachable Machine | 매우 쉬움 | 이미지, 소리, 포즈 데이터를 직접 모아 모델을 학습시킵니다. 공식 사이트는 “이미지·소리·포즈를 인식하는 모델을 빠르고 쉽게 만들 수 있고, 코딩이 필요 없다”고 설명합니다. (Teachable Machine) | 불량품 사진 분류, 손동작 인식, 소리 알림, 자세 인식 |
| Machine Learning for Kids | 쉬움 | 텍스트, 그림, 숫자, 소리 예시를 모아 모델을 훈련하고 Scratch 같은 도구와 연결합니다. (Machine Learning for Kids) | 민원 문장 분류, 감정 분류, 간단한 챗봇, 자동 응답 규칙 만들기 |
| LearningML | 쉬움 | 텍스트나 이미지 데이터를 모아 분류 모델을 만들고 Scratch와 연결해 인터랙티브 경험을 만듭니다. (LearningML) | 상품 리뷰 긍·부정 분류, 문의 유형 분류, 이미지 카테고리 분류 |
| AICE Studio / AIDU | 쉬움–중간 | 한국어 기반 노코딩 AI 실습 도구입니다. AICE 페이지는 AIDU를 “코딩 없는 AI, 모두를 위한 AI”로 소개하며, 마우스 클릭으로 데이터 분석부터 AI 모델 개발과 활용까지 경험할 수 있다고 설명합니다. (AICE) | 엑셀형 데이터 분석, 예측 모델 만들기, 사내 AI 교육 |
| Orange Data Mining | 중간 | 데이터를 불러오고, 전처리·시각화·모델 학습·평가를 블록처럼 연결합니다. Orange는 초보자와 전문가 모두를 위한 시각적 데이터 마이닝 도구이며, 코딩보다 데이터 분석에 집중하도록 돕는다고 설명합니다. (Orange Data Mining) | 매출 예측, 고객 분류, 설문 분석, 품질 데이터 분석 |
| Kaggle Learn – Intro to Machine Learning | 중간 이상 | 짧은 실습형 과정으로 머신러닝 핵심 아이디어를 배우고 첫 모델을 만듭니다. Kaggle Learn은 즉시 적용 가능한 실용 데이터 기술을 무료 코스로 제공한다고 설명합니다. (Kaggle) | Python 기반 데이터 분석 입문, 실제 데이터셋으로 예측 모델 실습 |

D. 딥러닝·LLM 원리를 눈으로 보는 자료

| 자료 | 무엇을 보여주나 | 일반 성인에게 설명할 때의 포인트 | 현실 문제 연결 |
| --- | --- | --- | --- |
| CNN Explainer | 이미지 인식 모델인 CNN이 convolution, ReLU, pooling, fully connected layer를 거쳐 분류하는 과정을 시각화합니다. 공식 설명은 “비전문가가 CNN을 배울 수 있도록 설계된 인터랙티브 시각화 시스템”이라고 합니다. (조지아텍 데이터사이언스 폴로클럽) | AI가 사진 전체를 마법처럼 보는 것이 아니라, 작은 특징을 단계적으로 조합한다는 점 | 제품 결함 탐지, 의료 영상, CCTV 분석, 농작물 병해 판별 |
| Transformer Explainer | GPT 같은 LLM이 텍스트를 입력받아 다음 토큰을 예측하고 self-attention을 사용하는 과정을 보여줍니다. (조지아텍 데이터사이언스 폴로클럽) | ChatGPT류 모델은 “다음에 올 말”을 예측하며, 문맥 속 단어 관계를 계산한다는 점 | 프롬프트 설계, 문서 요약, 챗봇 기획 |
| LLM Visualization – Brendan Bycroft | GPT 스타일 Transformer 내부 구조를 3D로 탐색합니다. 제작자는 이 도구를 ChatGPT를 뒷받침하는 LLM 알고리즘을 시각화하고, 덧셈·곱셈 수준까지 살펴보는 walkthrough로 소개합니다. (Bbycroft) | LLM도 결국 숫자 계산의 연속이라는 점 | 생성형 AI 결과를 과신하지 않도록 설명할 때 |
| OpenAI Tokenizer | 문장이 토큰으로 어떻게 쪼개지는지 보여줍니다. OpenAI Tokenizer는 텍스트의 token 수와 character 수를 확인할 수 있고, 영어 기준으로 token이 대략 어느 정도 길이인지 설명합니다. (OpenAI 플랫폼) | AI가 글자를 사람처럼 읽는 것이 아니라 토큰 단위로 처리한다는 점 | 긴 문서 요약, 프롬프트 비용·문맥 길이 이해 |
| MLU-Explain | Amazon Machine Learning University의 시각적 설명 자료로, 머신러닝 개념을 visual essay 형식으로 설명합니다. (MLU-Explain) | 어려운 수식 없이 개념을 그림으로 이해 | 회귀, 편향, 손실, 분류 개념 입문 |
| ML Visualizer | 퍼셉트론, MLP, 오토인코더, Transformer, CNN Encoder-Decoder 등 여러 모델 구조를 실시간 데모로 탐색합니다. (ML Visualizer) | 여러 AI 구조가 문제 유형에 따라 다르게 쓰인다는 점 | 모델 선택의 감각 만들기 |

E. 현실 문제 해결에 바로 쓰기 좋은 생성형 AI·업무 도구

| 문제 상황 | 추천 자료 | 어떻게 활용하나 |
| --- | --- | --- |
| 긴 문서, 보고서, 회의자료를 빠르게 이해해야 할 때 | NotebookLM | 내가 제공한 자료를 기반으로 요약·질의응답·학습자료를 만들 수 있습니다. Google은 NotebookLM을 소스를 분석해 복잡한 내용을 명확하게 풀어주는 AI 조사 도구이자 사고 파트너로 설명합니다. (Google NotebookLM) |
| 공공 데이터로 지역·사회 문제를 살펴볼 때 | Data Commons Explore | 자연어로 “어느 지역의 고령화율이 높은가?”, “실업률과 소득은 어떤 관계가 있는가?” 같은 질문을 던지고 시각화를 얻을 수 있습니다. Data Commons는 LLM을 활용해 자연어 질문을 공공 데이터로 연결하며, 결과는 Data Commons의 실제 데이터와 원출처 링크에서 나온다고 설명합니다. (Data Commons) |
| 보고서, 기획서, 이메일 초안을 만들 때 | OpenAI Academy Prompting / Google Prompting Essentials | 명확한 목표, 맥락, 출력 형식을 넣어 프롬프트를 만드는 연습을 합니다. OpenAI Academy는 좋은 프롬프트가 모델이 원하는 결과를 이해하도록 돕는다고 설명합니다. (OpenAI Academy) |
| Microsoft 365 안에서 업무 효율을 높이고 싶을 때 | Microsoft Copilot Video Tutorials / Prompt Gallery | Outlook, Teams, Word, Excel, PowerPoint에서 사용할 수 있는 프롬프트 예시와 영상 튜토리얼을 활용합니다. (Microsoft 지원) |
| 프레젠테이션·포스터·홍보물을 빠르게 만들 때 | Canva Magic Design | 텍스트나 미디어를 입력하면 디자인 후보를 자동 생성합니다. Canva는 Magic Design을 프롬프트나 사진을 바탕으로 맞춤 디자인을 생성하는 AI 디자인 도구로 설명합니다. (Canva) |
| 텍스트를 도식·그림·인포그래픽으로 바꾸고 싶을 때 | Napkin AI | 기존 텍스트를 다이어그램, 차트, 장면, 이미지 같은 시각 자료로 변환합니다. Napkin은 비즈니스 스토리텔링용 visual AI로 자신을 소개합니다. (Napkin AI) |
| 발표자료 초안을 자동 생성하고 싶을 때 | Gamma | 주제나 텍스트를 입력하면 발표자료, 문서, 웹페이지 형식으로 초안을 생성합니다. Gamma는 코드나 디자인 경험 없이 프레젠테이션과 웹사이트를 만들 수 있는 AI 디자인 파트너로 소개됩니다. (Gamma) |
| 이미지·영상·디자인 시안을 만들어보고 싶을 때 | Adobe Firefly | 이미지, 오디오, 비디오를 생성·편집하는 생성형 AI 도구입니다. Adobe는 Firefly를 창작자를 위한 생성형 AI 제품으로 설명합니다. (Adobe) |
| 프롬프트를 실험하고 간단한 AI 앱 아이디어를 테스트하고 싶을 때 | Google AI Studio | Gemini 모델을 빠르게 시험하고, 다양한 프롬프트를 실험한 뒤 코드로 확장할 수 있습니다. Google AI Studio 문서는 여러 프롬프트 인터페이스를 제공하고, 준비되면 코드를 받을 수 있다고 설명합니다. (Google AI for Developers) |

F. AI 윤리·편향·검증을 체험하는 자료

| 자료 | 무엇을 체험하나 | 성인 교육에서 좋은 질문 |
| --- | --- | --- |
| Survival of the Best Fit | 채용 AI가 사람의 편향을 물려받고 불평등을 강화할 수 있음을 게임으로 체험합니다. 제작진은 이 게임을 “AI의 채용 편향을 설명하는 교육용 게임”이라고 소개합니다. (Survival of the Best Fit) | “우리 조직의 채용·평가 데이터도 한쪽으로 치우쳐 있지 않은가?” |
| Moral Machine | 자율주행차가 피할 수 없는 윤리적 딜레마에서 어떤 선택을 해야 하는지 판단합니다. Moral Machine은 기계 지능의 도덕적 결정에 대한 인간 관점을 수집하는 플랫폼으로 설명됩니다. (Moral Machine) | “AI가 결정해야 하는 문제와 사람이 결정해야 하는 문제의 경계는 어디인가?” |
| AI Blindspot | AI 시스템이 설계·개발·배포되는 과정에서 생길 수 있는 편향과 blind spot을 카드 형태로 점검합니다. MIT Media Lab의 AI Blindspot은 AI의 편향을 예방·탐지·완화하기 위한 발견 과정으로 소개됩니다. (AI Blindspot) | “우리 AI 서비스가 놓치고 있는 사용자 집단은 없는가?” |
| What-If Tool | 입력값을 바꾸며 모델이 어떻게 반응하는지, 성능과 공정성 지표를 탐색합니다. Google Research는 What-If Tool을 가상 상황에서 성능을 테스트하고, 특성 중요도와 모델 행동을 시각화하는 도구로 설명합니다. (Google Research) | “나이, 지역, 성별 같은 변수를 바꾸면 결과가 달라지는가?” |
| Learning Interpretability Tool, LIT | 텍스트·이미지·표 데이터 모델의 행동을 시각적으로 분석합니다. LIT는 시각적·인터랙티브 모델 이해 도구이며 텍스트, 이미지, 표 데이터를 지원합니다. (Pair Code) | “모델이 왜 이런 답을 했는지 설명할 수 있는가?” |
| People + AI Guidebook | 인간중심 AI 제품 설계를 위한 가이드, 패턴, 사례를 확인합니다. Google PAIR는 이 가이드북을 인간중심 AI 제품 설계를 위한 실용 지침 모음으로 소개합니다. (Pair) | “AI가 사용자를 대체하는가, 사용자의 판단을 돕는가?” |

3. 일반 성인을 위한 추천 학습 순서

1단계: “AI가 뭔지 감 잡기”

가장 먼저 Elements of AI나 OpenAI Academy AI Foundations로 시작합니다. 이 단계의 목표는 “AI가 사람처럼 생각한다”는 막연한 인식을 버리고, 데이터·패턴·예측·확률·생성이라는 관점으로 보는 것입니다. (Elements of AI)

추천 활동:

AI가 잘하는 일과 못하는 일을 10개씩 적기

내가 최근 본 AI 뉴스 1개를 가져와 “가능한 주장 / 과장된 주장 / 확인 필요한 주장”으로 나누기

ChatGPT나 Copilot에게 같은 질문을 다르게 물어보고 결과 비교하기

2단계: “AI는 데이터로 배운다” 체험하기

이 단계에서는 Teachable Machine이 가장 좋습니다. 이미지를 2~3개 클래스로 나누어 직접 학습시키면, AI가 왜 데이터 품질에 민감한지 바로 이해할 수 있습니다. (Teachable Machine)

추천 실습:

실습명: 사무실 물건 분류 AI

클래스 1: 머그컵

클래스 2: 텀블러

클래스 3: 물병

처음에는 같은 배경에서만 사진을 찍고 모델을 학습합니다. 그다음 배경, 조명, 각도, 거리, 손의 위치를 바꿔 테스트합니다.

배울 점:

AI가 틀리는 이유는 “AI가 멍청해서”가 아니라,

3단계: “모델은 어떻게 판단선을 긋는가?” 보기

R2D3, TensorFlow Playground, ML Algorithm Visualizer를 사용합니다. 이 단계에서는 어려운 수식 없이 “AI가 데이터를 나누는 선을 찾는다”는 직관을 만드는 것이 핵심입니다. (R2D3)

추천 실습:

실습명: 고객을 두 그룹으로 나누기

x축: 구매 빈도

y축: 평균 구매 금액

점 색깔: 재구매함 / 재구매 안 함

여러 알고리즘을 바꿔가며 질문합니다.

어떤 모델은 단순한 선을 긋고, 어떤 모델은 구불구불한 경계를 만든다.

여기서 과적합을 설명할 수 있습니다.

4단계: “생성형 AI는 문장을 어떻게 다루는가?” 이해하기

성인들이 가장 많이 쓰는 AI는 ChatGPT, Copilot, Gemini 같은 LLM입니다. 그래서 토큰 → 프롬프트 → 문맥 → 다음 토큰 예측 흐름을 보여줘야 합니다.

추천 자료는 OpenAI Tokenizer, Transformer Explainer, LLM Visualization입니다. (OpenAI 플랫폼)

추천 실습:

실습명: 같은 뜻, 다른 토큰

다음 문장을 Tokenizer에 넣어 비교합니다.

“회의록 요약해줘”

“아래 회의록에서 결정사항, 담당자, 마감일을 표로 정리해줘”

“이 회의록을 부장에게 보고할 5줄 요약으로 바꿔줘”

배울 점:

AI에게 “잘해줘”라고 말하는 것보다,

5단계: “내 일에 바로 적용하기”

이 단계에서는 각자의 실제 문제를 가져와야 합니다.

| 실제 문제 | 사용할 도구 | 실습 과제 |
| --- | --- | --- |
| 문서가 너무 많다 | NotebookLM | PDF·보고서·회의자료를 넣고 핵심 요약, 질문답변, 체크리스트 만들기 |
| 회의록 정리가 오래 걸린다 | ChatGPT, Copilot | 회의 메모를 결정사항·담당자·기한 표로 바꾸기 |
| 지역·사회 통계를 찾아야 한다 | Data Commons | 자연어 질문으로 지역별 인구, 소득, 건강, 교육 지표 탐색 |
| 고객 문의가 많다 | Teachable Machine, LearningML, Machine Learning for Kids | 문의 문장을 유형별로 분류하는 모델 만들기 |
| 홍보물이 필요하다 | Canva, Gamma, Napkin, Firefly | 행사 안내문, 카드뉴스, 발표자료, 도식 초안 만들기 |
| 엑셀 데이터를 분석하고 싶다 | AIDU, Orange, Kaggle Learn | 매출·설문·품질 데이터를 불러와 분류·예측·시각화하기 |

6단계: “AI 결과를 검증하고 책임 있게 쓰기”

마지막 단계는 반드시 윤리와 검증입니다. 일반 성인에게 특히 중요한 것은 “AI를 안 쓰는 것”이 아니라, AI 결과를 그대로 믿지 않는 습관입니다.

추천 자료는 Survival of the Best Fit, Moral Machine, AI Blindspot, People + AI Guidebook입니다. (Survival of the Best Fit)

검증 질문:

이 결과의 출처는 무엇인가?

AI가 모르는 내용을 그럴듯하게 지어낸 것은 아닌가?

개인정보나 민감정보가 들어가지는 않았는가?

특정 집단에 불리하게 작동하지 않는가?

최종 판단자는 사람인가, AI인가?

4. 90분 성인 특강 운영안

주제: “AI를 이해하고 내 일에 써먹기”

| 시간 | 내용 | 자료 |
| --- | --- | --- |
| 0–10분 | AI에 대한 오해 풀기: AI는 생각하는가, 예측하는가? | OpenAI Academy, Elements of AI |
| 10–25분 | AI가 데이터로 배우는 모습 체험 | Teachable Machine |
| 25–40분 | 모델이 판단선을 긋는 모습 보기 | TensorFlow Playground, ML Algorithm Visualizer |
| 40–55분 | 생성형 AI의 핵심: 토큰과 프롬프트 | OpenAI Tokenizer, Transformer Explainer |
| 55–70분 | 내 업무 문제를 AI 프롬프트로 바꾸기 | ChatGPT, Copilot, Google Prompting Essentials |
| 70–80분 | 문서 기반 AI 실습 | NotebookLM |
| 80–90분 | AI 결과 검증과 윤리 | Survival of the Best Fit, AI Blindspot |

마지막 산출물은 “내 업무에 적용할 AI 활용 시나리오 1개”로 잡으면 좋습니다.

예:

매주 회의록을 AI로 정리하되,

5. 4주 과정으로 운영한다면

1주차: AI 기본 개념과 생성형 AI 이해

| 목표 | 자료 | 활동 |
| --- | --- | --- |
| AI, 머신러닝, LLM 구분 | Elements of AI, OpenAI Academy | AI가 할 수 있는 일·없는 일 분류 |
| 프롬프트 기본 | OpenAI Prompting, Google Prompting Essentials | 나쁜 프롬프트를 좋은 프롬프트로 고치기 |
| 토큰 이해 | OpenAI Tokenizer | 짧은 지시와 구조화된 지시 비교 |

2주차: 데이터로 배우는 AI

| 목표 | 자료 | 활동 |
| --- | --- | --- |
| 학습 데이터와 테스트 데이터 이해 | Teachable Machine | 이미지·소리 분류 모델 만들기 |
| 알고리즘별 판단 차이 이해 | ML Algorithm Visualizer | 같은 데이터를 여러 모델로 비교 |
| 과적합 이해 | TensorFlow Playground | 뉴런 수를 늘리며 결과 비교 |

3주차: 현실 문제 해결 도구

| 목표 | 자료 | 활동 |
| --- | --- | --- |
| 문서 기반 질의응답 | NotebookLM | 보고서·매뉴얼 요약 |
| 공공 데이터 탐색 | Data Commons | 지역 문제를 데이터로 질문하기 |
| 콘텐츠 제작 | Canva, Gamma, Napkin | 기획안 → 발표자료 → 도식 변환 |

4주차: AI 적용 프로젝트와 윤리

| 목표 | 자료 | 활동 |
| --- | --- | --- |
| AI 적용 과제 설계 | People + AI Guidebook | 사용자·문제·데이터·위험 정의 |
| 편향 체험 | Survival of the Best Fit | 채용 AI 편향 토론 |
| 최종 발표 | 자유 선택 | “내 업무 문제를 AI로 해결하는 방법” 발표 |

6. 현실 문제별 추천 조합

1) 소상공인·자영업자

| 문제 | 추천 도구 | 예시 |
| --- | --- | --- |
| 홍보 문구 작성 | ChatGPT, Google Prompting Essentials | “이번 주 신메뉴 홍보 문구 5개 만들어줘” |
| 카드뉴스 제작 | Canva Magic Design | 메뉴판, 이벤트 포스터, SNS 이미지 |
| 고객 리뷰 분석 | LearningML, Orange | 긍정·불만·재방문 의사 분류 |
| 상권·지역 통계 확인 | Data Commons | 지역 인구, 소득, 이동, 고령화 지표 탐색 |

2) 직장인·사무직

| 문제 | 추천 도구 | 예시 |
| --- | --- | --- |
| 회의록 정리 | ChatGPT, Copilot | 결정사항·담당자·기한 표 만들기 |
| 보고서 초안 | OpenAI Academy Prompting, Copilot Prompt Gallery | 보고서 구조 만들기, 요약, 반론 정리 |
| 긴 문서 이해 | NotebookLM | 계약서·정책자료·연구보고서 질문답변 |
| 발표자료 제작 | Gamma, Canva, Napkin | 기획서 초안을 발표자료와 도식으로 변환 |

3) 교사·강사·교육 담당자

| 문제 | 추천 도구 | 예시 |
| --- | --- | --- |
| 수업자료 요약 | NotebookLM | 교재를 요약하고 퀴즈 만들기 |
| AI 개념 설명 | TensorFlow Playground, CNN Explainer, Transformer Explainer | 신경망·CNN·LLM 원리 시각화 |
| 학습자 활동 설계 | Teachable Machine, Machine Learning for Kids | 분류 모델 만들기 프로젝트 |
| 윤리 토론 | Moral Machine, Survival of the Best Fit | AI 판단의 책임 토론 |

4) 공공기관·비영리·지역활동가

| 문제 | 추천 도구 | 예시 |
| --- | --- | --- |
| 지역 통계 탐색 | Data Commons | 고령화, 통근, 건강, 교육, 소득 지표 비교 |
| 민원 유형 분류 | LearningML, Orange | 민원 문장을 주제별로 분류 |
| 정책자료 요약 | NotebookLM | 법령·정책 보고서 핵심 쟁점 정리 |
| AI 영향 평가 | AI Blindspot, People + AI Guidebook | 개인정보·편향·책임 점검 |

5) 기획자·마케터·콘텐츠 제작자

| 문제 | 추천 도구 | 예시 |
| --- | --- | --- |
| 아이디어 발상 | ChatGPT, Google Prompting Essentials | 캠페인 콘셉트 10개 만들기 |
| 시각자료 제작 | Napkin, Canva | 글을 인포그래픽·흐름도·카드뉴스로 변환 |
| 발표자료 제작 | Gamma | 제안서 초안을 발표자료로 생성 |
| 이미지·영상 시안 | Adobe Firefly | 광고 이미지, 제품 콘셉트 시안 |

7. 성인 대상 수업에서 꼭 강조할 핵심 문장

일반 성인 교육에서는 다음 문장들이 효과적입니다.

AI는 정답을 아는 기계가 아니라, 데이터와 문맥을 바탕으로 그럴듯한 답을 예측하는 시스템입니다.

AI를 잘 쓰는 사람은 프롬프트를 잘 쓰는 사람이 아니라, 문제를 잘게 나누고 결과를 검증할 줄 아는 사람입니다.

AI는 사람의 일을 대신하기보다, 반복적인 초안 작업과 정리 작업을 줄여주는 도구로 먼저 이해하는 것이 안전합니다.

AI 결과는 출발점이지 최종 결론이 아닙니다.

8. 가장 현실적인 추천 조합

일반 성인 대상 교육에서 자료를 너무 많이 쓰면 오히려 혼란스럽습니다. 실제 운영에서는 아래 조합이 가장 좋습니다.

2시간 입문 특강용

OpenAI Academy 또는 Elements of AI – AI 기본 개념

Teachable Machine – AI가 데이터로 배우는 체험

TensorFlow Playground – 신경망이 판단선을 만드는 체험

OpenAI Tokenizer – LLM이 문장을 토큰으로 처리하는 체험

NotebookLM – 내 문서로 현실 문제 해결

Survival of the Best Fit – AI 편향과 윤리 체험

4주 실습 과정용

Elements of AI

Teachable Machine

ML Algorithm Visualizer

TensorFlow Playground

Transformer Explainer

NotebookLM

Data Commons

Canva / Gamma / Napkin

Orange 또는 AIDU

AI Blindspot / People + AI Guidebook

9. 최종 추천 TOP 10

| 순위 | 자료 | 왜 추천하는가 |
| --- | --- | --- |
| 1 | Teachable Machine | AI가 데이터로 배우는 과정을 가장 빠르게 체험할 수 있습니다. |
| 2 | OpenAI Academy | 생성형 AI와 ChatGPT를 일반 성인 수준에서 이해하고 업무에 적용하기 좋습니다. |
| 3 | Elements of AI | 비전공자를 위한 시민 AI 리터러시 자료로 좋습니다. |
| 4 | TensorFlow Playground | 신경망, 과적합, 학습률을 시각적으로 이해하기 좋습니다. |
| 5 | ML Algorithm Visualizer | 여러 알고리즘이 같은 데이터를 다르게 판단하는 모습을 비교할 수 있습니다. |
| 6 | OpenAI Tokenizer | LLM이 문장을 어떻게 처리하는지 짧은 시간에 보여줄 수 있습니다. |
| 7 | Transformer Explainer | ChatGPT류 모델의 핵심 구조를 시각적으로 설명하기 좋습니다. |
| 8 | NotebookLM | 실제 문서 기반 문제 해결에 바로 연결됩니다. |
| 9 | Data Commons | 공공 데이터 기반 의사결정을 자연어로 체험할 수 있습니다. |
| 10 | Survival of the Best Fit | AI 편향과 책임 문제를 게임처럼 이해할 수 있습니다. |

이 구성을 따르면 일반 성인은 AI를 단순히 “신기한 챗봇”으로 보는 수준을 넘어, 데이터로 배우는 시스템, 문맥에 따라 생성하는 도구, 현실 문제를 도울 수 있지만 검증이 필요한 협력자로 이해하게 됩니다.


---


# 원본 파일: 전통적인 인공지능 이해 실습 사이트.extracted.md


# 전통적인 인공지능 이해 실습 사이트

전통적인 인공지능 이해 실습 사이트

기계학습·신경망·딥러닝 모델을 제외하고, 전통적 인공지능에서 중요하게 다뤄 온 탐색, 논리, 규칙, 추론, 계획, 게임, 제약조건, 지식표현, 상태기계 중심으로 정리

전통적 AI

“AI가 데이터를 보고 학습하는 방식”이 아니라, 사람이 정한 규칙·목표·지식·상태공간을 바탕으로 스스로 탐색하고 추론하여 답을 찾는 방식입니다.

1. 전통적 AI 개념 지도

| 분야 | 핵심 질문 | 대표 개념·알고리즘 |
| --- | --- | --- |
| 상태공간 탐색 | 시작 상태에서 목표 상태까지 어떻게 갈 것인가? | BFS, DFS, Uniform Cost, Dijkstra, A*, Greedy Best-First |
| 휴리스틱 탐색·최적화 | 모든 경우를 보지 않고 더 그럴듯한 방향으로 갈 수 있는가? | Hill Climbing, Simulated Annealing, Local Beam Search, Genetic Algorithm |
| 게임 AI | 상대가 방해할 때 최선의 수를 어떻게 고를 것인가? | Minimax, Alpha-Beta Pruning, Game Tree |
| 제약조건 만족 문제 | 조건을 모두 만족하는 배치를 어떻게 찾을 것인가? | CSP, Backtracking, Forward Checking, Arc Consistency, MRV |
| 논리와 추론 | 주어진 사실과 규칙에서 무엇이 따라 나오는가? | 명제논리, 술어논리, Resolution, SAT, Semantic Tableau |
| 전문가 시스템 | IF-THEN 규칙으로 전문가 판단을 흉내낼 수 있는가? | Rule-Based System, Forward Chaining, Backward Chaining, CLIPS |
| 계획 수립 | 목표를 달성하려면 어떤 행동 순서가 필요한가? | STRIPS, PDDL, Blocks World, Logistics Planning |
| 불확실성 추론 | 정보가 불완전할 때 확률적으로 어떻게 판단할 것인가? | Bayesian Network, Belief Network, Decision Network |
| 지식표현 | 개념과 관계를 컴퓨터가 이해할 수 있게 어떻게 구조화할 것인가? | Ontology, OWL, RDF, Knowledge Graph, Prolog |
| 에이전트 행동 제어 | 캐릭터나 로봇이 상황에 따라 어떻게 행동을 바꿀 것인가? | Finite State Machine, Behavior Tree |

2. 전체적으로 먼저 볼 만한 통합형 자료

1) AIspace / AISpace2

AIspace는 전통적 AI 교육용으로 매우 가치가 높습니다. UBC의 Laboratory for Computational Intelligence에서 개발한 AI 학습 도구 모음이며, 그래프 탐색, CSP, 추론, 베이지안 네트워크, STRIPS 등 전통적 AI 주제를 포함합니다. (AIspace)

| 활용 주제 | 사용할 기능 |
| --- | --- |
| 탐색 | Graph Searching |
| 제약조건 | Consistency Based CSP Solver, Stochastic Local Search CSP Solver |
| 논리 추론 | Definite Clause Deduction |
| 불확실성 | Belief and Decision Networks |
| 계획 | STRIPS to CSP Conversion |

수업 활용법:
지도 앱 경로 찾기 → 탐색, 스도쿠 → CSP, 동물 판별 규칙 → 추론, 블록 쌓기 → 계획으로 연결하면 전통적 AI의 전체 구조를 보여줄 수 있습니다.

3. 상태공간 탐색: BFS, DFS, Dijkstra, A*

전통적 AI의 출발점은 문제를 상태공간으로 보고 목표 상태를 찾는 것입니다. 미로 찾기, 지도 경로, 퍼즐 풀이, 로봇 이동이 모두 여기에 들어갑니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Tactiko Pathfinding Visualizer | BFS, DFS, Dijkstra, A*, Greedy Best-First | 격자에 벽을 그리고 시작점·목표점을 정한 뒤 알고리즘별 경로 탐색을 비교합니다. 이 도구는 벽 그리기, 미로 생성, 알고리즘 비교 기능을 제공합니다. (Tactiko) | “어떤 알고리즘이 가장 빨리 목표를 찾는가?” |
| VisuAlgo Graph Traversal | DFS, BFS, 연결성, 위상정렬, 강연결요소, 2-SAT 등 | 그래프를 보며 탐색 순서를 단계별로 관찰합니다. VisuAlgo는 DFS/BFS뿐 아니라 위상정렬, 이분그래프 검사, SCC 탐색 같은 변형도 시각화합니다. (VisuAlgo) | “깊이 먼저 가는 전략과 넓게 퍼지는 전략 비교” |
| Pathfinding Visualizer 계열 웹앱 | A*, Dijkstra, BFS, DFS | 장애물·가중치·미로를 바꿔 탐색 과정을 애니메이션으로 봅니다. 여러 웹앱이 A*, Dijkstra, BFS, DFS를 실시간으로 보여줍니다. (경로 탐색 시각화 도구) | “AI 택배 로봇이 교실 안에서 길 찾기” |

쉽게 설명하는 법

학생이나 일반 학습자에게는 이렇게 설명하면 됩니다.

AI가 길을 찾는다는 것은, 모든 가능한 위치를 하나씩 상태로 보고 “다음에 어디로 갈까?”를 정하는 것입니다.

| 알고리즘 | 쉬운 비유 |
| --- | --- |
| DFS | 한 길을 끝까지 가보고 막히면 되돌아오기 |
| BFS | 가까운 곳부터 둥글게 넓혀가며 찾기 |
| Dijkstra | 지금까지 가장 비용이 적게 든 길부터 확장하기 |
| A* | 지금까지 온 비용 + 목표까지 남은 예상거리까지 함께 보기 |
| Greedy Best-First | 목표에 가까워 보이는 곳만 빠르게 따라가기 |

활동 예시

“로봇 청소기 길 찾기 실험”

격자판에 가구를 벽으로 표시합니다.

시작점은 로봇 청소기, 목표점은 충전기로 설정합니다.

DFS, BFS, A*, Greedy를 차례로 실행합니다.

“방문한 칸 수”, “최종 경로 길이”, “막다른 길에 빠졌는가”를 비교합니다.

핵심 질문:

가장 빨리 찾은 알고리즘이 항상 가장 좋은 길을 찾았을까요?

4. 휴리스틱 탐색과 최적화: Hill Climbing, Simulated Annealing

전통적 AI에서는 모든 경우를 다 보지 않고, 현재보다 더 좋아지는 방향으로 조금씩 이동하는 탐색도 많이 다룹니다. 산 정상 찾기, 스케줄 최적화, 퍼즐 배치, N-Queens 같은 문제가 여기에 잘 맞습니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Local Search Interactive Visualizer | Hill Climbing, Random Restart, Simulated Annealing, Local Beam Search, Genetic Algorithm | 1D 지형 또는 N-Queens 문제에서 알고리즘이 지역 최적점에 빠지는 모습과 탈출 전략을 봅니다. 이 도구는 Hill Climbing, Random-Restart, Simulated Annealing, Local Beam, Genetic Algorithm을 브라우저에서 실행합니다. (Nishan Charlie) | “산 정상 찾기 게임: 가까운 봉우리가 진짜 최고점일까?” |
| OpenLabs Hill Climbing Visualizer | Hill Climbing, 휴리스틱 값, 이웃 상태, 지역 최댓값, plateau | 한 단계씩 더 좋은 이웃 상태를 선택하다가 local maxima, ridge, plateau에 갇히는 과정을 보여줍니다. (OpenLabs) | “욕심쟁이 알고리즘은 언제 실패할까?” |

쉽게 설명하는 법

Hill Climbing은 “지금보다 좋아 보이는 옆 칸으로만 이동하는 전략”입니다.

활동 예시

“눈 가리고 산 오르기”

교실 바닥에 숫자 카드를 깔아 지형을 만듭니다.

학생은 현재 칸 주변 숫자만 볼 수 있습니다.

항상 더 큰 숫자로만 이동하게 합니다.

어느 순간 주변에 더 큰 숫자가 없으면 멈춥니다.

전체 최고점과 비교합니다.

핵심 개념:

좋은 선택을 계속해도 전체 최적해에 도달하지 못할 수 있다.

5. 게임 AI: Minimax와 Alpha-Beta Pruning

게임 AI는 전통적 AI의 대표 분야입니다. 바둑·체스까지 가기 전에 틱택토, 님 게임, Connect 4로 시작하면 좋습니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Minimax & Alpha-Beta Pruning Visualizer | Tic-Tac-Toe, Nim, Minimax, Alpha-Beta Pruning, 휴리스틱 함수 | 게임, 탐색 깊이, alpha-beta pruning 여부, 수 순서를 바꾸며 게임 트리가 어떻게 확장·가지치기되는지 봅니다. (Exploring Artificial Intelligence) | “AI는 어떻게 다음 수를 고를까?” |
| Minimax & Alpha-Beta Simulator | 사용자가 직접 게임 트리 만들기, Minimax, Alpha-Beta | 트리의 말단 값을 입력하고, 값이 위로 전파되는 과정과 가지치기를 단계별로 봅니다. 이 도구는 트리 생성·조작과 Minimax/Alpha-Beta 실행을 지원합니다. (Usama Sarwar Portfolio) | “볼 필요 없는 수는 왜 안 봐도 될까?” |
| Alpha-Beta Pruning Practice | Alpha-Beta Pruning 연습 | 깊이와 branching factor를 조절하고, 어떤 가지가 잘리는지 맞혀봅니다. 이 D3.js 웹앱은 UC Berkeley CS61B용으로 개발된 alpha-beta pruning 시각화 도구로 소개됩니다. (Schaerli) | “가지치기 퀴즈” |
| Connect 4 Minimax Visualizer / AlphaFour | Connect 4, Minimax, Alpha-Beta | Connect 4를 직접 두면서 AI가 평가한 미래 수 트리를 확인합니다. AlphaFour는 Minimax와 Alpha-Beta pruning으로 Connect 4를 두고 의사결정 트리를 시각화한다고 설명합니다. (AlphaFour) | “틱택토보다 큰 게임에서는 왜 가지치기가 필요할까?” |

쉽게 설명하는 법

Minimax는 “나는 가장 좋은 수를 두고, 상대는 나에게 가장 나쁜 수를 둘 것”이라고 가정하면서 미래를 계산하는 방법입니다.

| 개념 | 쉬운 설명 |
| --- | --- |
| MAX | 내 점수를 최대화하려는 플레이어 |
| MIN | 내 점수를 최소화하려는 상대 |
| Game Tree | 가능한 모든 수를 나무처럼 펼친 것 |
| Alpha-Beta Pruning | 결과에 영향을 주지 않을 가지는 더 보지 않는 것 |

활동 예시

“틱택토 AI 심판 되기”

현재 틱택토 판을 하나 제시합니다.

가능한 다음 수를 모두 그립니다.

이기는 수는 +1, 비기는 수는 0, 지는 수는 -1로 둡니다.

말단 값이 부모 노드로 올라가는 과정을 손으로 계산합니다.

나중에 사이트에서 같은 상황을 실행해 비교합니다.

핵심 질문:

AI가 똑똑해서 직감으로 둔 것일까요, 아니면 가능한 미래를 계산한 것일까요?

6. 제약조건 만족 문제: CSP, 스도쿠, N-Queens, 시간표

CSP는 전통적 AI에서 아주 중요한 영역입니다. “정답을 맞히는 모델”이 아니라 조건을 모두 만족하는 배치를 찾는 문제입니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Constraint Satisfaction Problem Solver – TCP Web Apps | Backtracking, Constraint Propagation, MRV, Forward Checking | 변수·도메인·제약조건을 보며 solver가 값을 배정하고 되돌아가는 과정을 관찰합니다. 이 사이트는 CSP를 변수·도메인·제약으로 설명하고, MRV와 forward checking을 포함합니다. (The Coatless Professor) | “수업 시간표 만들기” |
| Constraint Satisfaction Visualizer | Backtracking, AC-3, 변수 할당 | N-Queens, map coloring 같은 문제에서 되돌아가기와 제약 전파를 단계별로 봅니다. (Persona 500) | “여왕들이 서로 공격하지 않게 놓기” |
| CSP Solvers | Sudoku, Skyscrapers, recursive backtracking | 브라우저에서 퍼즐별 CSP solver를 실행합니다. 이 사이트는 CSP를 변수 집합, 도메인, 제약조건으로 정의하고, 재귀적 backtracking으로 풀이한다고 설명합니다. (CSP Solvers) | “스도쿠는 왜 인공지능 문제가 될까?” |
| AIspace CSP Tools | Arc consistency, domain splitting, stochastic local search | arc consistency를 직접 클릭하며 도메인이 줄어드는 과정을 봅니다. AISpace2는 CSP를 위해 arc consistency, CSP-to-search, stochastic local search 도구를 제공합니다. (AiSpace2) | “불가능한 후보를 미리 지우면 탐색이 얼마나 줄어들까?” |

쉽게 설명하는 법

CSP는 “조건이 여러 개 붙은 빈칸 채우기”입니다.

활동 예시

“우리 반 자리 배치 CSP”

조건 예시:

A와 B는 가까이 앉으면 안 된다.

발표자는 앞자리에 앉아야 한다.

키가 큰 학생은 뒤쪽에 앉는다.

모둠별로 한 명씩 섞는다.

학생 활동:

사람을 변수로 본다.

가능한 자리를 도메인으로 본다.

조건을 제약조건으로 쓴다.

하나씩 배치해 보고, 조건 위반 시 되돌아간다.

핵심 개념:

인공지능은 “정답을 찍는 것”이 아니라, 조건을 만족하는 조합을 체계적으로 찾을 수 있다.

7. 논리와 자동추론: 명제논리, 술어논리, SAT, Resolution

전통적 AI에서 논리는 매우 핵심입니다. 규칙, 사실, 조건문, 증명, 질의응답이 모두 논리 기반 AI와 연결됩니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Logictools | 1차 술어논리, 자동 증명, 질의응답, 논리 문법 변환 | 사실과 규칙을 입력하고 무엇이 따라 나오는지 증명합니다. Logictools는 1차 술어논리 공식 증명, 질문 응답, 문법 변환을 지원하고 브라우저 안에서 Wasm으로 실행됩니다. (Logictools) | “소크라테스는 죽는가?” 논리 추론 |
| Logic Calculator | 명제논리, Boolean algebra, 술어논리, truth table | 논리식을 입력해 진리표와 논리적 성질을 확인합니다. (논리 계산기) | “조건문을 논리식으로 바꾸기” |
| SAT / Boolean Satisfiability Visualizer | DPLL, unit propagation, pure literal, backtracking | Boolean 식이 만족 가능한지, 어떤 변수 배정이 필요한지 단계별로 봅니다. Boolean SAT Visualizer는 DPLL 알고리즘과 unit propagation, pure literal elimination, backtracking을 다룹니다. (Iris) |  |
| SAT-Web | SAT solving, DPLL trace, search tree, variable interaction graph | SAT 풀이 과정을 시각화합니다. SAT-Web 매뉴얼은 웹 브라우저에서 실행되는 교육용 SAT solving 도구로, search tree와 variable interaction graph, DPLL tracing을 제공한다고 설명합니다. (JMadgwick) |  |
| Tree Proof Generator | Semantic Tableau, 명제·술어·modal logic | 공식을 입력하면 반례 모델 또는 tree proof를 찾습니다. (Wolfgang Schwarz) |  |

쉽게 설명하는 법

논리 기반 AI는 “많이 보고 배우는 AI”가 아니라,

예시:

사실 1: 모든 사람은 죽는다.

사실 2: 소크라테스는 사람이다.

결론: 소크라테스는 죽는다.

활동 예시

“탐정 AI 만들기”

규칙:

비가 오면 운동장은 젖는다.

운동장이 젖었고 우산이 없으면 신발이 젖는다.

민수는 우산이 없다.

오늘 비가 왔다.

질문:

민수의 신발은 젖었을까?

이 활동은 나중에 전문가 시스템으로 자연스럽게 이어집니다.

8. Prolog와 논리 프로그래밍

Prolog는 전통적 AI를 가르칠 때 매우 좋은 언어입니다. “절차를 코딩한다”기보다 사실과 규칙을 써놓고 질문을 던지는 방식입니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| SWISH – SWI-Prolog for SHaring | Prolog, 논리 프로그래밍, 질의응답 | 온라인에서 Prolog 코드를 작성하고 실행합니다. SWISH 문서는 이를 웹 기반 SWI-Prolog 환경으로 설명하며, 온라인 버전은 학습·강의·공유에 사용할 수 있다고 안내합니다. (Swish) | “가족 관계 추론기 만들기” |
| Ciao Prolog Playground | 브라우저 기반 Prolog 실행 | WebAssembly 기반으로 브라우저 안에서 Ciao Prolog를 실행합니다. Ciao Playground는 modern Prolog system을 브라우저에서 학습·실행할 수 있도록 제공한다고 설명합니다. (Ciao Lang) |  |
| Prolog Playground / Visual Expert System Builder | 시각적 논리 프로그래밍, 전문가 시스템 | 규칙 기반 expert system을 시각적으로 구성합니다. 이 도구는 visual logic programming으로 expert systems를 만드는 교육용 앱으로 소개됩니다. (Prolog Playground) |  |

활동 예시

“가족 관계 추론 AI”

사실:

parent(철수, 민수).

parent(민수, 지우).

규칙:

grandparent(X, Y) :- parent(X, Z), parent(Z, Y).

질문:

grandparent(철수, 지우)?

핵심 개념:

AI가 답을 외운 것이 아니라, 사실과 규칙을 조합해 새로운 관계를 찾아낸다.

9. 전문가 시스템: IF-THEN 규칙, Forward / Backward Chaining

전문가 시스템은 전통적 AI의 대표 사례입니다. 의사, 정비사, 상담가처럼 전문가가 쓰는 판단 규칙을 IF-THEN 형태로 표현하고, 추론 엔진이 결론을 도출합니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Expert Systems Visualizer | Knowledge Base, Working Memory, Forward Chaining, Backward Chaining | 동물 식별, 의료 진단, 컴퓨터 문제 해결 예시에서 사실을 넣고 규칙이 발화되는 과정을 단계별로 봅니다. 이 사이트는 전문가 시스템을 IF-THEN 규칙과 추론 엔진으로 인간 전문가 의사결정을 모방하는 AI로 설명합니다. (Exploring Artificial Intelligence) | “동물 판별 전문가 시스템 만들기” |
| OpenLabs Forward / Backward Chaining Visualizer | 사실, 규칙, 목표, 추론 경로 | 전방향 추론과 후방향 추론의 차이를 시뮬레이션합니다. 이 도구는 forward chaining이 데이터에서 출발하고 backward chaining이 목표에서 출발한다고 설명합니다. (OpenLabs) | “증상에서 병명 찾기 vs 병명을 가정하고 증상 확인하기” |
| CLIPS | Rule-based programming, Expert System | 설치형 또는 브라우저 실행 환경에서 규칙 기반 프로그램을 작성합니다. CLIPS는 NASA Johnson Space Center에서 개발된 rule-based programming language로, 전문가 시스템 구축에 사용된다고 설명됩니다. (클립스룰즈) |  |
| clips.run | 브라우저에서 CLIPS 실행 | CLIPS 코드를 설치 없이 브라우저에서 시험합니다. clips.run은 “Try the CLIPS programming language in your browser”라고 소개됩니다. (Clips.run) |  |

쉽게 설명하는 법

전문가 시스템은 이렇게 설명하면 됩니다.

IF 열이 있다 AND 기침이 있다 AND 몸살이 있다

THEN 독감 가능성이 있다

| 방식 | 설명 |
| --- | --- |
| Forward Chaining | 현재 알고 있는 사실에서 출발해 가능한 결론을 계속 만든다 |
| Backward Chaining | 목표 결론을 먼저 정하고, 그 결론을 증명할 조건을 거꾸로 찾는다 |

활동 예시

“학교 보건실 전문가 시스템”

규칙 예시:

IF 열 AND 목아픔 THEN 감기 의심

IF 열 AND 몸살 AND 기침 THEN 독감 의심

IF 배아픔 AND 설사 THEN 장염 의심

학생 활동:

증상 카드를 고릅니다.

규칙 카드를 따라 결론을 찾습니다.

같은 규칙을 사이트에서 forward chaining으로 실행합니다.

“왜 그런 결론이 나왔는가?”를 설명하게 합니다.

핵심 개념:

전문가 시스템은 결과가 투명합니다.

10. 계획 수립: STRIPS, PDDL, Blocks World

계획 수립은 전통적 AI의 핵심입니다. 목표를 정하고, 현재 상태에서 목표 상태로 가기 위한 행동 순서를 찾습니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| PDDL Editor – planning.domains | PDDL, domain, problem, planner | PDDL 파일을 작성·불러오기·저장하고, planning domains API를 통해 기존 domain/problem 예제를 가져올 수 있습니다. 편집기는 로컬 저장, 세션 저장, 기존 PDDL 파일 import를 지원합니다. (PDDL Editor) | “로봇이 물건을 옮기는 계획 만들기” |
| Planimation | PDDL plan visualization, Blocks, Grid, Towers of Hanoi, Logistics | planner가 만든 계획을 애니메이션으로 시각화합니다. Planimation은 Blocks, Grid, Towers of Hanoi, Logistics 같은 고전 planning domain의 animation profile을 제공하고, planning.domains의 AI solver가 만든 plan을 애니메이션화할 수 있습니다. (플래니메이션) |  |
| AIspace STRIPS to CSP | STRIPS planning, CSP 변환 | STRIPS 문제를 그래픽으로 만들고 CSP로 변환해 풉니다. AIspace는 STRIPS를 시작 상태, 목표 상태, 행동으로 구성된 planning problem으로 설명하며, series of actions를 찾아 목표 상태에 도달한다고 설명합니다. (AIspace) |  |
| LearnPDDL | PDDL 기본 개념 | 세계를 상태, 사실, 객체, 행동, 목표로 모델링하는 법을 배웁니다. LearnPDDL은 PDDL에서 world가 상태와 사실·객체로 설명되고, 규칙과 제약에 따라 행동이 상태 전이를 만든다고 설명합니다. (Fares Ka Laboud) |  |

쉽게 설명하는 법

planning AI는 “무엇을 해야 하는지”가 아니라,

예시:

현재 상태: 컵은 책상 위에 있다. 로봇 손은 비어 있다.

목표 상태: 컵은 선반 위에 있다.

가능한 행동:

- 집기

- 이동하기

- 놓기

활동 예시

“블록 월드 계획 세우기”

블록 A, B, C가 있습니다.

현재 상태:

A는 책상 위

B는 책상 위

C는 A 위

목표 상태:

A는 B 위

B는 C 위

C는 책상 위

학생에게 묻습니다.

어떤 순서로 블록을 옮겨야 목표 상태가 될까요?

여기서 행동에는 반드시 전제조건과 효과가 있습니다.

| 행동 | 전제조건 | 효과 |
| --- | --- | --- |
| pick-up(A) | A 위에 아무것도 없음, 손이 비어 있음 | 손에 A를 들고 있음 |
| put-down(A) | 손에 A를 들고 있음 | A가 책상 위에 있음, 손이 비어 있음 |
| stack(A,B) | 손에 A를 들고 있음, B 위가 비어 있음 | A가 B 위에 있음 |

핵심 개념:

전통적 AI는 목표를 이루는 행동 순서를 논리적으로 찾을 수 있다.

11. 불확실성 추론: Bayesian Network

전통적 AI는 논리처럼 “참/거짓”만 다루지 않습니다. 현실에서는 정보가 불확실하기 때문에 확률적으로 믿음을 갱신하는 AI도 중요합니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Bayesian Belief Networks Interactive Lab | Directed Acyclic Graph, CPT, probabilistic inference | 자동차 가치 평가 예시에서 mileage, air conditioner 상태 같은 증거를 바꾸면 확률이 실시간으로 갱신됩니다. 이 사이트는 evidence를 관찰하면 네트워크가 hidden variable의 확률을 다시 계산한다고 설명합니다. (Bayesian Belief Networks) | “중고차 가격을 확률적으로 판단하기” |
| AIspace Belief and Decision Networks | Bayesian Network, variable elimination | 새로운 증거가 들어왔을 때 확률이 어떻게 업데이트되는지 보여줍니다. AIspace는 belief network를 불확실성 아래의 확률적 추론 표현으로 설명하고, variable elimination 세부 과정을 보여준다고 설명합니다. (AIspace) |  |
| BayesBox | Bayesian Network viewer, evidence update | 웹 브라우저에서 베이지안 네트워크를 보고 증거를 바꾸며 확률 변화를 확인합니다. BayesBox는 베이지안 네트워크와 확률 그래픽 모델을 웹브라우저에서 렌더링하고, 증거 변경 시 확률을 계산해 반환한다고 설명합니다. (BayesFusion) |  |

쉽게 설명하는 법

베이지안 네트워크는 “확실한 정답”을 말하는 것이 아니라,

예시:

비가 오면 도로가 젖을 가능성이 높다.

스프링클러가 켜져도 도로가 젖을 수 있다.

도로가 젖었다는 증거만 보고 비가 왔다고 100% 말할 수는 없다.

활동 예시

“감기일까, 알레르기일까?”

증거:

재채기 있음

열 없음

눈 가려움 있음

주변 꽃가루 많음

학생에게 질문:

감기일 가능성과 알레르기 가능성은 어떻게 달라질까요?

핵심 개념:

정보가 추가될수록 AI의 믿음이 업데이트된다.

12. 지식표현: Ontology, Knowledge Graph, Prolog

지식표현은 AI가 세상을 이해할 수 있도록 개념과 관계를 구조화하는 방법입니다. 오늘날 지식그래프, 시맨틱 웹, 온톨로지, 검색 시스템과도 연결됩니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| Protégé / WebProtégé | OWL ontology, class, relation, reasoning, collaborative ontology editing | 개념 계층과 관계를 만들어 온톨로지를 구축합니다. Protégé는 무료 오픈소스 OWL ontology editor이며, WebProtégé는 설치 없이 브라우저에서 협업 편집을 지원합니다. (Protégé) | “학교 생물 분류 온톨로지 만들기” |
| WebVOWL | OWL/RDF 온톨로지 시각화 | 온톨로지를 그래프 형태로 시각화합니다. WebVOWL은 웹에서 온톨로지를 시각화하는 도구로 소개됩니다. (GitHub) |  |
| SWISH / Prolog | 사실, 규칙, 질의 | 가족 관계, 음식 추천, 동물 분류 같은 지식베이스를 만들고 질문합니다. SWISH는 웹 기반 SWI-Prolog 환경으로, 온라인에서 학습과 공유에 사용할 수 있습니다. (Swish) |  |

쉽게 설명하는 법

지식표현은 컴퓨터에게 “사과는 과일이다”, “과일은 음식이다”, “음식은 먹을 수 있다” 같은 관계를 구조적으로 알려주는 것입니다.

활동 예시

“학교 지식그래프 만들기”

노드:

학생, 교사, 과목, 교실, 동아리, 행사

관계:

학생은 과목을 듣는다

교사는 과목을 가르친다

동아리는 학생을 포함한다

행사는 교실에서 열린다

질문:

“과학 동아리 학생 중 과학 수업을 듣는 학생은 누구인가?”

핵심 개념:

AI가 단순 키워드 검색을 넘어서, 개념 사이의 관계를 이용해 답을 찾을 수 있다.

13. 상태기계와 행동트리: 게임 AI·로봇 AI

FSM과 Behavior Tree는 전통적 AI에서 에이전트 행동을 설계하는 데 많이 쓰입니다. 게임 캐릭터, 로봇, 챗봇 흐름, 자동화 시스템을 설명하기 좋습니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| finsm.io | DFA, NFA, finite state machine | 상태와 전이를 만들고 입력 문자열에 따라 상태가 어떻게 바뀌는지 테스트합니다. finsm.io는 finite state machine을 만들고, 테스트하고, export할 수 있다고 설명합니다. (Finsm) |  |
| Automata Lab | DFA, NFA, NFA→DFA, RegEx→Automaton | 드래그앤드롭으로 상태와 전이를 만들고, 문자열을 단계별로 테스트합니다. Automata Lab은 DFA/NFA 설계와 시뮬레이션, NFA-to-DFA 변환, regex-to-automaton 기능을 제공합니다. (Automata Lab) |  |
| AutomataVerse | DFA, NFA, PDA, Turing Machine, Mealy, Moore | 오토마타를 설계하고 입력에 따른 실행 과정을 시각화합니다. 이 플랫폼은 DFA, NFA, PDA, Turing Machine 등을 브라우저에서 설계·테스트·시각화한다고 설명합니다. (AutomataVerse) |  |
| Behavior3 Editor | Behavior Tree, game AI, robotics, simulation | 행동트리를 시각적으로 설계합니다. Behavior3 Editor는 게임·시뮬레이션·로봇 에이전트를 모델링하기 위한 오픈소스 시각 도구로 소개됩니다. (BehaviorTrees) |  |
| Open Behavior Trees | Behavior Tree, 게임 AI | 행동트리의 계층 구조와 반응형 행동 설계를 시각적으로 다룹니다. 이 문서는 behavior tree를 game AI를 만드는 데 중요한 도구로 소개합니다. (Sterberino) |  |

쉽게 설명하는 법

FSM

캐릭터가 현재 어떤 상태인지 정하고, 조건이 생기면 다른 상태로 넘어가는 방식입니다.

예:

순찰 중 → 적 발견 → 추격

추격 중 → 적 가까움 → 공격

공격 중 → 체력 낮음 → 도망

도망 중 → 안전함 → 순찰

Behavior Tree

행동을 트리 구조로 나누어 “조건 확인 → 행동 실행”을 반복하는 방식입니다.

예:

생존하기

├─ 체력이 낮은가?

│  └─ 회복 아이템 사용

├─ 적이 보이는가?

│  └─ 공격

└─ 주변 순찰

활동 예시

“게임 몬스터 AI 설계하기”

학생들이 몬스터 행동 규칙을 만듭니다.

상태:

순찰

추격

공격

도망

휴식

전이 조건:

플레이어 발견

거리 2칸 이하

체력 30% 이하

플레이어 사라짐

핵심 개념:

학습하지 않아도, 규칙과 상태 전이만으로 꽤 그럴듯한 AI 행동을 만들 수 있다.

14. 논리회로와 Boolean 사고: AND, OR, NOT, XOR

이건 기계학습은 아니지만, 전통적 AI의 논리적 사고를 이해하는 데 좋습니다. 특히 규칙 기반 AI, SAT, Prolog로 넘어가기 전 단계로 좋습니다.

추천 사이트

| 사이트 | 다루는 개념 | 조작 방법 | 수업·활동 예시 |
| --- | --- | --- | --- |
| CircuitVerse | 논리게이트, 진리표, 회로 시뮬레이션 | AND, OR, NOT, NAND, XOR 등을 조합해 회로를 만들고 결과를 봅니다. CircuitVerse는 드래그앤드롭 회로 설계, truth table에서 회로 자동 생성, testbench와 timing diagram을 제공합니다. (CircuitVerse) |  |
| Truth Table Tools | truth table, Boolean algebra, logic gate simulator | Boolean expression을 입력해 진리표와 게이트 동작을 확인합니다. (Truth Table Tools) |  |
| Logic Gate Simulator | Boolean expression → 회로 → 진리표 | AND, OR, NOT, NAND, NOR, XOR, XNOR 표현식을 회로와 진리표로 바꾸고 입력을 바꿔 신호 전파를 봅니다. (MiniWebtool) |  |

활동 예시

“교실 출입문 규칙 만들기”

규칙:

문이 열린다 = 학생증 있음 AND 수업시간 아님

또는

경고음 = 문 열림 AND 선생님 없음

이걸 논리게이트로 만들어 봅니다.

핵심 개념:

규칙 기반 AI의 가장 작은 단위는 조건 판단이다.

15. 언플러그드 놀이활동 자료

컴퓨터 없이도 전통적 AI 개념을 가르칠 수 있습니다. 특히 탐색, 정렬, 그래프 색칠, 상태 전이, 규칙 추론은 카드·끈·역할놀이로도 가능합니다.

추천 자료

| 자료 | 다루는 개념 | 활용 방법 |
| --- | --- | --- |
| CS Unplugged | 탐색, 정렬, 그래프, 유한상태오토마타, 그래프 색칠 등 | 카드, 끈, 크레용, 몸 움직임으로 컴퓨터과학 개념을 배우는 무료 교수 자료입니다. CS Unplugged는 컴퓨터 없이 게임과 퍼즐로 CS를 가르치는 무료 자료 모음이라고 설명합니다. (CS Unplugged) |
| AI Unplugged | AI 개념, 추론, 사회적 이슈 | AI 관련 언플러그드 활동 자료와 브로슈어를 제공합니다. AI Unplugged는 여러 언어의 AI 활동·교수 자료를 제공하며, 한국어 자료도 포함합니다. (AI Unplugged) |
| CS Unplugged Search Activities | 검색 알고리즘, 이진 탐색, 그래프 색칠, FSA | CS Unplugged 검색 결과에는 Searching algorithms, Finite state automata, Graph colouring 등 전통적 AI와 연결되는 활동이 포함되어 있습니다. (CS Unplugged) |

활동 예시

1) BFS / DFS 몸으로 하기

학생들이 교실 곳곳의 “노드” 역할을 합니다.

줄로 연결 관계를 만듭니다.

BFS 팀은 가까운 친구부터 차례로 방문합니다.

DFS 팀은 한 방향으로 끝까지 갔다가 되돌아옵니다.

2) 지도 색칠 CSP

지역 지도를 나눠 줍니다.

인접한 지역은 같은 색을 쓰면 안 된다는 조건을 둡니다.

최소 색 개수로 칠하게 합니다.

3) 전문가 시스템 역할놀이

한 학생은 “환자”, 한 학생은 “추론 엔진”, 여러 학생은 “규칙 카드”가 됩니다.

증상 카드가 들어오면 규칙 카드가 발화되어 결론 카드로 이어집니다.

16. 전통적 AI 수업용 추천 순서

기계학습 없이 전통적 AI만 가르친다면 다음 순서가 가장 좋습니다.

1단계: 상태와 목표

주제: 탐색
 Pathfinding Visualizer, VisuAlgo
 “AI는 목표까지 어떻게 길을 찾는가?”

활동:

미로 만들기

BFS, DFS, A* 비교

방문한 칸 수와 경로 길이 비교

2단계: 좋은 길을 빨리 찾기

주제: 휴리스틱 탐색
 Local Search Visualizer, Hill Climbing Visualizer
 “좋아 보이는 선택을 계속하면 항상 최고가 될까?”

활동:

산 정상 찾기

지역 최적점에 갇히기

random restart로 탈출하기

3단계: 상대가 있는 문제

주제: 게임 AI
 Minimax Visualizer, Alpha-Beta Practice
 “상대가 방해할 때 최선의 선택은 무엇인가?”

활동:

틱택토 게임 트리 만들기

Minimax 값 전파

Alpha-Beta 가지치기 표시

4단계: 조건을 만족하는 답 찾기

주제: CSP
 CSP Solver, AIspace CSP
 “모든 조건을 만족하는 배치를 어떻게 찾을까?”

활동:

스도쿠

N-Queens

자리 배치

시간표 만들기

5단계: 규칙으로 추론하기

주제: 논리, Prolog, 전문가 시스템
 Logictools, SWISH, Expert Systems Visualizer
 “사실과 규칙에서 어떤 결론이 따라 나오는가?”

활동:

가족 관계 추론

동물 판별 전문가 시스템

증상 기반 진단 규칙 만들기

6단계: 목표를 이루는 행동 순서 찾기

주제: Planning
 PDDL Editor, Planimation, AIspace STRIPS
 “목표 상태에 가려면 어떤 행동 순서가 필요한가?”

활동:

블록 월드

로봇 물류 이동

하노이 탑 계획

Missionaries and Cannibals 문제

7단계: 불확실한 정보로 판단하기

주제: Bayesian Network
 Bayesian Belief Networks Lab, AIspace Belief Network, BayesBox
 “확실하지 않은 상황에서 가능성을 어떻게 갱신할까?”

활동:

비와 젖은 도로

질병 가능성

중고차 가치 판단

고장 원인 추정

8단계: 에이전트 행동 설계

주제: FSM, Behavior Tree
 Automata Lab, AutomataVerse, Behavior3 Editor
 “상황에 따라 행동을 바꾸는 AI를 어떻게 설계할까?”

활동:

게임 몬스터 AI

안내 로봇 행동 설계

챗봇 대화 상태 설계

자동문·신호등 상태기계 만들기

17. 수업에서 바로 쓸 수 있는 프로젝트 예시

| 프로젝트 | 전통적 AI 개념 | 추천 도구 |
| --- | --- | --- |
| 미로 탈출 AI 비교 | BFS, DFS, A*, Greedy Search | Pathfinding Visualizer |
| 택배 로봇 경로 찾기 | Dijkstra, A*, heuristic | Tactiko Pathfinding |
| 틱택토 무적 AI 분석 | Minimax, Alpha-Beta | Minimax Visualizer |
| 스도쿠 풀이 AI | CSP, Backtracking, MRV | CSP Solver |
| 교실 자리 배치 AI | CSP, Constraints | CSP Visualizer |
| 동물 판별 전문가 시스템 | IF-THEN, Forward Chaining | Expert Systems Visualizer |
| 가족 관계 추론기 | Prolog, predicate logic | SWISH |
| 블록 쌓기 로봇 계획 | STRIPS, PDDL | PDDL Editor, Planimation |
| 중고차 가치 추론 | Bayesian Network | BBN Interactive Lab |
| 게임 몬스터 행동 설계 | FSM, Behavior Tree | Automata Lab, Behavior3 Editor |
| 교실 출입문 논리회로 | Boolean Logic, AND/OR/NOT | CircuitVerse |
| 학교 지식그래프 만들기 | Ontology, OWL, Knowledge Graph | Protégé, WebVOWL |

18. 최우선 추천 TOP 12

전통적 AI 교육용으로 가장 추천하는 자료만 고르면 다음과 같습니다.

| 순위 | 자료 | 가장 좋은 용도 |
| --- | --- | --- |
| 1 | AIspace / AISpace2 | 전통적 AI 전체 지도: 탐색, CSP, 추론, 베이지안, STRIPS |
| 2 | Tactiko Pathfinding Visualizer | BFS, DFS, Dijkstra, A* 비교 |
| 3 | VisuAlgo Graph Traversal | 그래프 탐색과 알고리즘 사고 |
| 4 | Local Search Interactive Visualizer | Hill Climbing, Simulated Annealing, N-Queens |
| 5 | Minimax & Alpha-Beta Visualizer | 게임 트리와 상대방이 있는 의사결정 |
| 6 | Constraint Satisfaction Problem Solver | CSP, backtracking, forward checking |
| 7 | Logictools | 논리 규칙과 자동추론 |
| 8 | SWISH Prolog | 사실·규칙·질의 기반 논리 프로그래밍 |
| 9 | Expert Systems Visualizer | 전방향·후방향 추론, 규칙 기반 AI |
| 10 | PDDL Editor + Planimation | 목표 달성을 위한 계획 수립 |
| 11 | Bayesian Belief Networks Lab | 불확실성 아래의 확률 추론 |
| 12 | Automata Lab / Behavior3 Editor | 상태기계와 행동트리 기반 에이전트 설계 |

19. 마무리 설명 문장

수업 도입부에서 이렇게 말하면 좋습니다.

요즘 인공지능은 기계학습과 딥러닝으로 많이 알려져 있지만, 인공지능의 전통적인 출발점은 “학습”보다 “탐색과 추론”이었습니다.

초등학생, 중학생용 전통 인공지능 이해 실습

좋습니다. 아래는 기계학습·신경망·딥러닝 없이, 초등학생과 중학생이 전통적 인공지능을 놀이·조작·시뮬레이션으로 이해할 수 있는 자료를 정리한 것입니다.

여기서 말하는 전통적 인공지능은 주로 다음을 뜻합니다.

데이터를 많이 학습해서 맞히는 AI가 아니라, 규칙·상태·목표·조건·탐색·추론을 이용해 문제를 푸는 AI입니다.

예를 들면 미로 찾기, 틱택토 전략, 스도쿠 풀이, 규칙 기반 동물 판별, 지도 색칠, 로봇 명령, 상태 전이 같은 활동이 여기에 들어갑니다.

1. 초·중학생용 전통 AI 개념 지도

| 전통 AI 개념 | 쉬운 표현 | 초등 활동 | 중등 활동 |
| --- | --- | --- | --- |
| 탐색 Search | 여러 길 중 목표까지 가는 길 찾기 | 미로 탈출, 로봇 길 찾기 | BFS, DFS, Dijkstra, A* 비교 |
| 휴리스틱 Heuristic | 목표에 가까워 보이는 쪽을 먼저 가기 | “출구에 가까운 길” 고르기 | A*와 Greedy Best-First 비교 |
| 규칙 기반 추론 | IF-THEN 규칙으로 결론 내기 | 동물 맞히기, 보건실 진단 놀이 | Forward Chaining, Backward Chaining |
| 게임 AI | 상대가 둘 때 최선의 수 찾기 | 틱택토 필승 수 찾기 | Minimax, Alpha-Beta Pruning |
| 제약조건 만족 CSP | 조건을 모두 만족하게 배치하기 | 자리 배치, 지도 색칠 | 스도쿠, N-Queens, 시간표 문제 |
| 상태기계 FSM | 상태와 조건에 따라 행동 바꾸기 | 보물찾기, 신호등, 자동문 | DFA, NFA, 게임 캐릭터 행동 |
| 논리와 명제 | 참/거짓 조건을 조합하기 | AND, OR, NOT 놀이 | 논리회로, 진리표, SAT 기초 |
| 계획 Planning | 목표를 이루는 행동 순서 만들기 | 로봇에게 명령하기 | 하노이 탑, 8퍼즐, 블록 옮기기 |

2. 초등학생에게 특히 좋은 자료

2-1. CS Unplugged

추천 대상: 초1–6, 중1
 탐색, 정렬, 그래프 색칠, 유한상태기계, 튜링 테스트, 로봇 명령, 논리적 절차

CS Unplugged는 컴퓨터 없이 카드, 끈, 크레용, 몸 움직임, 퍼즐로 컴퓨터과학을 배우는 무료 교수 자료 모음입니다. 공식 설명에서도 “컴퓨터 없이 게임과 퍼즐로 컴퓨터과학을 가르치는 무료 자료”라고 소개하며, 주 대상은 5–12세이지만 더 큰 학생과 성인에게도 사용할 수 있다고 안내합니다. (CS Unplugged)

| 활동 | 전통 AI 연결 | 수업 활용 |
| --- | --- | --- |
| The Turing Test | “지능이란 무엇인가?” 토론 | 사람이 답한 것과 컴퓨터가 답한 것을 구분하는 놀이 |
| Finite State Automata: Treasure Hunt | 상태기계, 상태 전이 | 지도에서 규칙을 따라 보물섬 찾기 |
| Graph Colouring | 제약조건 만족 문제 | 인접한 지역이 같은 색이 되지 않게 지도 색칠 |
| Harold the Robot | 명령, 절차, 로봇 행동 | 학생이 로봇 역할을 하고 친구들이 명령을 내려 움직이기 |

CS Unplugged의 Turing Test 활동은 컴퓨터가 정말 지능적이라고 볼 수 있는지 생각하게 하는 활동이고, 질문과 답변을 통해 사람과 컴퓨터를 구분해 보는 방식입니다. (Classic CS Unplugged)
는 보물찾기 맵을 따라가며 상태와 전이를 경험하게 하는 활동입니다. (CS Unplugged)
은 지도 색칠처럼 보이지만, 인접 조건을 만족해야 하는 대표적 제약조건 문제로 확장할 수 있습니다. (Classic CS Unplugged)
은 학생들이 로봇에게 지시를 내려보고, 로봇은 명령을 문자 그대로 따르기 때문에 “명확한 규칙과 절차”의 중요성을 배우기 좋습니다. (Classic CS Unplugged)

수업 예시: “로봇은 눈치가 없다”

한 학생이 로봇 역할을 합니다. 나머지 학생들은 “앞으로 가”, “왼쪽으로 돌아”, “책상 위 연필을 집어” 같은 명령을 냅니다. 로봇은 말 그대로만 움직입니다.
AI와 로봇은 사람처럼 눈치껏 이해하는 것이 아니라, 명확한 상태와 규칙에 따라 움직인다는 점을 알게 됩니다.

2-2. AI Unplugged

추천 대상: 초3–6, 중1
 인공지능 개념, 분류 규칙, 의사결정, 인간과 AI 비교, 언플러그드 AI 활동

AI Unplugged는 인공지능 활동과 교사용 자료를 제공하는 사이트이며, 영어뿐 아니라 한국어 자료도 제공합니다. (AI Unplugged)

| 활용 방식 | 적합 학년 | 수업 아이디어 |
| --- | --- | --- |
| 카드 분류 활동 | 초3–4 | 원숭이·동물 카드의 특징을 보고 규칙 만들기 |
| 규칙 기반 판별 | 초4–6 | “귀가 긴가?”, “꼬리가 있는가?” 같은 질문으로 동물 맞히기 |
| 인간과 AI 비교 | 초5–중1 | 사람은 직관으로, AI는 규칙으로 판단하는 차이 토론 |

수업 예시: “동물 판별 규칙 만들기”

학생들이 동물 카드를 보고 질문 목록을 만듭니다.

털이 있는가?

날개가 있는가?

물속에 사는가?

줄무늬가 있는가?

이 질문을 따라가면 동물을 맞히는 규칙 기반 전문가 시스템의 아주 쉬운 버전이 됩니다.

2-3. Code.org Graph Paper Programming

추천 대상: 초1–4
 명령, 순서, 알고리즘, 로봇 명령

Code.org의 Graph Paper Programming 활동은 학생들이 친구에게 그림을 그리게 하는 알고리즘을 작성하는 K-5용 언플러그드 활동입니다. 공식 설명에는 학생들이 그래프 종이에 사각형을 색칠하도록 서로에게 지시하면서 프로그래밍이 무엇인지 이해한다고 안내되어 있습니다. (Code.org)

| 좋은 점 | 전통 AI 연결 |
| --- | --- |
| 저학년이 컴퓨터 없이 가능 | AI 에이전트에게 명령 내리기 |
| 명령이 모호하면 결과가 달라짐 | 규칙의 명확성 |
| 친구가 내 명령을 실행함 | 로봇·에이전트 행동 제어 |

수업 예시: “그림 그리는 로봇”

교사가 작은 픽셀 그림을 보여주고, 학생은 그 그림을 그리기 위한 명령을 만듭니다.

오른쪽으로 한 칸

색칠하기

아래로 한 칸

색칠하기

이후 “명령이 너무 길다”는 문제가 생기면 반복, 조건, 절차 개념으로 이어갈 수 있습니다.

2-4. Blockly Games: Maze

추천 대상: 초3–6
 미로 탐색, 조건, 반복, 절차적 사고

Blockly Games는 초보자를 위한 블록 기반 프로그래밍 게임 모음이며, Maze는 반복과 조건을 소개하는 활동입니다. 사이트 설명에서도 Maze가 “loops and conditionals”의 입문이라고 소개됩니다. (Blockly Games)

| 활동 | 전통 AI 연결 |
| --- | --- |
| 캐릭터가 미로를 통과하도록 블록 조립 | 상태공간 탐색 |
| “앞이 막혔으면 오른쪽으로 돌기” | 조건 기반 행동 |
| 반복 블록으로 코드 줄이기 | 계획과 절차 최적화 |

수업 예시: “출구 찾는 로봇 만들기”

처음에는 학생이 직접 길을 정합니다.

앞이 비어 있으면 앞으로 간다.

왼쪽 길이 있으면 왼쪽으로 돈다.

막혔으면 오른쪽으로 돈다.

이 활동은 나중에 DFS, 벽 따라가기, 탐색 전략으로 자연스럽게 이어집니다.

2-5. LightBot

추천 대상: 초2–6
 순서, 절차, 반복, 조건, 재귀적 사고

LightBot은 로봇을 움직여 퍼즐을 푸는 코딩 기반 게임이고, 공식 설명에서 순서, 절차, 재귀적 반복, 조건을 배울 수 있다고 안내합니다. (LightBot)

| 학년 | 활용 방법 |
| --- | --- |
| 초2–3 | 명령 순서대로 로봇 움직이기 |
| 초4–5 | 반복 명령으로 짧게 만들기 |
| 초6 | 같은 패턴을 절차로 묶기 |

전통 AI와의 연결

LightBot은 겉으로는 코딩 게임이지만, 전통 AI 관점에서는 목표 상태에 도달하기 위해 행동 순서를 계획하는 문제로 볼 수 있습니다.

현재 상태 → 행동 선택 → 다음 상태 → 목표 상태

2-6. Robot Turtles

추천 대상: 초1–3, 가족·놀이 수업
 명령 카드, 절차, 디버깅, 로봇 제어

Robot Turtles는 보드게임 자료입니다. ThinkFun 설명에 따르면 플레이어가 전진, 왼쪽, 오른쪽 같은 코드 카드를 이용해 거북이 토큰을 보석까지 이동시키며, 실수하면 Bug Card로 되돌릴 수 있습니다. (씽크펀)

| 좋은 점 | 수업 활용 |
| --- | --- |
| 화면 없이 가능 | 저학년 놀이형 AI·로봇 수업 |
| 명령 카드 기반 | 알고리즘과 계획 |
| 버그 카드 사용 | 디버깅 개념 |

수업 예시

바닥에 격자판을 만들고 학생이 거북이 역할을 합니다.

앞으로

오른쪽

앞으로

왼쪽

앞으로

이 활동은 “AI 로봇은 스스로 마법처럼 가는 것이 아니라, 상태와 명령을 따라 움직인다”는 점을 보여줍니다.

3. 초등 고학년–중학생에게 좋은 웹 시뮬레이션

3-1. Pathfinding Visualizer / Tactiko Pathfinding

추천 대상: 초5–중3
 BFS, DFS, Dijkstra, A*, Greedy Best-First Search

Tactiko Pathfinding Visualizer는 벽을 그리고 미로를 생성한 뒤 A*, Dijkstra, BFS, DFS, Greedy Best-First가 장애물을 피해 경로를 찾는 과정을 비교할 수 있는 도구입니다. 설명에는 각 알고리즘이 어떻게 탐색하는지, A*가 실제 비용과 휴리스틱 추정값을 결합한다는 설명도 포함되어 있습니다. (Tactiko)

또 다른 Pathfinding Visualizer도 Dijkstra, A*, BFS, DFS를 선택하고 벽이나 가중치를 그려 탐색 과정을 볼 수 있습니다. (경로 탐색 시각화 도구)

| 알고리즘 | 학생용 설명 |
| --- | --- |
| BFS | 가까운 칸부터 둥글게 퍼져 나가며 찾기 |
| DFS | 한 길을 끝까지 가보고 막히면 돌아오기 |
| Dijkstra | 지금까지 비용이 가장 적은 길부터 확장하기 |
| A* | 지금까지 온 거리와 목표까지 남은 예상 거리를 함께 보기 |
| Greedy | 목표에 가까워 보이는 곳만 먼저 가기 |

수업 예시: “택배 로봇 길 찾기”

시작점은 택배 로봇, 목표점은 배송지로 둡니다.

벽은 건물, 책상, 장애물로 봅니다.

같은 미로를 BFS, DFS, A*, Greedy로 각각 실행합니다.

방문한 칸 수와 최종 경로 길이를 비교합니다.

핵심 질문:

가장 빨리 목표 쪽으로 달려간 알고리즘이 항상 가장 좋은 길을 찾았을까요?

3-2. 8-Puzzle Solver

추천 대상: 중1–중3
 상태공간, BFS, DFS, Uniform Cost, Greedy Best-First, A*

8-Puzzle Solver는 8퍼즐을 무작위 또는 사용자 지정 상태로 만들고, BFS, Uniform-Cost, DFS, Iterative Deepening, Greedy-Best, A*로 탐색할 수 있는 도구입니다. 검색 결과와 탐색 트리 시각화 기능도 제공합니다. (Deniz)

| 수업 포인트 | 설명 |
| --- | --- |
| 상태 | 퍼즐 조각의 현재 배치 |
| 행동 | 빈칸을 위·아래·왼쪽·오른쪽으로 이동 |
| 목표 | 1부터 8까지 순서대로 맞추기 |
| 탐색 | 목표 상태까지 이동 순서 찾기 |

수업 예시

학생들에게 같은 초기 퍼즐을 주고 질문합니다.

BFS는 왜 느리지만 최단 경로를 보장할까요?

3-3. Tower of Hanoi

추천 대상: 초4–중2
 계획, 재귀, 목표 상태, 행동 순서

Tower of Hanoi는 디스크를 규칙에 따라 옮기는 고전 퍼즐입니다. 온라인 하노이탑 도구들은 디스크 수를 정하고 최적 이동 순서를 단계별로 보여주며, 재귀 알고리즘과 문제 해결 논리를 이해하게 돕습니다. (GetZenQuery)

| 전통 AI 연결 | 설명 |
| --- | --- |
| 목표 상태 | 모든 원반을 목표 기둥으로 옮기기 |
| 행동 | 원반 하나 옮기기 |
| 제약조건 | 큰 원반은 작은 원반 위에 놓을 수 없음 |
| 계획 | 목표를 이루는 행동 순서 만들기 |

수업 예시

처음에는 3개 원반으로 직접 해봅니다.

원반이 4개, 5개로 늘어나면 그냥 감으로 풀 수 있을까요?

4. 게임 AI: 중학생에게 특히 좋은 자료

4-1. Minimax & Alpha-Beta Pruning Visualizer

추천 대상: 중1–중3
 게임트리, Minimax, Alpha-Beta Pruning, 휴리스틱 함수

이 시각화 도구는 Tic-Tac-Toe와 Nim 게임에서 Minimax와 Alpha-Beta Pruning을 보여줍니다. 게임, 탐색 깊이, alpha-beta pruning 여부, 수 순서, 휴리스틱 값을 조절할 수 있습니다. (Exploring Artificial Intelligence)

| 개념 | 학생용 설명 |
| --- | --- |
| 게임트리 | 앞으로 가능한 모든 수를 나무처럼 펼친 것 |
| MAX | 내 점수를 높이려는 플레이어 |
| MIN | 내 점수를 낮추려는 상대 |
| Minimax | 상대도 최선을 다한다고 보고 내 최선의 수를 고르기 |
| Alpha-Beta Pruning | 결과에 영향을 주지 않는 가지는 더 보지 않기 |

수업 예시: “틱택토 AI는 왜 가운데를 좋아할까?”

빈 틱택토 판에서 시작합니다.

가운데, 모서리, 변 중 어디에 두는 것이 좋은지 예측합니다.

시각화 도구로 게임트리를 펼칩니다.

어떤 수가 이기거나 비기게 만드는지 확인합니다.

핵심 질문:

AI가 직감으로 둔 걸까요, 아니면 가능한 미래를 계산한 걸까요?

5. 규칙 기반 AI와 전문가 시스템

5-1. Expert Systems Visualizer

추천 대상: 초6–중3
 지식베이스, IF-THEN 규칙, 전방향 추론, 후방향 추론

Expert Systems Visualizer는 IF-THEN 규칙과 추론 엔진으로 인간 전문가의 의사결정을 모방하는 AI를 설명하고, 동물 식별, 의료 진단, 컴퓨터 문제 해결 예시를 제공합니다. 사용자는 초기 사실을 넣고 Forward 또는 Backward 모드로 규칙이 발화되는 과정을 단계별로 볼 수 있습니다. (Exploring Artificial Intelligence)

| 모드 | 쉬운 설명 |
| --- | --- |
| Forward Chaining | 알고 있는 사실에서 출발해 결론을 찾아감 |
| Backward Chaining | 목표 결론을 정하고, 필요한 조건을 거꾸로 확인함 |

수업 예시: “동물 맞히는 전문가 시스템”

규칙 예시:

IF 털이 있다 THEN 포유류

IF 포유류 AND 고기를 먹는다 THEN 육식동물

IF 육식동물 AND 줄무늬가 있다 THEN 호랑이

학생들은 사실 카드를 넣습니다.

털이 있다

고기를 먹는다

줄무늬가 있다

그러면 규칙이 차례로 연결됩니다.

털이 있다 → 포유류 → 육식동물 → 호랑이

이 활동은 AI가 “학습해서 맞힌다”가 아니라 규칙을 따라 결론을 만든다는 점을 아주 분명하게 보여줍니다.

6. 논리와 진리표: 초등 고학년–중학생용

6-1. CircuitVerse

추천 대상: 초5–중3
 AND, OR, NOT, XOR, 진리표, 논리회로

CircuitVerse는 드래그앤드롭 방식으로 논리회로를 만들 수 있는 온라인 디지털 회로 시뮬레이터입니다. 진리표에서 회로를 자동 생성하고, 테스트벤치와 타이밍 다이어그램으로 회로 동작을 검증할 수 있습니다. (CircuitVerse)

| 활동 | 전통 AI 연결 |
| --- | --- |
| AND, OR, NOT 회로 만들기 | 조건 판단 |
| XOR 회로 만들기 | 복합 규칙 |
| 진리표 만들기 | 규칙의 모든 경우 확인 |
| 자동문 회로 만들기 | 규칙 기반 에이전트 |

수업 예시: “교실 문이 열리는 조건”

문 열림 = 학생증 있음 AND 수업시간 아님

또는

경고음 = 문 열림 AND 선생님 없음

학생들은 이 규칙을 논리게이트로 연결합니다.

6-2. Truth Table Tools

추천 대상: 초6–중3
 논리게이트, 진리표, Boolean algebra

Truth Table Tools의 Logic Gate Simulator는 AND, OR, XOR, NAND, NOR, XNOR 게이트를 시뮬레이션하고 실시간 진리표를 볼 수 있는 도구입니다. (Truth Table Tools)

| 활용 | 설명 |
| --- | --- |
| 초6 | AND, OR, NOT 결과 관찰 |
| 중1 | XOR, NAND, NOR 비교 |
| 중2–3 | 복합 조건식을 진리표로 검증 |

7. 상태기계와 오토마타

7-1. CS Unplugged: Treasure Hunt

추천 대상: 초4–중1
 상태, 전이, 유한상태기계

CS Unplugged의 Treasure Hunt 활동은 길을 따라가며 보물섬을 찾는 유한상태기계 활동입니다. 관련 설명에 따르면 학습자는 지도를 이용해 여러 경로를 선택하고, 어떤 경로는 막다른 길이나 순환으로 이어지고, 어떤 경로는 목표로 이어진다는 것을 경험합니다. (Howtosmile)

수업 예시: “보물섬 찾기 상태기계”

학생이 현재 위치를 상태로 봅니다.

출발섬 → 해적섬 → 상어섬 → 보물섬

화살표는 전이입니다.

빨간 배를 타면 A섬으로 간다.

파란 배를 타면 B섬으로 간다.

이 활동은 게임 캐릭터 AI, 자동문, 신호등, 챗봇 흐름 설계로 이어집니다.

7-2. Automata Lab

추천 대상: 중2–중3, 동아리·영재 수업
 DFA, NFA, 상태 전이, 문자열 인식

Automata Lab은 DFA와 NFA를 드래그앤드롭으로 만들고, 입력 문자열이 상태를 어떻게 통과하는지 단계별로 테스트할 수 있는 무료 온라인 도구입니다. NFA를 DFA로 바꾸는 기능과 정규표현식 변환 기능도 제공합니다. (Automata Lab)

| 수업 예시 | 설명 |
| --- | --- |
| 짝수 개의 1을 인식하는 기계 | 입력을 읽으며 상태가 바뀜 |
| “ab”로 끝나는 문자열 인식 | 패턴 인식의 규칙 기반 버전 |
| 자동문 상태 만들기 | 닫힘 → 열림 → 대기 → 닫힘 |

학생용 설명

상태기계는 “지금 어떤 상태인가?”를 기억하고, 입력이 들어오면 다음 상태로 바뀌는 장치입니다.

8. 제약조건 만족 문제: 중학생용

8-1. Graph Colouring

추천 대상: 초5–중2
 제약조건 만족, 그래프 색칠, 조건을 만족하는 배치

CS Unplugged의 Graph Colouring 활동은 지도를 색칠하는 문제처럼 보이지만, 인접한 영역이 같은 색이 되면 안 되는 조건을 만족해야 하는 문제입니다. 공식 설명에서는 이 활동이 graph colouring을 소개하고, 단순해 보이지만 계산적으로 어려운 문제로 이어진다고 설명합니다. (Classic CS Unplugged)

수업 예시: “우리 동네 지도 색칠하기”

규칙:

서로 맞닿은 동네는 같은 색을 쓰면 안 된다.

가능하면 색을 적게 써라.

학생들은 처음에는 직접 칠하고, 이후 왜 어려워지는지 토론합니다.

핵심 질문:

지역이 많아질수록 왜 갑자기 어려워질까요?

8-2. N-Queens Visualizer

추천 대상: 중1–중3
 백트래킹, 제약조건, 탐색 공간

N-Queens Visualizer는 체스판에 N개의 여왕을 서로 공격하지 않도록 놓는 문제를 시각화합니다. 한 도구는 N=8에서 92개의 해가 있으며 탐색 공간이 매우 커진다고 설명하고, 매 단계의 충돌 검사와 되돌아가기를 보여줍니다. (Supakornsjb)

| 개념 | 쉬운 설명 |
| --- | --- |
| 변수 | 각 행에 놓을 여왕의 위치 |
| 도메인 | 가능한 열 |
| 제약조건 | 같은 행, 열, 대각선에 있으면 안 됨 |
| 백트래킹 | 틀리면 이전 선택으로 돌아감 |

수업 예시

4×4 체스판부터 시작합니다.

8-3. Sudoku Backtracking Visualizer

추천 대상: 중1–중3
 백트래킹, 후보 제거, 조건 만족

Sudoku Backtracking Visualizer는 스도쿠 칸에 숫자를 넣고, 백트래킹 알고리즘이 퍼즐을 푸는 과정을 속도 조절과 함께 애니메이션으로 보여줍니다. (Yash Mishra)

수업 예시

학생들이 쉬운 스도쿠를 직접 풀어본 뒤 묻습니다.

사람이 “여기는 3밖에 안 되겠다”라고 생각하는 것을 AI는 어떻게 할까요?

정답:

가능한 후보를 넣어보고, 조건을 어기면 되돌아갑니다.

9. 논리 추론과 Prolog: 중학생 심화용

9-1. Logictools

추천 대상: 중2–중3 심화, 교사 시연
 술어논리, 사실, 규칙, 자동 증명, 질의응답

Logictools는 술어논리와 명제논리를 이용해 규칙을 쓰고, 그 규칙에서 무엇이 따라 나오는지 자동으로 증명하거나 질문에 답할 수 있는 브라우저 기반 도구입니다. 사이트 설명은 논리를 “규칙을 쓰는 일반적인 방법”으로 보고, 증명과 질의응답을 “우리가 쓴 규칙에서 무엇이 따라오는지 탐지하는 방법”이라고 설명합니다. (Logictools)

수업 예시: “가족 관계 추론”

father(john,pete).

father(pete,mark).

father(X,Y) & father(Y,Z) => grandfather(X,Z).

질문:

john은 mark의 할아버지인가?

학생들은 AI가 답을 외운 것이 아니라 사실과 규칙을 조합해 새 결론을 만든다는 점을 이해합니다.

9-2. SWISH Prolog

추천 대상: 중3 심화, 정보 동아리
 Prolog, 사실, 규칙, 질의

SWISH는 웹 기반 SWI-Prolog 환경이며, 온라인 버전은 학습·강의·공유에 사용할 수 있다고 안내합니다. (Swish)

수업 예시: “동아리 추천 규칙”

likes(minsu, science).

likes(minsu, robot).

club(robotclub, robot).

club(scienceclub, science).

recommend(Student, Club) :- likes(Student, Topic), club(Club, Topic).

질문:

recommend(minsu, Club).

이 활동은 규칙 기반 추천 시스템의 기초로 사용할 수 있습니다.

10. 국내 자료: SAI School AI

추천 대상: 초등–중등
 AI 원리, 실습형 디지털 콘텐츠, 교과 연계

한국과학창의재단이 소개하는 SAI는 초·중·고 학생을 대상으로 AI 원리와 실습을 제공하는 무료 디지털 콘텐츠 플랫폼입니다. 공식 소개에는 초등용 “가디언 기억 찾기 대모험”, “모모의 신비한 AI 상점”, 중학용 “도트밸리 속 버그를 잡아라”, “S.O.S 세계수를 구하라!”, “AI Level-up!” 등이 안내되어 있습니다. (한국과학창의재단)

| 활용 | 설명 |
| --- | --- |
| 초등 | 게임형·스토리형 AI 개념 도입 |
| 중등 | 문제 해결형 AI 수업 자료 |
| 교사 | 한국어 수업 자료와 교과 연계 자료 탐색 |

전통 AI만 따로 뽑아 쓰려면 SAI에서 탐색, 추론, 지식 표현, 전문가 시스템, 문제 해결, 퍼즐, 최적 경로 성격의 활동을 골라 쓰면 좋습니다.

11. 학년군별 추천 조합

초등 1–2학년

| 목표 | 추천 자료 | 활동 |
| --- | --- | --- |
| 명령은 정확해야 함 | Harold the Robot, Code.org Graph Paper Programming | 친구 로봇에게 명령 내려 그림 그리기 |
| 순서대로 행동하기 | Robot Turtles, LightBot | 카드나 블록으로 로봇 이동시키기 |
| AI와 사람의 차이 이야기하기 | CS Unplugged Turing Test 간단 버전 | 사람 답변과 컴퓨터 답변 구분하기 |

핵심 문장:

AI와 로봇은 사람이 말한 대로 “알아서” 이해하지 않고, 정해진 규칙과 명령을 따라 움직여요.

초등 3–4학년

| 목표 | 추천 자료 | 활동 |
| --- | --- | --- |
| 미로와 조건 이해 | Blockly Games Maze | 조건과 반복으로 미로 탈출 |
| 상태 변화 이해 | CS Unplugged Treasure Hunt | 보물섬 상태기계 놀이 |
| 규칙 기반 분류 | AI Unplugged, 동물 카드 | 질문 규칙으로 동물 맞히기 |
| 논리 조건 이해 | Truth Table Tools | AND, OR, NOT 결과 확인 |

핵심 문장:

전통 AI는 많은 데이터를 외우는 대신, 규칙과 조건을 이용해서 답을 찾아요.

초등 5–6학년

| 목표 | 추천 자료 | 활동 |
| --- | --- | --- |
| 길 찾기 알고리즘 비교 | Pathfinding Visualizer | BFS, DFS, A* 비교 |
| 조건 만족 문제 | Graph Colouring | 지도 색칠 문제 |
| 논리회로 | CircuitVerse | 자동문 조건 회로 만들기 |
| 전문가 시스템 | Expert Systems Visualizer | 동물 판별 규칙 만들기 |
| 계획 세우기 | Tower of Hanoi | 행동 순서 최적화 |

핵심 문장:

AI가 문제를 푸는 방법은 하나가 아니에요. 어떤 AI는 길을 찾고, 어떤 AI는 조건을 맞추고, 어떤 AI는 규칙으로 결론을 내려요.

중학생

| 목표 | 추천 자료 | 활동 |
| --- | --- | --- |
| 탐색 알고리즘 이해 | Tactiko Pathfinding, 8-Puzzle Solver | BFS, DFS, Dijkstra, A* 비교 |
| 게임 전략 이해 | Minimax Visualizer | 틱택토 게임트리 분석 |
| 백트래킹 이해 | N-Queens, Sudoku Visualizer | 되돌아가며 해 찾기 |
| 규칙 기반 추론 | Expert Systems Visualizer, Logictools | IF-THEN 규칙으로 진단하기 |
| 상태기계 이해 | Automata Lab | DFA로 패턴 인식기 만들기 |
| 논리 프로그래밍 | SWISH Prolog | 가족 관계 추론기 만들기 |

핵심 문장:

중학생 수준에서는 전통 AI를 “상태공간을 탐색하고, 조건을 만족하고, 규칙으로 추론하며, 상대가 있을 때 미래를 계산하는 기술”로 이해하면 좋습니다.

12. 가장 추천하는 TOP 12

| 순위 | 자료 | 추천 대상 | 핵심 개념 |
| --- | --- | --- | --- |
| 1 | CS Unplugged | 초1–중1 | 언플러그드 탐색, 상태기계, 그래프 색칠, 튜링 테스트 |
| 2 | AI Unplugged | 초3–중1 | AI 개념, 규칙, 의사결정 놀이 |
| 3 | Code.org Graph Paper Programming | 초1–4 | 명령, 알고리즘, 절차 |
| 4 | LightBot | 초2–6 | 순서, 절차, 반복, 계획 |
| 5 | Blockly Games Maze | 초3–6 | 미로, 조건, 반복, 탐색 |
| 6 | Tactiko Pathfinding Visualizer | 초5–중3 | BFS, DFS, Dijkstra, A* |
| 7 | 8-Puzzle Solver | 중1–중3 | 상태공간 탐색, A* |
| 8 | Minimax Visualizer | 중1–중3 | 게임트리, Minimax, 가지치기 |
| 9 | Expert Systems Visualizer | 초6–중3 | IF-THEN 규칙, 전방향·후방향 추론 |
| 10 | CircuitVerse | 초5–중3 | 논리게이트, 진리표, 조건 판단 |
| 11 | N-Queens / Sudoku Visualizer | 중1–중3 | 제약조건, 백트래킹 |
| 12 | Automata Lab | 중2–중3 | 상태기계, DFA, NFA |

13. 전통 AI 수업 흐름 예시

8차시 초등 고학년 과정

| 차시 | 주제 | 자료 |
| --- | --- | --- |
| 1 | 로봇은 명령을 문자 그대로 따른다 | Harold the Robot |
| 2 | 조건과 반복으로 미로 탈출 | Blockly Games Maze |
| 3 | AI가 길을 찾는 방법 | Pathfinding Visualizer |
| 4 | 조건을 만족하는 지도 색칠 | CS Unplugged Graph Colouring |
| 5 | AND, OR, NOT으로 조건 만들기 | CircuitVerse |
| 6 | 규칙으로 동물 맞히기 | Expert Systems Visualizer |
| 7 | 상태에 따라 움직이는 보물찾기 | CS Unplugged Treasure Hunt |
| 8 | 우리 반 규칙 기반 AI 설계 | 모둠 프로젝트 |

10차시 중학생 과정

| 차시 | 주제 | 자료 |
| --- | --- | --- |
| 1 | 전통 AI란 무엇인가 | CS Unplugged Turing Test |
| 2 | BFS와 DFS | Pathfinding Visualizer |
| 3 | Dijkstra와 A* | Tactiko Pathfinding |
| 4 | 8퍼즐 탐색 | 8-Puzzle Solver |
| 5 | 틱택토 게임트리 | Minimax Visualizer |
| 6 | 가지치기 | Alpha-Beta Pruning |
| 7 | 스도쿠와 백트래킹 | Sudoku Visualizer |
| 8 | N-Queens와 CSP | N-Queens Visualizer |
| 9 | 전문가 시스템 | Expert Systems Visualizer |
| 10 | 상태기계와 패턴 인식 | Automata Lab |

14. 바로 쓸 수 있는 프로젝트 아이디어

| 프로젝트 | 대상 | 전통 AI 개념 | 추천 자료 |
| --- | --- | --- | --- |
| 보물섬 찾기 AI | 초3–5 | 상태기계 | CS Unplugged Treasure Hunt |
| 교실 로봇 명령 놀이 | 초1–4 | 절차, 명령, 디버깅 | Harold the Robot |
| 자동문 조건 회로 | 초5–중1 | AND, OR, NOT | CircuitVerse |
| AI 동물 판별기 | 초5–중2 | 규칙 기반 전문가 시스템 | Expert Systems Visualizer |
| 택배 로봇 길 찾기 | 초5–중3 | BFS, DFS, A* | Pathfinding Visualizer |
| 틱택토 무적 전략 분석 | 중1–중3 | Minimax | Minimax Visualizer |
| 스도쿠 풀이 AI | 중1–중3 | 백트래킹, CSP | Sudoku Visualizer |
| 여왕 배치 문제 | 중1–중3 | 제약조건 만족 | N-Queens Visualizer |
| 문자열 통과 검사기 | 중2–중3 | 유한상태기계 | Automata Lab |
| 가족 관계 추론기 | 중3 심화 | 논리 추론, Prolog | SWISH / Logictools |

15. 정리 문장

초등학생에게는 이렇게 말하면 좋습니다.

AI는 꼭 데이터를 배워서만 똑똑해지는 것이 아니에요.

중학생에게는 이렇게 정리하면 좋습니다.

전통적 AI는 문제를 상태, 행동, 목표, 규칙, 조건으로 표현하고, 탐색과 추론을 통해 답을 찾는 방식입니다.


---


# 원본 파일: 초등학생을 위한 인공지능 이해 사이트.extracted.md


# 초등학생을 위한 인공지능 이해 사이트

초등학생을 위한 인공지능 이해 사이트

아래는 초등 1학년–6학년 학생들이 인공지능을 ‘놀이·조작·구동’하면서 이해하기 좋은 실제 사이트, 시뮬레이션, 웹앱 자료를 학년군별로 정리한 것입니다.
초1–2는 ‘AI가 맞히고 틀리는 경험’, 초3–4는 ‘데이터로 AI를 가르치는 경험’, **초5–6은 ‘내가 만든 모델을 작품·게임·기기와 연결하는 경험’**으로 가는 흐름입니다.

1. 초등 AI 체험 수업의 큰 흐름

| 학년군 | 학생에게 남겨야 할 핵심 개념 | 적합한 활동 |
| --- | --- | --- |
| 초1–2 | AI는 사람처럼 “생각”한다기보다, 배운 예시를 보고 맞히려고 한다 | 그림 맞히기, 낙서 인식, 그림 애니메이션, 음악 AI 놀이 |
| 초3–4 | AI는 데이터를 보고 배우며, 데이터가 부족하거나 치우치면 틀릴 수 있다 | 물고기/쓰레기 분류, 그림·소리 분류, AI 오답 찾기 |
| 초5–6 | 내가 직접 데이터를 모아 모델을 훈련하고, 그 모델을 게임·앱·로봇에 연결할 수 있다 | Teachable Machine, 엔트리 AI 블록, Scratch 연동, micro:bit 움직임 인식 |

2. 가장 먼저 추천하는 핵심 사이트 15개

A. 초1–2학년: “AI가 보고, 듣고, 맞히고, 틀리는 걸 놀면서 보기”

| 자료 | 적합 학년 | 학생이 하는 일 | 배울 수 있는 개념 | 수업 예시 |
| --- | --- | --- | --- | --- |
| Quick, Draw! | 1–6 | 제시어를 보고 20초 안에 그림을 그리면, 신경망이 무엇인지 맞힙니다. 한국어 페이지도 제공됩니다. (Quick, Draw!) | 이미지 인식, 학습 데이터, 오답, 패턴 | “AI가 빨리 맞힌 그림과 못 맞힌 그림 비교하기” |
| AutoDraw | 1–4 | 아이가 대충 그린 그림을 AI가 예쁜 아이콘 후보로 바꿔 제안합니다. (autodraw.com) | 그림 인식, 추천, 후보 선택 | “AI와 함께 교실 안내 표지판 만들기” |
| Animated Drawings – Meta FAIR | 1–4 | 학생이 종이에 그린 캐릭터를 업로드하면 움직이는 애니메이션으로 바뀝니다. (Sketch Metademolab) | 사람 모양 인식, 관절 위치, 컴퓨터 비전 | “내가 그린 캐릭터를 뛰게 하기” |
| Blob Opera | 1–6 | 네 개의 캐릭터를 움직여 오페라 목소리를 만들고 조합합니다. 구글은 이 실험을 네 명의 오페라 가수 목소리로 학습한 머신러닝 실험으로 설명합니다. (구글 아트 및 문화) | 생성형 음악, 음성 모델, 창작 AI | “AI 오페라 합창 만들기” |
| A.I. Duet | 2–6 | 학생이 피아노 건반을 누르면 AI가 이어서 연주로 응답합니다. TensorFlow와 Magenta 기반 실험입니다. (구글 실험실) | 패턴 예측, 음악 생성, 상호작용 | “내가 친 멜로디에 AI가 답하기” |
| Paint With Music | 2–6 | 붓질 움직임이 악기 소리와 음으로 바뀝니다. Magenta의 머신러닝 기반 DDSP 라이브러리를 사용한 실험입니다. (구글 아트 및 문화) | 움직임-소리 변환, 창작 AI | “그림을 그리면 음악이 되는 활동” |

초1–2 수업 포인트

초1–2에게는 “인공지능은 알고리즘이다”라고 설명하기보다 이렇게 말하는 것이 좋습니다.

AI는 많은 예시를 보고 배워요.

이 시기의 수업 핵심은 정답 맞히기보다 오답 관찰입니다. 예를 들어 Quick, Draw!에서 “고양이”를 그렸는데 AI가 “토끼”라고 하면, 학생에게 “왜 토끼라고 생각했을까?”를 묻습니다. 귀 모양, 수염, 몸통, 꼬리 같은 특징을 이야기하면서 자연스럽게 특징 추출 개념으로 이어갈 수 있습니다.

B. 초3–4학년: “데이터를 모아 AI를 가르쳐 보기”

| 자료 | 적합 학년 | 학생이 하는 일 | 배울 수 있는 개념 | 수업 예시 |
| --- | --- | --- | --- | --- |
| Code.org AI for Oceans | 3–6 | 물고기와 쓰레기를 분류하며 AI에게 학습 데이터를 제공합니다. Code.org 활동은 학생이 먼저 “fish / not fish”처럼 분류하고, 이후 더 다양한 바다 생물을 포함하도록 학습 데이터를 확장하게 합니다. (Code.org) | 학습 데이터, 라벨, 편향, 환경 문제 | “AI 바다 청소 로봇 만들기” |
| Code.org How AI Makes Decisions | 3–5 | 음식, 이모지, 특징 벡터 등을 이용해 AI가 데이터를 바탕으로 결정을 내리는 과정을 배웁니다. Code.org는 이 모듈을 3–5학년 대상 AI 개념·데이터 탐색·의사결정 활동으로 소개합니다. (Code.org) | 데이터, 특징, 예측, AI 의사결정 | “AI 간식 추천기가 왜 사과를 골랐을까?” |
| Teachable Machine | 3–6 | 이미지, 소리, 자세 데이터를 직접 모아 모델을 학습시킵니다. 구글은 이 도구를 이미지·소리·포즈를 인식하는 모델을 빠르게 만들 수 있는 노코드 도구로 설명합니다. (Teachable Machine) | 지도학습, 클래스, 훈련, 테스트 | “가위바위보 인식 AI”, “박수/휘파람 소리 구분 AI” |
| Machine Learning for Kids | 3–6 | 텍스트, 그림, 숫자, 소리 예시를 모아 모델을 훈련하고 Scratch 게임에 연결합니다. (Machine Learning for Kids) | 데이터 수집, 모델 훈련, Scratch 응용 | “친절한 말/나쁜 말 분류 챗봇” |
| Day of AI | 1–6 | 교사용 수업 자료입니다. 5–7세용 “How We Teach Machines”, 8–10세 이상용 “What is Artificial Intelligence?” 등 연령별 AI 리터러시 수업을 제공합니다. (Day of AI) | AI 기초, 윤리, 일상 속 AI | “AI가 배우는 방법 이야기 수업” |

초3–4 수업 포인트

이 시기에는 “AI가 똑똑하다”보다 **“AI는 데이터를 보고 판단한다”**를 강조해야 합니다.

가장 좋은 질문은 이것입니다.

AI가 틀린 것은 AI가 나빠서일까, 아니면 우리가 가르친 데이터가 부족해서일까?

예를 들어 Teachable Machine에서 “연필 / 지우개 / 가위”를 학습시킨 뒤, 배경을 바꾸거나 손으로 가리거나 친구 물건으로 테스트하면 정확도가 달라집니다. 여기서 학생은 데이터 다양성, 편향, 일반화를 직관적으로 이해합니다.

C. 초5–6학년: “내가 만든 AI를 게임·앱·기기와 연결하기”

| 자료 | 적합 학년 | 학생이 하는 일 | 배울 수 있는 개념 | 수업 예시 |
| --- | --- | --- | --- | --- |
| 엔트리 AI 블록 | 4–6 | 번역, 읽어주기, 음성 인식, 사람·얼굴·사물·손 인식, 이미지·텍스트·소리·숫자 모델 학습 등을 블록으로 사용합니다. 엔트리 문서에는 AI 블록과 AI 모델 학습 기능이 분류되어 안내되어 있습니다. (Entry Docs) | AI 기능 호출, 모델 학습, 블록코딩 | “AI 분리수거 도우미”, “얼굴 표정 반응 캐릭터” |
| Scratch | 3–6 | 블록을 조립해 애니메이션, 게임, 이야기를 만들고 AI 모델 결과와 연결할 수 있습니다. Scratch는 무료 프로그래밍 언어와 온라인 커뮤니티로 소개됩니다. (Scratch) | 조건문, 이벤트, AI 결과 활용 | “AI가 맞히면 캐릭터가 움직이는 게임” |
| LearningML | 4–6 | 텍스트나 이미지 데이터를 모아 분류 모델을 만들고 Scratch와 연결할 수 있습니다. (LearningML) | 텍스트 분류, 이미지 분류, 훈련 데이터 | “동물 설명 문장을 읽고 동물 맞히기” |
| mBlock | 5–6 | Scratch 기반 블록코딩 환경에서 AI·IoT·로봇을 연결합니다. mBlock은 Microsoft Cognitive Services와 Google Teachable Machine을 통합해 어린 학습자도 AI 기능을 접근할 수 있게 한다고 설명합니다. (mBlock) | AI+로봇, 음성 인식, 이미지 인식 | “음성 명령으로 로봇 움직이기” |
| micro:bit CreateAI | 5–6 | micro:bit 센서로 박수, 흔들기, 점프 같은 움직임 데이터를 모아 모델을 훈련하고 MakeCode 프로그램과 연결합니다. (마이크로비트) | 센서 데이터, 움직임 인식, 피지컬 AI | “손 흔들면 불 켜지는 AI 배지” |
| MIT App Inventor Personal Image Classifier | 5–6 심화 | 웹캠으로 표정이나 물체 이미지를 모아 개인 이미지 분류 모델을 만들고 앱과 연결합니다. MIT App Inventor 자료는 학생이 이미지 분류를 통해 머신러닝 기초를 배우고 앱을 만든다고 설명합니다. (MIT App Inventor) | 이미지 분류, 앱 만들기, 신뢰도 | “내 표정을 알아보는 앱” |
| Minecraft Education AI Foundations / Reed Smart: AI Detective | 4–6 | 마인크래프트 월드 안에서 AI와 디지털 리터러시를 게임처럼 배웁니다. AI Foundations는 애니메이션 영상과 몰입형 월드로 AI 기초를 배우는 11개 수업으로 소개되고, Reed Smart는 딥페이크·AI 생성 콘텐츠를 판별하는 활동입니다. (education.minecraft.net) | AI 리터러시, 생성형 AI, 정보 판별 | “AI 탐정이 되어 가짜 정보 찾기” |
| Code.org Mix & Move with AI | 3–6 | AI를 활용해 댄서 디자인, 음악 믹스, 댄스 루틴 코딩을 합니다. Code.org는 이 활동을 8세 이상 초보자용으로 소개하며 한국어를 포함한 여러 언어를 지원한다고 설명합니다. (Code.org) | 생성형 AI, 코드 생성, 인간의 선택 | “AI가 제안한 춤을 내가 수정하기” |

초5–6 수업 포인트

초5–6은 단순 체험에서 한 단계 더 나아가야 합니다.

내가 데이터를 모은다.

이 흐름이 잡히면 학생은 AI를 “신기한 도구”가 아니라 내가 설계하고 조절할 수 있는 시스템으로 이해합니다.

3. 개념별로 다시 정리한 추천 자료

1) AI가 이미지를 인식한다는 것을 보여주기

| 자료 | 추천 학년 | 좋은 이유 |
| --- | --- | --- |
| Quick, Draw! | 1–6 | 학생이 직접 그림을 그리면 AI가 바로 추측하므로, “AI도 틀린다”는 것을 가장 쉽게 보여줍니다. (Quick, Draw!) |
| AutoDraw | 1–4 | 낙서가 정돈된 아이콘 후보로 바뀌어 저학년 미술 활동과 잘 맞습니다. (autodraw.com) |
| Emoji Scavenger Hunt | 2–5 | 스마트폰 카메라로 실제 물건을 찾아 AI가 인식하게 하는 게임입니다. 구글은 이 실험을 TensorFlow.js로 카메라 속 물체를 식별하는 웹 기반 게임으로 설명합니다. (브랜드 스튜디오) |
| Animated Drawings | 1–4 | 캐릭터 그림에서 몸통과 관절을 찾아 움직임을 붙이는 활동이라 컴퓨터 비전 입문에 좋습니다. (Sketch Metademolab) |

활동 예시

“AI가 헷갈리는 그림 도감 만들기”

학생들이 Quick, Draw!에서 AI가 틀린 그림을 모읍니다.

예:

강아지 귀가 길어서 토끼로 봄

컵 손잡이가 없어서 양동이로 봄

자동차 바퀴를 안 그려서 버스로 못 봄

이 활동은 초등 저학년에게 특징과 패턴을 자연스럽게 이해시키는 데 좋습니다.

2) AI를 직접 가르치는 활동

| 자료 | 추천 학년 | 좋은 이유 |
| --- | --- | --- |
| Teachable Machine | 3–6 | 이미지, 소리, 포즈 데이터를 직접 수집하고 훈련할 수 있어 지도학습을 가장 직관적으로 보여줍니다. (Teachable Machine) |
| Machine Learning for Kids | 3–6 | 데이터 수집 → 모델 훈련 → Scratch 게임 제작 흐름이 분명합니다. (Machine Learning for Kids) |
| LearningML | 4–6 | 텍스트·이미지 분류 모델을 만들고 Scratch와 연결할 수 있어 국어·미술·정보 수업과 연결하기 좋습니다. (LearningML) |
| 엔트리 AI 모델 학습 | 4–6 | 국내 초등 수업에서 접근성이 좋고, 이미지·텍스트·소리·숫자 모델을 블록코딩과 연결할 수 있습니다. (Entry Docs) |

활동 예시

“교실 물건 분류 AI”

학생들이 연필, 지우개, 가위 사진을 각각 20장씩 모읍니다.

배경 바꾸기

조명 바꾸기

멀리서 찍기

손으로 일부 가리기

친구 물건으로 테스트하기

결론은 이렇게 정리합니다.

AI는 외운 것이 아니라, 배운 예시와 비슷한지 보고 판단한다.

3) 데이터와 편향을 이해하는 활동

| 자료 | 추천 학년 | 좋은 이유 |
| --- | --- | --- |
| AI for Oceans | 3–6 | 물고기와 쓰레기 분류 활동을 통해 학습 데이터와 편향을 쉽게 다룹니다. (Code.org) |
| How AI Makes Decisions | 3–5 | 학생이 AI가 데이터를 기반으로 결정을 내리는 과정을 음식·이모지 등 친숙한 예로 배웁니다. (Code.org) |
| Day of AI | 1–6 | 5–7세, 8–10세 등 연령대별 AI 기초·윤리 자료가 있어 교사가 수업 흐름을 설계하기 좋습니다. (Day of AI) |
| AI Unplugged | 1–6 | 컴퓨터 없이도 AI 개념을 활동 중심으로 배울 수 있는 자료를 제공합니다. 한국어 자료도 제공됩니다. (AI Unplugged) |

활동 예시

“AI 간식 추천기는 공정할까?”

학생들에게 좋아하는 간식 데이터를 모으게 합니다.

AI가 초콜릿을 좋아해서 그런 걸까?

여기서 데이터 편향을 초등 수준으로 설명할 수 있습니다.

4) 음악·미술·창작 AI 활동

| 자료 | 추천 학년 | 좋은 이유 |
| --- | --- | --- |
| Blob Opera | 1–6 | 캐릭터를 움직이면 AI가 오페라 목소리를 생성하므로 음악 수업과 잘 맞습니다. (구글 아트 및 문화) |
| A.I. Duet | 2–6 | 학생의 연주에 AI가 응답하므로 “패턴을 듣고 이어서 예측한다”는 개념을 경험할 수 있습니다. (구글 실험실) |
| Infinite Drum Machine | 3–6 | 수천 개의 일상 소리를 머신러닝으로 배열한 실험이라, 비슷한 소리끼리 가까이 모이는 것을 볼 수 있습니다. (구글 실험실) |
| Paint With Music | 2–6 | 붓질을 음악으로 바꾸는 창작 활동이라 미술·음악 융합 수업에 좋습니다. (구글 아트 및 문화) |
| Assisted Melody | 4–6 | 학생이 만든 멜로디를 바흐·모차르트·베토벤 스타일로 바꾸어 볼 수 있습니다. (구글 아트 및 문화) |

활동 예시

“AI와 함께 우리 반 주제가 만들기”

Blob Opera로 합창 분위기를 만든다.

A.I. Duet으로 간단한 멜로디를 만든다.

Assisted Melody로 고전음악 스타일을 입힌다.

학생들이 “AI가 만든 부분 / 사람이 고른 부분”을 구분해서 발표한다.

이 활동의 핵심은 AI가 창작을 대신한다가 아니라,

AI는 후보를 만들고, 사람은 고르고 고친다.

입니다.

5) 블록코딩·피지컬 컴퓨팅과 연결하기

| 자료 | 추천 학년 | 좋은 이유 |
| --- | --- | --- |
| 엔트리 AI 블록 | 4–6 | 한국어 환경에서 번역, 음성 인식, 사물 인식, 손 인식, 모델 학습을 블록으로 다룰 수 있습니다. (Entry Docs) |
| Scratch + Machine Learning for Kids | 3–6 | AI 모델 결과를 Scratch 게임 규칙에 연결할 수 있습니다. (Machine Learning for Kids) |
| mBlock | 5–6 | AI, IoT, 로봇을 함께 다룰 수 있고, Teachable Machine과도 연계됩니다. (mBlock) |
| micro:bit CreateAI | 5–6 | 움직임 데이터를 모아 AI 모델을 만들고 실제 micro:bit에 반응을 넣을 수 있습니다. (마이크로비트) |
| MIT App Inventor Personal Image Classifier | 5–6 심화 | 이미지 분류 모델을 앱으로 연결할 수 있어 초등 고학년 영재·동아리 수업에 적합합니다. (MIT App Inventor) |

활동 예시

“AI 운동 타이머 만들기”

micro:bit CreateAI로 다음 움직임을 학습시킵니다.

박수

점프

흔들기

멈춤

그다음 micro:bit가 움직임을 인식하면 LED나 소리로 반응하게 합니다.

예:

박수 → 웃는 얼굴

점프 → 점수 +1

멈춤 → 쉬는 시간 표시

이 활동은 학생들이 데이터 수집 → 모델 훈련 → 테스트 → 기기 제어를 한 번에 경험하게 해줍니다.

4. 학년별 추천 수업 구성

초등 1학년: “AI가 맞혀요, 그런데 틀릴 수도 있어요”

| 차시 | 활동 | 자료 |
| --- | --- | --- |
| 1 | AI가 그림을 맞히는 게임 | Quick, Draw! |
| 2 | AI가 내 낙서를 예쁜 그림으로 바꾸기 | AutoDraw |
| 3 | 내가 그린 캐릭터를 움직이게 하기 | Animated Drawings |
| 4 | AI가 틀린 이유 말하기 | Quick, Draw! 오답 기록 |

핵심 질문:

AI는 왜 어떤 그림은 잘 맞히고 어떤 그림은 못 맞힐까요?

초등 2학년: “AI와 함께 그리고, 움직이고, 노래해요”

| 차시 | 활동 | 자료 |
| --- | --- | --- |
| 1 | 낙서 인식 놀이 | Quick, Draw! |
| 2 | 교실 아이콘 만들기 | AutoDraw |
| 3 | 그림 캐릭터 움직이기 | Animated Drawings |
| 4 | AI 오페라 만들기 | Blob Opera |
| 5 | AI가 만든 것과 내가 고른 것 구분하기 | 발표 활동 |

핵심 질문:

AI가 해준 일과 내가 결정한 일은 각각 무엇인가요?

초등 3학년: “AI는 데이터를 보고 배워요”

| 차시 | 활동 | 자료 |
| --- | --- | --- |
| 1 | AI가 그림을 맞히는 원리 보기 | Quick, Draw! |
| 2 | 물고기와 쓰레기 분류하기 | AI for Oceans |
| 3 | 데이터가 부족하면 어떻게 될까? | AI for Oceans |
| 4 | 이미지 2종류 학습시키기 | Teachable Machine |
| 5 | AI가 틀린 사례 고치기 | Teachable Machine |
| 6 | 우리 반 AI 규칙 만들기 | 토론 |

핵심 질문:

AI가 배운 데이터가 한쪽으로 치우치면 어떤 일이 생길까요?

초등 4학년: “내가 AI 선생님이 되어 가르쳐요”

| 차시 | 활동 | 자료 |
| --- | --- | --- |
| 1 | 이미지 분류 모델 만들기 | Teachable Machine |
| 2 | 소리 분류 모델 만들기 | Teachable Machine |
| 3 | AI 바다 청소 활동 | AI for Oceans |
| 4 | AI가 결정을 내리는 과정 보기 | How AI Makes Decisions |
| 5 | 엔트리 AI 블록 체험 | 엔트리 |
| 6 | AI 반응 캐릭터 만들기 | 엔트리 |
| 7 | 발표: 내 AI가 잘한 점과 못한 점 | 발표 활동 |

핵심 질문:

AI에게 좋은 선생님이 되려면 데이터를 어떻게 준비해야 할까요?

초등 5학년: “AI 모델을 만들고 게임에 연결해요”

| 차시 | 활동 | 자료 |
| --- | --- | --- |
| 1 | Teachable Machine으로 가위바위보 모델 만들기 | Teachable Machine |
| 2 | 테스트 데이터로 정확도 확인하기 | Teachable Machine |
| 3 | Machine Learning for Kids에서 데이터 모으기 | Machine Learning for Kids |
| 4 | Scratch 게임과 연결하기 | Scratch |
| 5 | 엔트리 이미지·소리 모델 활용 | 엔트리 |
| 6 | AI 오답 분석 보고서 작성 | 전체 |
| 7 | 우리 생활 문제 해결 AI 기획 | 모둠 활동 |
| 8 | 프로젝트 발표 | 전체 |

핵심 질문:

AI가 맞힌 결과를 게임이나 앱에서 어떻게 사용할 수 있을까요?

초등 6학년: “AI 시스템을 설계하고 책임 있게 사용해요”

| 차시 | 활동 | 자료 |
| --- | --- | --- |
| 1 | AI 모델 학습 복습 | Teachable Machine |
| 2 | 텍스트 분류 모델 만들기 | Machine Learning for Kids / LearningML |
| 3 | 엔트리 AI 작품 만들기 | 엔트리 |
| 4 | micro:bit 움직임 AI 체험 | micro:bit CreateAI |
| 5 | AI 탐정 활동: 가짜 정보 찾기 | Minecraft Education Reed Smart |
| 6 | 생성형 AI와 인간의 선택 토론 | Mix & Move with AI |
| 7 | AI 서비스 설계 | 모둠 프로젝트 |
| 8 | 발표와 윤리 점검 | 전체 |

핵심 질문:

AI가 만든 결과를 그대로 믿어도 될까요? 사람이 확인해야 할 것은 무엇일까요?

5. 수업 주제별 바로 쓰기 좋은 활동 예시

활동 1. “AI 오답 박물관”

대상: 초1–3
 Quick, Draw!, AutoDraw

배우는 개념:

활동 2. “AI 바다 청소부”

대상: 초3–4
 AI for Oceans

배우는 개념:

활동 3. “내 표정 알아보는 AI”

대상: 초4–6
 Teachable Machine

주의:
손 모양, 물건, 종이 카드로 대체하는 것이 안전합니다.

활동 4. “AI 분리수거 도우미”

대상: 초4–6
 Teachable Machine 또는 엔트리 AI 모델

배우는 개념:

활동 5. “AI 음악가와 합주하기”

대상: 초2–6
 Blob Opera, A.I. Duet, Assisted Melody

배우는 개념:

활동 6. “AI 움직임 배지”

대상: 초5–6
 micro:bit CreateAI

배우는 개념:

6. 수업용 추천 순위

초등 전체에서 가장 활용도가 높은 순서로 고르면 다음과 같습니다.

| 순위 | 자료 | 이유 |
| --- | --- | --- |
| 1 | Quick, Draw! | 저학년부터 바로 가능하고, AI 오답을 통해 인식 원리를 설명하기 좋습니다. |
| 2 | Teachable Machine | 초등 AI 모델 학습의 대표 도구입니다. 이미지·소리·포즈를 모두 다룰 수 있습니다. |
| 3 | AI for Oceans | 데이터, 라벨, 편향, 윤리를 초등 수준에서 다루기 좋습니다. |
| 4 | AutoDraw | 미술 활동과 AI 인식을 자연스럽게 연결합니다. |
| 5 | 엔트리 AI 블록 | 한국 초등 수업 환경에서 블록코딩과 AI를 연결하기 좋습니다. |
| 6 | Machine Learning for Kids | Scratch와 연결해 AI 게임을 만들기 좋습니다. |
| 7 | Animated Drawings | 저학년의 몰입도가 높고 창작 활동과 잘 맞습니다. |
| 8 | Code.org How AI Makes Decisions | 초3–5에게 데이터 기반 의사결정을 설명하기 좋습니다. |
| 9 | micro:bit CreateAI | 초5–6에서 몸 움직임과 센서를 활용한 AI 활동에 적합합니다. |
| 10 | Minecraft Education AI Foundations | 게임 기반 AI 리터러시와 정보 판별 수업에 좋습니다. |

7. 초등 교실 운영 시 주의할 점

1. 생성형 AI 챗봇은 초등학생 개인 계정으로 쓰게 하지 않는 것이 안전합니다

OpenAI 서비스는 최소 13세 이상 또는 해당 국가의 동의 가능 최소 연령 이상이어야 하며, 18세 미만은 부모나 법정대리인의 허가가 필요하다고 명시합니다. (OpenAI)
교사가 화면을 보여주며 시연하거나, 학생용으로 설계된 교육 플랫폼을 사용하는 편이 적절합니다.

2. 카메라·마이크 활동은 개인정보를 최소화합니다

Teachable Machine, Emoji Scavenger Hunt, 엔트리 얼굴·사람 인식, micro:bit CreateAI 등은 카메라·마이크·센서를 활용할 수 있습니다. 초등 수업에서는 다음 원칙이 좋습니다.

얼굴 대신 손 모양, 물건, 그림 카드 사용

학생 이름을 데이터 라벨로 쓰지 않기

촬영 자료 저장 여부 미리 확인

가능하면 교사용 기기 1대로 시연

활동 후 데이터 삭제 안내

3. “AI가 맞혔다”보다 “왜 그렇게 판단했을까?”를 묻습니다

초등 AI 수업의 핵심 질문은 다음 세 가지입니다.

AI는 무엇을 보고 그렇게 판단했을까?

이 세 질문만 반복해도 학생들은 데이터, 특징, 편향, 일반화의 기초를 자연스럽게 이해합니다.

8. 최종 추천 교육 흐름

초등 1–6학년 전체를 하나의 계열로 설계한다면 이렇게 구성하는 것이 가장 자연스럽습니다.

| 단계 | 학년 | 주제 | 대표 자료 |
| --- | --- | --- | --- |
| 1 | 1학년 | AI가 그림을 맞혀요 | Quick, Draw!, AutoDraw |
| 2 | 2학년 | AI와 함께 그리고 노래해요 | Animated Drawings, Blob Opera |
| 3 | 3학년 | AI는 데이터를 보고 배워요 | AI for Oceans, Quick, Draw! |
| 4 | 4학년 | 내가 AI를 가르쳐요 | Teachable Machine, 엔트리 AI 블록 |
| 5 | 5학년 | AI 모델을 게임에 연결해요 | Machine Learning for Kids, Scratch, LearningML |
| 6 | 6학년 | AI 시스템을 만들고 책임 있게 써요 | micro:bit CreateAI, Minecraft Education, Mix & Move with AI |

가장 현실적인 초등용 핵심 조합은 Quick, Draw! → AI for Oceans → Teachable Machine → 엔트리/Scratch → micro:bit CreateAI입니다. 이 순서로 가면 학생들이 AI를 “마법 같은 프로그램”이 아니라 데이터를 보고 배우고, 틀리기도 하며, 사람이 목적에 맞게 설계해야 하는 도구로 이해하게 됩니다.