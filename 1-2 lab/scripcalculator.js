
window.onload = function() {

    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let accumulatedValue = 0; // Для накапливаемых операций

    // окно вывода результата
    const resultOutput = document.getElementById("result");

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    const opButtons = document.querySelectorAll('[id ^= "btn_op_"]');

    // Константы для управления размером шрифта
    const INITIAL_FONT_SIZE = 3; // rem (начальный размер)
    const MIN_FONT_SIZE = 1.5; // rem (минимальный размер)

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
                if (isTextOverflowing()) {
                    a = a.slice(0, -1); // Удаляем последний символ, если он не помещается
                }
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                if (isTextOverflowing()) {
                    b = b.slice(0, -1); // Удаляем последний символ, если он не помещается
                }
            }
        }
        updateResult();
    }

    function isTextOverflowing() {
        // Проверяем, выходит ли текст за границы элемента
        return resultOutput.scrollWidth > resultOutput.offsetWidth;
    }

    function handleOperationClick(operation) {
        if (a === '') return;
        selectedOperation = operation;
        accumulatedValue = parseFloat(a);
        updateResult();
    }

    function clearAll() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        accumulatedValue = 0;
        updateResult();
    }

    function calculateResult() {
        if (a === '' || b === '' || !selectedOperation)
            return;

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
            case '+=':
                accumulatedValue += parseFloat(a);
                expressionResult = accumulatedValue;
                break;
            case '-=':
                accumulatedValue -= parseFloat(a);
                expressionResult = accumulatedValue;
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;

        updateResult();
    }

    function backspace() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
        } else {
            b = b.slice(0, -1);
        }
        updateResult();
    }

    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // установка колбек-функций для кнопок операций
    opButtons.forEach(button => {
        button.onclick = function() {
            let opValue = button.innerHTML;
            if (opValue === 'x') opValue = 'x';
            if (opValue === '/') opValue = '/';
            if (opValue === '+') opValue = '+';
            if (opValue === '-') opValue = '-';
            handleOperationClick(opValue);
        }
    });

    document.getElementById("btn_op_clear").onclick = function() {
        clearAll();
    }

    document.getElementById("btn_op_equal").onclick = function() {
        calculateResult();
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (a !== '') {
            a = (parseFloat(a) * -1).toString();
            updateResult();
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (a !== '') {
            a = (parseFloat(a) / 100).toString();
            updateResult();
        }
    };

    document.getElementById("btn_op_back").onclick = function() {
        backspace();
    };

    document.getElementById("btn_op_sqrt").onclick = function() {
        if (a !== '') {
            a = Math.sqrt(parseFloat(a)).toString();
            updateResult();
        }
    };

    document.getElementById("btn_op_degree").onclick = function() {
        if (a !== '') {
            a = Math.pow(parseFloat(a), 2).toString();
            updateResult();
        }
    };

    document.getElementById("btn_op_fact").onclick = function() {
        if (a !== '') {
            let num = parseInt(a);
            if (num === 0) {
                a = '1';
            } else if (num > 0) {
                let result = 1;
                for (let i = 1; i <= num; i++) {
                    result *= i;
                }
                a = result.toString(); /*преобразование в строку, автоматический переход к научному виду*/
            } else {
                a = 'Error';
            }
            updateResult();
        }
    };

    document.getElementById("btn_op_000").onclick = function() {
        if (!selectedOperation) {
            a += '000';
        } else {
            b += '000';
        }
        updateResult();
    };

    function updateResult() {
        if (!selectedOperation) {
            resultOutput.innerHTML = a || 0; // Show 0 if empty
        } else {
            resultOutput.innerHTML = b || 0; // Show 0 if empty
        }

        adjustFontSize();
    }

    function adjustFontSize() {
        let fontSize = INITIAL_FONT_SIZE;
        resultOutput.style.fontSize = fontSize + "rem";

        while (
            resultOutput.scrollWidth > resultOutput.offsetWidth &&
            fontSize > MIN_FONT_SIZE
        ) {
            fontSize -= 0.1;
            resultOutput.style.fontSize = fontSize + "rem";
        }
        if (fontSize <= MIN_FONT_SIZE && resultOutput.scrollWidth > resultOutput.offsetWidth) {
            resultOutput.style.fontSize = MIN_FONT_SIZE + 'rem';
        }
    }

    updateResult(); //обновляет result при запуске страницы

    /*СМЕНА ТЕМЫ ТОЛЬКО ДЛЯ ПОЛЯ RESULT*/
    const container1 = document.querySelector('.result');
    const themeresult = document.getElementById('btn_change_theme_result');

    themeresult.addEventListener('click', () => {
        container1.classList.toggle('dark-theme'); // Переключает класс 'dark-theme' только для result
    });
    /*СМЕНА ВСЕЙ ТЕМЫ(ТЕМЫ ВСЕГО САЙТА)*/
    const container = document.querySelector('body');
    const themeToggleALL = document.getElementById('btn_change_theme_all');

    themeToggleALL.addEventListener('click', () => {
        container.classList.toggle('dark-theme');
    });

    // Добавляем слушатель событий для ввода с клавиатуры
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if ((/[0-9]|\./).test(key)) { // Проверяем, является ли нажатая клавиша цифрой или точкой
            onDigitButtonClicked(key);
        } else if (key === '*' || key === '/' || key === '+' || key === '-') {
            handleOperationClick(key);
        } else if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Backspace') {
            backspace();
        } else if (key === 'c' || key === 'C') {
            clearAll();
        } else if (key === '=') {
            calculateResult();
        }
    });
};
