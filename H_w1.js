const readline = require('readline');

// Функция для нахождения НОД
function euclid(...numbers) {
    if (numbers.length === 0) return 0;
    
    function gcdTwo(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = gcdTwo(result, numbers[i]);
        if (result === 1) break;
    }
    
    return result;
}

// Создаем интерфейс для чтения ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Запрашиваем ввод чисел у пользователя
rl.question('Введите числа: ', (input) => {
    // Преобразуем введенную строку в массив чисел
    const numbers = input.split(',').map(Number).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
        console.log('Не введено ни одного числа!');
    } else {
        const result = euclid(...numbers);
        console.log(`НОД чисел равен: ${result}`);
    }
    
    rl.close();
});