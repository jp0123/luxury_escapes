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
  const details_link = [];
  const details_link_p1 = "https://luxuryescapes.com/au/offer/";
  const details_link_p2 = [];
  const details_link_p3 = [];
  // Image
  const destination_images = [];
  const destination_image_p1 = "https://res.cloudinary.com/lux-group/image/upload/f_auto,fl_progressive,q_auto:eco,c_fill,g_auto,ar_16:9/"
  const destination_image_p2 = [];
  // Video
  const destination_video = [];
  const destination_video_url = "https://res.cloudinary.com/lux-group/video/upload/vc_auto,q_70/" 
  const destination_video_poster = [];
  const destination_video_poster_url = "https://res.cloudinary.com/lux-group/video/upload/so_auto/"
  // Reviews
  const destination_review = [];
  const no_review = 'No review'

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
          details_link_p2.push(myJson.result[i].slug);
          details_link_p3.push(myJson.result[i].id_salesforce_external);
          let details_offer = `${details_link_p1}${details_link_p2[i]}/${details_link_p3[i]}`;
          details_link.push(details_offer);
          // Images
          destination_image_p2.push(myJson.result[i].images[0].id_cloudinary_external);
          let destination_image = `${destination_image_p1}${destination_image_p2[i]}`
          destination_images.push(destination_image);
          // Video
          let destination_video_link = `${destination_video_url}${myJson.result[i].video_cloudinary_id}.mp4`
          destination_video.push(destination_video_link);
          let destination_video_poster_link = `${destination_video_poster_url}${myJson.result[i].video_cloudinary_id}.jpg`
          destination_video_poster.push(destination_video_poster_link);
          // Reviews
          let reviews_present = myJson.result[i].lowest_price_package.property.reviews
          console.log(reviews_present);
          if(typeof(reviews_present) === 'object') {
            let reviews = [];
            for(let j = 0; j < reviews_present.length; j++ ) {
              reviews.push(reviews_present[j].content)
            }
            destination_review.push(reviews);
          } else {
            destination_review.push([no_review, no_review, no_review]);
          }

           
      }
      // Run the function after the promise has been fulfilled.
      initMap();

    });

  function initMap() {
      // Center of Google Maps (Sydney)
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
        let destinationDetailsButton = details_link[i];
        let destinationImage = destination_images[i];
        let destinationLink = details_link[i];
        let destinationVideo = destination_video[i];
        let destinationVideoPoster = destination_video_poster[i];

        let destinationReview = destination_review[i];

        // Google Maps InfoWindow  
        let infoWindowContent = '<a href="'+ `${destinationLink}` +'" target="_blank">'+`${destinationTitle}`+'</a>'

        let infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });
        
        // Event listener => Marker
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
          // Change VP section to reflect marker destination
          markerOffer(destinationTitle, destinationDescription, destinationCountry, destinationLocation, destinationPrice, destinationAccommodation, destinationDetailsButton, destinationImage, destinationVideo, destinationVideoPoster, destinationReview);
          });
      }

      // Run function to display first offer in the VP section
      markerOffer(destination_title[0], destination_description[0], destination_country[0], destination_location[0], destination_price[0], destination_accommodation[0], details_link[0], destination_images[0], destination_video[0], destination_video_poster[0], destination_review[0]);

    }
  
  // VP section | Updates the content based on the selected marker
  const markerOffer = (title, description, country, location, price, accommodation, detailsButton, destinationImage, destinationVideo, destinationVideoPoster, destinationReview) => {
    $('.vp-title').text(title);
    $('.vp-description').text(description);
    $('.vp-country').text(country);
    $('.vp-location').text(location); 
    $('.vp-price-1').text(`$${price} AU`);
    $('.vp-accommodation').text(accommodation);
    $('.vp-button').attr('href', detailsButton);
    $('.vp-image').attr('src', destinationImage);
    // Offer details section | Shows video if the offer contains one; else hide the video
    if(destinationVideo.indexOf('null') === -1 ) {
      $('.destination-video').show();
      $('.destination-video').attr("src", destinationVideo);
      $('.destination-video').attr("poster", destinationVideoPoster);
    } else {
      $('.destination-video').hide();
    }
    // Reviews | Show reviews if they are available
    if((destinationReview[0] === no_review) || (destinationReview[0] === no_review) || (destinationReview[0] === no_review)) {
      $('#offer-reviews').hide();
    } else {
      $('#offer-reviews').show();
      $('#review-1').text(destinationReview[0]);
      $('#review-2').text(destinationReview[1]);
      $('#review-3').text(destinationReview[2]); 
    }
  
  } 

  // Hero section | Updates the background image based on all the offers
  const changeBackground = () => {
    setTimeout(function () {
      $('.hero').css('background-image', `url(${destination_images[backgroundCounter]})`)
      $('#destination').text(destination_location[backgroundCounter]);
      backgroundCounter++;
      if (backgroundCounter < destination_images.length) {
        changeBackground(); 
      } 
    }, 5000)
  }

  // Hero section | Periodically change the background image
  changeBackground();
});
