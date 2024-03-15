// Load API key
const apiKey = 'AIzaSyCBKcVb7_j-QzBrPh-_9s79kneVyB5Hq6E'; // Replace 'YOUR_API_KEY' with your actual API key

// Dynamically create script tag with API key
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
document.head.appendChild(script);