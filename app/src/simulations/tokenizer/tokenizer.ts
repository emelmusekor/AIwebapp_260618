import { type Token, type AttentionWeight, type TokenizerState } from './types'

const TOKEN_COLORS = [
  '#4361ee', '#7209b7', '#f72585', '#0096c7', '#f77f00',
  '#10b981', '#e63946', '#457b9d', '#2a9d8f', '#e9c46a',
]

function wordTokenize(text: string): string[] {
  if (!text.trim()) return []
  return text
    .trim()
    .split(/\s+/)
    .flatMap((word) => {
      if (word.length > 6) {
        const mid = Math.ceil(word.length / 2)
        return [word.slice(0, mid) + '##', word.slice(mid)]
      }
      return [word]
    })
}

function mockAttention(tokens: Token[], selectedIdx: number | null): AttentionWeight[] {
  if (selectedIdx === null || tokens.length === 0) return []
  const weights: AttentionWeight[] = []
  for (let i = 0; i < tokens.length; i++) {
    if (i === selectedIdx) continue
    const dist = Math.abs(i - selectedIdx)
    const weight = Math.max(0.05, 1 / (1 + dist * 0.8))
    weights.push({ from: selectedIdx, to: i, weight: Math.round(weight * 100) / 100 })
  }
  return weights.sort((a, b) => b.weight - a.weight)
}

export function tokenize(text: string): TokenizerState {
  const rawTokens = wordTokenize(text)
  const tokens: Token[] = rawTokens.map((t, i) => ({
    text: t,
    id: i,
    color: TOKEN_COLORS[i % TOKEN_COLORS.length],
  }))
  return {
    inputText: text,
    tokens,
    attentionWeights: [],
    selectedToken: null,
    explanation:
      tokens.length === 0
        ? '텍스트를 입력하면 토큰으로 분리합니다.'
        : `"${text}"를 ${tokens.length}개 토큰으로 분리했습니다. 토큰을 클릭하면 attention 가중치를 확인할 수 있습니다.`,
  }
}

export function selectToken(state: TokenizerState, tokenId: number): TokenizerState {
  const selected = tokenId === state.selectedToken ? null : tokenId
  const weights = mockAttention(state.tokens, selected)
  const tokenText = selected !== null ? `"${state.tokens[selected].text}"` : ''
  return {
    ...state,
    selectedToken: selected,
    attentionWeights: weights,
    explanation:
      selected === null
        ? '토큰을 클릭하면 해당 토큰이 다른 토큰에 얼마나 주목하는지 확인할 수 있습니다.'
        : `${tokenText} 토큰의 attention: 가까운 토큰일수록 가중치가 높습니다. 실제 Transformer는 문맥에 따라 다르게 계산합니다.`,
  }
}
