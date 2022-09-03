function convert(n) {
    // let arrayOfNum = n
    //     .toString()
    //     .split("")
    //     .map((element) => {
    //         return parseInt(element);
    //     })
    //     .reverse();
    // return arrayOfNum;
    // ----
    let str = n.toString();
    let emptyArray = [];
    for (let i = 0; i < str.length; i++) {
        emptyArray.unshift(+str[i]);
    }
    return emptyArray;
}

console.log(convert(564987654));
console.log(convert(529132));
