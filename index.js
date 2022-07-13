const calculator = {
    displayNumber: '0',
    operator: "",
    firstNumber: "",
    secondNumber: "",
    waitingForOperator: false,
    waitingForFirstNumber: false,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0',
        calculator.operator = "",
        calculator.firstNumber = "",
        calculator.secondNumber = "",
        calculator.waitingForOperator = false,
        calculator.waitingForFirstNumber = false,
        calculator.waitingForSecondNumber = false
}

function inputDigit(digit) {
    if (calculator.operator == "") {
        if (calculator.firstNumber == "") {
            calculator.firstNumber = digit;
            calculator.displayNumber = digit;
        }
        else {
            calculator.firstNumber = calculator.firstNumber + "" + digit
            calculator.displayNumber = calculator.displayNumber + "" + digit;
        }
    }

    else {
        if (calculator.secondNumber == "") {
            calculator.secondNumber = digit;
            calculator.displayNumber = calculator.displayNumber + " " + digit;
        }
        else {
            calculator.secondNumber = calculator.secondNumber + "" + digit;
            calculator.displayNumber = calculator.displayNumber + "" + digit;
        }
    }
}




function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
    if (calculator.firstNumber != "" && calculator.secondNumber == "") {
        calculator.firstNumber = (calculator.firstNumber * -1).toString();
    }
    else {
        calculator.secondNumber = (calculator.secondNumber * -1).toString();
    }
}


function performCalculation() {

    let result = 0;
    if (calculator.operator === "+") {
        result = parseFloat(calculator.firstNumber) + parseFloat(calculator.secondNumber);
    }
    if (calculator.operator === "-") {
        result = parseFloat(calculator.firstNumber) - parseFloat(calculator.secondNumber)
    }
    if (calculator.operator === "*") {
        result = parseFloat(calculator.firstNumber) * parseFloat(calculator.secondNumber)
    }
    if (calculator.operator === "/") {
        result = parseFloat(calculator.firstNumber) / parseFloat(calculator.secondNumber)
    }
    if (calculator.operator == "%") {
        result = parseFloat(calculator.firstNumber) % parseFloat(calculator.secondNumber)
    }
    if (calculator.operator === "ln") {
        result = Math.log(parseFloat(calculator.firstNumber))
    }
    if (calculator.operator === "sqrt") {
        result = Math.sqrt(parseFloat(calculator.firstNumber))
    }
    if (calculator.operator == "x^2") {
        result = Math.pow(parseFloat(calculator.firstNumber), 2)
    }
    if (calculator.operator == "|x|") {
        result = Math.abs(parseFloat(calculator.firstNumber))
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.secondNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result.toString();
    calculator.firstNumber = calculator.displayNumber;
    renderHistory();
    calculator.operator = "";
    calculator.secondNumber = "";

}


const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {

        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {

            calculator.displayNumber = calculator.displayNumber + " " + target.innerText;
            calculator.operator = target.innerText
            updateDisplay()

            return;

        }

        if (target.classList.contains('backspace')) {
            if (calculator.operator == "") {
                if (calculator.firstNumber.length == 1) {
                    calculator.firstNumber = "";
                    calculator.displayNumber = calculator.displayNumber.slice(0, calculator.displayNumber.length - 1)
                }
                else {
                    calculator.firstNumber = calculator.firstNumber.slice(0, calculator.firstNumber.length - 1);
                    calculator.displayNumber = calculator.displayNumber.slice(0, calculator.displayNumber.length - 1)
                }
            }
            else if (calculator.secondNumber == "") {
                calculator.operator = "";
                calculator.displayNumber = calculator.displayNumber.slice(0, calculator.displayNumber.length - 1)
            }
            else {
                if (calculator.secondNumber.length == 1) {
                    calculator.secondNumber = "";
                    calculator.displayNumber = calculator.displayNumber.slice(0, calculator.displayNumber.length - 1)
                }
                else {
                    calculator.secondNumber = calculator.secondNumber.slice(0, calculator.secondNumber.length - 1);
                    calculator.displayNumber = calculator.displayNumber.slice(0, calculator.displayNumber.length - 1)
                }
            }

            console.log(calculator.firstNumber);
            console.log(calculator.secondNumber);
            console.log(calculator.displayNumber);
            console.log(calculator.operator);

            updateDisplay();
            return;
        }


        inputDigit(target.innerText);
        updateDisplay()
    });
}

