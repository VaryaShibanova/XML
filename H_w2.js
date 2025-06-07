const readline = require('readline');

function sumDiagonals(matrix) {
    let sum = 0;
    const n = matrix.length;
    
    for (let i = 0; i < n; i++) {
        sum += matrix[i][i]; // Главная диагональ (i, i)
        sum += matrix[i][n-1-i]; // Побочная диагональ (i, n-1-i)
    }
    
    // Если матрица нечетного размера, вычитаем центральный элемент (учтен дважды)
    if (n % 2 === 1) {
        const center = Math.floor(n/2);
        sum -= matrix[center][center];
    }
    
    return sum;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('matrix = ', (input) => {
    try {
        // Удаляем все пробелы и проверяем базовый синтаксис
        const cleanedInput = input.replace(/\s/g, '');
        if (!cleanedInput.startsWith('[') || !cleanedInput.endsWith(']')) {
            throw new Error('Неверный формат ввода');
        }
        
        // Преобразуем строку в массив
        const matrix = eval(cleanedInput); // Используем eval только с очищенным вводом
        
        // Проверяем, что матрица квадратная
        const size = matrix.length;
        if (size === 0 || !matrix.every(row => row.length === size)) {
            throw new Error('Матрица должна быть квадратной');
        }
        
        // Проверяем, что все элементы - числа
        if (!matrix.every(row => row.every(Number.isFinite))) {
            throw new Error('Все элементы матрицы должны быть числами');
        }
        
        const result = sumDiagonals(matrix);
        console.log(`Сумма диагоналей: ${result}`);
    } catch (e) {
        console.error(`Ошибка: ${e.message}`);
    } finally {
        rl.close();
    }
});