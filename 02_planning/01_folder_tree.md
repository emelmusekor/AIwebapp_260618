# 작업 루트 폴더 트리

실제 사용 위치: `H:\내 드라이브\Dev\Aiwebapp_260618`

## 권장 전체 구조

```text
Aiwebapp_260618/
  README.md
  CLAUDE.md
  cluade.md
  package.json
  vite.config.ts
  tsconfig.json
  app/
    index.html
    src/
      main.tsx
      App.tsx
      routes/
        Home.tsx
        ModulePage.tsx
        CurriculumPage.tsx
      modules/
        mnist-neural-network/
        supervised-boundary/
        kmeans-clustering/
        pathfinding-search/
        reinforcement-gridworld/
        token-attention/
      simulations/
        ml/
        traditional-ai/
        neural-network/
        llm/
        reinforcement-learning/
      components/
        Layout/
        ModuleCard/
        SimulationPanel/
        ParameterControl/
        ConceptNote/
        ExperimentQuestion/
      content/
        module-metadata.ts
        curriculum-map.ts
        glossary.ts
      data/
        sample-points/
        mnist-samples/
        maze-presets/
      styles/
        global.css
  public/
    assets/
    models/
    thumbnails/
  docs/
    copied-from-planning-md/
  tests/
    unit/
    e2e/
  scripts/
    validate-content.ts
    build-module-index.ts
```

## 이 기획 문서 세트의 구조

```text
Aiwebapp_260618/
  00_source_preservation/
    chat_original.md
    source_merged_raw.md
    머신러닝_알고리즘의_교육과정과_실습사이트.md
    초등학생을_위한_인공지능_이해_사이트.md
    일반_성인을_위한_인공지능_교육.md
    전통적인_인공지능_이해_실습_사이트.md
    신경망에서_딥러닝_에이전트_피지컬까지.md
  01_agents/
    agent1.md
    agent2.md
    agent3.md
    agent4.md
    agent5.md
    agent6.md
  02_planning/
    00_project_brief.md
    01_folder_tree.md
    02_curriculum_strategy.md
    03_product_scope.md
    04_mvp_roadmap.md
    05_risk_scope_control.md
  03_content_modules/
    00_module_index_20.md
    01_supervised_learning.md
    02_unsupervised_learning.md
    03_reinforcement_learning.md
    04_neural_networks_cnn.md
    05_llm_generative_ai.md
    06_traditional_ai.md
    07_agentic_physical_ai.md
  04_design_ux/
    interaction_model.md
    screen_structure.md
    learner_journey.md
  05_dev_specs/
    data_model.md
    simulation_architecture.md
    offline_first_strategy.md
    tech_stack.md
  06_backlog_qa/
    epics.md
    mvp_backlog.md
    acceptance_criteria.md
    qa_checklist.md
  07_link_research/
    verified_links.md
    link_policy.md
```

## 파일명 규칙

- 기획 문서: 숫자 접두어 + 영문 snake_case.
- 앱 모듈 폴더: kebab-case.
- 학습 콘텐츠 키: `domain.module.level` 형식 권장.

예시:

```text
ml.supervised.boundary.middle
neural.cnn.mnist.high
traditional.search.pathfinding.elementary
llm.token.attention.high
```
