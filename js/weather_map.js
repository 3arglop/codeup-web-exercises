"use strict";

console.log("Hello from Weather Map JS 😜");

//TODO: CALLING THE DOM
const displayCityName = $('#cityName');
const displayCoords = $('#showCoords');
const displayForecast = document.getElementById('showForecast');


//TODO: FETCHING OPEN WEATHER DATA BY CALLING THE API
const fetchWeatherData = (cityName) => {
    const openWeatherKey = OPEN_WEATHER;
    const URL = `https://api.openweathermap.org/data/2.5/forecast/?q=${cityName}&units=imperial&cnt=40&appid=${openWeatherKey}`

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
            // console.table(data);

            //TODO: CONVERTING OPEN WEATHER'S DATA INTO MY OWN DATABASE
            const weatherData = data;
            const newData = myDataBase(weatherData);

            console.log(newData);
            // console.table(newData);

            //TODO: RUNNING MY FUNCTIONS TO RENDER DYNAMIC HTML BASED ON THE USERS INPUT
            renderCityCountry(newData);
            renderCoords(newData);
            placeMarkerAndPopup(newData, MAPBOX_TOKEN, map);
            // renderAllForecastCards(newData);

            // console.log(newData.time);
            // console.log(Object.keys(newData));
            // console.log(Object.values(newData));
            // const dataEntries = Object.entries(newData);

        });
}

//TODO: FUNCTION TO CONVERT AN ARRAY INTO A STRING

// function iterateThruData(data) {
//     let value;
//     let eachDataInfo;
//     const newArr = [];
//     for(let items of Object.entries(data)) {
//         // for(let i = 0; value.length; i++) {
//         //     eachDataInfo = value[i];
//         //     console.log(eachDataInfo);
//         // }
//     }
//     // console.log(eachDataInfo);
//
//     console.log(value);
//
//     // newArr.push(value);
//     //
//     // console.log(newArr);
//     // console.log(newArr.length);
//     //
//     // return newArr;
// }


//TODO: FUNCTION TO EXTRACT DATA

function myDataBase(weatherData) {

    //TODO: CREATING MY NEW DATABASE
    const fiveDayForecast = {};

    //TODO: USING THE MAP METHOD TO EXTRACT THE DATA
    fiveDayForecast.cityName = weatherData.city.name;
    fiveDayForecast.countryName = weatherData.city.country;
    fiveDayForecast.coordinates = weatherData.city.coord;

    fiveDayForecast.time = weatherData.list.map(time => time.dt_txt);
    fiveDayForecast.temperature = weatherData.list.map(temp => temp.main.temp);
    fiveDayForecast.min = weatherData.list.map(minTemp => minTemp.main.temp_min);
    fiveDayForecast.max = weatherData.list.map(maxTemp => maxTemp.main.temp_max);

    const weatherInfo = weatherData.list.map(weather => weather.weather);
    fiveDayForecast.description = weatherInfo.map(single => {
        for(let i = 0; i < single.length; i++) {
            const eachDescription = single[i].description;
            return eachDescription;
        }
    });
    fiveDayForecast.icon = weatherInfo.map(single => {
        for(let i = 0; i < single.length; i++) {
            const eachIcon = single[i].icon;
            return eachIcon;
        }
    });

    fiveDayForecast.speed = weatherData.list.map(speed => speed.wind.speed);
    fiveDayForecast.pressure = weatherData.list.map(pressure => pressure.main.pressure);
    fiveDayForecast.humidity = weatherData.list.map(humidity => humidity.main.humidity);

    // console.log(fiveDayForecast);
    // console.log(typeof fiveDayForecast);

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


// fetchWeatherData("london");
fetchWeatherData("mexico city");
// fetchWeatherData("dallas");