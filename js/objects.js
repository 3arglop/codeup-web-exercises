(function() {
    "use strict";

    /**
     * TODO:
     * Create an object with firstName and lastName properties that are strings
     * with your first and last name. Store this object in a variable named
     * `person`.
     *
     * Example:
     *  > console.log(person.firstName) // "Rick"
     *  > console.log(person.lastName) // "Sanchez"
     */

    const person = {
        firstName: "Captain",
        lastName: "America",
        message: {
            sayHola: function () {
                return `Hola from ${person.firstName} ${person.lastName}`;
            },
            sayAdios: function () {
                return `Adios from ${person.firstName} ${person.lastName}`;
            }
        }

    };

    console.log(person.firstName);
    console.log(person.lastName);
    console.log(person.message.sayHola());
    console.log(person.message.sayAdios());


    /**
     * TODO:
     * Add a sayHello method to the person object that returns a greeting using
     * the firstName and lastName properties.
     * console.log the returned message to check your work
     *
     * Example
     * > console.log(person.sayHello()) // "Hello from Rick Sanchez!"
     */


    person.sayMessage = function() {
        return `Dude, it's ${person.firstName} ${person.lastName}! Get my camera!!`;
    }

    console.log(person.sayMessage());


    function sayHello(name) {
        console.log(`Hello from ${name.firstName} ${name.lastName}!`);
    }

    sayHello(person);


    /** TODO:
     * HEB has an offer for the shoppers that buy products amounting to
     * more than $200. If a shopper spends more than $200, they get a 12%
     * discount. Write a JS program, using conditionals, that logs to the
     * browser, how much Ryan, Cameron and George need to pay. We know that
     * Cameron bought $180, Ryan $250 and George $320. Your program will have to
     * display a line with the name of the person, the amount before the
     * discount, the discount, if any, and the amount after the discount.
     *
     * Uncomment the lines below to create an array of objects where each object
     * represents one shopper. Use a foreach loop to iterate through the array,
     * and console.log the relevant messages for each person
     */

    const shoppers = [
        {name: 'Cameron', amount: 180},
        {name: 'Ryan', amount: 250},
        {name: 'George', amount: 320}
    ];

    console.log(shoppers);
    console.log(shoppers[0]);
    console.log(shoppers[1]);
    console.log(shoppers[2]);


    //IF x >= $200 -> 12% OFF ELSE NO DISCOUNT
    //RYAN $250
    //CAMERON $180
    //GEORGE $320
    //RETURN NAME OF PERSON, AMOUNT BEFORE, DISCOUNT (.12), AMOUNT AFTER


    shoppers.forEach(function(person) {
        if(person.amount >= 200) {
            let amountAfterDiscount = person.amount - (person.amount * 0.12);
                console.log(`Hello ${person.name}, you spent more than $200! WOO! Your total is: $${person.amount}. A 12% discount has been applied to your purchase. Your new total is $${amountAfterDiscount}!`);
        } else {
            console.log(`Hello, ${person.name}. Your total is $${person.amount}.`);
        }
    });

    /** TODO:
     * Create an array of objects that represent books and store it in a
     * variable named `books`. Each object should have a title and an author
     * property. The author property should be an object with properties
     * `firstName` and `lastName`. Be creative and add at least 5 books to the
     * array
     *
     * Example:
     * > console.log(books[0].title) // "The Salmon of Doubt"
     * > console.log(books[0].author.firstName) // "Douglas"
     * > console.log(books[0].author.lastName) // "Adams"
     */

    const books = [
        {
            title: "Love You Forever",
            author: {
                firstName: "Robert",
                lastName: "Munsch",
            }
        },
        {
            title: "The Very Hungry Caterpillar",
            author: {
                firstName: "Eric",
                lastName: "Carle",
            }
        },
        {
            title: "Goodnight Moon",
            author: {
                firstName: "Margaret",
                lastName: "Brown",
            }
        },
        {
            title: "The Snowy Day",
            author: {
                firstName: "Ezra",
                lastName: "Keats",
            }
        },
        {
            title: "Chicka Chicka Boom Boom",
            author: {
                firstName: "Bill",
                lastName: "Martin",
            }
        }
    ]

    console.log(books);
    console.table(books);
    console.log(books[0]);
    console.log(books[4]);


    /**
     * TODO:
     * Loop through the books array and output the following information about
     * each book:
     * - the book number (use the index of the book in the array)
     * - the book title
     * - author's full name (first name + last name)
     *
     * Example Console Output:
     *
     *      Book # 1
     *      Title: The Salmon of Doubt
     *      Author: Douglas Adams
     *      ---
     *      Book # 2
     *      Title: Walkaway
     *      Author: Cory Doctorow
     *      ---
     *      Book # 3
     *      Title: A Brief History of Time
     *      Author: Stephen Hawking
     *      ---
     *      ...
     *
     */

    books.forEach(function(book) {
        console.log(`Book #${books.indexOf(book) + 1}. Title: ${book.title}. Author: ${book.author.firstName} ${book.author.lastName}`);
    });


    //DYNAMIC HTML
    const renderBookData = (data) => {
        let html = '';
        for(let i = 0; i < data.length; i++) {
            html += `<p>Book #${i+1}</p>
                    <h3>Title: ${data[i].title}</h3>
                    <p>Author: ${data[i].author.firstName} ${data[i].author.lastName}</p>
                    <span>********************<span>`
        }
        $('#booksBody').html(html);
    }

    renderBookData(books);

    /**
     * Bonus:
     * - Create a function named `createBook` that accepts a title and author
     *   name and returns a book object with the properties described
     *   previously. Refactor your code that creates the books array to instead
     *   use your function.
     * - Create a function named `showBookInfo` that accepts a book object and
     *   outputs the information described above. Refactor your loop to use your
     *   `showBookInfo` function.
     */

    const trialBookTitle = ("Charlotte's Web");
    const trialBookAuthor = ("E.B. White")


    const createBook = (title, author) => {
        author = author.split(" ");
        let newBook = {
            title: title,
            author: {
                firstName: author[0],
                lastName: author[1]
            }
        }
        return newBook;
    }

    // console.log(createBook(trialBookTitle, trialBookAuthor));

    //TRIAL ONE
    books.push(createBook(trialBookTitle, trialBookAuthor));
    // console.log(books);
    // console.table(books);
    renderBookData(books);

    //TRIAL TWO
    books.push(createBook("All by Myself", "Mercer Mayer"));
    renderBookData(books);

    //TRIAL THREE
    books.push(createBook("Don't Let the Pigeon Drive the Bus!", "Mo Williams"));
    renderBookData(books);

    //TRIAL FOUR
    const treeBook = {
        title: "The Giving Tree",
        author: {
            firstName: "Shef",
            lastName: "Silverstein"
        }
    }

    books.push(treeBook);
    renderBookData(books);


})();