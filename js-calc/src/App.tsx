import { useState } from 'react';
import './App.css';

function App() {
  const [cVal, setCVal] = useState("0");

  const clearDisplay = () => {
    setCVal("0");
  }

  const addInput = (input: string) => {

    if(cVal == "0"){
      setCVal(input);
    } else if (cVal.includes(".") && input == ".") {
      return;
    } else {
      let x = cVal + input;
      setCVal(x);
    }
    
  }

  return (
    <div>
      <div id="display">
        {cVal}
      </div>


      

      <div>
        <button id="zero" onClick={() => addInput("0")}>0</button>
        <button id="one" onClick={() => addInput("1")}>1</button>
        <button id="two" onClick={() => addInput("2")}>2</button>
        <button id="three" onClick={() => addInput("3")}>3</button>
        <button id="four" onClick={() => addInput("4")}>4</button>
        <button id="five" onClick={() => addInput("5")}>5</button>
        <button id="six" onClick={() => addInput("6")}>6</button>
        <button id="seven" onClick={() => addInput("7")}>7</button>
        <button id="eight" onClick={() => addInput("8")}>8</button>
        <button id="nine" onClick={() => addInput("9")}>9</button>
        <button id="decimal" onClick={() => addInput(".")}>.</button>
      </div>

      <div>
        <button id="add" onClick={() => addInput("+")}>+</button>
        <button id="subtract" onClick={() => addInput("-")}>-</button>
        <button id="multiply" onClick={() => addInput("*")}>*</button>
        <button id="divide" onClick={() => addInput("/")}>/</button>
      </div>

      <div>
        <button id="equals">=</button>
        <button id="clear" onClick={clearDisplay}>clear</button>
      </div>
      
    </div>
  )
}

export default App
