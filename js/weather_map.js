"use strict";

console.log("Hello from Weather Map JS 😜");

//TODO: CALLING THE DOM
const userInput = document.getElementById("userInput");
const submit = document.getElementById('btn');
const displayCityName = $('#cityName');
const displayCoords = $('#showCoords');
const displayForecast = document.getElementById('showForecast');
const displayDayOne = $('#dayOneCard');


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
    zoom: 0.5, // starting zoom'
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
    html = `<h4>${forecastData.cityName}, ${forecastData.countryName}</h4>`;

    return displayCityName.html(html);
}

//TODO: THIS FUNCTION WILL RENDER THE COORDINATES
const renderCoords = (forecastData) => {
    // console.log(data);
    let html = "";
    html = `<h5>Longitude:
            <br>
            <span id="currentLng">${forecastData.coordinates.lon}</span>
            </h5>
            <h5>Latitude:
            <br>
            <span id="currentLat">${forecastData.coordinates.lat}</span>
            </h5>
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

        html += `<tr>
                  <th scope="row">${dateOnly}</th>
                  <td>${averageData.temperature[i]}°F</td>
                  <td>${averageData.minTemp[i]}°F</td>
                  <td>${averageData.maxTemp[i]}°F</td>
                   <td>${averageData.speed[i]} mph</td>
                  <td>${averageData.humidity[i]}%</td>
                  <td>${averageData.pressure[i]} inHg</td>
                </tr>`
    }
    displayForecast.innerHTML = html;
}

const renderDayOneCard = (forecastData) => {

    const dayData = forecastData.days;

    let html = "";
    for(let i = 0; i < dayData.length; i++) {
        html += `<div class="card" style="width: 18rem;">
                <div class="card-body text-center">
                <h6 class="card-subtitle mb-2 text-muted">${dayData.dates[0][i]}</h6>
                <h5 class="card-title">${Math.floor(dayData.temp[0][i])}°F</h5>
                 <div>
                <span>min: ${Math.floor(dayData.minTemp[0][i])}°F</span> |
                <span>max: ${Math.floor(dayData.maxTemp[0][i])}°F</span>
                </div>
                <img src="http://openweathermap.org/img/wn/${dayData.icon[0][i]}@2x.png" alt="icon" width="95px" height="80px" class="my-3">
                 <div class="card-header">
                <span>${dayData.description[0][i]}</span>
                </div>
                 <ul class="list-group list-group-flush">
                <li class="list-group-item">Wind Speed: ${Math.floor(dayData.windSpeed[0][i])} mph</li>
                <li class="list-group-item">Pressure: ${dayData.pressure[0][i]} inHg</li>
                <li class="list-group-item">Humidity: ${dayData.humidity[0][i]}%</li>
                 </ul>                      
                </div>
                </div>`
    }
    displayDayOne.html(html);
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
        renderCoords(newData);
        placeMarkerAndPopup(newData);
        renderAllForecastCards(newData);
        renderDayOneCard(newData);

    })();
});
