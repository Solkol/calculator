let firstOperand;
let secondOperand;
let operator;

const display = document.querySelector('#display');

const btnNumbers = Array.from(document.querySelectorAll('button.number'));
btnNumbers.forEach((item) => {
    item.addEventListener('click', (event) => {
        let target = event.target;
        display.textContent = display.textContent + target.textContent;
    });
});

const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => {
    display.textContent = '0';
});

const btnDelete = document.querySelector('#delete');
btnDelete.addEventListener('click', () => {
    const stringArray = Array.from(display.textContent);
    stringArray.pop();
    display.textContent = stringArray.join('');
});

function operate(operation, firstNumber, secondNumber) {
    switch (operation) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
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