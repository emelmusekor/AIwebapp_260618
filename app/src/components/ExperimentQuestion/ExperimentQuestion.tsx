import { useState } from 'react'
import styles from './ExperimentQuestion.module.css'

interface Question {
  text: string
  hint?: string
}

interface ExperimentQuestionProps {
  questions: Question[]
}

export function ExperimentQuestion({ questions }: ExperimentQuestionProps) {
  const [openHint, setOpenHint] = useState<number | null>(null)

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>
        <span>💡</span>
        실험 질문
      </h3>
      <ol className={styles.list}>
        {questions.map((q, i) => (
          <li key={i} className={styles.item}>
            <p className={styles.questionText}>{q.text}</p>
            {q.hint && (
              <button
                className={styles.hintToggle}
                onClick={() => setOpenHint(openHint === i ? null : i)}
              >
                {openHint === i ? '힌트 닫기 ▲' : '힌트 보기 ▼'}
              </button>
            )}
            {q.hint && openHint === i && (
              <p className={styles.hint}>{q.hint}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
