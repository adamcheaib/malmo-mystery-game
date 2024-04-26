// var map = L.map('map').setView([55.60275864327367, 13.000073510709273], 13);
const statue_coords = 
    {
        adolf: {latitude: 55.606749499890064, longitude: 13.000073510709273, color: "red"},
        gass: {latitude: 55.602315039588795, longitude: 12.98734215319501, color: "green"},
        katt: {latitude: 55.60132802122993, longitude: 13.000414613334193, color: "blue"},
        tungsinnet: {latitude: 55.603156508261634, longitude: 13.00720665598558, color: "yellow"},
        frans: {latitude: 55.607391899774534, longitude: 12.99839459721525, color: "orange"},
        radjur: {latitude: 55.60371767788408, longitude: 12.992158258580288, color: "purple"},
    }
const main = [55.604096980734305, 12.996309487293441];

const ghost_talk = ["bla, bla, bla", "hej hej"];

let currentPosition = [];

navigator.geolocation.getCurrentPosition(createMap, function (er) {console.log(er)}, {enableHighAccuracy: true});
function createMap (position) {
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
        })
        .on("locationerror", e => {console.log(e)})

    document.querySelector(".supertest").addEventListener("click", e => {
        map.flyTo(currentPosition, 18, {duration: 0.8});
    });
    document.getElementById("test2").addEventListener("click", e => {
        map.flyTo(main, 14, {duration: 0.8});
    });

    document.getElementById("test").addEventListener("click", e => {
        document.getElementById("current_text").textContent = ghost_talk[0];
        document.getElementById("dialogue_container").classList.toggle("hidden");
    })
    document.getElementById("next_text").addEventListener("click", e => {
        document.getElementById("current_text").textContent = ghost_talk[1];
    })
}
