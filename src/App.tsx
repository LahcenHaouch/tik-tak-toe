import * as React from 'react'

import './App.css'
import History from './History'
import Grid from './Grid'
import {useLocalStorage, INITIAL_HISTORY} from './utils'

function App() {
  const [history, setHistory] = useLocalStorage({
    initialState: INITIAL_HISTORY,
    key: 'grid-history',
  })

  const [currentStep, setCurrentStep] = useLocalStorage({
    initialState: 0,
    key: 'play',
  })

  function goToNextStep() {
    setCurrentStep(currentStep + 1)
  }

  function goToInitialStep() {
    setCurrentStep(0)
  }

  // TODO: Radient colors and icons for X and Y

  return (
    <>
      <h1 className="title">
        Tik <span>Tak</span> Toe
      </h1>
      <div className="app-container">
        <Grid
          history={history}
          currentStep={currentStep}
          setHistory={setHistory}
          goToNextStep={goToNextStep}
          goToInitialStep={goToInitialStep}
        />
        <History history={history} currentStep={currentStep} />
      </div>
    </>
  )
}

export default App
