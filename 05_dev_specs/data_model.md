# 데이터 모델

## ModuleMeta

```ts
export interface ModuleMeta {
  id: string;
  title: string;
  subtitle: string;
  domain: Domain;
  targetLevels: TargetLevel[];
  coreQuestion: string;
  keywords: string[];
  route: string;
  implementationLevel: 'mvp' | 'extension' | 'research';
  estimatedDifficulty: 'low' | 'medium' | 'high';
}
```

## SimulationState

```ts
export interface SimulationState<TParams, TResult> {
  params: TParams;
  result: TResult | null;
  history: TResult[];
  isRunning: boolean;
  stepIndex: number;
}
```

## LearningContent

```ts
export interface LearningContent {
  moduleId: string;
  conceptIntro: string;
  metaphor: string;
  experimentQuestions: string[];
  misconceptionWarnings: string[];
  applicationTasks: string[];
  teacherNotes: string[];
}
```
