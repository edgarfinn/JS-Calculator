
/*jslint browser:true */

function make(element){return document.createElement(element);}
function get(element){return document.querySelector(element);}
function getAll(element){return document.querySelectorAll(element);}
function tell(element, event, handler){ return element.addEventListener(event, handler);}

//calculator layout
const calculator = make('div');
calculator.id = "calculator";
calculator.style.border = "3px solid black";
calculator.style.padding = "5px";

const display = make('div');
display.id = "display";
display.style.background = "rgba(175,170,160,1)";
display.style.minHeight = "20px";

calculator.appendChild(display);


//creating button outline
const buttonsOutline = make('div');
buttonsOutline.id = "buttonsOutline";
buttonsOutline.style.border = "3px solid black";
//

const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '=', '.', 'C'];

//create buttons from keys array.
function makeButtons(key){
  let butt = make('button');
  butt.innerHTML = key.toString();

  //add values classes, IDs
  if(key === ".") {
    butt.id = "dot";
  }
  else if (key === "=") {
    butt.id = "equals"
  }
  else {
    butt.id = key.toString();
  }

  butt.value = key.toString();
  if (isNaN(Number(key)) === true && key !== "=") {
    butt.className = 'operator';
  }
  else if (isNaN(Number(key)) === false) {
    butt.className = 'number';
  }

  buttonsOutline.appendChild(butt);
  butt.className += ' button';
}

//
// compile button board
function makeButtonBoard(keys){
  keys.forEach(makeButtons);
  return buttonsOutline;
}
const buttonBoard = makeButtonBoard(keys);

calculator.appendChild(buttonBoard);
document.body.appendChild(calculator);

// MATHS CALCULATIONS

const buttons = getAll('.button');
const numbers = getAll('.number');
const operators = getAll('.operator');
let decimalled = false;
let mathsy = false;
let result = "";
let frontContents = [];
let backContents = [];


function numHandler(e){
  frontContents.push(e.target.value);
  backContents.push(e.target.value);
  console.log("decimalled = ", decimalled);

  display.innerHTML = frontContents.join("");
  console.log(backContents);
  mathsy = false;
}

function dotHandler(e) {
  if(!decimalled) {
    frontContents.push(e.target.value);
    backContents.push(e.target.value);
    decimalled = true;
    display.innerHTML = frontContents.join("");
  }
  console.log(backContents);
}

function equalsHandler(e){
  frontContents = [];
  frontContents.push(eval(backContents.join("")));
  // refresh settings
  decimalled = false, mathsy = false;
  let result = eval(backContents.join(""));
  backContents = [];
  backContents.push(result);
  display.innerHTML = result;
  console.log("front = ",frontContents);
  console.log("back = ",backContents);
}

function operatorHandler(e){

  if (!mathsy && e.target.value === "x") {
    frontContents.push(e.target.value);
    backContents.push("*");
    console.log(backContents);
    display.innerHTML = frontContents.join("");
    mathsy = true;
  }

  if (!mathsy && e.target.value === "+") {
    frontContents.push(e.target.value);
    backContents.push(e.target.value);
    display.innerHTML = frontContents.join("");
    mathsy = true;
    console.log(backContents);
  }
  if (!mathsy && e.target.value === "-") {
    frontContents.push(e.target.value);
    backContents.push(e.target.value);
    display.innerHTML = frontContents.join("");
    mathsy = true;
    console.log(backContents);
  }



  if (!mathsy && e.target.value === "/") {
    frontContents.push(String.fromCharCode(247));
    backContents.push("/")
    mathsy = true;
    display.innerHTML = frontContents.join("");
    console.log(backContents);
  }

}

//create array holder for display

numbers.forEach(function(e){
  e.addEventListener('click', numHandler);
});

operators.forEach(function(e){
  e.addEventListener('click', operatorHandler);
});
get('#equals').addEventListener('click', equalsHandler);
get('#dot').addEventListener('click', dotHandler);
