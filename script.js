let firstOperand = '';
let secondOperand = 0;
let operator = '';
let result = 0;
let mutexOperator = false;

let clickEvent = new Event('click');

const display = document.querySelector('#display');

const numbersArray = Array.from(document.querySelectorAll('button.number'));
numbersArray.forEach((btnNumber) => {
    btnNumber.addEventListener('click', (event) => {
        let target = event.target;
        if (display.textContent === '0' || mutexOperator) {
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
    display.textContent = '0';
});

const btnDelete = document.querySelector('#delete');
btnDelete.addEventListener('click', () => {
    const stringArray = Array.from(display.textContent);
    stringArray.pop();
    display.textContent = stringArray.join('');
});

const operatorsArray = Array.from(document.querySelectorAll('button.operator'));
operatorsArray.forEach((btnOperator) => {
	btnOperator.addEventListener('click', (event) => {
		let target = event.target;
		if (firstOperand === '' && !mutexOperator) {
			firstOperand = +display.textContent;
        } else {
			btnEquals.dispatchEvent(clickEvent);
            firstOperand = +display.textContent;
        }
        mutexOperator = true;
        operator = target.textContent;
	});
});

const btnEquals = document.querySelector('#equals');
btnEquals.addEventListener('click', (event) => {
	secondOperand = +display.textContent;
	result = operate(operator, firstOperand, secondOperand);
	display.textContent = result;
	firstOperand = '';
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