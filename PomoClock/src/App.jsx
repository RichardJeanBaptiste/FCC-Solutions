import { useState, useEffect, useRef } from 'react'
import './App.css'
import beep from './assets/beep2.mp3';

function App() {

  const audioRef = useRef(null);
  const [timerLabel, SetTimerLabel] = useState("Session");
  const [breakLength, SetBreakLength] = useState(5);
  const [sessionLength, SetSessionLength] = useState(25);
  const [timeLeft, SetTimeLeft] = useState(null);
  const [start, SetStart] = useState("Start");
  const [startTimer, SetStartTimer] = useState(false);
  
  useEffect(() => {
    let newDay = new Date();
    newDay.setMinutes(25);
    newDay.setSeconds(0);
    SetTimeLeft(newDay);
  },[]);


  useEffect(() => {
    let x;
    if(startTimer) {
      
      if(timerLabel === "Session"){ // Session Logic
        setTimeout(() => {
          x = new Date(timeLeft);
          x.setSeconds(x.getSeconds() - 1);
          if(x.getMinutes() == 0 && x.getSeconds() == 0){
            SetTimeLeft(x);
            SetStartTimer(false);
            SetTimerLabel("Break")
            handlePlayAudio(breakLength);
          } else {
            SetTimeLeft(x);
          }
        }, 1000);
      } else if(timerLabel === "Break"){ // Break Logic

        let newSession = new Date();
        newSession.setMinutes(sessionLength);
        newSession.setSeconds(0);

        setTimeout(() => {
          x = new Date(timeLeft);
          x.setSeconds(x.getSeconds() - 1);
          if(x.getMinutes() == 0 && x.getSeconds() == 0){
            SetTimeLeft(x);
            //SetStartTimer(false);
            SetTimerLabel("Session");
            handleStopAudio();
            SetTimeLeft(newSession);
          } else {
            SetTimeLeft(x);
          }
        }, 1000);
      }
    }
  },[startTimer, timeLeft, breakLength, timerLabel, sessionLength]);

  const handlePlayAudio = (breakLength) => {

    //let seconds = breakLength * 60;
    //console.log(seconds);

    if (audioRef.current) {
        audioRef.current.play();
        setTimeout(() => {
          if(audioRef.current) {
            audioRef.current.pause();
          }
          SetStartTimer(true);
        },10000);
    }
    let newBreak = new Date();
    newBreak.setMinutes(breakLength);
    newBreak.setSeconds(0);
    SetTimeLeft(newBreak);
  };

  const handleStopAudio = () => {
    if(audioRef.current) {
      audioRef.current.pause();
    }
  }

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
    handleStopAudio();
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
      
      
      <p id="timer-label">{timerLabel}</p>
      <p id="time-left">{timeLeft == null ? "" : `${String(timeLeft.getMinutes()).padStart(2,'0')}:${String(timeLeft.getSeconds()).padStart(2,'0')}`}</p>
      <button id="start_stop" onClick={start_timer}>{start}</button>
      <button id="reset" onClick={reset}>Reset</button>
     
      <audio ref={audioRef}>
          <source src={beep} type="audio/mp3"/>
      </audio>
    </>
  )
}

export default App

/**
 *  <button onClick={() => handlePlayAudio(5)}>Play Audio</button>
      <button onClick={handleStopAudio}>Stop Audio</button>
 */