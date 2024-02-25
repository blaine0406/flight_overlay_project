function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10, // Adjust the zoom level as needed
    });

    // Array to store map markers
    var mapMarkers = [];

    // Function to handle file upload
    function handleFile(files) {
        var file = files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            var kmlText = event.target.result;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(kmlText, "text/xml");

            // Extract coordinates from KML
            var coordinates = xmlDoc.getElementsByTagName("coordinates")[0].textContent.trim().split("\n");
            
            // Loop through each coordinate
            for (var i = 0; i < coordinates.length; i++) {
                var coords = coordinates[i].trim().split(",");
                var lat = parseFloat(coords[1]);
                var lng = parseFloat(coords[0]);

                // Create marker for each coordinate
                var marker = new google.maps.Marker({
                    position: { lat: lat, lng: lng },
                    map: map,
                    title: 'Marker ' + (i + 1) // Optional: Add a title to each marker
                });

                // Add marker to the array
                mapMarkers.push(marker);
            }

            // Fit map bounds to show all markers
            var bounds = new google.maps.LatLngBounds();
            mapMarkers.forEach(marker => {
                bounds.extend(marker.getPosition());
            });
            map.fitBounds(bounds);
        };

        reader.readAsText(file);
    }

    // Function to prevent form submission
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();
    });

    // Attach onchange event listener to file input
    document.getElementById('fileInput').addEventListener('change', function(event) {
        handleFile(this.files);
    });
}
