# Aiwebapp_260618 기획 문서 세트

사용 위치: `H:\내 드라이브\Dev\Aiwebapp_260618`

## 프로젝트 한 줄 정의

기존 AI 시뮬레이션의 교육적 장점을 흡수하되, 초등부터 성인까지 쓸 수 있는 자체 조작형 AI 학습 웹앱을 만든다. 핵심은 “개념 설명 → 은유적 조작 → 실제 작동 관찰 → 적용 과제”의 반복 구조다.

## 바로 읽을 파일

1. `CLAUDE.md`  
   VS Code/Claude Code 에이전트가 우선 읽어야 하는 전체 작업 규칙.
2. `02_planning/00_project_brief.md`  
   교수님 요청과 전체 제품 콘셉트.
3. `02_planning/01_folder_tree.md`  
   권장 작업 루트 폴더 트리.
4. `01_agents/agent1.md` ~ `agent6.md`  
   6개 작업 에이전트 역할과 산출물.
5. `03_content_modules/00_module_index_20.md`  
   20개 핵심 모듈 전체 인덱스.
6. `07_link_research/verified_links.md`  
   인터넷 접속 가능 여부를 직접 확인한 핵심 링크와 대체 전략.
7. `00_source_preservation/source_merged_raw.md`  
   누락 방지를 위한 원천자료 통합 보존본.

## 문서 설계 원칙

- 원문은 `00_source_preservation`에 보존했다.
- 기획 문서는 개발 실행용으로 재구성했다.
- VS Code 에이전트가 인터넷을 못 쓰는 상황을 전제로, 링크 검증 결과와 대체 구현안을 별도 문서로 분리했다.
- 실제 구현은 MVP, 확장, 연구형 기능으로 단계를 나눈다.

## 현재 권장 MVP

MVP는 20개 모듈 전체 구현이 아니라, 다음 6개를 먼저 실제 작동 수준으로 만든다.

| 우선순위 | 모듈 | 구현 방식 | 이유 |
|---:|---|---|---|
| 1 | 숫자 인식 신경망 | 브라우저 Canvas + TensorFlow.js 또는 ONNX 샘플 모델 | 교수님이 명시한 대표 모듈 |
| 2 | 데이터로 가르치는 지도학습 | 2D 점 찍기 + 결정경계 시각화 | 학습 데이터, 라벨, 일반화 설명 가능 |
| 3 | K-Means 군집 | 점 찍기 + 중심점 이동 애니메이션 | 비지도학습을 가장 직관적으로 표현 |
| 4 | 미로 탐색 AI | BFS/DFS/A* 비교 | 전통적 AI와 알고리즘 교육 연결 |
| 5 | 강화학습 GridWorld | Q-table, 보상, 정책 화살표 | 보상 기반 학습 설명 가능 |
| 6 | 토큰과 Attention | 문자열 토큰화 + attention 히트맵 모형 | LLM 원리 설명 핵심 |

## 문서 업데이트 규칙

- 새 기능을 만들면 `03_content_modules`의 해당 모듈 문서와 `06_backlog_qa/acceptance_criteria.md`를 같이 수정한다.
- 외부 링크가 바뀌면 `07_link_research/verified_links.md`에 접근일과 대체안을 기록한다.
- 에이전트가 산출물을 만들면 해당 에이전트 md의 “작업 로그” 섹션에 요약을 남긴다.
