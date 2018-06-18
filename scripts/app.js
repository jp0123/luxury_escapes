const api_latitude = [];
const api_longitude = [];
const destination_coordinates = [];

// Fetch LuxGroup API
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
    
    // Run the function after the promise has been fulfilled.
    initMap();

  });

function initMap() {
    const location = {lat: -34.397, lng: 150.644};

    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 2
        });

    // This is a marker to show the center of the map (i.e. Sydney is the central point).
    const marker = new google.maps.Marker({position: location, map: map});

    // Places a marker on each of the destinations listed in the API.
    for(let i = 0; i < destination_coordinates.length; i++) {
      let marker = new google.maps.Marker({      
        position: {lat: destination_coordinates[i][0], lng: destination_coordinates[i][1]}, 
        map: map
      });
    }
  }
