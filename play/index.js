"use strict";

// initialize the map on the "map" div with a given center and zoom
let map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 18
}, 19);

let marker;
marker = L.marker([0,0]).addTo(map);
let test = map.locate({watch: true, setView: true, maxZoom: 19, enableHighAccuracy: true, timeout: 5000});

// test.events.move.push({log: () => alert("HOPPSAN!")});
test._events.moveend.push({
    fn: () => {
        console.log("HEJ på dig!");
        navigator.geolocation.getCurrentPosition(succ => {
            console.log(succ.coords)
            marker.setLatLng([succ.coords.latitude, succ.coords.longitude]);
        }, fail => console.log("YO"))
    }
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);