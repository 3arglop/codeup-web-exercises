"use strict";

/* ########################################################################## */

/**
 * TODO:
 * Create a function named `analyzeColor` that accepts a string that is a color
 * name as input. This function should return a message which relates to the
 * color stated in the argument of the function. For colors you do not have
 * responses written for, return a string stating so
 *
 * Example:
 *  > analyzeColor('blue') // returns "blue is the color of the sky"
 *  > analyzeColor('red') // returns "Strawberries are red"
 *
 *
 *  > analyzeColor('cyan') // returns "I don't know anything about cyan"
 *
 * You should use an if-else-if-else block to return different messages.
 *
 * Test your function by passing various string literals to it and
 * console.logging the function's return value
 */

function analyzeColor(color) {
    if (color === "blue") {
        return "Blue is the color of the sky";
    } else if (color === "red") {
        return "Strawberries are red";
    } else if (color === "green") {
        return "Green like the forest";
    } else if (color === "yellow") {
        return "Yellow sunflowers, yellow sun";
    } else if (color === "indigo") {
        return "Indigo is a pretty color";
    } else if (color === "violet") {
        return "Violet like lavender";
    } else {
        return `I don't know anything about the color ${color}.`;
    }
}

console.log(analyzeColor("green"));
console.log(analyzeColor("red"));
console.log(analyzeColor("pink"));


// Don't change the next two lines!
// These lines create two variables for you:
// - `colors`: a list of the colors of the rainbow
// - `randomColor`: contains a single random color value from the list (this
//                  will contain a different color every time the page loads)
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var randomColor = colors[Math.floor(Math.random() * colors.length)];
/**
 * TODO:
 * Pass the `randomColor` variable to your 'analyzeColor' function and console.log the results.
 * You should see a different message every time you refresh the page
 */

console.log(analyzeColor(randomColor));

/**
 * TODO:
 * Comment out the code above, and refactor your function to use a switch-case statement
 */


// const notFavColor = prompt("What is your least favorite color?");

function leastFavColor(notFavColor) {
    switch(notFavColor) {
        case "blue":
            return "the sky";
        case "red":
           return "stop sign";
        case "yellow":
            return "the sun";
        case "green":
            return "the forest";
        case "orange":
            return "garfield the cat";
        case "indigo":
            return "eggplant";
        case "violet":
            return "lavender";
        default:
            return `I don't know anything about the color ${notFavColor}`;
}}

console.log(leastFavColor("blue"));
console.log(leastFavColor("orange"));
console.log(leastFavColor("pink"));

/**
 * TODO:
 * Prompt the user for a color when the page loads, and pass the input from the
 * user to your `analyzeColor` function. Alert the return value from your
 * function to show it to the user.
 */


function analyzeColor(colorInput) {
    if (colorInput === "blue") {
        return "Blue is the color of the sky";
    } else if (colorInput === "red") {
        return "Strawberries are red";
    } else if (colorInput === "green") {
        return "Green like the forest";
    } else if (colorInput === "yellow") {
        return "Yellow sunflowers, yellow sun";
    } else if (colorInput === "indigo") {
        return "Indigo is a pretty color";
    } else if (colorInput === "violet") {
        return "Violet like lavender";
    } else {
        return `I don't know anything about the color ${colorInput}.`;
    }
}

analyzeColor(prompt("Give me a color :-)"));


/* ########################################################################## */

/**
 * TODO:
 * Suppose there's a promotion in Walmart, each customer is given a randomly
 * generated "lucky number" between 0 and 5. If your lucky number is 0 you have
 * no discount, if your lucky number is 1 you'll get a 10% discount, if it's 2,
 * the discount is 25%, if it's 3, 35%, if it's 4, 50%, and if it's 5 you'll get
 * everything for free!.
 *
 * Write a function named `calculateTotal` which accepts a lucky number and total
 * amount, and returns the discounted price.
 *
 * Example:
 * calculateTotal(0, 100) // returns 100
 * calculateTotal(4, 100) // returns 50
 * calculateTotal(5, 100) // returns 0
 *
 * Test your function by passing it various values and checking for the expected
 * return value.
 */

function calculateTotal(luckyNum, total) {
    if(luckyNum === 0) {
        return total;
    } else if(luckyNum === 1) {
        return total - (total * .10);
    } else if (luckyNum === 2) {
        return total - (total * .25);
    } else if (luckyNum === 3) {
        return total - (total * .35);
    } else if (luckyNum === 4) {
        return total - (total * .5);
    } else if (luckyNum === 5) {
        return "Free!";
    }
}

console.log(calculateTotal(0, 345));
console.log(calculateTotal(1, 100));
console.log(calculateTotal(3, 200));
console.log(calculateTotal(5, 530));


/**
 * TODO:
 * Uncomment the line below to generate a random number between 0 and 5.
 * (In this line of code, 0 is inclusive, and 6 is exclusive)
 * Prompt the user for their total bill, then use your `calculateTotal` function
 * and alerts to display to the user what their lucky number was, what their
 * price before the discount was, and what their price after the discount is.
 */
// Generate a random number between 0 and 6
// var luckyNumber = Math.floor(Math.random() * 6);

const total = prompt("What is your total?");
let randomNumbers = Math.floor(Math.random() * 6);

function calculateTotalAgain(luckyNum, total) {

    let newTotal;

    if(luckyNum === 0) {
        alert(`Your lucky number is 0. No discount applied. Your total is: $${total}.`)
    } else if(luckyNum === 1) {
        newTotal = total - (total * .10);
        alert(`Your lucky number is 1. You get 10% off! Your new total is: $${newTotal}.`);
    } else if (luckyNum === 2) {
        newTotal = total - (total * .25);
        alert(`Your lucky number is 2. You get 25% off! Your new total is: $${newTotal}.`)
    } else if (luckyNum === 3) {
        newTotal = total - (total * .35);
        alert(`Your lucky number is 3. You get 35% off! Your new total is: $${newTotal}`);
    } else if (luckyNum === 4) {
        newTotal = total - (total * .5);
        alert(`Your lucky number is 4. You get 50% off! Your new total is: $${newTotal}`);
    } else if (luckyNum === 5) {
        alert("Your lucky number is 5. Congrats! You get everything for FREE!");
    }
}

calculateTotalAgain(randomNumbers, total);


/**
 * TODO:
 * Write some JavaScript that uses a `confirm` dialog to ask the user if they
 * would like to enter a number. If they click 'Ok', prompt the user for a
 * number, then use 3 separate alerts to tell the user:
 *
 * - whether the number is even or odd
 * - what the number plus 100 is
 * - if the number is negative or positive
 *
 * Do *NOT* display any of the above information
 * if the user enters a value that is not of the number data type.
 * Instead, use an alert to inform them of the incorrect input data type.
 *
 *
 * Can you refactor your code to use functions?
 * HINT: The way we prompt for a value could be improved
 */

// let doesUserConfirm = confirm("Would you like to enter a number?");
//
// if(doesUserConfirm) {
//     const userNum = parseFloat(prompt("What is your number?"));


    // if(!isNaN(userNum)) {
    //     if(userNum % 2 == 0) {
    //         alert("Your number is even...");
    //         alert(userNum + " + 100 = " + (userNum + 100) + ".");
    //         if(userNum > 0) {
    //             alert("Your number is positive...")
    //         } else {
    //             alert("Your number is negative...")
    //         }
    //     } else if (userNum % 2 != 0) {
    //         alert("Your number is odd...")
    //         alert(`${userNum} + 100 = ${userNum + 100}`);
    //         if(userNum > 0) {
    //             alert("Your number is positive...");
    //         } else {
    //             alert("Your number is negative...")
    //         }
    //     }} else {
    //     alert("Oh oh! You entered a non number. Try again!")
    // }}



    function numberGame() {
    let doesUserConfirm = confirm("Would you like to enter a number?");

    if (doesUserConfirm) {
        let userNum = parseFloat(prompt("What is your number?"));
        if (!isNaN(userNum)) {
            alert(userNum % 2 == 0 ? "Number is even" : "Number is odd");
            alert(userNum > 0 ? "Number is positive" : "Number is negative");
            alert("Your number + 100 = " + (userNum + 100));
        } else {
            alert("Oh, oh! Wrong input. Please enter a number!")
        }
    }
}


    function newGame() {
        numberGame();
    }

    newGame();
