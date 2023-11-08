let firstOperand = '';
let secondOperand = 0;
let operator = '';
let result = 0;
let mutexOperator = false;
let decimalNumber = false;

const DIVISION_BY_ZERO = 'Can\'t divide by zero!';

const chainingOperations = new Event('click');
const divisionByZeroEvent = new Event ('click');

const display = document.querySelector('#display');

const numbersArray = Array.from(document.querySelectorAll('button.number'));
numbersArray.forEach((btnNumber) => {
    btnNumber.addEventListener('click', (event) => {
        let target = event.target;
        if (display.textContent === '0' || mutexOperator || display.textContent === 'Can\'t divide by zero!') {
            display.textContent = '';
            mutexOperator = false;
        }
        display.textContent = display.textContent + target.textContent;
    });
});

const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = 0;
    operator = '';
    result = 0;
    decimalNumber = false;
    display.textContent = '0';
});

const btnDelete = document.querySelector('#delete');
btnDelete.addEventListener('click', () => {
    let popValue;
    if (display.textContent !== DIVISION_BY_ZERO) {
        const stringArray = Array.from(display.textContent);
        popValue = stringArray.pop();
        display.textContent = stringArray.join('');
        if (popValue === '.') decimalNumber = false;
    } else {
        btnClear.dispatchEvent(divisionByZeroEvent);
    }
});

const operatorsArray = Array.from(document.querySelectorAll('button.operator'));
operatorsArray.forEach((btnOperator) => {
	btnOperator.addEventListener('click', (event) => {
        if (display.textContent !== DIVISION_BY_ZERO) {
            let target = event.target;

            if (firstOperand === '' && !mutexOperator) {
                firstOperand = +display.textContent;
            } else {
                btnEquals.dispatchEvent(chainingOperations);
                firstOperand = +display.textContent;
            }
            decimalNumber = false;
            mutexOperator = true;
            operator = target.textContent;
        }
	});
});

const btnEquals = document.querySelector('#equals');
btnEquals.addEventListener('click', (event) => {
    if (firstOperand !== '') {
        secondOperand = +display.textContent;
        result = operate(operator, firstOperand, secondOperand);
        if (typeof(result) === 'number'){
            result = Math.trunc(result * 1000) / 1000; //handles float numbers too
            firstOperand = '';
            if ((String(result)).split('').find(char => char === '.') === 'undefined') {
                decimalNumber = false;
            } else {
                decimalNumber = true;
            }
        }
        display.textContent = result;

    }
});

const btnDot = document.querySelector('#dot');
btnDot.addEventListener('click', () => {
    if (!decimalNumber) {
        if (mutexOperator) {
            display.textContent = '0';
            mutexOperator = false;
        }
        display.textContent = display.textContent + '.';
        decimalNumber = true;
    }
});

function operate(operation, firstNumber, secondNumber) {
    switch (operation) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '/':
            if (secondNumber === 0) {
                return printError();
            }
            return divide(firstNumber, secondNumber);
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y){
    return x / y;
}

function printError() {
    btnClear.dispatchEvent(divisionByZeroEvent);
    return DIVISION_BY_ZERO;
};