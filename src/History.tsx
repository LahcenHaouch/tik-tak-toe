import {Move} from './utils'

function HistoryCard({
  moves,
  index,
  currentStep,
  switchStep,
}: {
  moves: Array<Move | null>
  index: number
  currentStep: number
  switchStep: (index: number) => void
}) {
  const nonNullMoves = moves.filter(move => move) as Move[]

  const display = nonNullMoves
    .reduce((prevMove, nextMove) => `${prevMove} -> ${nextMove}`, '')
    .substring(3)

  const isCurrentStep = currentStep === index && display.length
  const canSwithToStep = !isCurrentStep && index !== 0

  return (
    <div className="history-card-container">
      <div className="history-step" onClick={() => switchStep(index)}>
        {canSwithToStep ? '🐙' : ''}
      </div>
      <div>{isCurrentStep ? '👁' : ''}</div>
      <div>{display}</div>
    </div>
  )
}

function History({
  history,
  currentStep,
  switchStep,
}: {
  history: Array<Array<Move | null>>
  currentStep: number
  switchStep: (index: number) => void
}) {
  const display = history.map((moves, index) => (
    <HistoryCard
      moves={moves}
      index={index}
      key={index}
      currentStep={currentStep}
      switchStep={switchStep}
    />
  ))

  return (
    <div className="history-container">
      <div className="history-action">History</div>
      <div>{display}</div>
    </div>
  )
}

export default History
