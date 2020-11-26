import {Move} from './utils'

function HistoryCard({
  moves,
  index,
  currentStep,
}: {
  moves: Array<Move | null>
  index: number
  currentStep: number
}) {
  const nonNullMoves = moves.filter(move => move) as Move[]

  const display = nonNullMoves
    .reduce((prevMove, nextMove) => `${prevMove}->${nextMove}`, '')
    .substring(2)

  return (
    <div>
      {/* {currentStep === index ? 'here' : ''} */}
      <h2>{display}</h2>
    </div>
  )
}

function History({
  history,
  currentStep,
}: {
  history: Array<Array<Move | null>>
  currentStep: number
}) {
  const display = history.map((moves, index) => (
    <HistoryCard
      moves={moves}
      index={index}
      key={index}
      currentStep={currentStep}
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
