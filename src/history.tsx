import {Move} from './utils'

function HistoryCard({moves}: {moves: Move[]}) {
  return (
    <div>
      <h2>{`💀 -> 💀 -> 💀`}</h2>
    </div>
  )
}

function History({history}: {history: Move[][]}) {
  return (
    <div className="history-container">
      <div className="history-action">History</div>
      <div>
        <HistoryCard moves={[]} />
      </div>
    </div>
  )
}

export default History
