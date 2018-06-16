function initMap() {
    
    // Hardcoded locations; will be sourced from API soon.
    const locations = [
        ['Tokyo', 35.652832, 139.839478],
        ['Seoul', 37.532600, 127.024612],
        ['Sydney', 33.849182, -118.388405],
        ['Maldives', 1.924992, 73.399658],
        ['Rome', 41.902782, 12.496366],
        ['San Francisco', 37.733795	, -122.446747],
        ['New York', 40.730610, -73.935242]
    ];
    
    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 2
        });

    
    for(let apiDestination = 0; apiDestination < locations.length; apiDestination++) {
        // Test
        console.log(`Our destinations are: ${locations[apiDestination][0]}`);
        // Plots each destination
        let marker = new google.maps.Marker({
            position: locations[apiDestination], 
            map: map
        });

    }

}