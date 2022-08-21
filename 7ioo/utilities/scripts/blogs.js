import blogsData from "/utilities/scripts/blogsData.js";

let language = localStorage.getItem("language");
let blogs = blogsData[language];
let cardsContainer = document.querySelector(".blogs .cards");
let cardTemplate = document.getElementById("card-template");

addBlogs();
sensitiveContentClick();

function addBlogs() {
  createBlogs();
}

function createBlogs() {
  // Add Cards To Array
  let cardsArray = [];
  for (let i in blogs) {
    // TODO: Add Translation to Card Immediately
    // Create Cards
    let blog = blogs[i];
    let cardClone = cardTemplate.content.cloneNode(true);
    let card = cardClone.querySelector(".card");

    let cardImage = card.querySelector(".card-image img");
    cardImage.src = blog.img;

    let cardTitle = card.querySelector(".card-title");
    cardTitle.textContent = blog.topic;

    let cardNumber = card.querySelector(".card-number");
    cardNumber.textContent = blog.number;

    let cardCategory = card.querySelector(".card-category");
    addCategoriesAndSensitiveContent(blog.categories, cardCategory, card);

    let cardText = card.querySelector(".card-text");
    cardText.textContent = blog.description;

    let cardButton = card.querySelector("a.btn");
    cardButton.href = blog.link;

    // Push To Array
    cardsArray.push(card);

    // cardsContainer.append(card);
  }
  // Clear Skeleton Loading
  cardsContainer.innerHTML = "";
  // Append Cards
  cardsArray.forEach((card) => {
    cardsContainer.append(card);
  });
}
function addCategoriesAndSensitiveContent(categories, place, card) {
  for (let i in categories) {
    // Create Category
    let category = document.createElement("span");
    category.textContent = `${i}`;
    category.style.backgroundColor = categories[i];
    // If Category Is Sensitive Add Class
    if (
      i === "Sensitive content" ||
      i === "Hassas içerik" ||
      i === "محتوى حساس"
    ) {
      card.classList.add("sensitive-content");
    }
    place.append(category);
  }
}
function sensitiveContentClick() {
  let sensitiveCard = document.querySelectorAll(".sensitive-content");
  // If Sensitive Card Is Clicked Remove Class
  sensitiveCard.forEach((card) => {
    card.addEventListener("click", (event) => {
      card.classList.remove("sensitive-content");
    });
  });
}
