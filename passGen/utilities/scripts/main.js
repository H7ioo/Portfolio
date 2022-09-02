// - Helpers
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
// - Variables
const mainColor = `hsl(127, 100%, 82%)`;
const blackColor = `hsl(248, 15%, 11%)`;
const rangeSlider = $(".range-slider");
const checkboxes = $$(".checkbox");
const barsContainer = $(".bars");
const bars = $$(".bars span");
const strengthText = $(".strength p");
const generateButton = $(".generate");
const passwordLengthText = $(".password-length");
const generatedPasswordText = $(".generated-password");
const copyButton = $(".copy");
let passwordLength = 10;
let checkedCount = 1;
let strength = ["Weak", "Medium", "Strong", "Very Strong"];
let copyTimeout;
// - Run
rangeSliderBackground();
checkboxClick();
rangeSliderText();
copyPassword();
generatePass();
// - Functions
function rangeSliderBackground() {
  // Set background on the first run
  let value =
    ((rangeSlider.value - rangeSlider.min) /
      (rangeSlider.max - rangeSlider.min)) *
    100;
  rangeSlider.style.background =
    "linear-gradient(to right, " +
    mainColor +
    " 0%, " +
    mainColor +
    " " +
    value +
    "%, " +
    blackColor +
    " " +
    value +
    "%, " +
    blackColor +
    " 100%)";
  rangeSlider.addEventListener("input", function () {
    // Change background on change input
    let value = ((this.value - this.min) / (this.max - this.min)) * 100;
    // prettier-ignore
    this.style.background = 'linear-gradient(to right, ' + mainColor + ' 0%, ' + mainColor + ' ' + value + '%, ' + blackColor + ' ' + value + '%, ' + blackColor + ' 100%)'
  });
}
function checkboxClick() {
  checkboxes.forEach((checkbox) => {
    const input = checkbox.querySelector("input");
    // Disable checked (there is 1 checked so it cannot be unchecked)
    $(".checked").classList.add("disable");
    input.addEventListener("change", (e) => {
      if (input.checked) {
        // Add checked
        input.parentElement.classList.add("checked");
        // Increase checked count
        checkedCount++;
        // Increase bar
        passwordStrength(true);
      } else {
        // Remove checked
        input.parentElement.classList.remove("checked");
        // Increase bar
        passwordStrength(false);
        // Decrease checked count
        checkedCount--;
      }
      // If checked count is 1
      if (checkedCount === 1) {
        // Disable checked button
        $(".checked").classList.add("disable");
      } else {
        // Remove all disables from checked buttons
        $$(".checked").forEach((checked) => {
          checked.classList.remove("disable");
        });
      }
    });
  });
}
function passwordStrength(checked) {
  // Add active if checked is true else remove
  bars[checkedCount - 1].classList.toggle("active", checked);
  // Convert to class name
  barsContainer.classList.toggle(
    strength[checkedCount - 1].toLowerCase().replace(" ", "-")
  );
  // If checked go back 1 else 2 (when decreasing we decreasing after the function this is why we made it by 2)
  checked
    ? (strengthText.textContent = strength[checkedCount - 1])
    : (strengthText.textContent = strength[checkedCount - 2]);
}
function rangeSliderText() {
  rangeSlider.addEventListener("input", function () {
    // Update text
    passwordLengthText.textContent = this.value;
    passwordLength = this.value;
  });
}
function copyPassword() {
  copyButton.onclick = function () {
    clearTimeout(copyTimeout);
    let tempPassword = generatedPasswordText.value;
    generatedPasswordText.value = "Copied!";
    // ! Error timeout error
    copyTimeout = setTimeout(() => {
      generatedPasswordText.value = tempPassword;
    }, 1500);
    navigator.clipboard.writeText(generatedPasswordText.value);
  };
}
function generatePass() {
  generateButton.onclick = (e) => {
    e.preventDefault();
    let password = "";
    let passwordCharacters = "";
    checkboxes.forEach((checkbox) => {
      let input = checkbox.querySelector("input");
      // Check if input is checked if yes get id and math with the statement
      if (input.checked) {
        if (input.id === "uppercaseLetters")
          passwordCharacters += "abcdefghijklmnopqrstuvwxyz".toUpperCase();
        if (input.id === "lowercaseLetters")
          passwordCharacters += "abcdefghijklmnopqrstuvwxyz";
        if (input.id === "numbers") passwordCharacters += "1234567890";
        if (input.id === "symbols")
          passwordCharacters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      }
    });
    for (let i = 0; i < passwordLength; i++) {
      let generatedChar = passwordCharacters.charAt(
        Math.floor(Math.random() * passwordCharacters.length)
      );
      password += generatedChar;
    }
    generatedPasswordText.value = password;
  };
}
