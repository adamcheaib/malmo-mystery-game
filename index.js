// var map = L.map('map').setView([55.60275864327367, 13.000073510709273], 13);
const statue_coords = 
    {
        storTorg: {latitude: 55.606749499890064, longitude: 13.000073510709273, color: "red"},
        folketsPark: {latitude: 55.59347581530123, longitude: 13.013949793519787, color: "green"},
        soderTull: {latitude: 55.60132802122993, longitude: 13.000414613334193, color: "blue"},
        mollan: {latitude: 55.591883687522206, longitude: 13.007768948210334, color: "yellow"},
        vallGatan: {latitude: 55.607391899774534, longitude: 12.99839459721525, color: "orange"},
        kungsParken: {latitude: 55.60371767788408, longitude: 12.992158258580288, color: "purple"},
    }

navigator.geolocation.getCurrentPosition((position) => {
    // create map
    var map = L.map('map', {enableHighAccuracy: true, watch: true}).setView([position.coords.latitude, position.coords.longitude], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // create marker
    var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);


    // create circles
    for (const location in statue_coords) {
        L.circle([statue_coords[location]["latitude"], statue_coords[location]["longitude"]], {
            color: statue_coords[location]["color"],
            fillColor: statue_coords[location]["color"],
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map);
    }

    setInterval( () => {
        navigator.geolocation.getCurrentPosition((position) => marker.setLatLng([position.coords.latitude, position.coords.longitude]));
        
        // map.on('locationfound', function(ev){
        //     console.log(ev.latlng);
        //     marker.setLatLng(ev.latlng);
        // })
    }, 1000 );
})