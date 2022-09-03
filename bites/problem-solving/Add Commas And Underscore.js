function addCommasAndUnderScore(number) {
    // Convert to string
    let numberStr = `${number}`;
    // If number is less than 3 digit return
    if (numberStr.length <= 3) return number;
    // Split to an array
    numberStr = numberStr.split("");
    // Start the splice
    let start = 1;
    // Number of underscore
    let num = 0;

    numberStr.forEach(() => {
        // Every 3 digit do...
        if (start % 3 === 0) {
            // If it's not the first time add underscore count
            if (start != 3) {
                start += 1 + num;
                num++;
            }
            // If it's the first time add underscore else add comma
            if (-start == -3) {
                numberStr.splice(-start, 0, "_");
            } else {
                numberStr.splice(-start, 0, ",");
            }
        }
        // If it ends with comma then replace it with nothing
        if (numberStr[0] === ",") {
            numberStr[0] = "";
        }
        start++;
    });
    return numberStr.join("");
}
console.log(addCommasAndUnderScore(120));
console.log(addCommasAndUnderScore(1530));
console.log(addCommasAndUnderScore(120510650));
console.log(addCommasAndUnderScore(510650480910));
console.log(addCommasAndUnderScore(12069057014032));

// function addCommasAndUnderscore(num) {
//     // Convert To String
//     let result = num.toLocaleString(); // Try Another Solution With RegExp
//     // Convert To Array
//     result = result.split("");
//     // Update The Last Comma Value
//     result[result.length - 4] = "_";
//     // Convert To String
//     result = result.join("");
//     return result;
// }

// console.log(addCommasAndUnderscore(120)); // 120
// console.log(addCommasAndUnderscore(1530)); // 1_530
// console.log(addCommasAndUnderscore(120510650)); // 120,510_650
// console.log(addCommasAndUnderscore(510650480910)); // 510,650,780_910
// console.log(addCommasAndUnderscore(12069057014032)); // 12,069,057,014_032
