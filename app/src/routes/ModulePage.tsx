import { useParams, Link } from 'react-router-dom'
import { getModule, getAdjacentModules } from '@/content/module-metadata'
import { PathfindingModule } from '@/modules/pathfinding/PathfindingModule'
import { LinearRegressionModule } from '@/modules/linear-regression/LinearRegressionModule'
import { KMeansModule } from '@/modules/kmeans/KMeansModule'
import { SupervisedBoundaryModule } from '@/modules/supervised-boundary/SupervisedBoundaryModule'
import { PerceptronModule } from '@/modules/perceptron/PerceptronModule'
import { TokenAttentionModule } from '@/modules/token-attention/TokenAttentionModule'
import { GridworldModule } from '@/modules/gridworld/GridworldModule'
import { MnistNeuralModule } from '@/modules/mnist-neural/MnistNeuralModule'
import styles from './ModulePage.module.css'

const MODULE_COMPONENTS: Record<string, React.ComponentType> = {
  pathfinding: PathfindingModule,
  'linear-regression': LinearRegressionModule,
  kmeans: KMeansModule,
  'supervised-boundary': SupervisedBoundaryModule,
  'perceptron': PerceptronModule,
  'token-attention': TokenAttentionModule,
  gridworld: GridworldModule,
  'mnist-neural': MnistNeuralModule,
}

const DOMAIN_LABEL: Record<string, string> = {
  'traditional-ai': '전통적 AI',
  ml: '머신러닝',
  neural: '신경망',
  llm: 'LLM',
  rl: '강화학습',
}

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const meta = moduleId ? getModule(moduleId) : undefined
  const Component = moduleId ? MODULE_COMPONENTS[moduleId] : undefined
  const { prev, next } = moduleId ? getAdjacentModules(moduleId) : {}

  if (!meta || !Component) {
    return (
      <div className={styles.notFound}>
        <h2>모듈을 찾을 수 없습니다</h2>
        <p>요청한 모듈 ID: <code>{moduleId}</code></p>
        <Link to="/">← 모듈 목록으로</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.moduleHeader}>
        <div className={styles.moduleIcon}>{meta.icon}</div>
        <div className={styles.moduleInfo}>
          <div className={styles.moduleMeta}>
            <span className={styles.domainTag} style={{ background: meta.color + '22', color: meta.color }}>
              {DOMAIN_LABEL[meta.domain] ?? meta.domain}
            </span>
            <span className={styles.levelTag}>{meta.targetLevel}</span>
          </div>
          <h1 className={styles.moduleTitle}>{meta.title}</h1>
          <p className={styles.moduleSubtitle}>{meta.subtitle}</p>
        </div>
      </header>

      <p className={styles.coreQuestion}>"{meta.coreQuestion}"</p>

      <Component />

      {/* 이전/다음 모듈 내비게이션 */}
      <nav className={styles.moduleNav}>
        {prev ? (
          <Link to={`/module/${prev.id}`} className={styles.navLink}>
            <span className={styles.navDirection}>← 이전 모듈</span>
            <span className={styles.navTitle}>{prev.icon} {prev.title}</span>
          </Link>
        ) : <div />}
        <Link to="/" className={styles.navHome}>목록으로</Link>
        {next ? (
          <Link to={`/module/${next.id}`} className={`${styles.navLink} ${styles.navNext}`}>
            <span className={styles.navDirection}>다음 모듈 →</span>
            <span className={styles.navTitle}>{next.icon} {next.title}</span>
          </Link>
        ) : <div />}
      </nav>
    </div>
  )
}
