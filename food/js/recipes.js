import * as made from "./functions.js";
// # Start Variables
let filterButton = document.querySelector(".filter-menu-button");
let filterBoxMenu = document.querySelector(".filter-box-menu");
let recipesSection = document.querySelector("#recipes");
let closeFilterMenuButton = document.querySelector(".close-filter-menu");
let recipesCards = document.querySelector(".recipes .cards");
let recipesSearchInput = document.querySelector("#recipes-search");
let recipesIngredientsCheckboxes = document.querySelector(
    ".filter-box-menu .checkboxes"
);
let recipesFilterButton = document.querySelector(
    ".filter-box-menu button.filter"
);
let recipesClearAllButton = document.querySelector(
    ".filter-box-menu button.clear-all"
);
let recipesCount = document.querySelector(".recipes .recipes-count");

let recipesIngredientsArray = [];
let recipesIngredients = new Set();
let recipesCardArray = [];
let recipesSearchBarDebounceTimeout = 500;
// # End Variables
// ? No Need Because It's On A Different Page Now
// filterButtonShow();
filterButtonShowMenu();
removeClassOnResize(991, filterBoxMenu, "open", true);
closeFilterMenu();
loadRecipesCards();
recipesSearchBar();
addIngredientsCheckBoxes();
checkboxClick();
filterFromCheckBoxes();
clearAllCheckBoxes();

// # Start Used In Other Files To
function removeClassOnResize(media, element, className, getScrollBack) {
    let pastWidth = $(window).width();
    $(window).resize(function () {
        let width = window.innerWidth;
        // if width is between width and width-1 remove class
        if (
            (width < media && pastWidth > media) ||
            (width > media && pastWidth < media)
        ) {
            element.classList.remove(className);
            if (getScrollBack) {
                document.body.classList.remove("stop-scroll");
            }
        }
        pastWidth = width;
    });
}
// # End Used In Other Files To

function filterButtonShow() {
    $(window).scroll(function () {
        // Header Size + Padding Top (100px)
        let startPoint = $("#header").height();
        // Header + Height Of The Section + Padding Top (100px)
        let endPoint = startPoint + ($("#recipes").height() + 100);
        $(this).scrollTop() > startPoint && $(this).scrollTop() < endPoint
            ? filterButton.classList.add("show")
            : filterButton.classList.remove("show");
    });
}
function filterButtonShowMenu() {
    filterButton.onclick = function () {
        // hoverToSection();
        filterBoxMenu.classList.toggle("open");
        document.body.classList.toggle("stop-scroll");
    };
}
function hoverToSection() {
    recipesSection.scrollIntoView({
        behavior: "smooth",
    });
}
function filterBoxMenuQuit() {
    let media = window.matchMedia("(max-width: 991px)");
    if (media.matches) {
        filterBoxMenu.classList.toggle("open");
        document.body.classList.toggle("stop-scroll");
    }
}
function closeFilterMenu() {
    closeFilterMenuButton.onclick = function () {
        // hoverToSection();
        filterBoxMenuQuit();
    };
}
function recipesCountSetter() {
    recipesCount.textContent = `Recipes Count: ${recipesCardArray.length}`;
}
function recipesCountUpdater() {
    let allRecipesCards = document.querySelectorAll(".recipes .cards .card");
    let allRecipesCardsWithHideNotShow = document.querySelectorAll(
        ".recipes .cards .card.hide:not(.show)"
    );
    let allRecipesCardsWithSearchHide = document.querySelectorAll(
        ".recipes .cards .card.search-hide"
    );
    let allRecipesCardsWithShowNotSearchHide = document.querySelectorAll(
        ".recipes .cards .card.show:not(.search-hide)"
    );
    // All - Hide (If There Is Show Sub From Hide)
    let result;
    // If Checkbox Only ALL - Hide Without Show
    result = allRecipesCards.length - allRecipesCardsWithHideNotShow.length;
    // If Search Only All - SearchHide
    if (allRecipesCardsWithSearchHide.length > 0) {
        result = allRecipesCards.length - allRecipesCardsWithSearchHide.length;
    }
    // If Search And Checkbox Show Without SearchHide
    if (
        allRecipesCardsWithSearchHide.length > 0 &&
        allRecipesCardsWithHideNotShow.length > 0
    ) {
        result = allRecipesCardsWithShowNotSearchHide.length;
    }
    recipesCount.textContent = `Recipes Count: ${result}`;
}
async function loadRecipesCards() {
    // Skeleton loader
    const cardTemplate = document.querySelector("[data-recipes-card-template]");
    for (let i = 0; i < 10; i++) {
        recipesCards.append(cardTemplate.content.cloneNode(true));
    }

    let recipes = await made.getRecipes();
    recipesCards.innerHTML = "";
    recipes.forEach((recipe) => {
        // Card
        let recipeCard = document.createElement("div");
        recipeCard.className = "card";
        // Image Container
        let imageContainer = document.createElement("a");
        imageContainer.className = "image";
        imageContainer.href = `/recipes/${made.hrefFormat(recipe.href)}.html`;
        // Image
        let image = document.createElement("img");
        image.src = `/images/foods/${made.hrefFormat(recipe.href)}.jpg`;
        image.alt = `Image Of ${recipe.title}`;
        // Append To Image
        imageContainer.append(image);
        // Info
        let recipeInfo = document.createElement("div");
        recipeInfo.className = "info";
        // Info h2
        let recipeName = document.createElement("h2");
        recipeName.textContent = `${recipe.title}`;
        // Info h3
        let recipeIngredient = document.createElement("h3");
        recipeIngredient.textContent = `Ingredients: `;
        // Info h3 span
        recipe["main-ingredients"].forEach((ingredient) => {
            let recipeIngredients = document.createElement("span");
            recipeIngredients.textContent = `${ingredient}`;
            // Append to h3
            recipeIngredient.append(recipeIngredients);
        });
        // Info a
        let recipeLink = document.createElement("a");
        recipeLink.textContent = "Recipe";
        recipeLink.href = `/recipes/${made.hrefFormat(recipe.href)}.html`;
        // Append To Info
        recipeInfo.append(recipeName, recipeIngredient, recipeLink);
        // Append To Card
        recipeCard.append(imageContainer, recipeInfo);

        recipesCards.append(recipeCard);
        recipesCardArray.push({
            title: recipe.title,
            "main-ingredients": recipe["main-ingredients"],
            element: recipeCard,
        });
    });
    recipesCountSetter();
    loadDefaultImage();
}
function clearSearchBarInput() {
    recipesSearchInput.value = "";
    recipesCountUpdater();
}
async function recipesSearchBar() {
    // Wait X Delay After Finishing Typing
    const updateCard = debounce((value) => {
        filterFromCheckBoxesInnerFunction(false);
        recipesCardArray.forEach((recipe) => {
            let isVisible = recipe.title.toLowerCase().includes(value);
            recipe.element.classList.toggle("search-hide", !isVisible);
        });
        recipesCountUpdater();
    }, recipesSearchBarDebounceTimeout);
    // If Input Changes Fire The Function
    recipesSearchInput.addEventListener("input", (e) => {
        let value = e.target.value.toLowerCase();
        if (value.trim().length === 0 && value.length > 0) return;
        updateCard(value);
    });
}
function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    };
}
async function getRecipesMainIngredients() {
    // Get All Ingredients And Add To Set And Array
    let recipes = await made.getRecipes();
    recipes.forEach((recipe) => {
        recipesIngredientsArray.push(...recipe["main-ingredients"]);
    });
    recipesIngredients = new Set(recipesIngredientsArray);
}
async function addIngredientsCheckBoxes() {
    await getRecipesMainIngredients();
    recipesIngredients.forEach((ingredient) => {
        // Checkbox Container
        let checkboxContainer = document.createElement("div");
        checkboxContainer.className = "checkbox-container";
        // Checkbox
        let checkbox = document.createElement("div");
        checkbox.className = "checkbox";
        // Checkbox Span
        let checkboxSpan = document.createElement("span");
        checkboxSpan.id = ingredient;
        // Span (Result Count)
        let resultCount = document.createElement("span");
        resultCount.className = "foods-result-count";
        resultCount.textContent = getIngredientsCountInAll(ingredient);
        // Append To Checkbox
        checkbox.append(checkboxSpan);
        checkbox.append(ingredient);
        // Append To Checkbox Container
        checkboxContainer.append(checkbox, resultCount);
        // Append To Checkboxes
        recipesIngredientsCheckboxes.append(checkboxContainer);
    });
}
function getIngredientsCountInAll(ingredient) {
    let ingredientsCount = 0;
    async () => {
        await recipesIngredientsArray;
    };
    // Loop If Ingredient Found Add One To The Counter
    for (let i = 0; i < recipesIngredientsArray.length; i++) {
        recipesIngredientsArray[i].includes(ingredient) &&
        recipesIngredientsArray[i].length == ingredient.length
            ? ingredientsCount++
            : "";
    }
    return ingredientsCount;
}
function checkboxClick() {
    $(".checkboxes").on("click", ".checkbox-container", function (event) {
        let checkbox = event.currentTarget.children[0].children[0];
        // If Have Include Remove It And Add Include
        if (checkbox.classList.contains("include")) {
            checkbox.classList.remove("include");
            checkbox.classList.add("do-not-include");
            return;
            // If Have Don't Include Remove It
        } else if (checkbox.classList.contains("do-not-include")) {
            checkbox.classList.remove("do-not-include");
            return;
        }
        // If Don't Have Any Class Add Include
        checkbox.classList.add("include");
    });
}
function resetCardsHideAndShow(resetSearchHide) {
    let allRecipesCards = document.querySelectorAll(".cards .card");
    allRecipesCards.forEach((card) => {
        card.classList.remove("hide");
        card.classList.remove("show");
        if (resetSearchHide) {
            card.classList.remove("search-hide");
        }
    });
}
// ? Reset Values If Set To True Will Ignore Some Parts In The Code
function filterFromCheckBoxesInnerFunction(resetValues) {
    let include = document.querySelectorAll(".include");
    let doNotInclude = document.querySelectorAll(".do-not-include");
    let allRecipesCards = document.querySelectorAll(".cards .card");
    // If Media Max-Width: 991px Quit Screen
    if (resetValues !== false) {
        filterBoxMenuQuit();
    }

    // If No Checked Reset
    if (resetValues !== false) {
        if (include.length + doNotInclude.length === 0) {
            resetCardsHideAndShow(false);
            return;
        }
    }
    // Remove All Hide And Show
    allRecipesCards.forEach((card) => {
        card.classList.remove("hide");
        card.classList.remove("show");
    });
    // Include Checkboxes
    include.forEach((element) => {
        let value = element.id;
        recipesCardArray.forEach((recipe) => {
            // Add Hide To All Elements
            recipe.element.classList.add("hide");
            // Check If Ingredients Contains Value (ingredient)
            let isVisible = recipe["main-ingredients"].includes(value);
            // If Contains Add Show, If Not Remove Show
            if (isVisible) {
                recipe.element.classList.add("show");
            }
        });
    });
    doNotInclude.forEach((element) => {
        let value = element.id;
        recipesCardArray.forEach((recipe) => {
            // If Contains Add Hide And Remove Show
            let isVisible = recipe["main-ingredients"].includes(value);
            if (isVisible) {
                recipe.element.classList.remove("show");
                recipe.element.classList.add("hide");
            }
        });
    });
    recipesCountUpdater();
    // Hover To The Top
    if (resetValues !== false) {
        hoverToSection();
    }
}
function filterFromCheckBoxes() {
    // ? I Added It On A Separate Place So I Can Call It From Somewhere Else
    recipesFilterButton.onclick = filterFromCheckBoxesInnerFunction;
}
function clearAllCheckBoxes() {
    recipesClearAllButton.onclick = function () {
        resetCardsHideAndShow(true);
        clearSearchBarInput();

        let checkbox = document.querySelectorAll(".checkbox-container");
        checkbox.forEach((element) => {
            element.children[0].children[0].classList.remove("include");
            element.children[0].children[0].classList.remove("do-not-include");
        });
    };
}
function loadDefaultImage() {
    let allImages = document.querySelectorAll("img");
    allImages.forEach((img) => {
        img.addEventListener("error", function handleError() {
            img.parentElement.classList.add("image-not-found");
        });
    });
}
