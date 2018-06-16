function initMap() {
    const location = {lat: -34.397, lng: 150.644};
    const map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 2
    });
    const marker = new google.maps.Marker({position: location, map: map});
    let test = new google.maps.Marker({position: {lat: 0, lng: 0}, map: map});
}