<template lang="html">
  <section class="map-container">
    <h3 class="section-heading">Location</h3>
    <div id="map"></div>
    <p v-if="error">{{error}}</p>
  </section>
</template>

<script>
export default {
  props: ["address", "name", "photo"],
  data() {
    return {
      error: null
    }
  },
  mounted() {
    fetch("http://localhost:3000/google-api/map", {
      method: "GET",
    })
    .then(res =>{
      return res.json()
    })
    .then(resData => {
      const script = document.createElement("script")
      script.innerHTML = resData.api
      document.body.append(script)
    })
    .then(() => {
       //check for geolocation services and user location
      if('geolocation' in navigator){
        const removeWatch = navigator.geolocation.getCurrentPosition(geoSuccess.bind(this), geoError, geoOptions)
      }

      function geoSuccess (position) {
        const origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        //create map
        const map = new google.maps.Map(document.getElementById("map"), {
          center: origin,
          zoom: 12
        })
        //put down user marker
        const marker = new google.maps.Marker({
          position: origin,
          map: map,
          icon: "https://via.placeholder.com/30"
        })
        //get venue location
        const service = new google.maps.places.PlacesService(map)
        service.getDetails({
          placeId: this.address.place_id,
          fields: ["name", "geometry"]
        }, (place, status) => {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            throw new Error("Unable to find venue. Status: " + status)
          }  

          const destination = place.geometry.location
          //zoom map to show user icon and venue icon
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(origin);
          bounds.extend(destination);
          map.fitBounds(bounds);

        //get distance between user and venue
          const distance = new google.maps.DistanceMatrixService()
          distance.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [destination],
              travelMode: 'DRIVING'
            },
            (res, status) => {
              if (status !== "OK") {
                throw new Error("Unable to calculate distance. Status: " + status)
              }
              //pop up html
              const time = res.rows[0].elements[0].duration.text
              const km = res.rows[0].elements[0].distance.text
              const content = `
                <h2>${this.name}</h1>
                <div style= 'width: 15rem; height: 10rem';'>
                  <img style= 'width: 100%; objectFit: cover; height: 100%;' src=${this.photo} alt='icon'/>
                </div>
                <p>${km}, ${time}</p>
              `
              const infoWindow = new google.maps.InfoWindow({
                content: content
              })
              //put down venue marker
              const marker = new google.maps.Marker({
                position: destination,
                map: map,
                title: this.name
              })
              //add event listener to venue marker
              marker.addListener('click', () => {
                infoWindow.open(map, marker)
              })
            }
          )
        })
      }

      //throw error if geolocation services are unavailble
      function geoError(error){
        console.log(error)
        throw new Error("Unable to get user location")
      }

      const geoOptions = {
        enableHighAccuracy: true
      }

      // add a clickable marker which displays basic information about venue
      function markerAndInfo(km, time, name, destination){

      }
    })
    .catch(error => {
      this.error = error
    })
  }
}
</script>

<style lang="scss" scoped>
  .map-container {
    padding: var(--spacing);
  }

  #map{
    flex: 1;
    height: 55vh;
  }

  #info-window{
    max-width: 40%;
  }
</style>
