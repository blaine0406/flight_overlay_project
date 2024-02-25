// Load API key from configuration file
fetch('config.json')
    .then(response => response.json())
    .then(config => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&callback=initMap`;
        document.head.appendChild(script);
    });
