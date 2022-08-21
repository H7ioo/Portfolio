// - Start Variables
import translations from "./translations.js";
const defaultLanguage = "en";
const rtlStyleSheetPath = "/utilities/styles/main-rtl.css";
// - End Variables

// - Start RUN
language();
// - End RUN

function language() {
  setLanguage();
  getLanguage();
  if (localStorage.getItem("language") === "ar") {
    addDirectionToArabic(true);
    addArabicStyleSheet(true);
  }
}
function getLanguage() {
  // Language Buttons
  const setLanguageButtons = document.querySelectorAll("[data-set-language]");
  // For Each Button Add Event On Click
  setLanguageButtons.forEach((languageButton) => {
    languageButton.onclick = function () {
      let selectedLanguage = languageButton.getAttribute("data-set-language");
      changeLanguageTextContent(selectedLanguage);
      addLanguageToLocalStorage(selectedLanguage);
      if (selectedLanguage === "ar") {
        addDirectionToArabic(true);
        addArabicStyleSheet(true);
      } else {
        addDirectionToArabic(false);
        addArabicStyleSheet(false);
      }
    };
  });
}
function changeLanguageTextContent(selectedLanguage) {
  let elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    // Get The Key So You Can Join The Translation Object
    let translationKey = element.getAttribute("data-translate");
    // Translation
    let translation = decodeTranslationsKeys(
      translationKey,
      translations[selectedLanguage],
      element,
      selectedLanguage
    );
    // If The Translation Not Found Return
    if (translation === undefined) return;
    // Change The Text Content
    element.textContent = translation;
  });
}
// It Joins The Path, Example: header-card-title => translations["header"]["card"]["title"]
function decodeTranslationsKeys(
  translationKey,
  translationObject,
  element,
  selectedLanguage
) {
  // Split The Array
  let translationKeyArray = translationKey.split("-");
  // Loop Through The Key Array Above
  for (let i = 0; i < translationKeyArray.length; i++) {
    // The Path Is The Index Of The Array
    let translationPath = translationKeyArray[i];
    // If The Path Found Go Into It And Loop Again Until You Reach The Maximum Path
    if (translationPath in translationObject) {
      translationObject = translationObject[translationPath];
    } else {
      // Error If The Path Is Not Found
      console.error(
        `Language: ${selectedLanguage.toUpperCase()}\n"${translationKeyArray}" Path Does Not Contain "${translationPath}" At Element:\n${
          element.outerHTML
        }`
      );
      return;
    }
  }
  return translationObject;
}
function addLanguageToLocalStorage(selectedLanguage) {
  // Set Local Storage Language
  localStorage.setItem("language", selectedLanguage);
}
function setLanguage() {
  // Get Language From Local Storage
  const language = localStorage.getItem("language");
  // If The Language Is Not Found Set It To Default Language In This Case It's English
  if (!language) return localStorage.setItem("language", defaultLanguage);
  // If Found Change The Text Content
  changeLanguageTextContent(language);
}
function addDirectionToArabic(add) {
  let elements = document.querySelectorAll("[data-dir]");
  elements.forEach((element) => {
    if (add) {
      element.classList.add("rtl");
    } else {
      element.classList.remove("rtl");
    }
  });
}
function addArabicStyleSheet(add) {
  const stylesheet = document.querySelector(".rtl-stylesheet");
  if (add) {
    stylesheet.href = rtlStyleSheetPath;
  } else {
    stylesheet.href = "";
  }
}
