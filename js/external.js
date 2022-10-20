"use strict";

console.log("Hello from EXTERNAL JS, woooo!");

alert("Welcome to my Website!");

let userColor = prompt("What is your favorite color?");

alert(`Cool, ${userColor} is my favorite color too!`);

//TODO: Write some JavaScript code, that is, variables and operators, to describe the following scenarios. Do not worry about the real operations to get the values, the goal of these exercises is to understand how real world conditions can be represented with code.

//TODO: You have rented some movies for your kids: The little mermaid (for 3 days), Brother Bear (for 5 days, they love it), and Hercules (1 day, you don't know yet if they're going to like it). If price for a movie per day is $3, how much will you have to pay?

alert("Ready to checkout?");

const littleMermaid = parseInt(prompt("Renting: The Little Mermaid. How many days?"));
const brotherBear = parseInt(prompt("Renting: Brother Bear. How many days?"));
const hercules = parseInt(prompt("Renting: Hercules. How many days?"));

let movieTotal = (littleMermaid * 3) + (brotherBear * 3) + (hercules * 3);

alert(`Movie per day: $3.00. Your total is $${movieTotal}.`);

//TODO: Suppose you're working as a contractor for 3 companies: Google, Amazon and Facebook, they pay you a different rate per hour. Google pays $400, Amazon $380, and Facebook $350. How much will you receive in payment for this week? You worked 10 hours for Facebook, 6 hours for Google and 4 hours for Amazon.

const google = parseInt(prompt("How many hours did you work for Google?"));
const amazon = parseInt(prompt("How many hours did you work for Amazon?"));
const facebook = parseInt(prompt("How many hours did you work for Facebook?"));

let googleHourly = google * 400;
let amazonHourly = amazon * 380;
let faceHourly = facebook * 350;

let totalPaycheck = googleHourly + amazonHourly + faceHourly;

alert(`Great. You earned $${googleHourly} @ Google. You earned $${amazonHourly} @ Amazon. You earned $${faceHourly} @ Facebook. Your next paycheck will be $${totalPaycheck}.`);

//TODO: A student can be enrolled in a class only if the class is not full and the class schedule does not conflict with her current schedule.

let isClassFull = confirm("Is this class fully enrolled?");
console.log(isClassFull);
let isUserScheduleFull = confirm("Will this class conflict with your schedule?");
console.log(isUserScheduleFull);

if(!isClassFull && !isUserScheduleFull) {
    alert("Class added to your schedule!");
} else {
    alert("Sorry, you cannot enroll to this class. Try again next semester.");
}

//TODO:A product offer can be applied only if a person buys more than 2 items, and the offer has not expired. Premium members do not need to buy a specific amount of products.

let isUserPremium = confirm("Are you a premium member?");
console.log(isUserPremium);


if(!isUserPremium) {
    alert("Minimum items for this offer: 2");
    let isOfferExpired = confirm("Has the offer expired?");

    if(isOfferExpired === false) {
        alert("Offer has been applied!");
    } else {
        alert("Sorry, this offer has expired :(");
    }
} else {
    alert("Hello, Premium member!");
    let isOfferExpired = confirm("Has the offer expired?");

    if(isOfferExpired === false) {
        alert("Offer has been applied!");
    } else {
        alert("Sorry, this offer has expired :(");
    }
}