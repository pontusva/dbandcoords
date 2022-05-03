

var x = document.getElementById("plats-tidszon");
window.onload = function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


  

function  showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;

  data = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  axios.post('/posts', data)
    .then(response =>{
      console.log(response.data)
      return response.data;
    }) 

}








