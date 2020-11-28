import {
  Move,
  getNextMove,
  getWinner,
  getStatus,
  INITIAL_HISTORY,
  getHistoryCopy,
} from '../../utils'

function StatusAction({
  status,
  onRestart,
}: {
  status: string
  onRestart: () => void
}) {
  return (
    <div className="status-action">
      <div className="status">{status}</div>
      <div className="restart" onClick={onRestart}>
        Restart
      </div>
    </div>
  )
}

function GridCell({
  index,
  value,
  status,
  onClick,
}: {
  index: number
  value: Move | null
  status: string
  onClick: (index: number) => void
}) {
  const disabled = value || status.includes('won') || status === 'Draw'
  const className = disabled ? 'game-cell disabled' : 'game-cell'

  return (
    <div className={className} onClick={() => onClick(index)}>
      {value}
    </div>
  )
}

export function Grid({
  history,
  currentStep,
  setHistory,
  switchStep,
  goToInitialStep,
}: {
  history: Array<Array<Move | null>>
  currentStep: number
  setHistory: (history: Array<Array<Move | null>>) => void
  switchStep: (index: number) => void
  goToInitialStep: () => void
}) {
  const moves: Array<Move | null> = history[currentStep]
  const nextMove = getNextMove(moves)
  const winner = getWinner(moves)
  const status = getStatus(nextMove, winner)

  function playMove(index: number) {
    if (!nextMove || winner || moves[index]) {
      return
    }

    const historyCopy = getHistoryCopy({
      history,
      moves,
      currentStep,
      index,
      nextMove,
    })

    setHistory(historyCopy)
    switchStep(currentStep + 1)
  }

  function restart() {
    setHistory(INITIAL_HISTORY)
    goToInitialStep()
  }

  const gameGrid = moves.map((move: Move | null, index: number) => (
    <GridCell
      key={index}
      index={index}
      value={move}
      status={status}
      onClick={playMove}
    />
  ))

  return (
    <div className="grid-container">
      <StatusAction status={status} onRestart={restart} />
      <div className="game-grid">{gameGrid}</div>
    </div>
  )
}
