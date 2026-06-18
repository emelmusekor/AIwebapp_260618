export interface Token {
  text: string
  id: number
  color: string
}

export interface AttentionWeight {
  from: number
  to: number
  weight: number
}

export interface TokenizerState {
  inputText: string
  tokens: Token[]
  attentionWeights: AttentionWeight[]
  selectedToken: number | null
  explanation: string
}
