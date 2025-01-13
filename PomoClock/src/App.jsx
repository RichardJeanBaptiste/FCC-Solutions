import { useState } from 'react'
import './App.css'

function App() {

  const [breakLength, SetBreakLength] = useState(5);
  const [sessionLength, SetSessionLength] = useState(25);
  const [start, SetStart] = useState("Start");
  
  const decrement_break = () => {
    if(breakLength - 1 == 0){
      return;
    } else {
      SetBreakLength(() => breakLength - 1);
    }
  }

  const increment_break = () => {
    if(breakLength + 1 > 60){
      return;
    } else {
      SetBreakLength(() => breakLength + 1);
    }
  }

  const decrement_session = () => {
    if(sessionLength - 1 == 0){
      return;
    } else {
      SetSessionLength(() => sessionLength - 1);
    }
  }

  const increment_session = () => {
    if(sessionLength + 1 > 60){
      return;
    } else {
      SetSessionLength(() => sessionLength + 1);
    }
  }

  const reset = () => {
    SetBreakLength(() => 5);
    SetSessionLength(() => 25);
  }

  const start_timer = () => {
    if(start == "Start"){
      SetStart("Stop");
    } else{
      SetStart("Start");
    }
  }


  return (
    <>
      <p id="break-label">Break Length</p>
      <button id="break-decrement" onClick={decrement_break}>-</button>
      <button id="break-increment" onClick={increment_break}>+</button>
      <p id="break-length">{breakLength}</p>

      <p id="session-label">Session Length</p>
      <button id="session-decrement" onClick={decrement_session}>-</button>
      <button id="session-increment" onClick={increment_session}>+</button>
      <p id="session-length">{sessionLength}</p>
      
      
      <p id="timer-label">Session</p>
      <p id="time-left">time(mm:ss)</p>
      <button id="start_stop" onClick={start_timer}>{start}</button>
      <button id="reset" onClick={reset}>Reset</button>
    </>
  )
}

export default App
