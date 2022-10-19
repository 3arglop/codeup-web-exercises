(function() {
    "use strict";

    console.log("HELLO FROM CIRCLE.JS");

    // create a circle object
    const circle = {
        radius: 5,

        getArea: function () {
            let area = Math.PI * Math.pow(this.radius, 2);
            return area;
        },

        logInfo: function(doRounding) {
            // If doRounding is true, round the result to the nearest integer.
            // Otherwise, output the complete value
            if(doRounding === true) {
                let rounding = Math.ceil(this.getArea());
                console.log(`Area of a circle with radius: ${this.radius} is: ${rounding}`);
            }
            console.log(`Area of circle with radius: ${this.radius} is: ${this.getArea()}`)
        }
    };

    // log info about the circle
    console.log("Raw circle information");
    circle.logInfo(false);
    console.log("Circle information rounded to the nearest whole number");
    circle.logInfo(true);

    console.log("=======================================================");
    // TODO: Change the radius of the circle to 5.

    // log info about the circle
    console.log("Raw circle information");
    circle.logInfo(false);
    console.log("Circle information rounded to the nearest whole number");
    circle.logInfo(true);
})();