import { useState, useMemo } from 'react'
import { SimulationPanel } from '@/components/SimulationPanel/SimulationPanel'
import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import { ExperimentQuestion } from '@/components/ExperimentQuestion/ExperimentQuestion'
import { tokenize, selectToken } from '@/simulations/tokenizer/tokenizer'
import type { TokenizerState } from '@/simulations/tokenizer/types'
import styles from './TokenAttentionModule.module.css'

const PRESETS = [
  '나는 학교에 갑니다',
  '고양이가 생선을 먹었다',
  'AI understands language',
  'The bank near the river flooded',
  '딥러닝은 인공신경망을 활용합니다',
]

function computeAttentionMatrix(n: number): number[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      if (i === j) return 1.0
      const dist = Math.abs(i - j)
      const raw = Math.max(0.05, 1 / (1 + dist * 0.8))
      return raw
    }).map((v, _, arr) => {
      const sum = arr.reduce((s, x) => s + x, 0)
      return v / sum  // softmax-like normalize
    })
  )
}

function hexFromIntensity(intensity: number, color: [number, number, number]): string {
  const [r, g, b] = color
  const a = Math.round(intensity * 220)
  return `rgba(${r},${g},${b},${a / 255})`
}

export function TokenAttentionModule() {
  const [inputText, setInputText] = useState('')
  const [state, setTokenState] = useState<TokenizerState | null>(null)
  const [viewMode, setViewMode] = useState<'bar' | 'matrix'>('bar')

  const handleTokenize = (text = inputText) => {
    if (!text.trim()) return
    setTokenState(tokenize(text))
  }

  const handleSelect = (id: number) => {
    setTokenState((prev) => (prev ? selectToken(prev, id) : prev))
  }

  const handlePreset = (text: string) => {
    setInputText(text)
    setTokenState(tokenize(text))
  }

  const attentionMatrix = useMemo(() => {
    if (!state || state.tokens.length === 0) return null
    return computeAttentionMatrix(state.tokens.length)
  }, [state?.tokens.length])

  const maxWeight = state?.attentionWeights.length
    ? Math.max(...state.attentionWeights.map((w) => w.weight))
    : 1

  const n = state?.tokens.length ?? 0
  const matrixCellSize = n > 0 ? Math.min(38, Math.floor(380 / n)) : 38

  const explanation = state?.explanation ?? '문장을 입력하고 [토큰 분리] 버튼을 누르세요.'

  return (
    <div className={styles.module}>
      {/* 1. 텍스트 입력 */}
      <div className={styles.inputSection}>
        <h3 className={styles.sectionLabel}>입력</h3>
        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.textInput}
            value={inputText}
            placeholder="문장을 입력하세요..."
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleTokenize() }}
          />
          <button className={styles.primaryBtn} onClick={() => handleTokenize()}>
            토큰 분리
          </button>
        </div>
        <div className={styles.presets}>
          {PRESETS.map((p) => (
            <button key={p} className={styles.presetBtn} onClick={() => handlePreset(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 토큰 목록 */}
      <div className={styles.tokenSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionLabel}>
            토큰 목록 ({n}개)
          </h3>
          {n > 0 && (
            <div className={styles.viewToggle}>
              <button className={`${styles.toggleBtn} ${viewMode === 'bar' ? styles.active : ''}`} onClick={() => setViewMode('bar')}>막대 차트</button>
              <button className={`${styles.toggleBtn} ${viewMode === 'matrix' ? styles.active : ''}`} onClick={() => setViewMode('matrix')}>매트릭스</button>
            </div>
          )}
        </div>
        <div className={styles.tokenRow}>
          {state && state.tokens.length > 0
            ? state.tokens.map((token) => (
                <span
                  key={token.id}
                  className={`${styles.tokenChip} ${state.selectedToken === token.id ? styles.selected : ''}`}
                  style={{ background: token.color }}
                  onClick={() => handleSelect(token.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSelect(token.id) }}
                >
                  <span className={styles.tokenIndex}>{token.id}</span>
                  {token.text}
                </span>
              ))
            : <span className={styles.emptyHint}>토큰이 없습니다. 문장을 입력하세요.</span>}
        </div>
      </div>

      {/* 3. Attention 시각화 */}
      <div className={styles.attentionSection}>
        <h3 className={styles.sectionLabel}>
          Attention 가중치
          {state?.selectedToken !== null && state?.selectedToken !== undefined
            ? ` — "${state.tokens[state.selectedToken]?.text}" 기준`
            : ' — 토큰을 클릭하면 표시됩니다'}
        </h3>

        {viewMode === 'bar' && (
          <>
            {!state || state.attentionWeights.length === 0
              ? <div className={styles.attentionEmpty}>토큰을 클릭하면 해당 토큰이 다른 토큰에 얼마나 주목하는지 막대로 표시합니다.</div>
              : (
                <div className={styles.attentionList}>
                  {state.attentionWeights.slice(0, 12).map((w) => {
                    const token = state.tokens[w.to]
                    const pct = Math.round((w.weight / maxWeight) * 100)
                    return (
                      <div key={`${w.from}-${w.to}`} className={styles.attentionRow}>
                        <span className={styles.attentionLabel} style={{ color: token?.color ?? '#4361ee' }}>
                          <span className={styles.tokenIndex}>{w.to}</span>
                          {token?.text ?? ''}
                        </span>
                        <div className={styles.attentionBarWrap}>
                          <div className={styles.attentionBar} style={{ width: `${pct}%`, background: token?.color ?? '#4361ee' }} />
                        </div>
                        <span className={styles.attentionWeight}>{w.weight.toFixed(2)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
          </>
        )}

        {viewMode === 'matrix' && attentionMatrix && n > 0 && (
          <div className={styles.matrixWrap}>
            <p className={styles.matrixHint}>행(→) = 어느 토큰이 / 열(↓) = 어느 토큰에 주목하는가 / 색이 진할수록 높은 attention</p>
            <div style={{ overflowX: 'auto' }}>
              <svg
                width={matrixCellSize * n + matrixCellSize + 4}
                height={matrixCellSize * n + matrixCellSize + 4}
              >
                {/* 열 레이블 (to token) */}
                {state!.tokens.map((token, j) => (
                  <text
                    key={`col${j}`}
                    x={j * matrixCellSize + matrixCellSize + matrixCellSize / 2}
                    y={matrixCellSize / 2 + 4}
                    textAnchor="middle"
                    fontSize={Math.min(10, matrixCellSize * 0.45)}
                    fill={token.color}
                    fontWeight="bold"
                  >
                    {token.text.length > 3 ? token.text.slice(0, 3) + '…' : token.text}
                  </text>
                ))}
                {/* 행 레이블 (from token) */}
                {state!.tokens.map((token, i) => (
                  <text
                    key={`row${i}`}
                    x={matrixCellSize / 2}
                    y={i * matrixCellSize + matrixCellSize + matrixCellSize / 2 + 4}
                    textAnchor="middle"
                    fontSize={Math.min(10, matrixCellSize * 0.45)}
                    fill={token.color}
                    fontWeight="bold"
                  >
                    {token.text.length > 3 ? token.text.slice(0, 3) + '…' : token.text}
                  </text>
                ))}
                {/* 매트릭스 셀 */}
                {attentionMatrix.map((row, i) =>
                  row.map((val, j) => {
                    const isSelected = state?.selectedToken === i
                    return (
                      <rect
                        key={`${i}-${j}`}
                        x={j * matrixCellSize + matrixCellSize}
                        y={i * matrixCellSize + matrixCellSize}
                        width={matrixCellSize - 1}
                        height={matrixCellSize - 1}
                        fill={hexFromIntensity(val * (isSelected ? 1.5 : 1), [67, 97, 238])}
                        stroke={isSelected ? '#1a1a2e' : '#e5e7eb'}
                        strokeWidth={isSelected ? 1.5 : 0.5}
                        rx={2}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSelect(i)}
                      />
                    )
                  })
                )}
                {/* 대각선 (self-attention) 강조 */}
                {attentionMatrix.map((_, i) => (
                  <rect
                    key={`diag${i}`}
                    x={i * matrixCellSize + matrixCellSize}
                    y={i * matrixCellSize + matrixCellSize}
                    width={matrixCellSize - 1}
                    height={matrixCellSize - 1}
                    fill="rgba(67,97,238,0.75)"
                    stroke="#4361ee"
                    strokeWidth={1.5}
                    rx={2}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSelect(i)}
                  />
                ))}
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 4. 현재 상태 */}
      <SimulationPanel explanation={explanation} />

      {/* 5. 오답·한계 */}
      <ConceptNote title="오답과 한계" variant="limit">
        <ul>
          <li>이 시뮬레이션의 attention은 <strong>거리 기반 근사치</strong>입니다. 실제 GPT/BERT는 훈련된 가중치로 계산합니다.</li>
          <li>실제 Transformer는 여러 개의 "head"가 각각 다른 관계를 학습합니다(Multi-head Attention).</li>
          <li>같은 단어도 문맥에 따라 attention이 달라집니다. "bank"(강둑 vs 금융)를 생각해보세요.</li>
          <li>이 토크나이저는 공백 기준입니다. 실제 BPE 토크나이저는 빈도 기반으로 분할합니다.</li>
        </ul>
      </ConceptNote>

      <ExperimentQuestion
        questions={[
          {
            text: '짧은 문장과 긴 문장의 매트릭스 크기를 비교해보세요. 토큰 수가 늘면 계산량이 얼마나 늘어날까요?',
            hint: 'Attention 계산량은 토큰 수의 제곱(N²)에 비례합니다. 토큰 10개 → 100칸, 100개 → 10,000칸.',
          },
          {
            text: '매트릭스 뷰에서 대각선(자기 자신)이 가장 진한 이유는 무엇인가요?',
            hint: '각 토큰은 자기 자신과 거리가 0이므로 self-attention 값이 1.0입니다.',
          },
          {
            text: '"나는 학교에 갑니다" vs "나는 회사에 갑니다"의 attention 패턴은 같을까요?',
            hint: '이 시뮬레이션에서는 같지만, 실제 Transformer는 문맥에 따라 다른 패턴을 보입니다.',
          },
        ]}
      />
    </div>
  )
}
