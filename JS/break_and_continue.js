"use strict";

console.log("HELLO FROM BREAK AND CONDITIONALS");

//TODO: Prompt the user for an odd number between 1 and 50. Use a loop and a break statement to continue prompting the user if they enter invalid input.

//TODO: Use a loop and the continue statement to output all the odd numbers between 1 and 50, except for the number the user entered.

const userInput = prompt("Give me an ODD number");

if(userInput % 2 == 0) {
    alert("You entered an EVEN number, try again.");
} else {
    let numberToStopAt = userInput;
    alert(`Number to skip: ${numberToStopAt}`);

    for(let i = 1; i < 50; i++) {
       if(i === numberToStopAt) {
           console.log(`YIKES! Skipping number: ${numberToStopAt}`);
           break;
       }
    }
}
