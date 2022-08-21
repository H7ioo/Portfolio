// # Start Variables
let hoverTopButton = document.querySelector(".hover-top");
let navBar = document.querySelector(".navbar");
let headerBurgerMenu = document.querySelector(".header-burger-menu");
let megaMenuButton = document.querySelector(".mega-menu-button");
let megaMenu = document.querySelector(".mega-menu");
let navBarLis = document.querySelectorAll(".lis li a");
let megaMenuLinks = document.querySelectorAll(".mega-menu ul li a");

// let recipes = await this.getRecipes()

// async function getRecipes() {
//     return fetch("/foods.json")
//         .then((res) => res.json())
//         .then((recipe) => {
//             return recipe;
//         });
// }
// # End Variables
hoverToTop();
removeClassOnResize(767, navBar, "clicked", false);
removeClassOnResize(767, megaMenu, "open", false);
navBurgerMenuClick();
closeHeaderOnScroll(navBar, "clicked");
closeHeaderOnScroll(megaMenu, "open");
megaMenuOpen();
closeMegaMenuOnLinkClick();

function hoverToTop() {
    $(window).scroll(function () {
        // It suppose to be 100vh (900px)
        let fullViewPort = 900;
        $(this).scrollTop() > fullViewPort
            ? hoverTopButton.classList.add("show")
            : hoverTopButton.classList.remove("show");
    });
    // Hover To Top
    hoverTopButton.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}
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

function navBurgerMenuClick() {
    navBar.onclick = function (event) {
        let target = event.target;
        if (window.getComputedStyle(headerBurgerMenu).display === "none")
            return;
        // If Target Is Mega Menu Return
        if (target.className === "mega-menu-button") return;
        // If Target Is A Link Remove Close Menu
        if (event.target.tagName.toLowerCase() === "a") {
            navBar.classList.toggle("clicked");
            megaMenu.classList.remove("open");
        }
        // If Target Is Not Navbar And Not Burger Menu Return
        if (
            !target.className.includes("navbar") &&
            target.className !== "header-burger-menu"
        )
            return;
        // Open Navbar
        navBar.classList.toggle("clicked");
        // Close Mega Menu
        megaMenu.classList.remove("open");
    };
}
function closeHeaderOnScroll(element, className) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            element.classList.remove(className);
        }
    });
}
function megaMenuOpen() {
    megaMenuButton.onclick = function () {
        megaMenu.classList.toggle("open");
    };
}
function closeMegaMenuOnLinkClick() {
    megaMenuLinks.forEach((element) => {
        element.onclick = function () {
            megaMenu.classList.remove("open");
        };
    });
}
let language = "ar";
export { language };
