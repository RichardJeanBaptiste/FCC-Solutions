import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [breakLength, SetBreakLength] = useState(5);
  const [sessionLength, SetSessionLength] = useState(25);
  const [timeLeft, SetTimeLeft] = useState(null);
  const [start, SetStart] = useState("Start");
  const [num, SetNum] = useState();
  const [startTimer, SetStartTimer] = useState(false);
  
  useEffect(() => {
    let newDay = new Date();
    newDay.setMinutes(25);
    newDay.setSeconds(0);
    SetTimeLeft(newDay);
    SetNum(1000); 
  },[]);


  useEffect(() => {
    let x;
    if(startTimer) {
      setTimeout(() => {
        SetNum(() => num - 1);
        x = new Date(timeLeft);
        x.setSeconds(x.getSeconds() - 1);
        SetTimeLeft(x);
        //SetTimeLeft( timeLeft.setSeconds());
      }, 1000);
      //console.log(num);
    }
  },[startTimer, num, timeLeft]);

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
    let resetDay = new Date();
    resetDay.setMinutes(25);
    resetDay.setSeconds(0);
    SetTimeLeft(resetDay);
    SetStartTimer(false);
    SetBreakLength(() => 5);
    SetSessionLength(() => 25);
  }

  const start_timer = () => {
    if(start == "Start"){
      SetStart("Stop");
      SetStartTimer(true);
    } else{
      SetStart("Start");
      SetStartTimer(false);
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
      <p id="time-left">{timeLeft == null ? "" : `${String(timeLeft.getMinutes()).padStart(2,'0')}:${String(timeLeft.getSeconds()).padStart(2,'0')}`}</p>
      <button id="start_stop" onClick={start_timer}>{start}</button>
      <button id="reset" onClick={reset}>Reset</button>
    </>
  )
}

export default App

// {`${timeLeft.getMinutes()}:${timeLeft.getSeconds()}`}
