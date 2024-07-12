export class Methods {
    private parseNumber(input: string): number {
        const parsed = parseFloat(input);
        if (isNaN(parsed)) {
            throw new Error(`Неверное число: ${input}`);
        }
        return parsed;
    }

    public calculate(firstOperand: string, operation: string, secondOperand: string): number {
        const num1 = this.parseNumber(firstOperand);
        const num2 = this.parseNumber(secondOperand);

        let result: number;

        switch (operation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if (num2 === 0) {
                    throw new Error("Деление на ноль");
                }
                result = num1 / num2;
                break;
            case "%":
                result = num1 % num2;
                break;
            default:
                throw new Error(`Неверная операция: ${operation}`);
        }

        return result;
    }

    public square(number: string): number {
        const num = this.parseNumber(number);
        return num * num;
    }
}

// Примеры использования:
const methods = new Methods();

try {
    console.log(methods.calculate('2', '+', '3'));
    console.log(methods.calculate('6', '-', '2'));
    console.log(methods.calculate('4', '*', '2'));
    console.log(methods.calculate('24', '/', '3'));
    console.log(methods.calculate('10', '%', '3'));
    console.log(methods.square('5'));
} catch (error) {
    console.error(error.message);
}

