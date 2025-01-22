import { useState, useRef } from 'react'
import './App.css'
import beep from './assets/beep2.mp3';

function App() {

  const audioRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [timerLabel, SetTimerLabel] = useState("Session");
  const [sessionId, SetSessionId] = useState();
  const [breakLength, SetBreakLength] = useState(5);
  const [sessionLength, SetSessionLength] = useState(25);
  const [timeLeft, SetTimeLeft] = useState(0);
  const [min, SetMins] = useState(25);
  const [secs, SetSecs] = useState(0); 
  const [start, SetStart] = useState("Start");
  const [startTimer, SetStartTimer] = useState(false);

  
  const sessionTimer = () => {
    let session = new Date();
    session.setMinutes(min);
    session.setSeconds(secs);

    if(!startTimer){
      SetStartTimer(true);
      const myTimer = setInterval(() => {
        const minutes = session.getMinutes();
        const seconds = session.getSeconds();
  
        //console.log(`${minutes} --- ${seconds}`);
        //session.setMinutes(sessionLength);
        session.setSeconds(session.getSeconds() - 1);
        //SetTimeLeft(session);
        SetMins(minutes);
        SetSecs(seconds);
  
        if (minutes === 0 && seconds === 0) {
          //clearTimer();
          clearInterval(myTimer);
          console.log(" Session Timer finished");

          // setTimeout / play audio
          breakTimer();
        } 
      },1000);
  
      SetSessionId(myTimer);
    }
  }

  const breakTimer = () => {
    let breakTime = new Date();
    breakTime.setMinutes(breakLength);
    breakTime.setSeconds(0);

      if(!startTimer){
        SetStartTimer(true);
        const myTimer = setInterval(() => {
          const minutes = breakTime.getMinutes();
          const seconds = breakTime.getSeconds();
          //console.log(`${minutes} ---- ${seconds}`);
          breakTime.setSeconds(breakTime.getSeconds() - 1);
          SetMins(minutes);
          SetSecs(seconds);
  
          if (minutes === 0 && seconds === 0) {
            //clearTimer();
            clearInterval(myTimer);
            console.log("Break Timer finished");
            sessionTimer();
          } 
        },1000);
        SetSessionId(myTimer);
      }
  };

  const clearTimer = () => {
    clearInterval(sessionId);
  }

  // const handlePlayAudio = (breakLength) => {

  //   //let seconds = breakLength * 60;
  //   //console.log(seconds);

  //   if (audioRef.current) {
  //       audioRef.current.play();
  //       setTimeout(() => {
  //         if(audioRef.current) {
  //           audioRef.current.pause();
  //         }
  //         SetStartTimer(true);
  //       },10000);
  //   }
  //   let newBreak = new Date();
  //   newBreak.setMinutes(breakLength);
  //   newBreak.setSeconds(0);
  //   SetTimeLeft(newBreak);
  // };

  const handleStopAudio = () => {
    if(audioRef.current) {
      audioRef.current.pause();
    }
  }

  const decrement_break = () => {
    if(!startTimer){
      if(breakLength - 1 == 0){
        return;
      } else {
        SetBreakLength(() => breakLength - 1);
      }
    }
    
  }

  const increment_break = () => {
    if(!startTimer){
      if(breakLength + 1 > 60){
        return;
      } else {
        SetBreakLength(() => breakLength + 1);
      }
    }
    
  }

  const decrement_session = () => {
    if(!startTimer){
      if(sessionLength - 1 == 0){
        return;
      } else {
        SetSessionLength(() => sessionLength - 1);
        SetMins(() => sessionLength - 1);
      }
    }
  }

  const increment_session = () => {
    if(!startTimer){
      if(sessionLength + 1 > 60){
        return;
      } else {
        SetSessionLength(() => sessionLength + 1);
        SetMins(() => sessionLength + 1);
      }
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
      sessionTimer();
    } else{
      SetStart("Start");
      clearTimer();
      SetStartTimer(false);
      // let x = new Date(timeLeft);
      // x.setSeconds(x.getSeconds());
      // SetTimeLeft(x);
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
      <p id="time-left">{timeLeft == null ? "00:00" : `${String(min).padStart(2,'0')}:${String(secs).padStart(2,'0')}`}</p>
      <button id="start_stop" onClick={start_timer}>{start}</button>
      <button id="reset" onClick={reset}>Reset</button>

      <button onClick={breakTimer}>Test</button>
      <button onClick={clearTimer}>Test Clear</button>


     
      <audio ref={audioRef} id="beep">s
          <source src={beep} type="audio/mp3"/>
      </audio>
    </>
  )
}

export default App
