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
  //const [timeLeft, SetTimeLeft] = useState("00:00");
  const [min, SetMins] = useState(25);
  const [secs, SetSecs] = useState(0); 
  const [start, SetStart] = useState("Start");
  const [startTimer, SetStartTimer] = useState(false);
  const [isSession, SetIsSession] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isBreak, SetIsBreak] = useState(false);

  
  const sessionTimer = (x, y) => {
    let session = new Date();
    session.setMinutes(x);
    session.setSeconds(y);
    
    
    SetIsSession(true);
    SetTimerLabel("Session");
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
          SetMins(0);
          SetSecs(0);
          clearInterval(myTimer);
          console.log(" Session Timer finished");
          // setTimeout / play audio
          if(audioRef.current) {
            audioRef.current.play();

            

            setTimeout(() => {
              audioRef.current.pause();
              SetIsSession(false);
              // Set Break Mins
              SetMins(breakLength);
              SetSecs(0);
              breakTimer(breakLength, 0);
            },20000);
          }
        } 
      },1000);
  
      SetSessionId(myTimer);
    }
  }

  const breakTimer = (x, y) => {
    //console.log(`${min} -- ${secs}`);
    let breakTime = new Date();
    breakTime.setMinutes(x);
    breakTime.setSeconds(y);
    
    
    SetIsBreak(true);
    SetTimerLabel("Break");

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
            SetMins(0);
            SetSecs(0);            
            console.log("Break Timer finished");
            clearInterval(myTimer);

            if(audioRef.current) {
              
              //audioRef.current.play();
  
              setTimeout(() => {
                //audioRef.current.pause();
                SetIsBreak(false);
                sessionTimer(sessionLength, 0);
              },10000);

              
            }
          } 
        },1000);
        SetSessionId(myTimer);
      }
  };

  const clearTimer = () => {
    clearInterval(sessionId);
  }


  const handleStopAudio = () => {
    if(audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
    clearTimer();
    handleStopAudio();
    //SetTimeLeft(0);
    SetMins(25);
    SetSecs(0);
    SetStartTimer(false);
    SetBreakLength(5);
    SetSessionLength(25);
    SetStart(start);
    SetTimerLabel("Session");
    
  }

  const start_timer = () => {
    if(start == "Start"){
      SetStart("Stop");
      if(isSession){
        sessionTimer(min, secs);
      } else {
        breakTimer(min, secs);
      }
      
      //handleTimer();
    } else{
      handleStopAudio();
      SetStart("Start");
      clearTimer();
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
      <p id="time-left">{`${String(min).padStart(2,'0')}:${String(secs).padStart(2,'0')}`}</p>
      <button id="start_stop" onClick={start_timer}>{start}</button>
      <button id="reset" onClick={reset}>Reset</button>
     
      <audio ref={audioRef} id="beep">s
          <source src={beep} type="audio/mp3"/>
      </audio>
    </>
  )
}

export default App

/**
 *  // const handlePlayAudio = () => {
  //   if (audioRef.current) {
  //       audioRef.current.play();
  //       setTimeout(() => {
  //         if(audioRef.current) {
  //           audioRef.current.pause();
  //         }
  //         SetStartTimer(true);
  //       },10000);
  //   }
  // };
 */
