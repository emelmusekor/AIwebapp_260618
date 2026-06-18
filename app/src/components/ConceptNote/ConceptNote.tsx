import styles from './ConceptNote.module.css'

interface ConceptNoteProps {
  title: string
  variant?: 'info' | 'warning' | 'limit'
  children: React.ReactNode
}

const VARIANT_ICONS = {
  info: 'ℹ️',
  warning: '⚠️',
  limit: '🚧',
}

export function ConceptNote({ title, variant = 'info', children }: ConceptNoteProps) {
  return (
    <section className={`${styles.note} ${styles[variant]}`}>
      <h3 className={styles.heading}>
        <span>{VARIANT_ICONS[variant]}</span>
        {title}
      </h3>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
