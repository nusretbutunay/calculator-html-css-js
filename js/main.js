class Calculator {
  constructor(resultText, currentText) {
    this.currentText = currentText;
    this.resultText = resultText;
    this.clear();
  }

  clear() {
    this.current = "";
    this.result = "";
    this.operation = undefined;
  }

  delete() {}

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.result !== "") {
      this.compute();
    }
    this.operation = operation;
    this.result = this.current;
    this.current = "";
  }

  compute() {
    let computation;
    const res = parseFloat(this.result);
    const cur = parseFloat(this.current);
    if (isNaN(res) || isNaN(cur)) return;

    switch (this.operation) {
      case "+":
        computation = res + cur;
        break;
      case "-":
        computation = res - cur;
        break;
      case "X":
        computation = res * cur;
        break;
      case "÷":
        computation = res / cur;
        break;
      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.result = "";
  }

  updateDisplay() {
    this.currentText.innerText = this.current;

    this.resultText.innerText = this.result;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const resultText = document.querySelector("[data-result]");
const currentText = document.querySelector("[data-current]");

const calculator = new Calculator(resultText, currentText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
