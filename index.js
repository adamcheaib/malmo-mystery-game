import {detect_distance} from "./js/distance.js";
import {update_missions, mission_options} from "./js/missions.js";
import {show_dialogue, display_dialogue_line, render_final_view} from "./js/functions.js";
import {all_statues_data} from "./data/data.js";

if (window.localStorage.getItem("game_code") === null && window.localStorage.getItem("user_id") === null) {
    window.location.href = "./landing_page/";
}

// Kolla hur många utmaningar varje staty ska ha. Om det är endast två, då läggs en avklarad staty till i "cleared_statues" arrayen om phase-indexet är 1 osv osv.
export let game_progress = JSON.parse(localStorage.getItem("game_progress"));

// game_progress.cleared_statues = [0, 1, 2, 3, 4 ,5];


"use strict"

const main = [55.604096980734305, 12.996309487293441];
// const finalCoords = [55.610808474655926, 12.9954238741806];

let currentPosition = [];

navigator.geolocation.getCurrentPosition(createMap, function (er) {
    alert(er);
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
    var marker = L.marker(currentPosition, {
        icon: L.divIcon({
            html: '<div id="mainDot"></div><div id="signal" class="signal"></div><div class="signal" id="signal2"></div>',
            iconSize: iconSize
        })
    }).addTo(map);

    // create circles
    for (const statue_data of all_statues_data) {
        // skip if already done
        if (game_progress["cleared_statues"].includes(statue_data["statue_id"])) continue;
        const coordinates = [statue_data["coordinates"]["latitude"], statue_data["coordinates"]["longitude"]];
        // create
        let circle = L.circle(coordinates, {
            color: statue_data["color"],
            fillColor: statue_data["color"],
            fillOpacity: 0.6,
            radius: 50,
            className: `statueZone_${statue_data["statue_id"]}`
        }).addTo(map);

    }
    //hidden
    // L.circle(finalCoords, {
    //     color: "yellow",
    //     fillColor: "yellow",
    //     fillOpacity: 0.6,
    //     radius: 50,
    //     className: "finalZone hidden"
    // }).addTo(map);
    // big
    L.circle(main, {
        color: "black",
        stroke: false,
        fillOpacity: 0.25,
        radius: 800
    }).addTo(map);

    map.locate({watch: true, enableHighAccuracy: true, timeout: 2000, maximumAge: Infinity})
        .on("locationfound", e => {
            currentPosition = [e.latitude, e.longitude];
            marker.setLatLng(currentPosition);

            all_statues_data.forEach(statue => {
                // check if already cleared
                // document.getElementById("btn-interact").setAttribute("disabled", "true");
                if (game_progress["cleared_statues"].includes(statue["statue_id"])) return;
                detect_distance(currentPosition, map, statue["coordinates"], statue.statue_id, statue.statue_name);
            });
            // JSON.parse(localStorage.getItem("current_zones")).forEach(zone => {
            //     detect_distance(currentPosition, map, statue_coords[zone]);
            // });
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

        const statue_data = all_statues_data.find(statue => statue.statue_id == game_progress.current_statue);
        statue_data.statue_challenges[game_progress.current_phase].interacted = true;
    })

    document.getElementById("next_text").addEventListener("click", e => {
        display_dialogue_line(game_progress.dialogue_index, game_progress.current_phase, game_progress.current_statue, 1);
    })

    render_final_view();
}

