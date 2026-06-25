const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function secureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function generatePassword() {

    let charset = "";

    if (uppercase.checked)
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (lowercase.checked)
        charset += "abcdefghijklmnopqrstuvwxyz";

    if (numbers.checked)
        charset += "0123456789";

    if (symbols.checked)
        charset += "!@#$%^&*()_+-=[]{}<>?";

    if (!charset) {
        alert("Selecione ao menos uma opção.");
        return;
    }

    let password = "";
    const length = Number(lengthSlider.value);

    for (let i = 0; i < length; i++) {
        password += charset[secureRandom(charset.length)];
    }

    passwordInput.value = password;

    checkStrength(password);
}

function checkStrength(password) {

    let score = 0;

    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthBar.style.width = "30%";
        strengthBar.style.background = "#ef4444";
        strengthText.textContent = "Fraca";
    }
    else if (score <= 4) {
        strengthBar.style.width = "65%";
        strengthBar.style.background = "#f59e0b";
        strengthText.textContent = "Média";
    }
    else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#22c55e";
        strengthText.textContent = "Forte";
    }
}

copyBtn.addEventListener("click", async () => {

    if (!passwordInput.value) return;

    try {
        await navigator.clipboard.writeText(passwordInput.value);

        copyBtn.textContent = "Copiado!";

        setTimeout(() => {
            copyBtn.textContent = "Copiar";
        }, 1500);

    } catch {
        alert("Não foi possível copiar.");
    }
});

generateBtn.addEventListener("click", generatePassword);

generatePassword();
