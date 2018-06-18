const api_latitude = [];
const api_longitude = [];
const destination_coordinates = [];
const destination_title =[];
const destination_description = [];
const destination_location = [];
const destination_country = [];
const destination_price = [];
const destination_accommodation = [];
const details_button = [];
const details_button_p1 = "https://luxuryescapes.com/au/offer/";
const details_button_p2 = [];
const details_button_p3 = [];

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
        destination_title.push(myJson.result[i].name);
        destination_description.push(myJson.result[i].description);     
        destination_country.push(myJson.result[i].location_subheading);
        destination_location.push(myJson.result[i].location_heading);
        destination_price.push(myJson.result[i].lowest_price_package.price);
        destination_accommodation.push(myJson.result[i].lowest_price_package.property.name);
        details_button_p2.push(myJson.result[i].slug);
        details_button_p3.push(myJson.result[i].id_salesforce_external);
        let details_button_link = `${details_button_p1}${details_button_p2[i]}/${details_button_p3[i]}`;
        details_button.push(details_button_link);
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
      
      // VP elements
      let destinationTitle = destination_title[i];
      let destinationDescription = destination_description[i];
      let destinationCountry = destination_country[i];
      let destinationLocation = destination_location[i];
      let destinationPrice = destination_price[i];
      let destinationAccommodation = destination_accommodation[i];
      let destinationDetailsButton = details_button[i];

      let infoWindow = new google.maps.InfoWindow({
          content: destinationTitle
        });
      
      marker.addListener('click', function() {
        infoWindow.open(map, marker);

        markerOffer(destinationTitle, destinationDescription, destinationCountry, destinationLocation, destinationPrice, destinationAccommodation, destinationDetailsButton);
        });
    }
  }

const markerOffer = (title, description, country, location, price, accommodation) => {
  $('.vp-title').text(title);
  $('.vp-description').text(description);
  $('.vp-country').text(country);
  $('.vp-location').text(location);
  $('.vp-price-1').text(`$${price} AU`);
  $('.vp-accommodation').text(accommodation);
  $('.vp-button').attr("href", detailsButton);
}