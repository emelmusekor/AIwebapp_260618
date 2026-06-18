import { ConceptNote } from '@/components/ConceptNote/ConceptNote'
import styles from './MnistNeuralModule.module.css'

export function MnistNeuralModule() {
  return (
    <div className={styles.module}>
      <div className={styles.comingSoon}>
        <span className={styles.icon}>✏️</span>
        <h2>숫자 인식 신경망</h2>
        <p>Canvas에 0~9 숫자를 그리면 신경망이 인식합니다.</p>
        <div className={styles.featureList}>
          <div className={styles.feature}>
            <strong>예정 기능 1</strong>
            <p>28×28 Canvas 숫자 입력</p>
          </div>
          <div className={styles.feature}>
            <strong>예정 기능 2</strong>
            <p>예측 확률 막대 그래프</p>
          </div>
          <div className={styles.feature}>
            <strong>예정 기능 3</strong>
            <p>오답 사례와 이유 분석</p>
          </div>
        </div>
        <p className={styles.note}>이 모듈은 TensorFlow.js 또는 KNN 기반으로 구현 예정입니다.</p>
      </div>

      <ConceptNote title="사전 학습 개념" variant="info">
        <ul>
          <li><strong>MNIST</strong>: 손글씨 숫자 0~9 이미지 7만 장으로 구성된 벤치마크 데이터셋입니다.</li>
          <li><strong>CNN(합성곱 신경망)</strong>: 이미지의 공간적 특징을 추출하는 신경망 구조입니다.</li>
          <li><strong>Confidence</strong>: 모델이 특정 클래스일 확률. 높을수록 확신이 강합니다.</li>
          <li>모델이 틀리는 경우는 데이터 편향, 숫자 스타일 차이, 경계 케이스 등이 원인입니다.</li>
        </ul>
      </ConceptNote>
    </div>
  )
}
