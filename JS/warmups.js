"use strict";

//TODO: Create a function named "typePrinter" that accepts an array as an input, and logs the data type of each element to the console.

let arr = [true, "Icon", 25, "66", false, 0];

const typePrinter = (input) => {
    for(let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

typePrinter(arr);