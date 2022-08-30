function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
// # Variables
const rulesButton = $(".rules");
const rulesMenu = $(".rules-menu");
const overlay = $(".overlay");
const menuCloseButton = $(".rules-menu .close-menu");
const resetButton = $(".reset");
const playAgainContainer = $(".play-again");
const playAgainText = $(".play-again h1");
const playAgainButton = $(".play-again p");
const cards = $$(".card");
const imagesContainer = $(".images");
const house = $(".house");
const houseImage = $(".house img");
const scoreCounter = $(".score-counter");
const cardTypes = ["paper", "rock", "scissors"];
const spinCount = 6;
// Random number from 0-2
let random = Math.trunc(Math.random() * cardTypes.length);
let i = 0;
let speed = 200;
let playerWon;
let score;
if (localStorage.getItem("score")) {
  score = localStorage.getItem("score");
  scoreCounter.textContent = score;
} else {
  score = 0;
}
// - Run
openRulesMenu();
resetScore();
playAgain();
chooseCard();
// - Functions
function openRulesMenu() {
  const closeFunction = () => {
    rulesMenu.classList.toggle("open");
    overlay.classList.toggle("open");
  };
  // Add overlay and open menu
  rulesButton.onclick = closeFunction;
  menuCloseButton.onclick = closeFunction;
}
function resetScore() {
  // Reset score
  resetButton.onclick = function () {
    score = 0;
    scoreCounter.textContent = score;
    localStorage.setItem("score", score);
  };
}
function playAgain() {
  playAgainButton.onclick = function () {
    // Reset all
    Array.from(imagesContainer.children).forEach((card) => {
      card.classList.remove("hide", "clicked");
      house.classList.add("hidden", "hide");
      i = 0;
      speed = 200;
    });
    playAgainContainer.classList.add("hide");
  };
}
function chooseCard() {
  cards.forEach((card) => {
    card.onclick = function (e) {
      // e.stopPropagation();
      // Add class clicked and hide others
      Array.from(imagesContainer.children).forEach((card) => {
        // Hide all cards
        if (card === e.target || card === e.target.parentElement) return;
        card.classList.add("hide");
      });
      // Add class to the clicked one
      card.classList.add("clicked");
      // Remove hide from house
      house.classList.remove("hide");
      // Small timeout
      setTimeout(() => {
        // Remove hidden
        house.classList.remove("hidden");
        // ? The class should be the second one
        let playerChoice = card.classList[1];
        let houseChoice = cardTypes[random];
        // Who won
        gameEnd(playerChoice, houseChoice);
        // Switch card fast
        cardSwitch();
      }, 1000);
    };
  });
}

function cardSwitch() {
  if (i > spinCount / 2) {
    speed += 150;
  } else {
    speed += 50;
  }
  house.classList.remove(...cardTypes);
  house.classList.add(cardTypes[i % 3]);
  houseImage.src = `./utilities/images/icon-${cardTypes[i % 3]}.svg`;
  i++;
  if (i == random + spinCount + 1) {
    setTimeout(() => {
      playAgainContainer.classList.remove("hide");
      scoreCounter.textContent = score;
    }, 1000);
    return;
  }
  setTimeout(cardSwitch, speed);
}
function gameEnd(playerChoice, houseChoice) {
  // const cardTypes = ["paper", "rock", "scissors"];
  // ? You can make it by number, how is bigger wins but if 0 and 2 exists you have to hard code it
  if (
    (playerChoice === "paper" && houseChoice === "rock") ||
    (playerChoice === "rock" && houseChoice === "scissors") ||
    (playerChoice === "scissors" && houseChoice === "paper")
  ) {
    score++;
    localStorage.setItem("score", score);
    playerWon = "You Won";
  } else if (playerChoice === houseChoice) {
    playerWon = "Draw";
  } else {
    score--;
    localStorage.setItem("score", score);
    playerWon = "You Lose";
  }
  playAgainText.textContent = playerWon;
}
