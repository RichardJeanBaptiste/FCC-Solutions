let userInput = document.getElementById("user-input");
let checkBtn = document.getElementById("check-btn");
let clearBtn = document.getElementById("clear-btn");
let resultsDiv = document.getElementById("results-div");


checkBtn.addEventListener("click", () => {
  if(userInput.value == ""){
    alert("Please provide a phone number");
  } else {
                    /*  (?:\+?1\s?)?/ - matches country code
                        (?:\(\d{3}\)|\d{3}) - matches area code 
                        [\s.-]? - mathces optional seperator
                        \d{3} : \d{4}  - matches digits
                    */
    let phoneRegex = /^(?:\+?1\s?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    let testPattern = phoneRegex.test(userInput.value);
    if(testPattern){
      resultsDiv.innerHTML = `Valid US number: ${userInput.value}`;
    } else {
      resultsDiv.innerHTML = `Invalid US number: ${userInput.value}`;
    }
  }
});

clearBtn.addEventListener("click", () => {
  userInput.value = "";
  resultsDiv.innerHTML = "";
});