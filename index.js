const screen = document.querySelector(".screen");
const answer = document.querySelector(".answer");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const equal = document.querySelector(".equal");
const period = document.querySelector(".period");
const btnNumbers = document.querySelectorAll(".numeral");
const btnSpecials = document.querySelectorAll(".special");

let opSwitch = false;
let periodSwitch = false;
let numOne = 0;
let numTwo = 0;

function add(numOne, numTwo) {
  return numOne + numTwo;
}

function subtract(numOne, numTwo) {
  return numOne - numTwo;
}

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

function divide(numOne, numTwo) {
  return numOne / numTwo;
}

function operate(operator, numOne, numTwo) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(numOne, numTwo);
      break;
    case "-":
      result = subtract(numOne, numTwo);
      break;
    case "x":
      result = multiply(numOne, numTwo);
      break;
    case "/":
      result = divide(numOne, numTwo);
      break;
  }
  return result;
}

function evalScreen() {
  console.log(screen.textContent);
  let numArr = screen.textContent.split(/[^0-9.]/);
  let opArr = screen.textContent.split(/[0-9.]/);
  console.log(numArr);
  opArr = opArr.filter((operation) => {
    return operation !== "";
  });
  console.log(opArr);
  for (let i = 0; i <= numArr.length - 1; i++) {
    if (i == 0) {
      console.log("numArr: " + numArr[i]);
      total = parseFloat(numArr[i]);
      console.log("total: " + total);
      continue;
    }
    console.log(total);
    total = operate(opArr[i - 1], total, parseFloat(numArr[i]));
  }
  console.log("total: " + total);
  answer.textContent = total % 1 ? total.toFixed(2) : total;
}

clear.addEventListener("click", () => {
  screen.textContent = "";
  answer.textContent = 0;
});

del.addEventListener("click", () => {
  backspace();
});

equal.addEventListener("click", () => {
  if (opSwitch == false && screen.textContent.length > 1) {
    evalScreen();
    screen.textContent = answer.textContent;
  }
});

period.addEventListener("click", () => {
  if (periodSwitch == false) {
    if (opSwitch == true) {
      screen.textContent += "0";
    }
    screen.textContent += period.textContent;
    evalScreen();
  }
  periodSwitch = true;
});

btnNumbers.forEach((btnNumber) => {
  btnNumber.addEventListener("click", () => {
    if (screen.textContent.length > 40) {
      alert("Maximum Numbers Reach!");
    } else {
      opSwitch = false;
      screen.textContent += btnNumber.textContent;
      evalScreen();
    }
  });
});

function backspace() {
  let equationArr = screen.textContent.split("");
  equationArr.pop();
  screen.textContent = equationArr.join("");
  if (screen.textContent.length > 1) {
    evalScreen();
  } else {
    answer.textContent = 0;
  }
}

btnSpecials.forEach((btnSpecial) => {
  btnSpecial.addEventListener("click", () => {
    if (opSwitch) {
      backspace();
    }
    if (screen.textContent.length == 0) {
      screen.textContent = 0;
    }
    opSwitch = true;
    periodSwitch = false;
    screen.textContent += btnSpecial.textContent;
  });
});

window.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  const key = document.querySelector(`.buttons[data-key="${e.keyCode}"]`);
  console.log(key);
  key.click();
});
