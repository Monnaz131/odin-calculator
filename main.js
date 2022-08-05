let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");

const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const percentage = document.querySelector(".percentage");
const sign = document.querySelector(".sign");
const backspace = document.querySelector(".delete");
const numberButtons = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (previousNum !== "" && currentNum !== "" && operator === "") {
        previousNum = "";
        currentDisplayNumber.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
        currentNum += number;
        currentDisplayNumber.textContent = currentNum;
    }
}

operators.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op);
    } else if (currentNum === "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = previousNum + " " + operator;
    }
}

function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
}

equal.addEventListener("click", () => {
    if (currentNum != "" && previousNum != "") {
        calculate();
    }
});

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum += currentNum;
    } else if (operator === "-") {
        previousNum -= currentNum;
    } else if (operator === "*") {
        previousNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = "Error";
            displayResults();
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = previousNum.toString();
    displayResults();
}

function displayResults() {
    if (previousNum.length <= 11) {
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
}

clear.addEventListener("click", clearCalculator);

function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

decimal.addEventListener("click", () => {
    addDecimal();
});

function addDecimal() {
    if (!currentNum.includes(".")) {
        currentNum += ".";
        currentDisplayNumber.textContent = currentNum;
    }
}

window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (
        e.key === "Enter" ||
        (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        handleOperator(e.key);
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

backspace.addEventListener("click", handleDelete);

function handleDelete() {
    if (currentNum != "") {
        currentNum = currentNum.slice(0, -1);
        currentDisplayNumber.textContent = currentNum;
        if (currentNum === "") {
            currentDisplayNumber.textContent = "0";
        }
    }
    if (currentNum === "" && previousNum !== "" && operator === "") {
        previousNum = previousNum.slice(0, -1);
        currentDisplayNumber.textContent = previousNum;
    }
    
}

percentage.addEventListener("click", handlePercentage);

function handlePercentage() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum = previousNum + (previousNum * (currentNum / 100));
    } else if (operator === "-") {
        previousNum = previousNum - (previousNum * (currentNum / 100));
    } else if (operator === "*") {
        previousNum = previousNum * (currentNum / 100);
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = "Error";
            displayResults();
            return;
        }
        previousNum = previousNum / (currentNum / 100);
    }
    previousNum = previousNum.toString();
    displayResults();
}

sign.addEventListener("click", inputSign);

function inputSign() {
    currentNum *= -1;
    currentDisplayNumber.textContent = currentNum;
}