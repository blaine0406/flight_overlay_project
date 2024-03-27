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
            
            // Extract flight path coordinates
            let coordinates = xmlDoc.querySelectorAll('coordinates')[0].textContent.split(' ');
            let flightPathCoordinates = coordinates.map(function(coord) {
                let latLng = coord.split(',').map(parseFloat);
                return { lat: latLng[1], lng: latLng[0] };
            });

            // Extract other details
            let lengthElement = xmlDoc.querySelector('length');
            let length = lengthElement ? lengthElement.textContent : 'N/A';

            let aircraftNameElement = xmlDoc.querySelector('aircraft_name');
            let aircraftName = aircraftNameElement ? aircraftNameElement.textContent : 'N/A';

            let flightControllerIDElement = xmlDoc.querySelector('flight_controller_id');
            let flightControllerID = flightControllerIDElement ? flightControllerIDElement.textContent : 'N/A';

            let pilotsNameElement = xmlDoc.querySelector('pilots_name');
            let pilotsName = pilotsNameElement ? pilotsNameElement.textContent : 'N/A';

            let flightTimeElement = xmlDoc.querySelector('flight_time');
            let flightTime = flightTimeElement ? flightTimeElement.textContent : 'N/A';

            let modeSelectionElement = xmlDoc.querySelector('mode_selection');
            let modeSelection = modeSelectionElement ? modeSelectionElement.textContent : 'N/A';

            let heightElement = xmlDoc.querySelector('height');
            let height = heightElement ? heightElement.textContent : 'N/A';

            let routeSpacingElement = xmlDoc.querySelector('route_spacing');
            let routeSpacing = routeSpacingElement ? routeSpacingElement.textContent : 'N/A';

            let taskFlightSpeedElement = xmlDoc.querySelector('task_flight_speed');
            let taskFlightSpeed = taskFlightSpeedElement ? taskFlightSpeedElement.textContent : 'N/A';

            let taskAreaElement = xmlDoc.querySelector('task_area');
            let taskArea = taskAreaElement ? taskAreaElement.textContent : 'N/A';

            let sprayAmountElement = xmlDoc.querySelector('spray_amount');
            let sprayAmount = sprayAmountElement ? sprayAmountElement.textContent : 'N/A';
            
            // Display flight path on the map
            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: flightPathCoordinates[0]
            });
            
            let flightPath = new google.maps.Polyline({
                path: flightPathCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map
            });

            // Display details on the webpage
            document.getElementById('length').textContent = `Length: ${length}`;
            document.getElementById('aircraftName').textContent = `Aircraft Name: ${aircraftName}`;
            document.getElementById('flightControllerID').textContent = `Flight Controller ID: ${flightControllerID}`;
            document.getElementById('pilotsName').textContent = `Pilot's Name: ${pilotsName}`;
            document.getElementById('flightTime').textContent = `Flight Time: ${flightTime}`;
            document.getElementById('modeSelection').textContent = `Mode Selection: ${modeSelection}`;
            document.getElementById('height').textContent = `Height: ${height}`;
            document.getElementById('routeSpacing').textContent = `Route Spacing: ${routeSpacing}`;
            document.getElementById('taskFlightSpeed').textContent = `Task Flight Speed: ${taskFlightSpeed}`;
            document.getElementById('taskArea').textContent = `Task Area: ${taskArea}`;
            document.getElementById('sprayAmount').textContent = `Spray Amount: ${sprayAmount}`;
        };

        // Reading the uploaded file as text
        reader.readAsText(file);
    });
}
