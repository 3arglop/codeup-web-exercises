"use strict";

console.log("Hello from Weather Map JS 😜");

//TODO: CALLING THE DOM
const userInput = document.getElementById("userInput");
const submit = document.getElementById('btn');
const displayCityName = $('#cityName');
const displayCoords = $('#showCoords');
const displayForecast = document.getElementById('showForecast');
const displayDayOne = $('#dayOneCard');
const displayDayTwo = $('#dayTwoCard');
const displayDayThree = $('#dayThreeCard');
const displayDayFour = $('#dayFourCard');
const displayDayFive = $('#dayFiveCard');
const displayCurrentWeather = $('#showToday');

//TODO: FETCHING OPEN WEATHER DATA BY CALLING THE API
async function getOpenWeatherData() {
    let cityInput = userInput.value;
    const openWeatherKey = OPEN_WEATHER;
    const URL = `https://api.openweathermap.org/data/2.5/forecast/?q=${cityInput}&units=imperial&cnt=40&appid=${openWeatherKey}`

    const response = await fetch(URL);

    const obj = await response.json()

    return obj;
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

            const { description } = weatherObjs;

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

const getDates = (data) => {
    let obj,
        arr = [];

    const daysData = data.days;

    for(let i in daysData) {
        obj = daysData[i];

        for(let i = 0; i < obj.length; i++) {
            arr.push(obj[i].dt_txt);
        }
    }
    return arr;
}

const everyMainData = (data) => {
    let obj,
        mainStamps,
        tempForty = [],
        maxFourty = [],
        minFourty = [],
        humidityFourty = [],
        pressureFourty = [],
        allData = []

    const daysData = data.days;

    for (let i in daysData) {
        obj = daysData[i];

        mainStamps = obj.map(each => each.main);

        for (let i = 0; i < mainStamps.length; i++) {

            const { temp, temp_max, temp_min, humidity, pressure } = mainStamps[i];

            tempForty.push(temp);
            minFourty.push(temp_min);
            maxFourty.push(temp_max);
            humidityFourty.push(humidity);
            pressureFourty.push(pressure);
        }
    }

    const tempDaily = iterateThruData(tempForty);
    const maxDaily = iterateThruData(maxFourty);
    const minDaily = iterateThruData(minFourty);
    const humidityDaily = iterateThruData(humidityFourty);
    const pressureDaily = iterateThruData(pressureFourty);

    allData.push(tempDaily, maxDaily, minDaily, humidityDaily, pressureDaily);

    return allData;

}

const getEverySpeed = (data) => {
    let obj,
        average,
        speedStamps,
        averageSpeed = [],
        everySpeed = [],
        arr = []

    const daysData = data.days;

    for(let i in daysData) {
        obj = daysData[i];

        average = obj.reduce((total, next) => total + next.wind.speed, 0) / obj.length;

        speedStamps = obj.map(item => item.wind.speed);

        averageSpeed.push(parseInt((average).toFixed(2)));
        everySpeed.push(speedStamps);
    }
    arr.push(averageSpeed, everySpeed);

    return arr
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

const datesForFiveDays = (data) => {
    let obj,
        arr = []

    for(let i in data) {
        obj = data[i];
        arr.push(obj[0]);
    }
    return arr;
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

    //TODO: CREATING AN OBJECT: fiveDayForecast.days & PROPERTIES WITH THE FOLLOWING VALUES:
    const averageMain = averageEachMainData(fiveDayForecast);
    const speedData = getEverySpeed(fiveDayForecast);

    const resultDesc = everyDescData(fiveDayForecast);
    const eachDayDesc = iterateThruData(resultDesc);

    const resultIcon = everyIconData(fiveDayForecast);
    const eachDayIcon = iterateThruData(resultIcon);

    const resultDates = getDates(fiveDayForecast);
    const eachDateForDay = iterateThruData(resultDates);
    const fiveDaysStamps = datesForFiveDays(eachDateForDay);

    const main = everyMainData(fiveDayForecast);


    fiveDayForecast.days.averageMainData = averageMain;
    fiveDayForecast.days.averageMainData.speed = speedData[0];
    fiveDayForecast.days.averageMainData.date = fiveDaysStamps;
    fiveDayForecast.days.icon = eachDayIcon;
    fiveDayForecast.days.description = eachDayDesc;
    fiveDayForecast.days.dates = eachDateForDay;
    fiveDayForecast.days.windSpeed = speedData[1];
    fiveDayForecast.days.temp = main[0];
    fiveDayForecast.days.maxTemp = main[1];
    fiveDayForecast.days.minTemp = main[2];
    fiveDayForecast.days.humidity = main[3];
    fiveDayForecast.days.pressure = main[4];

    // console.log(fiveDayForecast);
    // console.table(fiveDayForecast);

    return fiveDayForecast;
}

//TODO: CALLING THE MAPBOX API AND RENDERING MAP INTO MY HTML
mapboxgl.accessToken = MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-95.7129, 37.0902], // starting position [lng, lat]
    zoom: 1, // starting zoom'
    projection: 'mercator'
});
map.on('style.load', () => {
    map.setFog({});
});
map.addControl(new mapboxgl.NavigationControl());



//TODO: THE FOLLOWING FUNCTIONS WILL TAKE IN forecastData (PARAMETER) WHICH = newData (ARGUMENT FROM THE CLICK EVENT FUNC) AND EXTRACTING FROM MY fiveDayForecast DATABASE

//TODO: CREATING MARKER AND POPUP TO SIGNAL WHERE THE USER IS AT IN THE MAP
const placeMarkerAndPopup = (forecastData, token, map) => {
    // console.log(forecastData);
    geocode(forecastData.cityName, MAPBOX_TOKEN).then((coordinates) => {
        // console.log(coordinates);
        let popup = new mapboxgl.Popup()
            .setHTML(`<h5 class="px-3 my-2">${forecastData.cityName},<br> ${forecastData.countryName}</h5>`);
        let marker = new mapboxgl.Marker({
            color: "gold",
            draggable: false
        })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map);
    });
}

// https://docs.mapbox.com/help/tutorials/use-mapbox-js-as-fallback/

//TODO: THIS FUNCTION WILL RENDER THE CITY INFORMATION
const renderCityCountry = (forecastData) => {
    // console.log(data);
    let html = "";
    html = `<h4 class="fst-light fs-1">${forecastData.cityName}, ${forecastData.countryName}</h4>`;

    return displayCityName.html(html);
}

const renderCurrentWeather = (forecastData) => {
    // console.log(forecastData);
    let html = "";
    html = `<div class="card w-75 border border-3 border-dark" style="width: 18rem;">
    <div class="card-header">
        <h5 class="text-muted">${forecastData.days.dates[0][0]}</h5>
    </div>
    <div class="card-header bg-dark text-light">
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <h1 class="card-title m-0">${Math.floor(forecastData.days.temp[0][0])}
                    <span class="position-absolute fs-3 mt-3">°F</span></h1>
                    <h6>${forecastData.days.description[0][0]}</h6>
                </div>

                <div class="col-sm">
                    <img src="http://openweathermap.org/img/wn/${forecastData.days.icon[0][0]}@2x.png" alt="" width="150px" height="150px">

                </div>

                <div class="col-sm">
                    <h2 class="card-subtitle">${Math.floor(forecastData.days[0][0].main.feels_like)}
                    <span class="position-absolute fs-3 mt-1">°F</span></h2>
                    <p>feels like</p>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body lh-1">

        <div class="container">
            <div class="row text-center">
                <div class="col-6 d-flex">
                    <div class="d-flex flex-grow-1">
                        <i class="fa-solid fa-temperature-quarter fs-5 me-1"></i>
                        <p class="fs-5">Min:</p>
                    </div>
                    <span class="fs-4">${Math.floor(forecastData.days.minTemp[0][0])}°F</span>
                </div>
                <div class="col-6 d-flex">
                    <div class="d-flex flex-grow-1">
                        <i class="fa-solid fa-temperature-full fs-5 me-1"></i>
                        <p class="fs-5">Max:</p>
                    </div>
                    <span class="fs-4">${Math.floor(forecastData.days.maxTemp[0][0])}°F</span>
                </div>
                    <div class="col-6 d-flex">
                        <div class="d-flex flex-grow-1">
                            <i class="fa-solid fa-wind fs-5 me-1"></i>
                            <p class="fs-5">Speed:</p>
                        </div>
                        <span class="fs-4">${Math.floor(forecastData.days.windSpeed[0][0])}mph</span>
                    </div>
                    <div class="col-6 d-flex">
                        <div class="d-flex flex-grow-1">
                            <i class="fa-solid fa-droplet fs-5 me-1"></i>
                            <p class="fs-5">Humidity:</p>
                        </div> 
                        <span class="fs-4">${forecastData.days.humidity[0][0]}%</span>
                    </div>
                    <div class="col-6 d-flex">
                        <div class="d-flex flex-grow-1">
                            <i class="fa-solid fa-cloud-arrow-down fs-5 me-1"></i>
                            <p class="fs-5">Pressure:</p>
                        </div>
                        <span class="fs-4">${forecastData.days.pressure[0][0]}inHg</span>
                    </div>
                    <div class="col-6 d-flex">
                        <div class="d-flex flex-grow-1">
                            <i class="fa-solid fa-eye fs-5 me-1"></i>
                            <p class="fs-5">Visibility:</p>
                        </div>
                        <span class="fs-4">${forecastData.days[0][0].visibility}m</span>
                    </div>
            </div>
        </div>
    </div>
</div>`;

    return displayCurrentWeather.html(html);
}

//TODO: THIS FUNCTION WILL RENDER THE COORDINATES
const renderCoords = (forecastData) => {
    // console.log(data);
    let html = "";
    html = `<div class="d-flex flex-column">
            <h2 class="m-0">Longitude:</h2>
            <br>
            <span id="currentLng" class="p-1 fs-3 text-light">${forecastData.coordinates.lon}</span>
            </div>

            <div class="d-flex flex-column">
            <h2 class="mt-1">Latitude:</h2>
            <br>
            <span id="currentLat" class="p-1 fs-3 text-light">${forecastData.coordinates.lat}</span>
            </div>`;

    return displayCoords.html(html);
}

//TODO: THIS FUNCTION WILL RENDER THE REST OF THE TABLE'S INFORMATION SHOWCASING ONLY THE AVERAGE DATA FROM MY DATABASE FOR FIVE DAYS ONLY
const renderAllForecastCards = (forecastData) => {

    const averageData = forecastData.days.averageMainData;

    let html = '';
    for(let i = 0; i < averageData.temperature.length; i++) {

        let dateWithHour = averageData.date[i];
        let dateOnly = dateWithHour.slice(0, 10);

        html += `<tr class="my-5">
                  <th scope="row" class="fs-5" id="dateTable">${dateOnly}</th>
                  <td class="fs-4" id="tempTable">${averageData.temperature[i]}
                  <span class="position-absolute">°F</span></td>
                  
                  <td class="fs-4" id="minTable">${averageData.minTemp[i]}
                  <span class="position-absolute">°F</span></td>
                  
                  <td class="fs-4" id="maxTable">${averageData.maxTemp[i]}
                  <span class="position-absolute">°F</span></td>
                  
                   <td class="fs-4" id="speedTable">${averageData.speed[i]}
                   <span class="position-absolute ms-1">mph</span></td>
                   
                  <td class="fs-4" id="humidityTable">${averageData.humidity[i]}
                  <span class="position-absolute">%</span></td>
                  
                  <td class="fs-4" id="pressureTable">${averageData.pressure[i]}
                  <span class="position-absolute ms-1">inHg</span></td>
                </tr>`
    }
    displayForecast.innerHTML = html;
}

//TODO: THE FOLLOWING FUNCTIONS WILL RENDER ONE DAY WORTH OF DATA INTO ITS RESPECTED SLIDE BASED ON MY HTML. TAKING THE DATA FROM MY DATABASE
const renderDayOneCard = (forecastData) => {

    const dayData = forecastData.days;

    let html = "";
    for(let i = 0; i < dayData.length; i++) {
        html += `<div class="card mx-2 text-light border border-5" style="width: 18rem;" id="cardOne">
                <div class="card-body text-center">
                <h6 class="card-subtitle mb-2 text-dark rounded-pill border border-light border-3">${dayData.dates[0][i]}</h6>
                <h5 class="card-title fs-1">${Math.floor(dayData.temp[0][i])} <span class="fs-5 position-absolute mt-2">°F</span></h5>
                 <div>
                <span class="m-1"><i class="fa-solid fa-temperature-low"></i> ${Math.floor(dayData.minTemp[0][i])}°F</span> |
                <span class="m-1"><i class="fa-solid fa-temperature-high"></i> ${Math.floor(dayData.maxTemp[0][i])}°F</span>
                </div>
                <img src="http://openweathermap.org/img/wn/${dayData.icon[0][i]}@2x.png" alt="icon" width="95px" height="80px" class="my-3">
                 <div class="card-header rounded-pill border border-3 border-dark bg-light text-dark p-0">
                <span>${dayData.description[0][i]}</span>
                </div>
                 <ul class="list-group list-group-flush text-start">
                <li class="list-group-item border-bottom border-3 d-flex">
                    <i class="fa-solid fa-wind flex-grow-1"></i>
                    <span class="fw-bold">${Math.floor(dayData.windSpeed[0][i])} mph</span>
                </li>
                <li class="list-group-item border-bottom border-3 d-flex">
                    <i class="fa-solid fa-cloud-arrow-down flex-grow-1"></i>
                    <span class="fw-bold">${dayData.pressure[0][i]} inHg</span>
                </li>
                <li class="list-group-item d-flex">
                    <i class="fa-solid fa-droplet flex-grow-1"></i>
                    <span class="fw-bold">${dayData.humidity[0][i]}%</span>
                </li>
                 </ul>                      
                </div>
                </div>`
    }
    displayDayOne.html(html);
}
const renderDayTwoCard = (forecastData) => {

    const dayData = forecastData.days;

    let html = "";
    for(let i = 0; i < dayData.length; i++) {
        html += `<div class="card mx-2 text-light border border-5" style="width: 18rem;" id="cardTwo">
                <div class="card-body text-center">
                <h6 class="card-subtitle mb-2 text-dark rounded-pill border border-light border-3">${dayData.dates[1][i]}</h6>
                <h5 class="card-title fs-1">${Math.floor(dayData.temp[1][i])}
                <span class="fs-5 position-absolute mt-2">°F</span></h5>
                 <div>
                <span class="m-1"><i class="fa-solid fa-temperature-low"></i> ${Math.floor(dayData.minTemp[1][i])}°F</span> |
                <span class="m-1"><i class="fa-solid fa-temperature-high"></i> ${Math.floor(dayData.maxTemp[1][i])}°F</span>
                </div>
                <img src="http://openweathermap.org/img/wn/${dayData.icon[1][i]}@2x.png" alt="icon" width="95px" height="80px" class="my-3">
                 <div class="card-header rounded-pill border border-3 border-dark bg-light text-dark p-0">
                <span>${dayData.description[1][i]}</span>
                </div>
                 <ul class="list-group list-group-flush">
                <li class="list-group-item border-bottom border-3" id="windEl"><i class="fa-solid fa-wind"></i> ${Math.floor(dayData.windSpeed[1][i])} mph</li>
                <li class="list-group-item border-bottom border-3"><i class="fa-solid fa-cloud-arrow-down"></i> ${dayData.pressure[1][i]} inHg</li>
                <li class="list-group-item"><i class="fa-solid fa-droplet"></i> ${dayData.humidity[1][i]}%</li>
                 </ul>                      
                </div>
                </div>`
    }
    displayDayTwo.html(html);
}
const renderDayThreeCard = (forecastData) => {

    const dayData = forecastData.days;

    let html = "";
    for(let i = 0; i < dayData.length; i++) {
        html += `<div class="card mx-2 border border-5 text-light" style="width: 18rem;" id="cardThree">
                <div class="card-body text-center">
                <h6 class="card-subtitle mb-2 text-dark rounded-pill border border-light border-3">${dayData.dates[2][i]}</h6>
                <h5 class="card-title fs-1">${Math.floor(dayData.temp[2][i])}
                <span class="fs-5 position-absolute mt-2">°F</span></h5>
                 <div>
                <span class="m-1"><i class="fa-solid fa-temperature-low"></i> ${Math.floor(dayData.minTemp[2][i])}°F</span> |
                <span class="m-1"><i class="fa-solid fa-temperature-high"></i> ${Math.floor(dayData.maxTemp[2][i])}°F</span>
                </div>
                <img src="http://openweathermap.org/img/wn/${dayData.icon[2][i]}@2x.png" alt="icon" width="95px" height="80px" class="my-3">
                 <div class="card-header rounded-pill border border-dark border-3 bg-light text-dark p-0">
                <span>${dayData.description[2][i]}</span>
                </div>
                 <ul class="list-group list-group-flush">
                <li class="list-group-item border-bottom border-3"><i class="fa-solid fa-wind"></i> ${Math.floor(dayData.windSpeed[2][i])} mph</li>
                <li class="list-group-item border-bottom border-3"><i class="fa-solid fa-cloud-arrow-down"></i> ${dayData.pressure[2][i]} inHg</li>
                <li class="list-group-item"><i class="fa-solid fa-droplet"></i> ${dayData.humidity[2][i]}%</li>
                 </ul>
                </div>
                </div>`
    }
    displayDayThree.html(html);
}
const renderDayFourCard = (forecastData) => {

    const dayData = forecastData.days;

    let html = "";
    for(let i = 0; i < dayData.length; i++) {
        html += `<div class="card mx-2 text-light border border-5" style="width: 18rem;" id="cardFour">
                <div class="card-body text-center">
                <h6 class="card-subtitle mb-2 text-dark rounded-pill border border-light border-3">${dayData.dates[3][i]}</h6>
                <h5 class="card-title fs-1">${Math.floor(dayData.temp[3][i])}
                <span class="fs-5 position-absolute mt-2">°F</span></h5>
                 <div>
                <span class="m-1"><i class="fa-solid fa-temperature-low"></i> ${Math.floor(dayData.minTemp[3][i])}°F</span> |
                <span class="m-1"><i class="fa-solid fa-temperature-high"></i> ${Math.floor(dayData.maxTemp[3][i])}°F</span>
                </div>
                <img src="http://openweathermap.org/img/wn/${dayData.icon[3][i]}@2x.png" alt="icon" width="95px" height="80px" class="my-3">
                 <div class="card-header rounded-pill border border-3 border-dark bg-light text-dark p-0">
                <span>${dayData.description[3][i]}</span>
                </div>
                 <ul class="list-group list-group-flush">
                <li class="list-group-item border-bottom border-3"><i class="fa-solid fa-wind"></i> ${Math.floor(dayData.windSpeed[3][i])} mph</li>
                <li class="list-group-item border-bottom border-3"><i class="fa-solid fa-cloud-arrow-down"></i> ${dayData.pressure[3][i]} inHg</li>
                <li class="list-group-item"><i class="fa-solid fa-droplet"></i> ${dayData.humidity[3][i]}%</li>
                 </ul>
                </div>
                </div>`
    }
    displayDayFour.html(html);
}
const renderDayFiveCard = (forecastData) => {

    const dayData = forecastData.days;

    let html = "";
    for(let i = 0; i < dayData.length; i++) {
        html += `<div class="card mx-2 border border-5 text-light" style="width: 18rem;" id="cardFive">
                <div class="card-body text-center">
                <h6 class="card-subtitle mb-2 text-dark rounded-pill border border-light border-3">${dayData.dates[4][i]}</h6>
                <h5 class="card-title fs-1">${Math.floor(dayData.temp[4][i])}
                <span class="fs-5 position-absolute mt-2">°F</span></h5>
                 <div>
                <span class="m-1"><i class="fa-solid fa-temperature-low"></i> ${Math.floor(dayData.minTemp[4][i])}°F</span> |
                <span class="m-1"><i class="fa-solid fa-temperature-high"></i> ${Math.floor(dayData.maxTemp[4][i])}°F</span>
                </div>
                <img src="http://openweathermap.org/img/wn/${dayData.icon[4][i]}@2x.png" alt="icon" width="95px" height="80px" class="my-3">
                 <div class="card-header rounded-pill border border-3 border-dark bg-light text-dark p-0">
                <span>${dayData.description[4][i]}</span>
                </div>
                 <ul class="list-group list-group-flush">
                <li class="list-group-item border-bottom border-3"><i class="fa-solid fa-wind"></i> ${Math.floor(dayData.windSpeed[4][i])} mph</li>
                <li class="list-group-item border-bottom border-3"><i class="fa-solid fa-cloud-arrow-down"></i> ${dayData.pressure[4][i]} inHg</li>
                <li class="list-group-item"><i class="fa-solid fa-droplet"></i> ${dayData.humidity[4][i]}%</li>
                 </ul>
                </div>
                </div>`
    }
    displayDayFive.html(html);
}

//TODO: ADDING EVENT LISTENERS
submit.addEventListener("click", function(e) {
    e.preventDefault();
    (async() => {
        let openWeatherData = await getOpenWeatherData();
        console.log(openWeatherData);

        const newData = myDataBase(openWeatherData);
        console.log(newData);

        renderCityCountry(newData);
        renderCurrentWeather(newData);
        renderCoords(newData);
        placeMarkerAndPopup(newData);
        renderAllForecastCards(newData);
        renderDayOneCard(newData);
        renderDayTwoCard(newData);
        renderDayThreeCard(newData);
        renderDayFourCard(newData);
        renderDayFiveCard(newData);

    })();
});
