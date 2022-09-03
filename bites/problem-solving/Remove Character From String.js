function removeCharFromString(text, char) {
    // return text
    //     .split("")
    //     .filter((letter) => {
    //         return letter.toLowerCase() != char.toLowerCase();
    //     })
    //     .join("");
    // ---------
    let reg = new RegExp(`${char}`, "gi");
    return text.replace(reg, "");
}

console.log(removeCharFromString("Elzer@o@ Web S@@chool@@@", "@"));
