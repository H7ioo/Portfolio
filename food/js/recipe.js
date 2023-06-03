import * as made from "./functions.js";
let template = document.getElementById("recipe-template").content;
// Copy The Template
let templateCopy = document.importNode(template, true);
let templateContainer = document.querySelector("#recipe .container");
let thisRecipe;
// Getting Recipe Name From File Name
let recipeName = decodeURIComponent(
    window.location.pathname.replace(/^.*[\\\/]/gi, "").replace(/.html/, "")
);
// let recipes = await getRecipes()

importTemplate();
async function importTemplate() {
    // Fetching Recipes
    let recipes = await made.getRecipes2();
    // If Recipe Title Is Recipe Name Than Pass It
    recipes.forEach((recipe) => {
        if (made.hrefFormat(recipe.href) !== recipeName) return;
        thisRecipe = recipe;
    });

    changePageTitle();
    recipeNameAndImage();
    recipeIngredientsCheckboxes();
    ingredientsAddToCartButton();
    recipeDirectionsSteps();
    notes();
    templateContainer.append(templateCopy);
    screenshotButtonClick();
}
function recipeNameAndImage() {
    // Recipe Name
    templateCopy.querySelector(".recipe-info .text h1").textContent =
        thisRecipe.title;
    // Recipe Image
    let recipeImage = templateCopy.querySelector(
        ".recipe-info .text .image-container img"
    );
    recipeImage.src = `/images/foods/${recipeName}.jpg`;
    recipeImage.alt = `Image Of ${thisRecipe.title}`;
}
function recipeIngredientsCheckboxes() {
    // Recipe Ingredients
    let ingredientsContainer = templateCopy.querySelector(
        ".preparing .ingredients ul"
    );
    // Ingredient Template
    let ingredientTemplate = templateCopy.querySelector(
        ".preparing .ingredients ul #ingredient-template"
    ).content;
    // Get All Ingredients
    thisRecipe["all-ingredients"].forEach((ingredientObj, index) => {
        // Copy The Template
        let ingredientTemplateCopy = document.importNode(
            ingredientTemplate,
            true
        );
        // Get The Li
        let ingredient = ingredientTemplateCopy.querySelector("li.ingredient");
        // Get The Checkbox
        let ingredientCheckbox = ingredient.querySelector(
            "input[class='ingredient-checkbox']"
        );
        // Get The Label
        let ingredientLabel = ingredient.querySelector(
            "label[class='ingredient-label']"
        );
        // ? Maybe There is 2 ingredients with the same name
        // Remove Space and Add Dashed + Index
        let ingredientId = `${ingredientObj.ingredient.replace(
            /\s/gi,
            "-"
        )}-${index}`;
        // Put Values, Id, From, TextContent...
        ingredientCheckbox.id = ingredientId;
        ingredientLabel.htmlFor = ingredientId;
        ingredientLabel.querySelector(
            "p"
        ).textContent = `${ingredientObj.amount} ${ingredientObj.meter} ${ingredientObj.ingredient}`;
        // Append To Container
        ingredientsContainer.append(ingredientTemplateCopy);
    });
}
function ingredientsAddToCartButton() {
    let ingredientCheckboxes = templateCopy.querySelectorAll(
        ".ingredient-checkbox"
    );
    let addToCartButton = templateCopy.querySelector(".add-to-cart");
    changeAddToCartTextContent(ingredientCheckboxes, addToCartButton);
    addToCartButton.onclick = function () {
        // todo Add The Functionality After The Shopping List Page
        Swal.fire("Done!", "X Ingredients Added To Cart", "success");
    };
}
function changeAddToCartTextContent(ingredientCheckboxes, addToCartButton) {
    let checkedCount = 0;
    ingredientCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
            if (event.currentTarget.checked) {
                checkedCount++;
            } else {
                checkedCount--;
            }
            if (checkedCount === 1) {
                addToCartButton.querySelector("span.plural").textContent =
                    "ingredient";
            } else {
                addToCartButton.querySelector("span.plural").textContent =
                    "ingredients";
            }
            if (checkedCount === 0) {
                addToCartButton.querySelector("span.count").textContent = "all";
            } else {
                addToCartButton.querySelector("span.count").textContent =
                    checkedCount;
            }
        });
    });
}
function recipeDirectionsSteps() {
    // Recipe directions
    let directionsContainer = templateCopy.querySelector(
        ".preparing .directions ul"
    );
    // Steps Template
    let directionsTemplate = templateCopy.querySelector(
        ".preparing .directions ul #steps-template"
    ).content;
    // Get All Steps
    thisRecipe["directions"].forEach((directionsObj, index) => {
        // Copy The Template
        let directionsTemplateCopy = document.importNode(
            directionsTemplate,
            true
        );
        // Get The Li
        let step = directionsTemplateCopy.querySelector("li.step");
        // Get The Checkbox
        let stepCheckbox = step.querySelector("input[class='step-checkbox']");
        // Get The Label
        let stepLabel = step.querySelector("label[class='step-label']");
        // Get The P
        let paragraph = step.querySelector("p");
        stepCheckbox.id = `step-${index + 1}`;
        stepLabel.htmlFor = `step-${index + 1}`;
        stepLabel.textContent = `Step ${index + 1}`;
        paragraph.textContent = directionsObj;
        // Append To Container
        directionsContainer.append(directionsTemplateCopy);
    });
}
function notes() {
    // Recipe Notes
    let notesContainer = templateCopy.querySelector(".preparing .notes ol");
    // Notes Template
    let notesTemplate = templateCopy.querySelector(
        ".preparing .notes ol #notes-template"
    ).content;
    // Get All Notes
    thisRecipe["notes"].forEach((noteObj, index) => {
        // Copy The Template
        let notesTemplateCopy = document.importNode(notesTemplate, true);
        // Get The Li
        let note = notesTemplateCopy.querySelector("li.note");
        // Get The P
        note.textContent = noteObj;
        // Append To Container
        notesContainer.append(notesTemplateCopy);
    });
    // If There Is No Notes, Delete The Section
    if (thisRecipe["notes"].length === 0) {
        templateCopy.querySelector(".preparing .notes").remove();
    }
}
function screenshotButtonClick() {
    // Take The Screenshot After The Structure Is Build
    let screenshotCanvas = html2canvas(document.querySelector("#recipe"), {
        windowWidth: 991,
    });
    // If The Button Clicked
    document.addEventListener("click", function (event) {
        if (
            event.target.classList.contains("screenshot") ||
            event.target.parentElement.classList.contains("screenshot")
        ) {
            // Download The Screenshot
            screenshotCanvas.then((canvas) => {
                let a = document.createElement("a");
                // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                a.href = canvas
                    .toDataURL("image/jpeg")
                    .replace("image/png", "image/octet-stream");
                a.download = `Recipest-${thisRecipe.title}.png`;
                a.click();
            });
        }
    });
}
function changePageTitle() {
    // TODO If Language Is Arabic Don't Iterate
    // thisRecipe.title
    let wordArray = thisRecipe.title.split(" ");
    for (let i = 0; i < wordArray.length; i++) {
        wordArray[i] = wordArray[i][0].toUpperCase() + wordArray[i].substr(1);
    }
    wordArray = wordArray.join(" ");
    document.title += ` ${wordArray} Recipe`;
}
