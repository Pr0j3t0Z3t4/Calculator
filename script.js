const display = document.getElementById('display');
const buttonsContainer = document.getElementById('buttons');

buttonsContainer.addEventListener("click", function(event) {
    if (event.target.tagName !== 'BUTTON') return;

    const value = event.target.value;

    if (value === 'C') {
        display.textContent = '';
    } else if (value === '=') {
        try {
            // Função segura para cálculo (evita eval direto)
            const result = safeEval(display.textContent);
            display.textContent = result || '';
        } catch (e) {
            display.textContent = 'Erro';
        }
    } else {
        // Validações antes de adicionar
        if (isValidInput(display.textContent, value)) {
            display.textContent += value;
        }
    }
});

function safeEval(expression) {
    // Remove caracteres não permitidos para segurança
    if (/[^0-9+\-*/().\s]/.test(expression)) throw new Error('Invalid');
    return new Function('return ' + expression)();
}

function isValidInput(current, newValue) {
    // Impede operador no início
    if (!current && ['+', '-', '*', '/'].includes(newValue)) return false;
    // Impede múltiplos decimais no mesmo número
    const lastNumber = current.split(/[\+\-\*\/]/).pop();
    if (newValue === '.' && lastNumber.includes('.')) return false;
    return true;
}