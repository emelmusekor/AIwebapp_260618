import styles from './SimulationPanel.module.css'

interface SimulationPanelProps {
  explanation: string
  step?: number
  extra?: React.ReactNode
}

export function SimulationPanel({ explanation, step, extra }: SimulationPanelProps) {
  return (
    <section className={styles.panel}>
      <h3 className={styles.heading}>
        <span className={styles.icon}>📍</span>
        현재 상태
        {step !== undefined && <span className={styles.step}>step {step}</span>}
      </h3>
      <p className={styles.explanation}>{explanation}</p>
      {extra && <div className={styles.extra}>{extra}</div>}
    </section>
  )
}
