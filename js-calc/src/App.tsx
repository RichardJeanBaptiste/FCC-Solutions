import { useState } from 'react';
import './App.css';

function App() {
  const [cVal, setCVal] = useState("0");
  const [addDecimal, SetAddDecimal] = useState(true);

  const clearDisplay = () => {
    setCVal("0");
  }

  const isOperand = (x: string | undefined) : boolean => {

    if(x == undefined){
      return false;
    }

    if(x == "/" || x == "+" || x == "-" || x == "*"){
      return true;
    } 

    return false;
  }

  const addInput = (input: string) => {

    const lastChar = cVal.substring(cVal.length - 1);
    let x;

    if(cVal == "0"){
      setCVal(input);
    } else {
      if(input == "."){

        if(isOperand(lastChar)){
          return;
        };

        if(addDecimal){
          x = cVal + input;
          SetAddDecimal(false);
        } else {
          return;
        }
      } else if(input == "+" || input == "-" || input == "*" || input == "/") {

        // if(isOperand(lastChar)){
        //   return;
        // }

        x = cVal + input;
        SetAddDecimal(true);

      } else {
        x = cVal + input;
        setCVal(x);
        return;
      }
      
      setCVal(x);
    }
  }

  const sumValues = (leftSide: number, operand: string, rightSide: string) => {

    if(operand == "+"){
      return leftSide + Number(rightSide);
    } else if(operand == "*"){
      return leftSide * Number(rightSide);
    } else if (operand == "/") {
      return leftSide / Number(rightSide);
    }
  }

  const sumEquation = () => {
    
    let temp: string | undefined = "";
    //let tempNegative;
    let tempOperand = "+";
    let result: number | undefined = 0;
    let current;
    //let leftSide: int | null = null;
    //let rightSide: int | null = null;

    const x: string[] = cVal.split("").reverse();
    const xLength = x.length;
    console.log(x);

    for(let i = 0; i < xLength; i++){
      current = x.pop();

      if(current == undefined){
        break;
      }
      
      if(!isOperand(current)){
        temp += current;
      } else {        
        // character is operand

        if(result == undefined || temp == undefined){
          break;
        }

        console.log(result + " " + tempOperand + " " + temp);
        result = sumValues(result, tempOperand, temp);

        // Switch to the next operand
        tempOperand = current;
        temp = "";
      }
    }

    if( result != undefined) {
      console.log(sumValues(result,tempOperand, temp));
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
        <button id="equals" onClick={sumEquation}>=</button>
        <button id="clear" onClick={clearDisplay}>clear</button>
      </div>
      
    </div>
  )
}

export default App
