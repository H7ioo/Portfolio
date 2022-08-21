// ! Warning sensitive content (this the worst code you'll ever see)
$(function () {
    let mainWords = [];
    let secondaryWords = [];
    let emojis = [];

    updateArraysAndElements();
    addWord();
    deleteWord();
    search();
    select();
    submit();
    shuffle();
    copy();
    shuffleMax();

    function addWord() {
        // All Word Inputs
        let wordInput = $("div.adding-section input");
        // All Add Buttons

        if (window.matchMedia("(max-width: 767px)").matches) {
            wordInput.blur(function (event) {
                if (this.value === "" || this.value.length === 0) return;
                let regex = /([\wığüşöçiĞÜŞÖÇİ]+(\s)?)+/giu;
                let array;
                let ol;
                // Check the input
                if (this.placeholder === "Main Word") {
                    array = mainWords;
                    arrayName = "mainWords";
                    ol = $(".mainWords");
                } else if (this.placeholder === "Secondary Word") {
                    array = secondaryWords;
                    arrayName = "secondaryWords";
                    ol = $(".secondaryWords");
                } else if (this.placeholder === "Emoji") {
                    array = emojis;
                    arrayName = "emojis";
                    ol = $(".emojis");
                    regex = /(\p{Extended_Pictographic}+(\s)?)+/giu;
                }
                // Pushing to the array
                try {
                    array.push(...this.value.match(regex));
                } catch (error) {
                    return;
                }
                // Filtering repeated
                array = [...new Set(array)];
                // Add array to local storage
                localStorage.setItem(arrayName, JSON.stringify(array));

                if (this.placeholder === "Main Word") {
                    mainWords = array;
                } else if (this.placeholder === "Secondary Word") {
                    secondaryWords = array;
                } else if (this.placeholder === "Emoji") {
                    emojis = array;
                }

                // Reset the input
                this.value = "";

                createElements(array, ol);
            });
        } else {
            wordInput.on("keypress", function (event) {
                if (event.originalEvent.key === "Enter") {
                    if (this.value === "" || this.value.length === 0) return;
                    let regex = /([\wığüşöçiĞÜŞÖÇİ]+(\s)?)+/giu;
                    let array;
                    let ol;
                    // Check the input
                    if (this.placeholder === "Main Word") {
                        array = mainWords;
                        arrayName = "mainWords";
                        ol = $(".mainWords");
                    } else if (this.placeholder === "Secondary Word") {
                        array = secondaryWords;
                        arrayName = "secondaryWords";
                        ol = $(".secondaryWords");
                    } else if (this.placeholder === "Emoji") {
                        array = emojis;
                        arrayName = "emojis";
                        ol = $(".emojis");
                        regex = /(\p{Extended_Pictographic}+(\s)?)+/giu;
                    }
                    // Pushing to the array
                    try {
                        array.push(...this.value.match(regex));
                    } catch (error) {
                        return;
                    }
                    // Filtering repeated
                    array = [...new Set(array)];
                    // Add array to local storage
                    localStorage.setItem(arrayName, JSON.stringify(array));

                    if (this.placeholder === "Main Word") {
                        mainWords = array;
                    } else if (this.placeholder === "Secondary Word") {
                        secondaryWords = array;
                    } else if (this.placeholder === "Emoji") {
                        emojis = array;
                    }

                    // Reset the input
                    this.value = "";

                    createElements(array, ol);
                }
            });
        }
    }

    function createElements(elements, ol) {
        elements.forEach((element) => {
            let olClass = ol[0].classList[0];
            let lis = $(`.${olClass} div li`);
            // Prevent creating new element
            if (!(lis.length === 0)) {
                for (let i = 0; i < lis.length; i++) {
                    if (lis[i].textContent === element) return;
                }
            }

            let div = document.createElement("div");
            let li = document.createElement("li");
            li.textContent = element;
            let button = document.createElement("button");
            button.textContent = "-";
            button.classList.add("remove");

            div.append(li, button);
            ol.append(div);
        });
        shuffleMax();
    }

    function updateArraysAndElements() {
        let localStorageNamesArray = ["mainWords", "secondaryWords", "emojis"];
        localStorageNamesArray.forEach((element) => {
            if (localStorage.getItem(element)) {
                let data = JSON.parse(localStorage.getItem(element));
                if (element === "mainWords") {
                    mainWords.push(...data);
                } else if (element === "secondaryWords") {
                    secondaryWords.push(...data);
                } else if (element === "emojis") {
                    emojis.push(...data);
                }
                createElements(data, $(`.${element}`));
            }
        });
    }

    function deleteWord() {
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("remove")) {
                let localStorageName =
                    event.target.parentElement.parentElement.classList[0];
                let localStorageContent =
                    event.target.previousElementSibling.textContent;
                let array = JSON.parse(localStorage[localStorageName]);
                array = array.filter((item) => item != localStorageContent);
                localStorage.setItem(localStorageName, JSON.stringify(array));
                if (localStorageName === "mainWords") {
                    mainWords = array;
                } else if (localStorageName === "secondaryWords") {
                    secondaryWords = array;
                } else if (localStorageName === "emojis") {
                    emojis = array;
                }
                event.target.parentElement.remove();
                shuffleMax();
            }
        });
    }

    function search() {
        $(".search").change(function (event) {
            let searchValue = event.target.value;
            let ol = event.target.parentElement.nextElementSibling.classList[0];
            let lis = [...$(`.${ol} div li`)];
            lis.filter((element) => {
                element.parentElement.style.display = "flex";
                if (!element.textContent.includes(searchValue)) {
                    element.parentElement.style.display = "none";
                }
            });
        });
    }

    function select() {
        document.addEventListener("click", function (event) {
            if (event.target.localName === "li") {
                let olClass =
                    event.target.parentElement.parentElement.classList[0];
                let allDivs = [
                    ...event.target.parentElement.parentElement.children,
                ];
                if (olClass != "emojis") {
                    allDivs.forEach((element, index) => {
                        if (event.target == element.children[0]) return;
                        element.children[0].classList.remove("active");
                    });
                }
                event.target.classList.toggle("active");
            }
        });
    }

    function submit() {
        $(".submit").click(function (event) {
            $(".result")[0].value = "";
            let olArray = ["mainWords", "secondaryWords", "emojis"];
            olArray.forEach((element) => {
                let lis = $(`.${element}`).children().children().get();
                lis.filter((element) => {
                    // console.log(element.classList[0] == "active");
                    return element.classList[0] == "active";
                }).map((element) => {
                    $(".result")[0].value += element.textContent + " ";
                });
            });
        });
    }

    function shuffle() {
        $(".shuffle").click(function (event) {
            let shuffleLength = $(".length")[0].value;
            let parentElementClass =
                event.target.parentElement.parentElement.classList[1];
            let lis = $(
                `.${event.target.parentElement.parentElement.classList[1]} .items ol div li`
            );
            let lisArray = [...lis];
            lisArray.forEach((element) => {
                element.classList.remove("active");
            });
            if (parentElementClass === "shuffle-secondaryWords") {
                lis[
                    Math.round(Math.random() * (lisArray.length - 1))
                ].classList.add("active");
            } else if (parentElementClass === "shuffle-emojis") {
                let num = 0;
                while (num < shuffleLength) {
                    num = 0;
                    lis[
                        Math.round(Math.random() * (lisArray.length - 1))
                    ].classList.add("active");
                    lisArray.forEach((element) => {
                        if (element.classList.contains("active")) {
                            num++;
                        }
                    });
                }
            }
        });
    }

    function copy() {
        $(".copy").click(function (event) {
            navigator.clipboard.writeText($(".result")[0].value);
        });
    }

    function shuffleMax() {
        $(".length")[0].value = 0;
        if ($(".emojis div").children().length / 2 >= 3) {
            $(".length")[0].value = 3;
        }
        $(".length")[0].max = $(".emojis div").children().length / 2;
    }
});
