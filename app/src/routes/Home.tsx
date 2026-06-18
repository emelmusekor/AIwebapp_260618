import { modules, type LearningModuleMeta } from '@/content/module-metadata'
import { ModuleCard } from '@/components/ModuleCard/ModuleCard'
import styles from './Home.module.css'

const DOMAIN_GROUPS: Array<{
  domain: LearningModuleMeta['domain']
  label: string
  icon: string
  desc: string
}> = [
  { domain: 'traditional-ai', label: '전통적 AI', icon: '🗺️', desc: '규칙 기반 탐색과 최적화 알고리즘' },
  { domain: 'ml', label: '머신러닝', icon: '📈', desc: '데이터에서 패턴을 학습하는 알고리즘' },
  { domain: 'neural', label: '신경망', icon: '🧠', desc: '뉴런을 모방한 계층형 학습 모델' },
  { domain: 'llm', label: 'LLM / 언어모델', icon: '💬', desc: '텍스트를 이해하는 대형 언어 모델' },
  { domain: 'rl', label: '강화학습', icon: '🤖', desc: '시행착오로 최적 행동을 학습' },
]

export function Home() {
  const mvpByDomain = new Map<string, LearningModuleMeta[]>()
  for (const m of modules) {
    if (m.implementationLevel !== 'mvp') continue
    const arr = mvpByDomain.get(m.domain) ?? []
    arr.push(m)
    mvpByDomain.set(m.domain, arr)
  }
  const placeholders = modules.filter((m) => m.implementationLevel === 'placeholder')
  const totalMvp = modules.filter((m) => m.implementationLevel === 'mvp').length

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>AI 학습 실험실</h1>
        <p className={styles.heroDesc}>
          AI 개념을 직접 조작하며 이해합니다. 데이터를 만들고, 알고리즘이 작동하는 과정을 관찰하고,
          오답과 한계를 분석하세요.
        </p>
        <div className={styles.heroBadges}>
          <span>🌐 오프라인 작동</span>
          <span>🧪 직접 실험</span>
          <span>📚 {totalMvp}개 모듈</span>
        </div>
      </section>

      {DOMAIN_GROUPS.map(({ domain, label, icon, desc }) => {
        const group = mvpByDomain.get(domain)
        if (!group || group.length === 0) return null
        return (
          <section key={domain} className={styles.moduleSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>{icon}</span>
                {label}
                <span className={styles.badge}>{group.length}개</span>
              </h2>
              <p className={styles.sectionDesc}>{desc}</p>
            </div>
            <div className={styles.grid}>
              {group.map((m) => (
                <ModuleCard key={m.id} module={m} />
              ))}
            </div>
          </section>
        )
      })}

      {placeholders.length > 0 && (
        <section className={styles.moduleSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🔧</span>
              준비 중
            </h2>
            <p className={styles.sectionDesc}>이후 버전에서 추가될 모듈입니다.</p>
          </div>
          <div className={styles.grid}>
            {placeholders.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
