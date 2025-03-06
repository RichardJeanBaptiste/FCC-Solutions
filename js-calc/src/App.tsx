/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './App.css';

function App() {
  const [cVal, setCVal] = useState("0");
  const [addDecimal, SetAddDecimal] = useState(true);

  const clearDisplay = () => {
    setCVal("0");
    SetAddDecimal(true);
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
          //console.log(input);
          return;
        }
      } else if(input == "+" || input == "-" || input == "*" || input == "/") {

        x = cVal + input;
        SetAddDecimal(true);

      } else {
        //SetAddDecimal(true);
        x = cVal + input;
        setCVal(x);

        return;
      }
      
      setCVal(x);
    }
  }

  const sumValues = (leftSide: number, operand: string, rightSide: number) => {
    // check if negative then product negative val negative number
    if(operand == "+"){
      console.log(leftSide + " " +  rightSide);
      return leftSide + rightSide;
    } else if(operand == "*"){
      //console.log("Not Negative: " + leftSide + " " + Number(rightSide) + " " + isNegative);
      return leftSide * rightSide;
    } else if (operand == "/") {
        return leftSide / rightSide;
    } else if(operand == "-") {
      return leftSide - rightSide;
    }
  }

  const sumEquation = () => {
    let input = cVal.split("");
    let temp = "";
    let current = "";
    let operand = "+";
    let result: number | undefined = 0;
    let isNegative = false;
    
    for(let i = 0; i < input.length; i++){
      current = input[i];


      // if number 
      if(!isOperand(current)){
        temp += current;
      } else {

        if(result == undefined){
          break;
        }
        
        if(current == "-"){
          // check number before
          if(isOperand(input[i - 1])){
            isNegative = true;
            continue;
          } else {
            result = sumValues(result, operand, Number(temp));
            operand = current;
            temp = "";
          }
        } else if(isOperand(input[i - 1])) {
          operand = current;
          isNegative = false;
          continue;
        } else {
          if(isNegative){
            result = sumValues(result, operand, -(Number(temp)));
            operand = current;
            temp = "";
            isNegative = false;
          } else {
            result = sumValues(result, operand, Number(temp));
            operand = current;
            temp = "";
          }
        }

       
      }
    }

    
    if(result != undefined){
      console.log(result);
      if(isNegative){
        setCVal(String(sumValues(result, operand, -(Number(temp)))));
      } else {
        setCVal(String(sumValues(result, operand, Number(temp))));
      } 
    }

    SetAddDecimal(true);
  }

  return (
    <div>

      <div>

        <p>
          The sequence "5 * - + 5" = should produce an output of "10" : expected '5' to equal '10'
        </p>

      </div>
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
