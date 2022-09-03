function removeDup(text) {
    // return [...new Set(text.split(" "))].join(" ");
    // -----
    let words = text.split(" ");
    let result = [];
    for (let i = 0; i < words.length; i++) {
        if (result.indexOf(words[i]) == -1) {
            result.push(words[i]);
        }
    }
    return result.join(" ");
}

console.log(removeDup("Hello Elzero Web Web Hello School"));
