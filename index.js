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

navigator.geolocation.getCurrentPosition(createMap, function (er) {console.log(er)}, {enableHighAccuracy: true});
function createMap (position) {

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
        .on("locationfound", e => {console.log(e.latitude, e.longitude); marker.setLatLng([e.latitude, e.longitude]);})
        .on("locationerror", e => {console.log(e)})

    document.getElementById("test").addEventListener("click", e => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 18, {duration: 0.8});
    });
    document.getElementById("test2").addEventListener("click", e => {
        map.flyTo(main, 14, {duration: 0.8});
    });
}


// navigator.geolocation.watchPosition(onLocationFound, onLocationError, {
//     enableHighAccuracy: true,
//     maximumAge: 1000,
//     timeout: 1000
//   });
//   function onLocationFound (e) {
//     marker.setLatLng([e.coords.latitude, e.coords.longitude]);
//     console.log(e);
//   }
//   function onLocationError (e) {
//     console.log("error", e);
//   }





// navigator.geolocation.getCurrentPosition((position) => {
//     // create map
//     // {enableHighAccuracy: true, watch: true, timeout: 2000}
//     var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);
//     console.log(map.locate());

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 20,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);
 
//     // create marker
//     var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
    
//     map.locate({watch: true, enableHighAccuracy: true, timeout: 2000, maximumAge: Infinity})
//         .on("locationfound", e => {console.log(e.latitude, e.longitude); marker.setLatLng([e.latitude, e.longitude]);})
//         .on("locationerror", e => {console.log(e)})

//     // create circles
//     for (const location in statue_coords) {
//         let circle = L.circle([statue_coords[location]["latitude"], statue_coords[location]["longitude"]], {
//             color: statue_coords[location]["color"],
//             fillColor: statue_coords[location]["color"],
//             fillOpacity: 0.5,
//             radius: 50
//         }).addTo(map);
//         circle.on("click", e => {console.log(location)});
//     }


//     // navigator.geolocation.watchPosition(onLocationFound, onLocationError, {
//     //     enableHighAccuracy: true,
//     //     maximumAge: 1000,
//     //     timeout: 1000
//     //   });
//     //   function onLocationFound (e) {
//     //     marker.setLatLng([e.coords.latitude, e.coords.longitude]);
//     //     console.log(e);
//     //   }
//     //   function onLocationError (e) {
//     //     console.log("error", e);
//     //   }


//     document.getElementById("test").addEventListener("click", e => {
//         map.flyTo([position.coords.latitude, position.coords.longitude], 18, {duration: 0.8});
//     });
// })
