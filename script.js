// Function to initialize Google Map
function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10, // Initial zoom level
        center: { lat: 0, lng: 0 } // Initial center coordinates (change as needed)
    });

    // Function to handle file upload
    document.getElementById('fileInput').addEventListener('change', function(event) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function(event) {
            let kmlData = event.target.result;
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(kmlData, 'text/xml');
            let coordinates = xmlDoc.querySelectorAll('coordinates')[0].textContent.split(' ');

            let flightPathCoordinates = coordinates.map(function(coord) {
                let latLng = coord.split(',').map(parseFloat);
                return { lat: latLng[1], lng: latLng[0] };
            });

            let flightPath = new google.maps.Polyline({
                path: flightPathCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            flightPath.setMap(map);

            // Fit map bounds to show the entire flight path
            let bounds = new google.maps.LatLngBounds();
            flightPathCoordinates.forEach(function(coord) {
                bounds.extend(coord);
            });
            map.fitBounds(bounds);
        };

        reader.readAsText(file);
    });
}
