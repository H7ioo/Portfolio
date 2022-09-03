import * as func from "./import.js";

export function stringLength(str) {
    // --- 1
    let increment = 0;
    str.split("").map(() => increment++);
    return increment;
    // --- 2
    // let increment = 0;
    // str.split("").forEach(() => {
    //     increment++;
    // });
    // return increment;
    // --- 3
    // let increment = 0;
    // while (str) {
    //     if (str[increment] === undefined) {
    //         break;
    //     }
    //     increment++;
    // }
    // return increment;
    // --- 4
    // let increment = 0;
    // while (str[increment] === undefined) {
    //     increment++;
    // }
    // return increment;
}

// console.log(stringLength(""));
// console.log(stringLength("Elzero"));
// console.log(stringLength("Elzero Web"));
