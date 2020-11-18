import * as React from 'react'

import './App.css'

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
  const [moves, setMoves] = React.useState(Array(9).fill(null))

  function handleClick() {}

  return (
    <table id="board">
      <tbody>
        <tr>
          <GridCell value={'0'} onClick={handleClick}></GridCell>
          <GridCell value={'1'} onClick={handleClick}></GridCell>
          <GridCell value={'2'} onClick={handleClick}></GridCell>
        </tr>
        <tr>
          <GridCell value={'3'} onClick={handleClick}></GridCell>
          <GridCell value={'4'} onClick={handleClick}></GridCell>
          <GridCell value={'5'} onClick={handleClick}></GridCell>
        </tr>
        <tr>
          <GridCell value={'O'} onClick={handleClick}></GridCell>
          <GridCell value={'7'} onClick={handleClick}></GridCell>
          <GridCell value={'8'} onClick={handleClick}></GridCell>
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
