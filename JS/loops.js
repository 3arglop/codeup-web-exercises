"use strict";

console.log("Hello from loops.js");


//TODO: Create a variable called num that is equal to 0. Write a while loop that increments "num" by 5 so long as num is less than 100. Do the same thing with a do-while.

//WHILE-DO
let num = 0;

while(num < 100) {
    console.log(`Number: ${num}`);
    num += 5;
}

console.log("Break out of loop!");


//DO-WHILE
let num2 = 0;

do {
    num2 += 5;
    console.log(`Number 2: ${num2}`);
} while (num2 < 100);

console.log("BREAK THE LOOP!");


//FOR LOOPS WITH DYNAMIC HTML
const renderLoop = () => {
    let html = '';
    for (let i = 0; i < 100; i += 5) {
        html += `<p>Number: ${i}</p>`;
        console.log(html);
    }
    $('#loopBody').html("<h4>for(let i = 0; i < 100; i += 5)</h4>" + html);
}

renderLoop();

//EXERCISES

//TODO: Create a function named showMultiplicationTable that accepts a number and console.logs the multiplication table for that number (just multiply by the numbers 1 through 10)

const showMultiplicationTable = (number) => {
    let i = 0;
    while(i <= 10) {
        let result = number * i;
        console.log(`${number} x ${i} = ${result}`);
        i++;
    }
}
showMultiplicationTable(10);
showMultiplicationTable(7);
showMultiplicationTable(2);


//DYNAMIC HTML
const renderTable = (number) => {
    let innerHTML = '';
    for (let i = 0; i < 10; i ++) {
        let result = number * i;
        innerHTML += `<p>${number} x ${i} = ${result}</p>`
        console.log(innerHTML);
    }
    $('#tableBody').html(`<h4>Multiplication Table for ${number}</h4>` + innerHTML);
}

renderTable(2);

//TODO: Use a for loop and the code from the previous lessons to generate 10 random numbers between 20 and 200 and output to the console whether each number is odd or even.

    for(let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * (200 - 20) + 20);
        console.log(randomNumber);

        if(randomNumber % 2 == 0) {
            console.log(`${randomNumber} is EVEN!`);
        } else {
            console.log(`${randomNumber} is ODD!`);
        }
    }

//TODO: Create a for loop that uses console.log to create the output shown below.
// 1
// 22
// 333
// 4444
// 55555
// 666666
// 7777777
// 88888888
// 999999999


//DYNAMIC HTML
const renderPyramid = () => {
    let newHTML = '';
    let x = 10;
    for (let i = 0; i < x; i ++) {
        for (let j = 0; j < i; j++) {
            newHTML += `${i}`;
            console.log(newHTML);
        }
        newHTML += "<br>"
    }
    $('#pyramidBody').html(newHTML);
}

renderPyramid();

//TODO: Create a for loop that uses console.log to create the output shown below.
// 100
// 95
// 90
// 85
// 80
// 75
// 70
// 65
// 60
// 55
// 50
// 45
// 40
// 35
// 30
// 25
// 20
// 15
// 10
// 5

const backwardsLoop = () => {
    for(let i = 100; i >= 5; i -=5) {
        console.log(i);
    }
}

backwardsLoop();