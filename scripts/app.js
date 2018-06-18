$(document).ready(function() {
  // Hero section; background image counter
  let backgroundCounter = 0;
  // Google Maps
  const api_latitude = [];
  const api_longitude = [];
  const destination_coordinates = [];
  // VP section
  const destination_title =[];
  const destination_description = [];
  const destination_location = [];
  const destination_country = [];
  const destination_price = [];
  const destination_accommodation = [];
  // Button
  const details_button = [];
  const details_button_p1 = "https://luxuryescapes.com/au/offer/";
  const details_button_p2 = [];
  const details_button_p3 = [];
  // Image
  const destination_images = [];
  const destination_image_p1 = "https://res.cloudinary.com/lux-group/image/upload/f_auto,fl_progressive,q_auto:eco,c_fill,g_auto,ar_16:9/"
  const destination_image_p2 = [];

  // Fetch LuxGroup API
  const api = fetch('https://api.luxgroup.com/api/public-offers')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      let destinations_array = myJson.result.length;
      for(let i = 0; i < destinations_array; i++) {
          // Google Maps
          let latitude = myJson.result[i].lowest_price_package.property.latitude;
          let longitude = myJson.result[i].lowest_price_package.property.longitude;
          api_latitude.push(latitude);
          api_longitude.push(longitude);
          // VP section
          destination_coordinates.push([latitude, longitude]);
          destination_title.push(myJson.result[i].name);
          destination_description.push(myJson.result[i].description);     
          destination_country.push(myJson.result[i].location_subheading);
          destination_location.push(myJson.result[i].location_heading);
          destination_price.push(myJson.result[i].lowest_price_package.price);
          destination_accommodation.push(myJson.result[i].lowest_price_package.property.name);
          // Button
          details_button_p2.push(myJson.result[i].slug);
          details_button_p3.push(myJson.result[i].id_salesforce_external);
          let details_button_link = `${details_button_p1}${details_button_p2[i]}/${details_button_p3[i]}`;
          details_button.push(details_button_link);
          // Images
          destination_image_p2.push(myJson.result[i].images[0].id_cloudinary_external);
          let destination_image = `${destination_image_p1}${destination_image_p2[i]}`
          destination_images.push(destination_image);
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
        let destinationImage = destination_images[i];

        let infoWindow = new google.maps.InfoWindow({
            content: destinationTitle
          });

        // Run function to display first offer in the VP section
        markerOffer(destination_title[0], destination_description[0], destination_country[0], destination_location[0], destination_price[0], destination_accommodation[0], details_button[0], destination_images[0]);
        
        // Event listener => Marker
        // Change VP section to reflect marker destination
        marker.addListener('click', function() {
          infoWindow.open(map, marker);

          markerOffer(destinationTitle, destinationDescription, destinationCountry, destinationLocation, destinationPrice, destinationAccommodation, destinationDetailsButton, destinationImage);
          });
      }
    }

  const markerOffer = (title, description, country, location, price, accommodation, detailsButton, destinationImage) => {
    $('.vp-title').text(title);
    $('.vp-description').text(description);
    $('.vp-country').text(country);
    $('.vp-location').text(location);
    $('.vp-price-1').text(`$${price} AU`);
    $('.vp-accommodation').text(accommodation);
    $('.vp-button').attr('href', detailsButton);
    $('.vp-image').attr('src', destinationImage);
  } 

  const changeBackground = () => {
    
    setTimeout(function () {
      // background-image: url("../resources/images/1-3.jpg");
      $('.hero').attr("background-image", `url(${destination_images[backgroundCounter]})`);
      $('#destination').text(destination_location[backgroundCounter]);
      backgroundCounter++;
      if (backgroundCounter < destination_images.length) {
        changeBackground(); 
      } 
    }, 5000)
  }

  // Periodically change the background image of the Hero section
  changeBackground();

});