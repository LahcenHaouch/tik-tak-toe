import * as React from 'react'

import './App.css'
import {getNextMove, getWinner} from './utils'

const INITIAL_MOVES = Array(9).fill(null)

function GridCell({value, onClick}) {
  return (
    <td>
      <div className="container">
        <button onClick={() => onClick(value)}>{value}</button>
      </div>
    </td>
  )
}

function Grid() {
  const [moves, setMoves] = React.useState(INITIAL_MOVES)
  const nextMove = getNextMove(moves)
  const winner = getWinner(moves)

  function playMove(index) {
    if (!nextMove || !winner) {
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
          <GridCell value={'0'} onClick={playMove}></GridCell>
          <GridCell value={'1'} onClick={playMove}></GridCell>
          <GridCell value={'2'} onClick={playMove}></GridCell>
        </tr>
        <tr>
          <GridCell value={'3'} onClick={playMove}></GridCell>
          <GridCell value={'4'} onClick={playMove}></GridCell>
          <GridCell value={'5'} onClick={playMove}></GridCell>
        </tr>
        <tr>
          <GridCell value={'O'} onClick={playMove}></GridCell>
          <GridCell value={'7'} onClick={playMove}></GridCell>
          <GridCell value={'8'} onClick={playMove}></GridCell>
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
