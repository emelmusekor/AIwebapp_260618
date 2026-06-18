import { Outlet, Link, useLocation } from 'react-router-dom'
import styles from './Layout.module.css'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🧠</span>
            <span>AI 학습 실험실</span>
          </Link>
          {!isHome && (
            <Link to="/" className={styles.backLink}>
              ← 모듈 목록
            </Link>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>AI 개념 학습 웹앱 — 브라우저에서 직접 실험하세요. 인터넷 연결 없이 작동합니다.</p>
      </footer>
    </div>
  )
}
