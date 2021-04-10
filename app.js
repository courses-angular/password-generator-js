/*DOM Elements*/
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("password_length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
    lower: getRandomLowerCaseLetter,
    upper: getRandomUpperCaseLetter,
    numbers: getRandomNumber,
    symbols: getRandomSymbol
};
/*Event listeners*/
generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumbers,
        hasSymbols,
        length
    );
});
/*Copy to clipboard*/
clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});

/*Generate password function*/
function generatePassword(lower, upper, numbers, symbols, length) {
    // 1.Initialize password variable
    // 2.Filter out unchecked types
    // 3.Loop over the length call a generator function for each type
    // 4.Add final password to the password variable and return

    let generatedPassword = "";
    const typesCount = lower + upper + numbers + symbols;

    const typesArray = [{ lower }, { upper }, { numbers }, { symbols }].filter(
        (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return "";
    }
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    console.log("finalPassword", finalPassword);
    return finalPassword;
}

function getRandomLowerCaseLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpperCaseLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*()[]+≠=<>/,.;""_?``~';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

