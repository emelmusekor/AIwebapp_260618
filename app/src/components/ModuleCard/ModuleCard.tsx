import { Link } from 'react-router-dom'
import { type LearningModuleMeta } from '@/content/module-metadata'
import styles from './ModuleCard.module.css'

const DOMAIN_LABELS: Record<LearningModuleMeta['domain'], string> = {
  'traditional-ai': '전통적 AI',
  ml: '머신러닝',
  neural: '신경망',
  llm: 'LLM',
  rl: '강화학습',
}

const LEVEL_LABELS: Record<LearningModuleMeta['targetLevel'], string> = {
  elementary: '초등',
  middle: '중등',
  high: '고등·대학',
  adult: '성인',
}

interface ModuleCardProps {
  module: LearningModuleMeta
}

export function ModuleCard({ module: m }: ModuleCardProps) {
  const isPlaceholder = m.implementationLevel === 'placeholder'

  return (
    <Link
      to={isPlaceholder ? '#' : `/module/${m.id}`}
      className={`${styles.card} ${isPlaceholder ? styles.disabled : ''}`}
      aria-disabled={isPlaceholder}
      onClick={(e) => { if (isPlaceholder) e.preventDefault() }}
    >
      <div className={styles.header} style={{ '--card-color': m.color } as React.CSSProperties}>
        <span className={styles.icon}>{m.icon}</span>
        <div className={styles.badges}>
          <span className={styles.domain}>{DOMAIN_LABELS[m.domain]}</span>
          <span className={styles.level}>{LEVEL_LABELS[m.targetLevel]}</span>
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{m.title}</h3>
        <p className={styles.subtitle}>{m.subtitle}</p>
        <p className={styles.question}>"{m.coreQuestion}"</p>
        <div className={styles.keywords}>
          {m.conceptKeywords.slice(0, 3).map((kw) => (
            <span key={kw} className={styles.keyword}>{kw}</span>
          ))}
        </div>
      </div>
      {isPlaceholder && (
        <div className={styles.placeholder}>
          <span>🔧 준비 중</span>
        </div>
      )}
    </Link>
  )
}
