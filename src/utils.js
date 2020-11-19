const WINNING_POSSIBILITIES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function checkIfWinner(moves, index, nextMove) {
  let isWinner = false

  const possibilities = WINNING_POSSIBILITIES.filter(possibility =>
    possibility.includes(index),
  )

  for (let i = 0; i < possibilities.length; i++) {
    const element = possibilities[i]

    isWinner = element.every(cell => moves[cell] === nextMove)

    if (isWinner) {
      break
    }
  }

  return isWinner
}

export function nextMove(moves) {
  const maxOfXAndO = moves.reduce(
    (prev, next) => ({
      numberOfX: next === 'X' ? prev.numberOfX + 1 : prev.numberOfX,
      numberOfO: next === 'O' ? prev.numberOfX + 1 : prev.numberOfX,
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
    return 'X'
  }

  return 'O'
}
