"use strict";

console.log("Hello FUNCTIONS!!!!");

/**
 * TODO:
 * Create a function called 'sayHello' that takes a parameter 'name'.
 * When called, the function should return a message that says hello to the passed in name.
 *
 * Example
 * > sayHello("codeup") // returns "Hello, codeup!"
 */

const sayHello = (name) => {
    return `Hello, ${name} :)`;
}

console.log(sayHello("codeup"));
console.log(sayHello("Bob"));
console.log(sayHello("World"));

/**
 * TODO:
 * Call the function 'sayHello' and pass your name as a string literal argument.
 * Store the result of the function call in a variable named 'helloMessage'.
 *
 * console.log 'helloMessage' to check your work
 */

let helloMessage = sayHello("Steph");
console.log(helloMessage);

/**
 * TODO:
 * Store your name as a string in a variable named 'myName', and pass that
 * variable to the 'sayHello' function. You should see the same output in the
 * console.
 */

let myName = "Lucy";

console.log(sayHello(myName));


// Don't modify the following line, it generates a random number between 1 and 3
// and stores it in a variable named random

let random = Math.floor((Math.random() * 3) + 1);

/**
 * TODO:
 * Create a function called 'isTwo' that takes a number as a parameter.
 * The function should return a boolean value based on whether or not the passed
 * number is the number 2.
 *
 * Example
 * > isTwo(1) // returns false
 * > isTwo(2) // returns true
 * > isTwo(3) // returns false
 */

 const isTwo = (number) => {
     if(number === 2) {
         return true
     } else {
         return false;
     }
}

console.log(isTwo(2));
console.log(isTwo(1));
console.log(isTwo(3));


/* Call the function 'isTwo' passing the variable 'random' as a argument.
*
* console.log *outside of the function* to check your work (you should see a
* different result everytime you refresh the page if you are using the random
* number)
*/

console.log(isTwo(random));

/**
 * TODO:
 * Create a function named 'calculateTip' to calculate a tip on a bill at a
 * restaurant. The function should accept a tip percentage and the total of the
 * bill, and return the amount to tip
 *
 * Examples:
 * > calculateTip(0.20, 20) // returns 4
 * > calculateTip(0.25, 25.50) // returns 6.375
 * > calculateTip(0.15, 33.42) // returns 5.013
 */

const calculateTip = (percentTip, totalBill) => {
    let percentToDecimal = percentTip / 100;
    return totalBill * percentToDecimal;
}

console.log(calculateTip(20, 20));
console.log(calculateTip(25, 25.50));
console.log(calculateTip(15, 33.42));

/**
 * TODO:
 * Use prompt and alert in combination with your calculateTip function to
 * prompt the user for the bill total and a percentage they would like to tip,
 * then display the dollar amount they should tip
 */

const totalBill = prompt("What is the total of your bill?");
const percentTip = prompt("Tip percentage desired to leave for your server?");

const calculateTipAgain = (percentTip, totalBill) => {

    let percentToDecimal = percentTip / 100;
    let tipAmount = totalBill * percentToDecimal;
    alert(`Bill total: $${totalBill}. Tip: ${percentTip}% = $${tipAmount}.`);
}

calculateTipAgain(percentTip, totalBill);

/**
 * TODO:
 * Create a function named `applyDiscount`. This function should accept a price
 * (before a discount is applied), and a discount percentage (a number between 0
 * and 1). It should return the result of applying the discount to the original
 * price.
 *
 * Example:
 * > var originalPrice = 100;
 * > var discountPercent = .2; // 20%
 * > applyDiscount(originalPrice, discountPercent) // 80
 *
 * > applyDiscount(45.99, 0.12) // 40.4712
 */

const applyDiscount = (price, discount) => {
    let newPrice = Math.floor(price - (price * discount));
    console.log(`$${price} x ${discount} (%) = $${newPrice}`);
}

console.log(applyDiscount(100, 0.20));
console.log(applyDiscount(20, 0.20));
console.log(applyDiscount(25.50, 0.25));
console.log(applyDiscount(33.42, 0.15));