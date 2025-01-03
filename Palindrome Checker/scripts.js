let result = document.getElementById("result");

document.getElementById("check-btn").addEventListener("click", function(){
  let inputField = document.getElementById("text-input");
  if (inputField.value.trim() === "") {
        alert("Please input a value");
    } else {

        //Check Palindrome
        let word = inputField.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

        
        let start = 0;
        let end = word.length - 1;
        let isPalindrome = true;
        if(word === "a"){
            result.innerHTML = "A is a palindrome";
            return;
        }

        while(start < word.length / 2){

            if(word[start] != word[end]){
                isPalindrome = false;
                start = end;
            }

            start++;
            end--;
        }

        if(isPalindrome){
            result.innerHTML = inputField.value + " is a palindrome";
        } else {
            result.innerHTML = inputField.value + " is not a palindrome";
        }

        return;
    }
})