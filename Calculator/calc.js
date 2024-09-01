const balls = document.querySelectorAll(".ball");
const Transition = new Audio("calculator-app-main/Transition.mp3");

// Set up transition for the third ball initially
balls[3].style.transition = "left 0.5s ease";

balls[0].onclick = function () {
    Transition.currentTime = 0;
    Transition.play();
    balls[3].style.left = "0px";
    document.body.className = "";  // Reset theme
};

balls[1].onclick = function () {
    Transition.currentTime = 0;
    Transition.play();
    balls[3].style.left = "20px";
    document.body.className = "theme-two";  // Apply theme-two
};

balls[2].onclick = function () {
    Transition.currentTime = 0;
    Transition.play();
    balls[3].style.left = "45px";
    document.body.className = "theme-three";  // Apply theme-three
};

// Buttons functions
const buttons = document.querySelectorAll(".button");
const output = document.querySelector(".output");
output.innerHTML = "";
const audio = new Audio("calculator-app-main/Tick.mp3");
const error = new Audio("calculator-app-main/Err.mp3");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        audio.currentTime = 0;
        audio.play();

        const lastChar = output.innerText[output.innerText.length - 1];
        const currentChar = buttons[i].innerText;

        if ((output.innerText.length === 0 && ["+", "x", "-", "/"].includes(currentChar)) ||
            (["+", "-", "x", "/", "."].includes(lastChar) && ["+", "-", "x", "/", "."].includes(currentChar))) {
            return; // Prevent invalid input
        }

        if (currentChar === "=") {
            // Calculate result
            calculateResult();
        } else if (currentChar === "DEL") {
            deleteLastChar();
        } else if (currentChar === "Reset") {
            resetCalculator();
        } else {
            output.innerHTML += currentChar;
        }
    };
}

const equalButton = document.querySelector(".eq");
const delButton = document.querySelector(".del");
const prev = document.querySelector(".prev");

equalButton.onclick = calculateResult;

function calculateResult() {
    audio.currentTime = 0;
    audio.play();

    try {
        if (output.innerHTML.match(/0{2,}[.]/) || output.innerHTML.endsWith("/0")) {
            shakeAndPlayError();
        } else if (output.innerHTML !== "") {
            prev.innerHTML = output.innerHTML;
            output.innerText = eval(output.innerHTML.replace("x", "*"));
        }
    } catch (e) {
        shakeAndPlayError();
    }
}

function shakeAndPlayError() {
    document.querySelector(".parent-container").classList.add("shake");
    error.currentTime = 0;
    error.play();

    setTimeout(() => {
        document.querySelector(".parent-container").classList.remove("shake");
    }, 300);
}

const resetButton = document.querySelector(".re");
resetButton.onclick = resetCalculator;

function resetCalculator() {
    output.innerHTML = "";
    prev.innerHTML = "";
    audio.currentTime = 0;
    audio.play();
}

delButton.onclick = deleteLastChar;

function deleteLastChar() {
    audio.currentTime = 0;
    audio.play();
    output.innerHTML = output.innerHTML.slice(0, -1);
}
