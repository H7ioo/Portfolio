import * as func from "./import.js";

export function stringReverse(str) {
    // --- 1
    // let result = [];
    // let countDown = func.stringLength(str);
    // while (countDown >= 0) {
    //     result.push(str[countDown]);
    //     countDown--;
    // }
    // return result.join("");
    // --- 2
    // let reverse = "";
    // while (func.stringLength(str)) {
    //     reverse += str[func.stringLength(str) - 1];
    //     str = str.slice(0, -1);
    // }
    // return reverse;
    // --- 3
    let reversed = "";
    for (let i = func.stringLength(str) - 1; i >= 0; i--) reversed += str[i];
    return reversed;
}
console.log(stringReverse("orezlE"));
