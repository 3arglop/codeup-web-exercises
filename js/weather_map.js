"use strict";

console.log("Hello from Weather Map JS 😜");

//TODO: CALLING THE DOM
const displayCityName = $('#cityName');
const displayCoords = $('#showCoords');
const displayForecast = document.getElementById('showForecast');
const userInput = document.getElementById("userInput");
const submit = document.getElementById('btn');


//TODO: FETCHING OPEN WEATHER DATA BY CALLING THE API
const fetchWeatherData = () => {
    let cityInput = userInput.value;
    const openWeatherKey = OPEN_WEATHER;
    const URL = `https://api.openweathermap.org/data/2.5/forecast/?q=${cityInput}&units=imperial&cnt=40&appid=${openWeatherKey}`

    fetch(URL)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.table(data);

            //TODO: CONVERTING OPEN WEATHER'S DATA INTO MY OWN DATABASE
            const weatherData = data;
            const newData = myDataBase(weatherData);

            console.log(newData);


            //TODO: RUNNING MY FUNCTIONS TO RENDER DYNAMIC HTML BASED ON THE USERS INPUT
            renderCityCountry(newData);
            renderCoords(newData);
            placeMarkerAndPopup(newData, MAPBOX_TOKEN, map);
            // renderAllForecastCards(newData);

            return newData;

        });
}

//TODO: FUNCTION TO GROUP EACH DAY INTO ONE ARRAY BASED ON FIVE DAYS
function iterateThruData(data) {

    //TODO: DECLARING MY VARIABLES
    let j = data.length,  //TODO: COMING FROM FUNC: myDataBase & var: oneObjOfData = 40 (LENGTH)
        day = [],
        chunk = 8,
        subset;

    //TODO: 5 DAYS = 40HRS OF DATA
    //TODO: ONE DAY = 8HRS OF DATA
    //TODO: EACH SET OF DATA WILL CONTAIN 8 ARRAYS
    for(let i = 0; i < j; i += chunk) {
        subset = data.slice(i, i + chunk);
        day.push(subset);
    }

    return day;
}

//TODO: THE FOLLOWING FUNCTIONS TARGETS EACH VALUE AND EXTRACTS INTO 1 ARRAY OF 5 ARRAYS (PER DAY) WITH 8 VALUES (HOURLY)
const everyDescData = (data) => {
    let obj,
        weatherObjs,
        weatherStamp,
        descData = []

    const daysData = data.days;

    for(let i in daysData) {
        obj = daysData[i];

        weatherStamp = obj.map(each => each.weather);

        for (let i = 0; i < weatherStamp.length; i++) {
            weatherObjs = weatherStamp[i][0];

            const {description} = weatherObjs;

            descData.push(description);
        }
    }
    return descData;
}

const everyIconData = (data) => {
    let obj,
        weatherObjs,
        weatherStamp,
        iconData = []

    const daysData = data.days;

    for(let i in daysData) {
        obj = daysData[i];

        weatherStamp = obj.map(each => each.weather);

        for (let i = 0; i < weatherStamp.length; i++) {
            weatherObjs = weatherStamp[i][0];

            const { icon } = weatherObjs;

            iconData.push(icon);
        }
    }
    return iconData;
}

//TODO: FINDS THE AVERAGE OF EACH DAY AND RETURNS AN ARRAY NUMBERS
const averageEachMainData = (data) => {
    let obj,
        mainData = {},
        temp = [],
        max = [],
        min = [],
        humidityAverage = [],
        pressureAverage = []

    const daysData = data.days;
    // console.log(daysData);

    for(let i in daysData) {
        obj = daysData[i];

        let averageTemp = obj.reduce((total, next) => total + next.main.temp, 0) / obj.length;
        temp.push(Math.floor(averageTemp));

        let averageMax = obj.reduce((total, next) => total + next.main.temp_max, 0) / obj.length;
        max.push(Math.floor(averageMax));

        let averageMin = obj.reduce((total, next) => total + next.main.temp_min, 0) / obj.length;
        min.push(Math.floor(averageMin));

        let averageHumidity = obj.reduce((total, next) => total + next.main.humidity, 0) / obj.length;
        humidityAverage.push(Math.floor(averageHumidity));

        let averagePressure = obj.reduce((total, next) => total + next.main.pressure, 0) / obj.length;
        pressureAverage.push(Math.floor(averagePressure));

    }

    mainData = {
        temperature: temp,
        maxTemp: max,
        minTemp: min,
        humidity: humidityAverage,
        pressure: pressureAverage
    }

    return mainData
}

const averageEachSpeed = (data) => {
    let obj,
        average,
        arr = [];

    const daysData = data.days;

    for(let i in daysData) {
        obj = daysData[i];

        average = obj.reduce((total, next) => total + next.wind.speed, 0) / obj.length;

        arr.push(parseInt((average).toFixed(2)));
    }
    return arr
}


//TODO: FUNCTION TO EXTRACT DATA
function myDataBase(weatherData) {

    //TODO: CREATING MY NEW DATABASE
    const fiveDayForecast = {};

    const oneObjOfData = weatherData.list.map(each => each);

    // console.log(oneObjOfData.length); //40

    const oneDayData = iterateThruData(oneObjOfData);

    //TODO: USING THE MAP METHOD TO EXTRACT THE DATA
    fiveDayForecast.cityName = weatherData.city.name;
    fiveDayForecast.countryName = weatherData.city.country;
    fiveDayForecast.coordinates = weatherData.city.coord;
    fiveDayForecast.days = oneDayData;

    console.log(fiveDayForecast);
    console.table(fiveDayForecast);

    //TODO: CREATING AN OBJECT: fiveDayForecast.days & PROPERTIES WITH THE FOLLOWING VALUES:
    const averageMain = averageEachMainData(fiveDayForecast);

    const averageSpeed = averageEachSpeed(fiveDayForecast);



    const resultDesc = everyDescData(fiveDayForecast);
    console.log(resultDesc);
    const eachDayDesc = iterateThruData(resultDesc);
    console.log(eachDayDesc);


    const resultIcon = everyIconData(fiveDayForecast);
    console.log(resultIcon);
    const eachDayIcon = iterateThruData(resultIcon);
    console.log(eachDayIcon);




    fiveDayForecast.days.mainData = averageMain;
    fiveDayForecast.days.speed = averageSpeed;
    fiveDayForecast.days.icon = eachDayIcon;
    fiveDayForecast.days.description = eachDayDesc;

    console.log(fiveDayForecast);
    console.table(fiveDayForecast);

    return fiveDayForecast;
}


//TODO: CALLING THE MAPBOX API AND RENDERING MAP INTO MY HTML
mapboxgl.accessToken = MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-95.7129, 37.0902], // starting position [lng, lat]
    zoom: 0.5, // starting zoom'
    projection: 'mercator'
});
map.on('style.load', () => {
    map.setFog({});
});
map.addControl(new mapboxgl.NavigationControl());


//TODO: CREATING MARKER AND POPUP TO SIGNAL WHERE THE USER IS AT IN THE MAP
const placeMarkerAndPopup = (data, token, map) => {
    geocode(data.cityName, MAPBOX_TOKEN).then((coordinates) => {
        // console.log(coordinates);
        let popup = new mapboxgl.Popup()
            .setHTML(`<h5 class="px-3 my-2">${data.cityName},<br> ${data.countryName}</h5>`);
        let marker = new mapboxgl.Marker({
            color: "gold",
            draggable: false
        })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map);
    });
}

//TODO: THIS FUNCTION WILL RENDER THE CITY INFORMATION
const renderCityCountry = (data) => {
    let html = "";
    html = `<h4>${data.cityName}, ${data.countryName}</h4>`;

    return displayCityName.html(html);
}

//TODO: THIS FUNCTION WILL RENDER THE COORDINATES
const renderCoords = (data) => {
    let html = "";
    html = `<h5>Longitude:
            <br>
            <span id="currentLng">${data.coordinates.lon}</span>
            </h5>
            <h5>Latitude:
            <br>
            <span id="currentLat">${data.coordinates.lat}</span>
            </h5>
            </div>`;

    return displayCoords.html(html);
}

//TODO: CREATING THE DYNAMIC HTML FOR MY CARD (SINGLE)

// function renderAllForecastCards(data) {
//     for(let i = 0; i < data.length; i++) {
//         html += `<p>${data.days[i]}</p>`
//         console.log(html);
//     }
//
//
//     return html;
//     console.log(html);
//     return displayForecast.innerHTML = html;
// }

//TODO: THIS FUNCTION WILL RENDER ALL 5 CARDS FOR EACH DAY USING MY NEW DATABASE

// const renderAllForecastCards = (fiveForecast) => {
//     let html = '';
//     for(let i = 0; i <  fiveForecast.length; i++) {
//         if(fiveForecast[i] === 0 && fiveForecast[i] === 5) {
//             return html += renderForecastCard(fiveForecast[i]);
//         }
//     }
//     displayForecast.html(html);
// }


//TODO: ADDING EVENT LISTENERS
submit.addEventListener("click", (e) => fetchWeatherData());



//*****************************************************************************************//

//TODO: UN-USED FUNCTIONS

// for (let i in data) {
//     if(i < 8) {
//         console.log(data[i]);
//     }
// }
// // console.log(day);
// return day;

// for(let i = 0; i < data.length; i++) {
//     if(i % 2 === 0) {
//         day.push(data[i])
//     }
// }

// const result = Object.entries(object).map(data => {
//     return {
//         'id': data[0],
//         'value': data[1]
//     }
// })


// let result: any = [];
//       this.listOfItems.forEach(p => {
//         var key = p.group;
//         result[key] = result[key] || [];
//         result[key].push(p);
//       })

// for (let i in oneObjOfData) {
//     let obj = oneObjOfData[i];
//     console.log(obj);
// }

// oneObjOfData.forEach(function(oneSet){
//     if(oneSet % 2 === 0) {
//         return oneSet;
//     }
//     fiveDayForecast.day = oneSet;
// });

// function rename(data) {
//     const arr = [];
//
//     const { 0: dayOne } = data.days;
//     let objOne = { dayOne };
//
//     const { 1: dayTwo } = data.days;
//     let objTwo = { dayTwo };
//
//     const { 2: dayThree } = data.days;
//     let objThree = { dayThree };
//
//     const { 3: dayFour } = data.days;
//     let objFour = { dayFour };
//
//     const { 4: dayFive } = data.days;
//     let objFive = { dayFive };
//
//     arr.push(objOne, objTwo, objThree, objFour, objFive);
//
//     return arr;
// }

// for(let i in daysData) {
//     obj = daysData[i];
//     console.log(obj);
//
//
//     average = daysData.reduce((total, next) => total + next, 0) / daysData.length;
//
//     console.log(average);
//
// }

// const females = people.filter(person => person.gender === 'female');

// const average = females.reduce((total, next) => total + next.age, 0) / females.length;

// <div className="card" style="width: 18rem;">
//     <div className="card-body text-center">
//         <h6 className="card-subtitle mb-2 text-muted">${oneDayForecast[i].time[i]}</h6>
//         <h5 className="card-title">${oneDayForecast.temperature[i]}</h5>
//         <div>
//             <span id="min">${oneDayForecast[i].max[i]}</span>
//             <span id="max">${oneDayForecast[i].min[i]}</span>
//         </div>
//         <img src="IMG/codeup-logo.png" alt="" width="95px" height="80px">
//             <div className="card-header">
//                 <span>${oneDayForecast[i].description[i]}</span>
//             </div>
//             <ul className="list-group list-group-flush">
//                 <li className="list-group-item">Wind Speed: ${oneDayForecast[i].speed[i]} mph</li>
//                 <li className="list-group-item">Pressure: ${oneDayForecast[i].pressure[i]} inHg</li>
//                 <li className="list-group-item">Humidity: ${oneDayForecast[i].humidity[i]}%</li>
//             </ul>
// {/*    </div>*/}
// {/*</div>*/}


// const averageEachMax = (data) => {
//     let obj,
//         average,
//         arr = [];
//
//     const daysData = data.days;
//     // console.log(daysData);
//
//     for(let i in daysData) {
//         obj = daysData[i];
//         // console.log(obj);
//
//         average = obj.reduce((total, next) => total + next.main.temp_max, 0) / obj.length;
//         // console.log(Math.floor(average));
//
//         arr.push(Math.floor(average));
//     }
//     return arr
// }
//
// const averageEachMin = (data) => {
//     let obj,
//         average,
//         arr = [];
//
//     const daysData = data.days;
//     // console.log(daysData);
//
//     for(let i in daysData) {
//         obj = daysData[i];
//         // console.log(obj);
//
//         average = obj.reduce((total, next) => total + next.main.temp_min, 0) / obj.length;
//         // console.log(Math.floor(average));
//
//         arr.push(Math.floor(average));
//     }
//     return arr
// }
//
// const averageEachHumidity = (data) => {
//     let obj,
//         average,
//         arr = [];
//
//     const daysData = data.days;
//     // console.log(daysData);
//
//     for(let i in daysData) {
//         obj = daysData[i];
//         // console.log(obj);
//
//         average = obj.reduce((total, next) => total + next.main.humidity, 0) / obj.length;
//         // console.log(Math.floor(average));
//
//         arr.push(Math.floor(average));
//     }
//     return arr
// }
//
// const averageEachPressure = (data) => {
//     let obj,
//         average,
//         arr = [];
//
//     const daysData = data.days;
//     // console.log(daysData);
//
//     for(let i in daysData) {
//         obj = daysData[i];
//         // console.log(obj);
//
//         average = obj.reduce((total, next) => total + next.main.pressure, 0) / obj.length;
//         // console.log(Math.floor(average));
//
//         arr.push(Math.floor(average));
//     }
//     return arr
// }

