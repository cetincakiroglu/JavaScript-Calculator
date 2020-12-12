//DOM ELEMENTS
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');

const currentValue = document.querySelector('.current-num');
const previousValue = document.querySelector('.prev-num'); //0 previous number, 1 current number

const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');


//INPUT VARIABLES
let currentNumber = '';
let previousNumber = '';
let currentOperator = null;
let operation;

function getInput(number) {
    if (number === '.' && currentNumber.includes('.')) {
        return;
    } else {
        currentNumber = currentNumber + number;
    }
}

function getOperation(operator) {
    if (currentOperator === '') {
        return;
    } else if (previousNumber !== '') {
        computation();
    }

    operation = operator;
    previousNumber = currentNumber;
    currentNumber = '';
}

//OUTPUT
let result;

function computation() {

    let num2 = parseFloat(currentNumber);
    let num1 = parseFloat(previousNumber);
    if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
        result = 'ERROR';
    } else if (operation === '+') {
        result = num1 + num2;
    } else if (operation === '-') {
        result = num1 + num2;
    } else if (operation === 'x') {
        result = num1 * num2;
    } else if (operation === '÷') {
        result = num1 / num2;
    }
    currentNumber = result;
    previousNumber = '';
    operation = undefined;
}

//SCREEN FUNCTIONS
function updateDisplay() {
    currentValue.innerText = currentNumber;
    previousValue.innerText = previousNumber;
    if (operation != null || operation != undefined) {
        previousValue.innerText = previousNumber + operation;
    }
}

function clearDisplay() {

    currentNumber = '';
    previousNumber = '';
    operation = null;
}

//EVENT LISTENERS
numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        getInput(button.innerText)
        updateDisplay();
    })
})

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        getOperation(button.innerText)
        updateDisplay();
    })
})

equals.addEventListener('click', () => {
    computation();
    updateDisplay();
})

clearBtn.addEventListener('click', () => {
    clearDisplay();
    updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    currentNumber = currentNumber.toString().slice(0, -1);
    updateDisplay();
})

//DARK MODE
const darkModeBtn = document.getElementById('btn-dark');

darkModeBtn.addEventListener('click', function() {
    document.documentElement.classList.toggle('darkmode');
});


//KEYBOARD SUPPORT

window.addEventListener('keydown', getPressedKey);

function getPressedKey(c) {
    switch (c.keyCode) {
        case 108:
        case 110:
        case 194:
        case 190:
            getInput(".");
            updateDisplay();
            break;
        case 48:
        case 96:
            getInput(0);
            updateDisplay();
            break;
        case 49:
        case 97:
            getInput(1);
            updateDisplay();
            break;
        case 50:
        case 98:
            getInput(2);
            updateDisplay();
            break;
        case 51:
        case 99:
            getInput(3);
            updateDisplay();
            break;
        case 52:
        case 100:
            getInput(4);
            updateDisplay();
            break;
        case 53:
        case 101:
            getInput(5);
            updateDisplay();
            break;
        case 54:
        case 102:
            getInput(6);
            updateDisplay();
            break;
        case 55:
        case 103:
            getInput(7);
            updateDisplay();
            break;
        case 56:
            if (c.shiftKey) { getOperation('x'); break }
        case 104:
            getInput(8);
            updateDisplay();
            break;
        case 57:
        case 105:
            getInput(9);
            updateDisplay();
            break;
        case 107:
            getOperation('+');
            updateDisplay();
            break;
        case 109:
        case 189:
        case 173:
            getOperation('-');
            updateDisplay();
            break;
        case 106:
        case 170:
            getOperation('x');
            updateDisplay();
            break;
        case 111:
        case 191:
            getOperation('÷');
            updateDisplay();
            break;
        case 187:
            if (c.shiftKey) {
                getOperation();
                break
            }
        case 13:
        case 61:
            if (c.shiftKey) {
                getOperation('+');
                break
            }
            getOperation("=");
            updateDisplay();
            break;
        case 27:
        case 46:
        case 12:
            clearDisplay();
            updateDisplay();
            break;
        case 8:
            currentNumber = currentNumber.toString().slice(0, -1);
            updateDisplay();
    }
    c.preventDefault()
};