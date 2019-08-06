<template lang="html">
  <div id="map-container"></div>
</template>

<script>
import gmapsInit from './../gmaps.js'

export default {
  async mounted(){
    const google = await gmapsInit();
    const geocoder = new google.maps.Geocoder();

    let unWatch = this.$store.watch(state => state.appConfig.mapObject,
    (obj) => {
      if(!obj){
        unWatch()
        return
      }
      geocoder.geocode({ address: obj.location}, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          this.$el.innerHTML = '<h2>Ooops...</h2>'
        }else{
          let map = new google.maps.Map(this.$el);
          let destination = results[0].geometry.location

          function geoSuccess(position){
            let marker = new google.maps.Marker({
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              map: map,
              icon: 'https://via.placeholder.com/20/blue/circle'
            })

            let origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

            let bounds = new google.maps.LatLngBounds();
            bounds.extend(origin);
            bounds.extend(destination);
            map.fitBounds(bounds);

            let distance = new google.maps.DistanceMatrixService()
            distance.getDistanceMatrix({
              origins: [origin],
              destinations: [destination],
              travelMode: 'DRIVING'
            },(res, status) => {
              if(status !== 'OK'){
                markerAndInfo(false, null, null)
              }else{
                let time = res.rows[0].elements[0].duration.text
                let km = res.rows[0].elements[0].distance.text
                markerAndInfo (true, km, time)
              }
            })
          }

          function geoError(error){
            console.log(error)
            markerAndInfo(false, null, null)
          }

          const geoOptions = {
            enableHighAccuracy: true
          }

          function markerAndInfo(displayTravelInfo, km, time){
            let content;
            if (!displayTravelInfo){
              content = `<h2>${obj.name}</h1>
              <div style= 'width: 15rem; height: 10rem';'>
                <img style= 'width: 100%; objectFit: cover; height: 100%;' src=${obj.picture} alt='icon'/>
              </div>
              <p>${obj.location}</p>`
            }else{
              content = `<h2>${obj.name}</h1>
              <div style= 'width: 15rem; height: 10rem';'>
                <img style= 'width: 100%; objectFit: cover; height: 100%;' src=${obj.picture} alt='icon'/>
              </div>
              <p>${obj.location}</p>
              <p>${km}, ${time}</p>`
            }
            let infoWindow = new google.maps.InfoWindow({
              content: content
            })

            let marker = new google.maps.Marker({
              position: destination,
              map: map,
              title: obj.name
            })

            marker.addListener('click', () => {
              infoWindow.open(map, marker)
            })
          }

          if('geolocation' in navigator){
            let removeWatch = navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions)
          }
        }
      })
    },
    {
      immediate: true
    })
  },
}
</script>

<style lang="scss" scoped>
  #map-container{
    background: pink;
    flex: 1;
    height: 100%;
  }

  #info-window{
    max-width: 40%;
  }
</style>
