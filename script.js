// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([40.690, -73.967], 15);

// Add base layer
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Fetch collisions data from our Glitch project
var collisionsFetch = fetch('https://cdn.glitch.com/03830164-a70e-47de-a9a1-ad757904d618%2Fpratt-collisions.geojson?1538625759015')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  });

// Fetch lanes data from our Glitch project
var lanesFetch = fetch('https://cdn.glitch.com/fcedf615-7fef-4396-aa74-2e03fc324d71%2Fpratt-bike-routes.geojson?1538628711035')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  });
var schoolDistricts = fetch('https://data.cityofnewyork.us/resource/cuae-wd7h.geojson')
  .then(function (response){
    return response.json()
  });

var complaintData = fetch('https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson')
  .then(function (response){
    return response.json()
  });
                            

// Once both have loaded, do some work with them
Promise.all([collisionsFetch, lanesFetch, schoolDistricts,complaintData])
  .then(function (fetchedData) {
    console.log('Both datasets have loaded');
  
    // Unpack the data from the Promise
    var collisionsData = fetchedData[0];
    var laneData = fetchedData[1];
    var schoolDistricts = fetchedData[2];
    var complaintData = fetchedData[3];
  
    // Add data in the order you want--first goes on the bottom
    L.geoJson(collisionsData).addTo(map);
    L.geoJson(laneData).addTo(map);
    L.geoJson(schoolDistricts).addTo(map);
    L.geoJson(complaintData).addTo(map);
  
  });