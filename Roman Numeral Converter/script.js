let convertButton = document.getElementById("convert-btn");
let input = document.getElementById("number");
let output = document.getElementById("output");

let conversions= [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

convertButton.addEventListener("click", () => {
  if(input.value == ""){
    output.innerHTML = "Please enter a valid number";
  } else if(Number(input.value) < 0) {
    output.innerHTML = "Please enter a number greater than or equal to 1";
  } else if(Number(input.value) > 3999) {
    output.innerHTML = "Please enter a number less than or equal to 3999";
  } else {
    //Convert Number
    let value = Number(input.value);
    let result = "";
    for(const [roman, number] of conversions){
      while(number <= value){
        result += roman;
        value -= number;
      }
    }

    output.innerHTML = result;
  }
})