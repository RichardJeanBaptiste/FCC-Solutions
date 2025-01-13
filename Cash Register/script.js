let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let cash;
let cash_due;
let change_due = document.getElementById("change-due");
let cash_input = document.getElementById("cash");
let pButton = document.getElementById("purchase-btn");

pButton.addEventListener('click', () => {
  cash = Number(cash_input.value).toFixed(2);
  
  if(cash < price){
    alert("Customer does not have enough money to purchase the item");
  } else if(cash == price){
    change_due.innerHTML = "No change due - customer paid with exact cash";
  } else {
    cash_due = cash - price;
    cash_due = cash_due.toFixed(2);

    for( const[currency, amt] of cid){
      console.log(currency + " " + amt);
    }
  }
});