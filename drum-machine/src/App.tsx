import { useRef, useState, useEffect, startTransition } from 'react';
import H1 from './assets/Heater-1.mp3';
import H2 from './assets/Heater-2.mp3';
import H3 from './assets/Heater-3.mp3';
import H4 from './assets/Heater-4_1.mp3';
import H6 from './assets/Heater-6.mp3';
import DSC from './assets/Dsc_Oh.mp3';
import CEV from './assets/Cev_H2.mp3';
import Kick from './assets/Kick_n_Hat.mp3';
import RP4 from './assets/RP4_KICK_1.mp3';
import './App.css'

interface DrumPadProps {
  keyName: string,
  audioSrc: string,
  audioName: string,
}

function App() {
  const [displayString, setDisplayString] = useState<string>("Nothing is currently playing");

  const DrumPad: React.FC<DrumPadProps> = ({keyName, audioSrc, audioName}) => {

    const audioRef:any = useRef(null);

    const playAudio = () => {

      const displayElement = document.getElementById("display");
      let x = audioName + " : is currently playing";

      if (audioRef.current) {
        audioRef.current.play();
      }

      if (displayElement) {
        displayElement.innerText = x;
      }
    }

    useEffect(() => {
      document.addEventListener('keydown', (event:any) => {
        if(event.key.toUpperCase() == keyName){
          playAudio();
        }
      });
    },[]);

    
    return (
      <div className='drum-pad' id={audioName} onClick={playAudio}>
        <p id={keyName}>{keyName}</p>
        <audio ref={audioRef} src={audioSrc} className='clip' id={keyName}/>
      </div>
    )
  }

  return (
    <div id="drum-machine">
      <div id="display">{displayString}</div>

      <DrumPad keyName="Q" audioSrc={H1} audioName='Q'/>
      <DrumPad keyName="W" audioSrc={H2} audioName='W'/>
      <DrumPad keyName="E" audioSrc={H3} audioName='E'/>
      <DrumPad keyName="A" audioSrc={H4} audioName='A'/>
      <DrumPad keyName="S" audioSrc={H6} audioName='S'/>
      <DrumPad keyName="D" audioSrc={DSC} audioName='D'/>
      <DrumPad keyName="Z" audioSrc={CEV} audioName='Z'/>
      <DrumPad keyName="X" audioSrc={Kick} audioName='X'/>
      <DrumPad keyName="C" audioSrc={RP4} audioName='C'/>
    </div>
  )
}

export default App
