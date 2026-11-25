const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbersCharacters = "0123456789";
const symbolsCharacters = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

const copyButton = document.querySelector(".copy-button");
const passwordInput = document.querySelector(".password-result");
const copyNotification = document.querySelector(".copy-notification");
const lengthSlider = document.querySelector(".length-slider");
const lengthValue = document.querySelector(".length-value");
const generateBtn = document.querySelector(".generate-password-btn");

const uppercaseChecbox = document.getElementById("uppercase");
const lowercaseChecbox = document.getElementById("lowercase");
const numbersChecbox = document.getElementById("numbers");
const symbolsChecbox = document.getElementById("symbols");

const strengthLabel = document.querySelector(".strength-label");
const strengthBar = document.querySelector(".strength-bar");

let isUppercaseIncluded = false;
let isLowercaseIncluded = false;
let isNumbersIncluded = false;
let isSymbolsIncluded = false;

let strengthScore = 0;

lengthValue.textContent = lengthSlider.value;

copyButton.addEventListener("click", () => {
  if (!passwordInput.textContent) {
    return;
  }

  navigator.clipboard.writeText(passwordInput.textContent);
  copyNotification.classList.add("show");

  setTimeout(() => {
    copyNotification.classList.remove("show");
  }, 1200);
});

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

uppercaseChecbox.addEventListener("change", () => {
  uppercaseChecbox.checked
    ? (isUppercaseIncluded = true)
    : (isUppercaseIncluded = false);
});

lowercaseChecbox.addEventListener("change", () => {
  lowercaseChecbox.checked
    ? (isLowercaseIncluded = true)
    : (isLowercaseIncluded = false);
});

numbersChecbox.addEventListener("change", () => {
  numbersChecbox.checked
    ? (isNumbersIncluded = true)
    : (isNumbersIncluded = false);
});

symbolsChecbox.addEventListener("change", () => {
  symbolsChecbox.checked
    ? (isSymbolsIncluded = true)
    : (isSymbolsIncluded = false);
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
  let password = "";
  let characters = "";
  let length = lengthValue.textContent;
  strengthScore = 0;

  if (isUppercaseIncluded) {
    characters += uppercaseLetters;
    strengthScore += 15;
  }

  if (isLowercaseIncluded) {
    characters += lowercaseLetters;
    strengthScore += 15;
  }
  if (isNumbersIncluded) {
    characters += numbersCharacters;
    strengthScore += 15;
  }
  if (isSymbolsIncluded) {
    characters += symbolsCharacters;
    strengthScore += 15;
  }

  if (!characters) {
    alert("Please select at least one option!");
    return;
  }

  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }

  displayPassword(password);
}

function displayPassword(password) {
  passwordInput.textContent = password;
  strengthMeter();
}

function strengthMeter() {
  let passwordLength = lengthValue.textContent;

  if (passwordLength >= 1 && passwordLength <= 5) {
    strengthScore += 5;
  } else if (passwordLength >= 6 && passwordLength <= 10) {
    strengthScore += 10;
  } else if (passwordLength >= 11 && passwordLength <= 15) {
    strengthScore += 20;
  } else if (passwordLength >= 16 && passwordLength <= 20) {
    strengthScore += 30;
  } else if (passwordLength >= 21 && passwordLength <= 50) {
    strengthScore += 40;
  }

  strengthLabel.classList.remove("weak", "fair", "good", "strong");
  strengthBar.classList.remove("weak", "fair", "good", "strong");

  if (strengthScore <= 25) {
    strengthLabel.textContent = "Weak";
    strengthLabel.classList.add("weak");
    strengthBar.classList.add("weak");
    strengthBar.style.width = "25%";
  } else if (strengthScore <= 50) {
    strengthLabel.textContent = "Fair";
    strengthLabel.classList.add("fair");
    strengthBar.classList.add("fair");
    strengthBar.style.width = "50%";
  } else if (strengthScore <= 75) {
    strengthLabel.textContent = "Good";
    strengthLabel.classList.add("good");
    strengthBar.classList.add("good");
    strengthBar.style.width = "75%";
  } else {
    strengthLabel.textContent = "Strong";
    strengthLabel.classList.add("strong");
    strengthBar.classList.add("strong");
    strengthBar.style.width = "100%";
  }
}
