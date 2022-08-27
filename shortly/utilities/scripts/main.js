// - Start Selector Function
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
// - End Selector Function
const navToggler = $(".nav-toggler");
const navBar = $(".nav");
const shortenButton = $(".shorten");
const formLink = $(".add-link");
const linksTemplate = $(".links-template");
const linksContainer = $(".links .boxes");
let linkData = [];

// - Run
retrieveLinksFromLocalStorage();
navBarTogglerClick();
shortenItClick();
copyLink();
// - Run

function navBarTogglerClick() {
  navToggler.onclick = function () {
    navBar.classList.toggle("open");
  };
}

async function shortenItClick() {
  shortenButton.onclick = function (e) {
    e.preventDefault();
    formLink.classList.toggle(
      "not-valid",
      formLink.value.length === 0 || /^\s*$/gi.test(formLink.value) === true
    );
    if (formLink.value.length === 0 || /^\s*$/gi.test(formLink.value) === true)
      return;
    API(formLink.value);
    formLink.value = "";
  };
}
async function API(link) {
  await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        let result = data.result;
        linkData.push({
          original_link: result.original_link,
          full_short_link: result.full_short_link,
        });
        addLinkToList(result);
        addLinkToLocalStorage(result);
      }
      // ? You Can Create Pop Up For The Error
    });
}
function addLinkToList(link) {
  let linksTemplateClone = linksTemplate.content.cloneNode(true);
  let box = linksTemplateClone.querySelector(".box");
  let mainLink = box.querySelector(".link a:first-child");
  let shortenedLink = box.querySelector(".link a:last-child");
  let copyButton = box.querySelector(".copy-link");
  mainLink.href = link.original_link;
  mainLink.textContent = link.original_link;
  shortenedLink.href = link.full_short_link;
  shortenedLink.textContent = link.full_short_link;
  copyButton.dataset.link = link.full_short_link;
  linksContainer.append(box);
}
function addLinkToLocalStorage(link) {
  localStorage.setItem("links", JSON.stringify([...linkData]));
}
function retrieveLinksFromLocalStorage() {
  let links = JSON.parse(localStorage.getItem("links"));
  if (!links) return;
  linkData.push(...links);
  links.forEach((link) => {
    addLinkToList(link);
  });
}
function copyLink() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-link")) {
      e.preventDefault();
      navigator.clipboard.writeText(e.target.dataset.link);
      e.target.classList.add("copied");
      e.target.textContent = "Copied!";
      setTimeout(() => {
        e.target.classList.remove("copied");
        e.target.textContent = "Copy";
      }, 1250);
    }
  });
}
