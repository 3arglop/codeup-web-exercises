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
                <div class="card-body">
                    <h5 class="card-title">Card</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>`

    return html;
}

//TODO: FETCHING OPEN WEATHER DATA BY CALLING THE API
const fetchWeatherData = (cityName) => {
    const openWeatherKey = OPEN_WEATHER;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${openWeatherKey}`

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
            console.log(data.list[0].dt_txt);
        });
}
fetchWeatherData("dallas");
// fetchWeatherData("london");
// fetchWeatherData("mexico city")

