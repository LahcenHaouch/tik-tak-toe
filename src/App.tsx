import * as React from 'react'

import './App.css'
import {getWinner, getNextMove, getStatus, useLocalStorage, Move } from './utils'

const INITIAL_MOVES: Array<Move |null > = Array(9).fill(null)

function StatusAction({status, onRestart}: {status: string, onRestart: () => void}) {
  return (
    <div className="status-action">
      <div className="status">{status}</div>
      <div className="restart" onClick={onRestart}>
        Restart
      </div>
    </div>
  )
}

function GridCell({index, value, status, onClick}: {index: number, value: Move | null, status: string, onClick: (index: number) => void}) {
  const disabled = value || status.includes('won') || status === 'Draw'
  const className = disabled ? 'game-cell disabled' : 'game-cell'

  return (
    <div className={className} onClick={() => onClick(index)}>
      {value}
    </div>
  )
}

function Grid() {
  const [moves, setMoves] = useLocalStorage({
    initialState: INITIAL_MOVES,
    key: 'grid-state',
  })
  const nextMove = getNextMove(moves)
  const winner = getWinner(moves)
  const status = getStatus(nextMove, winner)

  function playMove(index: number) {
    if (!nextMove || winner || moves[index]) {
      return
    }
    const movesCopy = [...moves]
    movesCopy[index] = nextMove

    setMoves(movesCopy)
  }

  function restart() {
    setMoves(INITIAL_MOVES)
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
    <div className="container">
      <StatusAction status={status} onRestart={restart} />
      <div className="game-grid">{gameGrid}</div>
    </div>
  )
}

function App() {
  return (
    <>
      <h1 className="title">
        Tik <span>Tak</span> Toe
      </h1>
      <Grid />
    </>
  )
}

export default App
