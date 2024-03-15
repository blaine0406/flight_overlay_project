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

            // Extracting coordinates from KML data
            let flightPathCoordinates = coordinates.map(function(coord) {
                let latLng = coord.split(',').map(parseFloat);
                return { lat: latLng[1], lng: latLng[0] }; // Converting to Google Maps LatLng format
            });

            // Creating a polyline for the flight path
            let flightPath = new google.maps.Polyline({
                path: flightPathCoordinates,
                geodesic: true,
                strokeColor: '#FF0000', // Red color
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            // Displaying the polyline on the map
            flightPath.setMap(map);

            // Fitting map bounds to show the entire flight path
            let bounds = new google.maps.LatLngBounds();
            flightPathCoordinates.forEach(function(coord) {
                bounds.extend(coord);
            });
            map.fitBounds(bounds);

            // Adding markers for start and end points
            let startPoint = flightPathCoordinates[0];
            let endPoint = flightPathCoordinates[flightPathCoordinates.length - 1];

            new google.maps.Marker({
                position: startPoint,
                map: map,
                title: 'Start Point',
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' // Green marker for start point
            });

            new google.maps.Marker({
                position: endPoint,
                map: map,
                title: 'End Point',
                icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' // Red marker for end point
            });
        };

        // Reading the uploaded file as text
        reader.readAsText(file);
    });
}
