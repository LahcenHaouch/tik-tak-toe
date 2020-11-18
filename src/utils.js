const winningPossibilities = [
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

  const possibilities = winningPossibilities.filter(possibility =>
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
  // calculate max of O and X to determine the next value
}
