"use strict";

console.log("HELLO FROM BREAK AND CONDITIONALS");

//TODO: Prompt the user for an odd number between 1 and 50. Use a loop and a break statement to continue prompting the user if they enter invalid input.

//TODO: Use a loop and the continue statement to output all the odd numbers between 1 and 50, except for the number the user entered.

let userInput = prompt("Give me an ODD number");
console.log(typeof userInput);
while(userInput % 2 == 0) {
    userInput = prompt("You entered an EVEN number, try again.");
}

if(userInput % 2 !== 0) {
    let numberToStopAt = parseFloat(userInput);
    alert(`Number to skip: ${numberToStopAt}`);

    for(let i = 1; i < 50; i+=2) {
        if(i === numberToStopAt) {
            console.log(`YIKES! Skipping number: ${numberToStopAt}`);
        }
        console.log(`Here is an ODD number: ${i}`);
    }
}


/*
if(i === numberToStopAt) {
           console.log(`YIKES! Skipping number: ${numberToStopAt}`);
           break;
       }
 */