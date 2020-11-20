import * as React from 'react'

import './App.css'
import {getNextMove, getWinner} from './utils'

const INITIAL_MOVES = Array(9).fill(null)

function GridCell({index, value, onClick}) {
  return (
    <td>
      <div className="container">
        <button onClick={() => onClick(index)}>{value ?? ''}</button>
      </div>
    </td>
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
    <table id="board">
      <tbody>
        <tr>
          <GridCell index={0} value={moves[0]} onClick={playMove}></GridCell>
          <GridCell index={1} value={moves[1]} onClick={playMove}></GridCell>
          <GridCell index={2} value={moves[2]} onClick={playMove}></GridCell>
        </tr>
        <tr>
          <GridCell index={3} value={moves[3]} onClick={playMove}></GridCell>
          <GridCell index={4} value={moves[4]} onClick={playMove}></GridCell>
          <GridCell index={5} value={moves[5]} onClick={playMove}></GridCell>
        </tr>
        <tr>
          <GridCell index={6} value={moves[6]} onClick={playMove}></GridCell>
          <GridCell index={7} value={moves[7]} onClick={playMove}></GridCell>
          <GridCell index={8} value={moves[8]} onClick={playMove}></GridCell>
        </tr>
      </tbody>
    </table>
  )
}

function App() {
  return (
    <div className="app">
      <h1>Tik-Tak-Toe</h1>
      <Grid />
    </div>
  )
}

export default App
