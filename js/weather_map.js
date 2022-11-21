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
    let j = data.length, //TODO: COMING FROM FUNC: myDataBase & var: oneObjOfData = 40                         (LENGTH)
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


//TODO: FUNCTION TO EXTRACT DATA
function myDataBase(weatherData) {

    //TODO: CREATING MY NEW DATABASE
    const fiveDayForecast = {};

    const oneObjOfData = weatherData.list.map(each => each);
    console.log(oneObjOfData);

    console.log(oneObjOfData.length); //40

    const oneDayData = iterateThruData(oneObjOfData);
    console.log(oneDayData);


    //TODO: USING THE MAP METHOD TO EXTRACT THE DATA
    fiveDayForecast.cityName = weatherData.city.name;
    fiveDayForecast.countryName = weatherData.city.country;
    fiveDayForecast.coordinates = weatherData.city.coord;
    fiveDayForecast.days = oneDayData;

    console.table(fiveDayForecast);
    console.log(Object.keys(fiveDayForecast));
    return fiveDayForecast;
}


//TODO: CALLING THE MAPBOX API AND RENDERING MAP INTO MY HTML
mapboxgl.accessToken = MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-95.7129, 37.0902], // starting position [lng, lat]
    zoom: 2, // starting zoom'
    projection: 'mercator'
});
map.on('style.load', () => {
    map.setFog({});
});
map.addControl(new mapboxgl.NavigationControl());


//TODO: CREATING MARKER AND POPUP TO SIGNAL WHERE THE USER IS AT IN THE MAP
const placeMarkerAndPopup = (data, token, map) => {
    geocode(data.cityName, MAPBOX_TOKEN).then((coordinates) => {
        console.log(coordinates);
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

// function renderAllForecastCards(oneDayForecast) {
//     let html = "";
//
//     for(let i = 0; i < oneDayForecast.length; i+8) {
//         console.log(oneDayForecast.time[i]);
//         html += `<div class="card" style="width: 18rem;">
//                 <div class="card-body text-center">
//                     <h6 class="card-subtitle mb-2 text-muted">${oneDayForecast[i].time[i]}</h6>
//                     <h5 class="card-title">${oneDayForecast.temperature[i]}</h5>
//                     <div>
//                         <span id="min">${oneDayForecast[i].max[i]}</span>
//                         <span id="max">${oneDayForecast[i].min[i]}</span>
//                     </div>
//                     <img src="IMG/codeup-logo.png" alt="" width="95px" height="80px">
//                     <div class="card-header">
//                         <span>${oneDayForecast[i].description[i]}</span>
//                     </div>
//                     <ul class="list-group list-group-flush">
//                         <li class="list-group-item">Wind Speed: ${oneDayForecast[i].speed[i]} mph</li>
//                         <li class="list-group-item">Pressure: ${oneDayForecast[i].pressure[i]} inHg</li>
//                         <li class="list-group-item">Humidity: ${oneDayForecast[i].humidity[i]}%</li>
//                     </ul>
//                 </div>
//             </div>`
//     }
//
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



//*******************************************************************************************************//

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

//TODO: THIS GIVES ME 5 DAYS!
// for(let i = 0; i < data.length; i += 8) {
//     day.push(data[i]);
// }
//
// return day;

