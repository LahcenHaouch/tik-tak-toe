import * as React from 'react'

import './App.css'
import {getNextMove, getWinner} from './utils'

const INITIAL_MOVES = Array(9).fill(null)

function StatusAction({nextMove, onRestart}) {
  return (
    <div className="status-action">
      <div className="status">X is next</div>
      <div className="reset">Reset</div>
    </div>
  )
}

function GridCell({index, value, onClick}) {
  return (
    <div className="game-cell" onClick={() => onClick(index)}>
      {value}
      {/* <button onClick={() => onClick(index)}>{value ?? ''}</button> */}
    </div>
  )
}

function Grid() {
  const [moves, setMoves] = React.useState(INITIAL_MOVES)
  const nextMove = getNextMove(moves)
  const winner = getWinner(moves)

  function playMove(index) {
    if (!nextMove || winner) {
      return
    }
    const movesCopy = [...moves]
    movesCopy[index] = nextMove

    setMoves(movesCopy)
  }

  function restart() {
    setMoves(INITIAL_MOVES)
  }

  return (
    <div className="container">
      <StatusAction nextMove={nextMove} onRestart={restart} />
      <div className="game-grid">
        <GridCell index={0} value={moves[0]} onClick={playMove}></GridCell>
        <GridCell index={1} value={moves[1]} onClick={playMove}></GridCell>
        <GridCell index={2} value={moves[2]} onClick={playMove}></GridCell>

        <GridCell index={3} value={moves[3]} onClick={playMove}></GridCell>
        <GridCell index={4} value={moves[4]} onClick={playMove}></GridCell>
        <GridCell index={5} value={moves[5]} onClick={playMove}></GridCell>

        <GridCell index={6} value={moves[6]} onClick={playMove}></GridCell>
        <GridCell index={7} value={moves[7]} onClick={playMove}></GridCell>
        <GridCell index={8} value={moves[8]} onClick={playMove}></GridCell>
      </div>
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
