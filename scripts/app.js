// MULTIPLE LOCATIONS - HARDCODED

const api_latitude = [];
const api_longitude = [];
const destination_coordinates = [];

const api = fetch('https://api.luxgroup.com/api/public-offers')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let destinations_array = myJson.result.length;
    for(let i = 0; i < destinations_array; i++) {
        let latitude = myJson.result[i].lowest_price_package.property.latitude;
        let longitude = myJson.result[i].lowest_price_package.property.longitude;
        api_latitude.push(latitude);
        api_longitude.push(longitude);
        destination_coordinates.push([latitude, longitude]);
    }
    // Test to see the coordinates of the destinations in table format
    // console.table(destination_coordinates);
  });

function initMap() {
   
    const location = {lat: -34.397, lng: 150.644};
    
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
    
    // This is a marker to show the center of the map (i.e. Sydney is the central point)
    const marker = new google.maps.Marker({position: location, map: map});
  
  // Places a marker on each of the destinations listed in the API
  for(let i = 0; i < locations.length; i++) {
    let marker = new google.maps.Marker({      
      position: {lat: locations[i][1], lng: locations[i][2]}, 
      map: map
    });
  }
}


