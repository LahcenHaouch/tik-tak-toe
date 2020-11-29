import * as React from 'react'

import './App.css'
import Grid from './Grid'
import History from './History'
import {Move, gameConfig, useLocalStorage, LocalStorageOptions} from '../utils'

const {
  INITIAL_HISTORY,
  HISTORY_KEY,
  INITIAL_CURRENT_STEP,
  CURRENT_STEP_KEY,
} = gameConfig

const historyOption: LocalStorageOptions<Array<Array<Move | null>>> = {
  initialState: INITIAL_HISTORY,
  key: HISTORY_KEY,
}

const currentStepOption: LocalStorageOptions<number> = {
  initialState: INITIAL_CURRENT_STEP,
  key: CURRENT_STEP_KEY,
}

export function App() {
  const [history, setHistory] = useLocalStorage(historyOption)

  const [currentStep, setCurrentStep] = useLocalStorage(currentStepOption)

  function switchStep(step: number): void {
    setCurrentStep(step)
  }

  function goToInitialStep(): void {
    setCurrentStep(INITIAL_CURRENT_STEP)
  }

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
          switchStep={switchStep}
          goToInitialStep={goToInitialStep}
        />
        <History
          history={history}
          currentStep={currentStep}
          switchStep={switchStep}
        />
      </div>
    </>
  )
}
