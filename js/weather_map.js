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



