"use strict";

console.log("Hello from Weather Map JS 😜");


//TODO: CALLING THE MAPBOX API AND RENDERING MAP INTO MY HTML
mapboxgl.accessToken = MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-95.7129, 37.0902], // starting position [lng, lat]
    zoom: 3.5, // starting zoom'
    projection: 'mercator'
});
map.on('style.load', () => {
    map.setFog({});
});

map.addControl(new mapboxgl.NavigationControl());



//TODO: CALLING THE DOM
const displayCityName = $('#cityName');
console.log(displayCityName);
const displayForecast = $('#showForecast');
console.log(displayForecast);

//TODO: CREATING THE DYNAMIC HTML FOR MY CARD (SINGLE)
const renderForecastCard = (oneDayForecast) => {
    let html = `<div class="card" style="width: 18rem;">
                <div class="card-body text-center">
                    <h6 class="card-subtitle mb-2 text-muted">2202-11-20</h6>
                    <h5 class="card-title">42.01</h5>
                    <div>
                        <span>41.94</span>
                        <span>46.11</span>
                    </div>
                    <img src="IMG/codeup-logo.png" alt="" width="95px" height="80px">
                    <div class="card-header">
                        <span>scattered clouds</span>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Wind Speed: 5.57 mph</li>
                        <li class="list-group-item">Pressure: 1031 inHg</li>
                        <li class="list-group-item">Humidity: 51%</li>
                    </ul>
                </div>
            </div>`

    return html;
}

//TODO: CREATING AN EMPTY ARRAY WHERE I WILL EXTRACT AND PUSH THE DATA TO
const fiveDayForecast = [];

//TODO: FETCHING OPEN WEATHER DATA BY CALLING THE API
const fetchWeatherData = (cityName) => {
    const openWeatherKey = OPEN_WEATHER;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${openWeatherKey}`

    fetch(URL)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.list);

            console.table(data.list[0]);
            console.table(data.list[0].main);
            console.table(data.list[0].weather);
            console.table(data.list[0].wind);

            // console.log(data.list[0].dt_txt);
            // console.log(data.list[0].main.temp);
            // console.log(data.list[0].main.temp_min);
            // console.log(data.list[0].main.temp_max);
            // console.log(data.list[0].weather[0].description);
            // console.log(data.list[0].wind.speed);
            // console.log(data.list[0].main.pressure);
            // console.log(data.list[0].main.humidity);

            const timeStamps = data.list.map(time => {
                for(let i = 0; i < data.list.length; i += 9) {
                    console.log(time[i].dt_txt);
                }
            });
            console.table(timeStamps);
            const tempStamps = data.list.map(temp => temp.main.temp);
            console.table(tempStamps);
            const tempMinStamps = data.list.map(minTemp => minTemp.main.temp_min);
            console.table(tempMinStamps);
            const tempMaxStamps = data.list.map(maxTemp => maxTemp.main.temp_max);
            console.table(tempMaxStamps);

            //TODO: EXTRACTING DATA
            const weatherInfo = data.list.map(weather => weather.weather);
            console.table(weatherInfo[0]);
            for(let single of weatherInfo) {
                for(let i = 0; i < single.length; i++) {
                    console.log(single[i].description);
                }
            }

            const speedStamps = data.list.map(speed => speed.wind.speed);
            console.table(speedStamps);
            const pressureStamps = data.list.map(pressure => pressure.main.pressure);
            console.table(pressureStamps);
            const humidityStamps = data.list.map(humidity => humidity.main.humidity);
            console.table(humidityStamps);

        });
}
fetchWeatherData("dallas");
// fetchWeatherData("london");
// fetchWeatherData("mexico city")

