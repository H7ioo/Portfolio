import { language } from "./main.js";
// Get Language

/*
if (language === "ar") {

} else if (language === "en") {

}
*/

// # Start Built Function
function hrefFormat(str) {
    if (!str) return;
    str = str
        .toLowerCase()
        .replace(/(^\s+)?(\s+$)?/gi, "")
        .replace(/\s+/gi, "-");
    return str;
}
// let recipes = await getRecipes()
async function getRecipes() {
    return fetch("./foods-en.json")
        .then((res) => res.json())
        .then((recipe) => {
            return recipe;
        });
}
// # End Built Function

export { hrefFormat, getRecipes };
