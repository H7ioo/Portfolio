function longestWord(text) {
    // let words = text.split(" ");
    // let wordsLength = [];
    // words.forEach((word) => {
    //     wordsLength.push(word.length);
    // });
    // return words[wordsLength.indexOf(Math.max.apply(Math, wordsLength))];
    // ---
    // let words = text.split(" ");
    // let longest = 0;
    // let longestWordName;
    // words.forEach((element) => {
    //     if (element.length > longest) {
    //         longest = element.length;
    //         longestWordName = element;
    //     }
    // });
    // return longestWordName;
    // ---
    let words = text.split(" ");
    let longest = words.reduce((prev, current) => {
        return current.length > prev.length ? current : prev;
    });
    return longest;
}

console.log(
    longestWord("In Programming We Love Elzero Academy Toooooooooooooo Much")
);
