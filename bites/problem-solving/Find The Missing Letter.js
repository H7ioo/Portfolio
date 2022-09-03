function missingLetter(text) {
    // let letters = "abcdefghijklmnopqrstuvwxyz";
    // // Difference between the full letters and the missing letters (because there is a missing letter the count will change at the next iteration)
    // let difference;
    // // Missing letters array
    // let missing = [];
    // // If there is a missing letter do..
    // if (letters.indexOf(text) == -1) {
    //     // Loop through letters
    //     for (let i = 0; i < letters.length; i++) {
    //         // If the letter == text start then...
    //         if (letters[i] === text[0]) {
    //             // There is no difference
    //             difference = 0;
    //             // loop through text
    //             for (let j = 0; j < text.length; j++) {
    //                 // if letter is equal to text do nothing else push the letter to the array and increase the count by one so there is no difference between the counts
    //                 if (letters[i + j + difference] === text[j]) {
    //                     continue;
    //                 } else {
    //                     missing.push(letters[i + j]);
    //                     difference++;
    //                 }
    //             }
    //         }
    //     }
    //     return missing.join(" ");
    // }
    // return "No Missing Letter In Sequence";

    // ----
    // let alpha = "abcdefghijklmnopqrstuvwxyz";
    // let start = alpha.indexOf(text[0]);

    // for (let i = 0; i < text.length; i++) {
    //     if (alpha[start + i] !== text[i]) {
    //         return alpha[start + i];
    //     }
    // }
    // return "No Missing Letter In Sequence";

    // -----
    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let start = alpha.indexOf(text[0]); // 3
    let len = text.length; // 5

    for (let i = start; i < start + len; i++) {
        if (!text.includes(alpha[i])) {
            return alpha[i];
        }
    }
    return "No Missing Letters";
}

console.log(missingLetter("abcdfghik"));
console.log(missingLetter("egh"));
console.log(missingLetter("xyz"));
