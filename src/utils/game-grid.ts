const WINNING_POSSIBILITIES: ReadonlyArray<ReadonlyArray<number>> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export interface GameConfig {
  INITIAL_HISTORY: Array<Array<Move | null>>
  INITIAL_CURRENT_STEP: number
  HISTORY_KEY: string
  CURRENT_STEP_KEY: string
}

export interface HistoryCopyConfig {
  history: Array<Array<Move | null>>
  moves: Array<Move | null>
  currentStep: number
  index: number
  nextMove: Move
}

export type Move = '💀' | '🤡'

export const gameConfig: GameConfig = {
  INITIAL_HISTORY: [Array(9).fill(null)],
  INITIAL_CURRENT_STEP: 0,
  HISTORY_KEY: 'grid-history',
  CURRENT_STEP_KEY: 'current-step',
}

export function getWinner(moves: Array<Move | null>): Move | undefined {
  for (let i = 0; i < WINNING_POSSIBILITIES.length; i++) {
    const firstElement = moves[WINNING_POSSIBILITIES[i][0]]
    const possibility = WINNING_POSSIBILITIES[i].map(element => moves[element])
    let isWinner = possibility.every(
      element =>
        element === firstElement &&
        (firstElement === '💀' || firstElement === '🤡'),
    )

    if (firstElement && isWinner) {
      return firstElement
    }
  }

  return undefined
}

export function getNextMove(moves: Array<Move | null>): Move | undefined {
  const maxOfXAndO = moves.reduce(
    (prev, next) => ({
      numberOfX: next === '💀' ? prev.numberOfX + 1 : prev.numberOfX,
      numberOfO: next === '🤡' ? prev.numberOfO + 1 : prev.numberOfO,
    }),
    {numberOfX: 0, numberOfO: 0},
  )

  const {numberOfX, numberOfO} = maxOfXAndO

  const isGridCompleted =
    (numberOfX === 5 && numberOfO === 4) || (numberOfO === 5 && numberOfX === 4)

  if (isGridCompleted) {
    return undefined
  }

  if (numberOfO >= numberOfX) {
    return '💀'
  }

  return '🤡'
}

export function getStatus(
  nextMove: Move | undefined,
  winner: Move | undefined,
): string {
  if (!winner && !nextMove) {
    return 'Draw'
  } else if (winner) {
    return `${winner} won`
  } else {
    return `${nextMove} is next`
  }
}

export function getHistoryCopy(
  config: HistoryCopyConfig,
): Array<Array<Move | null>> {
  const {history, moves, currentStep, index, nextMove} = config
  const historyCopy: Array<Array<Move | null>> = history.slice(
    0,
    currentStep + 1,
  )
  const movesCopy = [...moves]
  movesCopy[index] = nextMove
  historyCopy.push(movesCopy)

  return historyCopy
}
