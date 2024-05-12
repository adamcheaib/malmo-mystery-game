import {detect_distance} from "./js/distance.js";
import {update_missions, mission_options} from "./js/missions.js";
import {show_dialogue, display_dialogue_line} from "./js/functions.js";
import {state} from "./data/data.js";

// if (window.localStorage.getItem("username") === null) {
//     window.location.href = "./landing_page/";
// }


const statue_coords =
    {
        adolf: {latitude: 55.606749499890064, longitude: 13.000073510709273, color: "#D48C8C"},
        gass: {latitude: 55.602315039588795, longitude: 12.98734215319501, color: "#93AE88"},
        katt: {latitude: 55.60132802122993, longitude: 13.000414613334193, color: "#84a8b9"},
        tungsinnet: {latitude: 55.603156508261634, longitude: 13.00720665598558, color: "#e9d1ae"},
        frans: {latitude: 55.607391899774534, longitude: 12.99839459721525, color: "#dea279"},
        radjur: {latitude: 55.60440697816811, longitude: 12.992741758035507, color: "#baa3b8"}, 
    }
let current_zones = ["radjur", "adolf", "katt"];
localStorage.setItem("current_zones", JSON.stringify(current_zones));
// const main = [55.604096980734305, 12.996309487293441];

"use strict"

const main = [55.604096980734305, 12.996309487293441];

let currentPosition = [];

navigator.geolocation.getCurrentPosition(createMap, function (er) {
    console.log(er)
}, {enableHighAccuracy: true});

function createMap(position) {
    currentPosition = [position.coords.latitude, position.coords.longitude];
    document.body.style.setProperty('--lat', position.coords.latitude + "px");
    document.body.style.setProperty('--long', position.coords.longitude + "px");

    update_missions("post", {newText: mission_options["none"]()});

    // map
    var map = L.map('map').setView(currentPosition, 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // create marker
    // var marker = L.marker(currentPosition).addTo(map);
    const iconSize = 12;
    document.body.style.setProperty('--iconSize', `${iconSize}px`);
    var marker = L.marker(currentPosition, {icon: L.divIcon({html: '<div id="mainDot"></div><div id="signal" class="signal"></div><div class="signal" id="signal2"></div>', iconSize: iconSize})}).addTo(map);

    // create circles
    const zones = JSON.parse(localStorage.getItem("current_zones"));
    console.log(zones);
    for (const location in statue_coords) {
        if(!zones.includes(location)) continue;
        let circle = L.circle([statue_coords[location]["latitude"], statue_coords[location]["longitude"]], {
            color: statue_coords[location]["color"],
            fillColor: statue_coords[location]["color"],
            fillOpacity: 0.6,
            radius: 50,
            className: location
        }).addTo(map);
    }
    L.circle(main, {
        color: "black",
        stroke: false,
        fillOpacity: 0.25,
        radius: 800
    }).addTo(map);

    map.locate({watch: true, enableHighAccuracy: true, timeout: 2000, maximumAge: Infinity})
        .on("locationfound", e => {
            console.log(e.latitude, e.longitude);
            currentPosition = [e.latitude, e.longitude];
            marker.setLatLng(currentPosition);

            JSON.parse(localStorage.getItem("current_zones")).forEach(zone => {
                detect_distance(currentPosition, map, statue_coords[zone]);
            });
        })
        .on("locationerror", e => {
            // console.clear();
            // console.log(e)
        })

    document.querySelector("#btn-panToLocation").addEventListener("click", e => {
        map.flyTo(currentPosition, 18, {duration: 0.8});
    });
    document.getElementById("btn-show-gamezone").addEventListener("click", e => {
        map.flyTo(main, 14, {duration: 0.8});
    });

    document.getElementById("btn-interact").addEventListener("click", e => {
        show_dialogue();
    })

    document.getElementById("next_text").addEventListener("click", e => {
        display_dialogue_line(state.dialogue_index, state.current_phase, state.current_statue, 1);
    })
}

