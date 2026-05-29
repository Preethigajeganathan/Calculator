const input = document.querySelector(".inp");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        switch (value) {
            case "C":
                clearDisplay();
                break;

            case "⌫":
                backspace();
                break;

            case "=":
                calculate();
                break;

            default:
                expression += value;
                input.value = expression;
        }
    });
});

function clearDisplay() {
    expression = "";
    input.value = "";
}

function backspace() {
    expression = expression.slice(0, -1);
    input.value = expression;
}

function calculate() {
    try {
        const result = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/–/g, "-");

        expression = eval(result).toString();
        input.value = expression;
    } catch (error) {
        input.value = "Error";
        expression = "";
    }
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/^[0-9+\-*/().%]$/.test(key)) {
        expression += key;
        input.value = expression;
    }
    else if (key === "Enter") {
        e.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        backspace();
    }
    else if (key === "Escape") {
        clearDisplay();
    }
});
