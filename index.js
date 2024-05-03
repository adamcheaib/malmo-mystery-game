import {detect_distance} from "./js/distance.js";
import {update_missions, mission_options} from "./js/missions.js";

"use strict"


// var map = L.map('map').setView([55.60275864327367, 13.000073510709273], 13);

const main = [55.604096980734305, 12.996309487293441];

let currentPosition = [];

navigator.geolocation.getCurrentPosition(createMap, function (er) {
    console.log(er)
}, {enableHighAccuracy: true});

function createMap(position) {
    currentPosition = [position.coords.latitude, position.coords.longitude];

    // map
    var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // create marker
    var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

    // create circles
    L.circle(main, {
        color: "black",
        stroke: false,
        // fillColor: statue_coords[location]["color"],
        fillOpacity: 0.25,
        radius: 800
    }).addTo(map);

    for (const location in statue_coords) {
        let circle = L.circle([statue_coords[location]["latitude"], statue_coords[location]["longitude"]], {
            color: statue_coords[location]["color"],
            fillColor: statue_coords[location]["color"],
            fillOpacity: 0.5,
            radius: 50
        }).addTo(map);
    }

    map.locate({watch: true, enableHighAccuracy: true, timeout: 2000, maximumAge: Infinity})
        .on("locationfound", e => {
            console.log(e.latitude, e.longitude);
            currentPosition = [e.latitude, e.longitude];
            marker.setLatLng(currentPosition);

            detect_distance(currentPosition, map);
        })
        .on("locationerror", e => {
            console.log(e)
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
        display_dialogue_line(state.dialogue_index, state.current_phase, state.current_statue);
    })
}
