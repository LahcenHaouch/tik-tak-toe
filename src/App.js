import * as React from 'react'

import './App.css'

const initialMoves = Array(9).fill(null)

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
  const [moves, setMoves] = React.useState(initialMoves)
  const nextMove = 0

  function playMove(index) {
    // const movesCopy = [...moves]
    // movesCopy[index] = nextMove
  }

  function restart() {
    setMoves(initialMoves)
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
