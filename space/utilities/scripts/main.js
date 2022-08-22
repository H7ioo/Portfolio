// - Start Variables
const landing = document.querySelector(".landing");
const colorBoxes = document.querySelectorAll(".colors ul li");
let landingBackgroundChangeSpeed = 10;
const randomButtons = document.querySelectorAll(".random-buttons li");
const slideShowBullets = document.querySelectorAll(
  ".random-backgrounds .bullets li"
);
const slideShowImages = document.querySelectorAll(
  ".random-backgrounds .images li"
);
const selectImageButton = document.querySelector(".random-backgrounds .select");
const timerInput = document.querySelector(".timer .timer-input");
// If Speed Found Update Speed And Input
if (localStorage.getItem("randomSpeed")) {
  landingBackgroundChangeSpeed = localStorage.getItem("randomSpeed");
  timerInput.value = localStorage.getItem("randomSpeed");
}
let staticBackground = false;
let changeBackgroundsInterval;
let animationOneTimeout;
let animationTwoTimeout;
let lastRandomNumber;
// - End Variables
// - Start Components
function removeAllActiveFromLi(elements) {
  elements.forEach((li) => li.classList.remove("active"));
}
function changeColor(element, color) {
  // Change Main Color And Add Active
  document.documentElement.style.setProperty("--main-color", color);
  element.classList.add("active");
}
function setBackground(element, src) {
  // Change Background Image
  landing.style.backgroundImage = `url("${src}")`;
  // Add Active To Image
  element.parentElement.classList.add("active");
  // Reset Bullets
  removeAllActiveFromLi(slideShowBullets);
  // Add Active To Bullet
  // Get Image Number From Src
  // ! NOTE: If The Source Image Contains Random Numbers Or More Than One Number It's Not Going To Work
  // ? You Can Give Bullets data-attribute And Activating The Bullets Depending On The Same Attribute On The Image, You Can Use The Same Concept With The SlideShow Instead Of NextSibling
  let imageSrc = element.src.match(/\/utilities.*/gi);
  let imageNumber = `${imageSrc}`.match(/\d+/gi);
  let bullet = document.querySelector(
    `.random-backgrounds .bullets li:nth-child(${imageNumber[0]})`
  );

  bullet.classList.add("active");
}
function setRandom(element, value) {
  selectImageButton.classList.remove("disabled");
  if (value === "yes") {
    // If Has Attribute Is Yes Add Disabled
    selectImageButton.classList.add("disabled");
    // Start Interval
    staticBackground = false;
  } else {
    selectImageButton.classList.remove("disabled");
    // Stop Interval
    staticBackground = true;
    // Clear Interval
    clearInterval(changeBackgroundsInterval);
  }
  element.classList.add("active");
}
function setDataFromLocalStorage(
  localItem,
  dataAttr,
  reset,
  resetElements,
  cb
) {
  // Get Item
  let item = localStorage.getItem(localItem);
  // If Not Found Return
  if (!item) return;
  // Find Color In The Page By data-color
  let element = document.querySelector(`[${dataAttr}="${item}"]`);
  // Remove All Active LI's
  if (reset) {
    removeAllActiveFromLi(resetElements);
  }
  // Change Color
  cb(element, item);
}
function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
// - End Components
// - Start RUN
backgroundInterval();
settingsBoxClick();
changeLiColor();
// Color
setDataFromLocalStorage("color", "data-color", true, colorBoxes, changeColor);
// Background
setDataFromLocalStorage(
  "landingBackground",
  "src",
  true,
  slideShowImages,
  setBackground
);
// Random Background
setDataFromLocalStorage(
  "randomBackground",
  "data-random",
  true,
  randomButtons,
  setRandom
);
// Random Background Speed
backgroundSlideShow();
changeBackgroundButtons();
selectImage();
changeRandomSpeed();
animateSkill();
setBoxBackgroundSVG();
navClick();
removeClassOnResize(992);
scrollToTop();
resetLocalStorage();
// - End RUN
function backgroundInterval() {
  // If staticBackground Is True Return (It's useless)
  if (staticBackground === true) return;
  // Interval For Changing Background
  changeBackgroundsInterval = setInterval(() => {
    changeLandingBackground();
  }, landingBackgroundChangeSpeed * 1000);
}
function changeLandingBackground() {
  const imageCount = 5;
  // From 1 To 5
  let randomNumber = Math.ceil(Math.random() * imageCount);
  // If Last Number Is Defined
  if (lastRandomNumber) {
    // While The Last Number Is The Same As The New One Generate A New Number
    while (lastRandomNumber === randomNumber) {
      randomNumber = Math.ceil(Math.random() * imageCount);
    }
  }
  lastRandomNumber = randomNumber;
  // Background Src
  let background = `./utilities/images/landing-${randomNumber}.jpg`;
  // Change Landing Style Background
  landing.style.backgroundImage = `url("${background}")`;
}
function settingsBoxClick() {
  let settingsBox = document.querySelector(".settings-box");
  // If Click On The Box Add Class Open
  document.querySelector(".settings-box .gear").onclick = (event) => {
    settingsBox.classList.toggle("open");
  };
  document.addEventListener("click", function (e) {
    if (e.target !== settingsBox && settingsBox.classList.contains("open")) {
      settingsBox.classList.remove("open");
    }
  });
  // Include All Child Elements
  settingsBox.onclick = function (e) {
    e.stopPropagation();
  };
}
function changeLiColor() {
  colorBoxes.forEach((li) => {
    // If Li Is Clicked
    li.addEventListener("click", (e) => {
      // Remove Active From All
      removeAllActiveFromLi(colorBoxes);
      let targetLi = e.target;
      // Get data-color Attribute
      let liColor = targetLi.getAttribute("data-color");
      // Set It In The CSS As A Main Color
      changeColor(targetLi, liColor);
      document.documentElement.style.setProperty("--main-color", liColor);
      targetLi.classList.add("active");
      // Add Color To LocalStorage
      localStorage.setItem("color", liColor);
      // Change SVG COLOR
      setBoxBackgroundSVG();
    });
  });
}
function backgroundSlideShow() {
  let leftArrow = document.querySelector(
    ".random-backgrounds .images span.left"
  );
  let rightArrow = document.querySelector(
    ".random-backgrounds .images span.right"
  );
  let firstImage = document.querySelector(
    ".random-backgrounds .images li:first-of-type"
  );
  let lastImage = document.querySelector(
    ".random-backgrounds .images li:last-of-type"
  );
  let firstBullet = document.querySelector(
    ".random-backgrounds .bullets li:first-of-type"
  );
  let lastBullet = document.querySelector(
    ".random-backgrounds .bullets li:last-of-type"
  );
  leftArrow.onclick = function () {
    // Active Image Class
    let activeImage = document.querySelector(
      ".random-backgrounds .images li.active"
    );
    // Active Bullet Class
    let activeBullet = document.querySelector(
      ".random-backgrounds .bullets li.active"
    );
    // If The Prev Image Is Not LI Remove Active Class And Add It To Last
    if (activeImage.previousElementSibling.nodeName !== "LI") {
      activeImage.classList.remove("active");
      lastImage.classList.add("active");
      activeBullet.classList.remove("active");
      lastBullet.classList.add("active");
      return;
    }
    // Remove Active Give To Prev
    activeImage.classList.remove("active");
    activeImage.previousElementSibling.classList.add("active");

    activeBullet.classList.remove("active");
    activeBullet.previousElementSibling.classList.add("active");
  };

  rightArrow.onclick = function () {
    let activeImage = document.querySelector(
      ".random-backgrounds .images li.active"
    );
    // Active Bullet Class
    let activeBullet = document.querySelector(
      ".random-backgrounds .bullets li.active"
    );
    // If The Next Image Is Not LI Remove Active Class And Add It To First
    if (activeImage.nextElementSibling.nodeName !== "LI") {
      activeImage.classList.remove("active");
      firstImage.classList.add("active");
      activeBullet.classList.remove("active");
      firstBullet.classList.add("active");
      return;
    }
    // Remove Active Give To Next
    activeImage.classList.remove("active");
    activeImage.nextElementSibling.classList.add("active");

    activeBullet.classList.remove("active");
    activeBullet.nextElementSibling.classList.add("active");
  };
}
function changeBackgroundButtons() {
  randomButtons.forEach((li) => {
    li.addEventListener("click", () => {
      // Remove All Active From Li
      removeAllActiveFromLi(randomButtons);
      // Add Active To Clicked
      li.classList.add("active");
      if (li.getAttribute("data-random") === "yes") {
        // If Has Attribute Is Yes Add Disabled
        selectImageButton.classList.add("disabled");
        // Start Interval
        staticBackground = false;
        // Run Interval
        backgroundInterval();
        // Add To Local Storage
        localStorage.setItem("randomBackground", "yes");
      } else {
        selectImageButton.classList.remove("disabled");
        // Stop Interval
        staticBackground = true;
        // Clear Interval
        clearInterval(changeBackgroundsInterval);
        // Add To Local Storage
        localStorage.setItem("randomBackground", "no");
      }
    });
  });
}
function selectImage() {
  selectImageButton.onclick = function () {
    // Get Active Image
    let activeImage = document.querySelector(
      ".random-backgrounds .images li.active img"
    );
    let activeImageSrc = activeImage.src.match(/\/utilities.*/gi);
    // Change Landing Background
    landing.style.backgroundImage = `url("${activeImageSrc}")`;
    // Add To Local Storage
    localStorage.setItem("landingBackground", `.${activeImageSrc}`);
  };
}
function changeRandomSpeed() {
  timerInput.onchange = function (e) {
    let target = e.target;
    // If It's Between 1-60 Run
    if (target.value >= 1 && target.value <= 60) {
      // Pass The Value
      updateSpeed(target.value);
    }
  };
}
const updateSpeed = debounce((speed) => {
  // Running Debounce
  // Changing Speed, Clearing Interval, Resetting Interval
  landingBackgroundChangeSpeed = speed;
  clearInterval(changeBackgroundsInterval);
  backgroundInterval();
  // Add To Local Storage
  localStorage.setItem("randomSpeed", speed);
});
function animateSkill() {
  window.onscroll = function () {
    const ourSkills = document.querySelector("#our-skills");
    let allSkills = document.querySelectorAll(".skill-progress span");
    // Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // Offset Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = window.innerHeight;
    // Window ScrollTOp
    let windowScrollTop = window.pageYOffset;

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
      allSkills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    } else {
      allSkills.forEach((skill) => {
        skill.style.width = 0;
      });
    }
  };
}
function setBoxBackgroundSVG() {
  const boxes = document.querySelectorAll(".testimonials .boxes .box");
  let mainColor =
    document.documentElement.style.getPropertyValue("--main-color");
  // If Color Not Found Get It By Another Way
  if (!mainColor) {
    mainColor = getComputedStyle(document.documentElement).getPropertyValue(
      "--main-color"
    );
  }
  // Replace Spaces (For Handling Errors)
  mainColor = mainColor.replace(/\s/gi, "");
  // Make The Format
  let mainColorFormat = `%23${mainColor.slice(1)}`;
  boxes.forEach((box) => {
    box.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg id="visual" viewBox="0 0 1000 400" width="1000" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 179L18.5 178.7C37 178.3 74 177.7 111 189.3C148 201 185 225 222 235.2C259 245.3 296 241.7 333 227.3C370 213 407 188 444.2 173C481.3 158 518.7 153 555.8 155.8C593 158.7 630 169.3 667 177.3C704 185.3 741 190.7 778 193.2C815 195.7 852 195.3 889 193.3C926 191.3 963 187.7 981.5 185.8L1000 184L1000 401L981.5 401C963 401 926 401 889 401C852 401 815 401 778 401C741 401 704 401 667 401C630 401 593 401 555.8 401C518.7 401 481.3 401 444.2 401C407 401 370 401 333 401C296 401 259 401 222 401C185 401 148 401 111 401C74 401 37 401 18.5 401L0 401Z" fill="${mainColorFormat}" stroke-linecap="round" stroke-linejoin="miter"></path></svg>')`;
  });
}
function navClick() {
  navToggle.onclick = function () {
    // Add Active To Logo And Navbar With Hiding Scroll
    navBar.classList.toggle("active");
    document.body.classList.toggle("hide-scroll");
    logo.classList.toggle("active");
    // If The Navbar Is Active
    if (navBar.classList.contains("active")) {
      // Start Animation
      addAnimation();
      let navLink = document.querySelectorAll("#navBar li a");
      // If Any Link Is Clicked Return Everything To Normal
      navLink.forEach((a) => {
        a.onclick = function () {
          clearToggle();
        };
      });
    } else {
      clearAnimation();
    }
  };
}
function addAnimation() {
  // Clear Timeout So If He Clicks So Fast
  clearTimeout(animationOneTimeout);
  clearTimeout(animationTwoTimeout);
  // The Animation
  navToggle.children.item(0).style.transform = "translateX(-50%)";
  navToggle.children.item(1).style.opacity = "0";
  navToggle.children.item(2).style.transform = "translateX(-50%)";
  // Second Part
  animationOneTimeout = setTimeout(() => {
    navToggle.children.item(0).style.transform =
      "translateY(calc(-1rem - 3px)) translateX(-50%) rotate(+45deg";
    navToggle.children.item(2).style.transform =
      "translateY(calc(1rem)) translateX(-50%) rotate(-45deg";
  }, 250);
  // Third Part
  animationTwoTimeout = setTimeout(() => {
    navToggle.children.item(0).style.transform =
      "translateY(calc(0.25rem + 3px)) rotate(+45deg";
    navToggle.children.item(2).style.transform =
      "translateY(calc(-0.25rem - 3px)) rotate(-45deg";
  }, 500);

  // ? Animation 2
  // navToggle.children.item(0).style.transform =
  //   "translateY(calc(-1rem - 3px)) translateX(-50%) rotate(+45deg";
  // navToggle.children.item(1).style.opacity = "0";
  // navToggle.children.item(2).style.transform =
  //   "translateY(calc(1rem)) translateX(-50%) rotate(-45deg";
  // setTimeout(() => {
  //   navToggle.children.item(0).style.transform =
  //     "translateY(calc(0.25rem + 3px)) rotate(+45deg";
  //   navToggle.children.item(2).style.transform =
  //     "translateY(calc(-0.25rem - 3px)) rotate(-45deg";
  // }, 300);
}
function clearAnimation() {
  // Stop Animation
  clearTimeout(animationOneTimeout);
  clearTimeout(animationTwoTimeout);
  navToggle.children.item(0).style.transform = "";
  navToggle.children.item(1).style.opacity = "1";
  navToggle.children.item(2).style.transform = "";
}
function clearToggle() {
  // Clear Active And Scroll
  navBar.classList.remove("active");
  document.body.classList.remove("hide-scroll");
  logo.classList.remove("active");
  // Stop Animation And Return To Normal State
  clearAnimation();
}
function removeClassOnResize(media) {
  // If The Media Is Changed, Reset Active, Scroll Classes...
  let pastWidth = window.innerWidth;
  window.addEventListener("resize", function () {
    let width = window.innerWidth;
    // if width is between width and width-1 remove class
    if (
      (width < media && pastWidth > media) ||
      (width > media && pastWidth < media)
    ) {
      clearToggle();
    }
    pastWidth = width;
  });
}
function scrollToTop() {
  // If Scrolled After Landing Show Button
  window.addEventListener("scroll", (event) => {
    hoverToTop.classList.toggle(
      "active",
      window.scrollY >= landing.scrollHeight
    );
  });
  // If Button Is Clicked Scroll To Top
  hoverToTop.onclick = function () {
    window.scrollTo(0, 0);
  };
}
function resetLocalStorage() {
  // Clear Storage And Reload Page
  resetAll.onclick = function () {
    localStorage.clear();
    window.location.reload();
  };
}
