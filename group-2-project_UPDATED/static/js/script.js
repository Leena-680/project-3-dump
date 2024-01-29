// Initialize the map
var map = L.map("map"); // Do not set initial view

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker and circles around it
function addMarkerWithCircles(lat, lng, popupText, radius1, radius2) {
    let marker = L.marker([lat, lng]).addTo(map);

    // Add a popup to the marker
    marker.bindPopup(popupText).openPopup();

    // Add the first circle around the marker
    L.circle([lat, lng], {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.2,
        radius: radius1
    }).addTo(map);

    // Add the second circle around the marker
    L.circle([lat, lng], {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.2,
        radius: radius2
    }).addTo(map);
}

// Add markers with circles
addMarkerWithCircles(38.57588, -7.90219, "<b>Escola Secundária Gabriel Pereira</b><br>183 Female and 166 Male students academic performances were analysed in dataset</br>", 797.58, 1595.16);
addMarkerWithCircles(39.32155, -7.43580, "<b>Mouzinho da Silveira High School</b> <br>25 Female and 21 Male students academic performances were analysed in dataset</br>", 797.58, 1595.16);

// Fit the bounds of all markers
var bounds = L.featureGroup([
    L.marker([38.57588, -7.90219]),
    L.marker([39.32155, -7.43580])
]).getBounds();

map.fitBounds(bounds);

// Add legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<div class="legend-item"><span class="legend-circle" style="background-color: blue;"></span> Radius 1: 797.58 meters</div>';
    div.innerHTML += '<div class="legend-item"><span class="legend-circle" style="background-color: red;"></span> Radius 2: 1595.16 meters</div>';
    return div;
};

legend.addTo(map);
