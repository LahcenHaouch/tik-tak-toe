import {useEffect, useRef, useState} from 'react'

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

export function getWinner(moves) {
  for (let i = 0; i < WINNING_POSSIBILITIES.length; i++) {
    const firstElement = moves[WINNING_POSSIBILITIES[i][0]]
    const possibility = WINNING_POSSIBILITIES[i].map(element => moves[element])
    let isWinner = possibility.every(
      element =>
        element === firstElement &&
        (firstElement === '💀' || firstElement === '🤡'),
    )

    console.log('isWinner: ', isWinner)

    if (isWinner) {
      return firstElement
    }
  }

  return undefined
}

export function getNextMove(moves) {
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

export function getStatus(nextMove, winner) {
  if (!winner && !nextMove) {
    return 'Draw'
  } else if (winner) {
    return `${winner} won`
  } else {
    return `${nextMove} is next`
  }
}

export function useLocalStorage({
  initialState,
  key,
  deserialize = JSON.parse,
  serialize = JSON.stringify,
}) {
  const prevKey = useRef(key)

  const [state, setState] = useState(
    () =>
      deserialize(localStorage.getItem(key)) ||
      (typeof initialState === 'function' ? initialState() : initialState),
  )

  useEffect(() => {
    if (key !== prevKey.current) {
      localStorage.removeItem(prevKey)
    }

    prevKey.current = key

    localStorage.setItem(key, serialize(state))
  }, [state, key, serialize])

  return [state, setState]
}
