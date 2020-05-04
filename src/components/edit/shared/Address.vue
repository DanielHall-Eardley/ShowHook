<template lang="html">
  <section class="edit-address">
    <h3 class="section-heading">Enter your address</h3>

    <input class="edit-address-input default-input"
      type="text"
      placeholder="Start typing to find your address..."
      v-on:input="getAddress($event)"
    >

    <div v-if="result" class="edit-address-list">
      <h3 class="section-heading edit-address-list-heading">
        Select your address from the list
      </h3>
      <p class="edit-address-item"
        :class="highlightedAddress === index ? 'highlight-address' : null "
        v-for="(address, index) in result.results"
        v-on:click="submitAddress(address, index)">
        {{address.description}}
      </p>
    </div>
    <p class="edit-address-error" v-else-if="addressError">
      Your address was not able to be found. Error code: {{addressError}}
    </p>
  </section>
</template>

<script>
  export default {
    data(){
      return{
        result: null,
        location: null,
        sessionToken: null,
        highlightedAddress: null,
        addressError: null,
      }
    },
    created(){
      this.sessionToken = this.$uuid.v4()
      this.getUserLocation()
    },
    methods:{
      getAddress: async function(e){
        if(!e.target.value) return

        const userLocation = {
          lat: this.location.coords.latitude,
          lng: this.location.coords.longitude,
        }

        const response = await fetch("http://localhost:3000/google-api/address-autocomplete", {
          method: "POST",
          body: JSON.stringify({
            location: userLocation,
            input: e.target.value,
            sessionToken: this.sessionToken
            }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        const resData = await response.json()
        if(response.status !== 200) {
          this.result = null
          return this.addressError = resData[0]
        }
        this.result = resData
      },
      submitAddress(address, index){
        this.highlightedAddress = index

        const addressData = {
          description: address.description,
          id: address.id,
          place_id: address.place_id,
        }

        this.$store.commit("addAddress", {
          data: addressData,
        })
      },
      getUserLocation(){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.success, this.error, {
            enableHighAccuracy: true
          })
        }
        console.log("Your device does not support geolocation")
      },
      success(position){
        this.location = position
      },
      error(err){
        console.log("There was a problem getting your location" + err)
      }
    }
  }
</script>

<style lang="scss">
@import "@/globalStyles/helper.scss";

.edit-address{

  &-input{
    font-size: 1.8rem;
    height: 5rem;
    width: 50%;
  }

  &-list{
    display: grid;
    grid-row-gap: var(--alt-spacing);
    margin-top: var(--spacing);
  }

  &-list-heading{
    margin: 0;
  }

  &-item{
    font-size: 2.5rem;
    padding: .5rem;
    transition: all .3s;

    &:hover{
      background-color: var(--light-pink);
      cursor: pointer;
    }

    &:active{
      background-color: var(--primary);
    }

  }

  &-error{
    font-size: 3rem;
    margin-top: var(--spacing);
    text-align: center;
  }

  &-map{
    width: 100%;
    height: 100%;
  }

  .highlight-address{
    background-color: var(--light-grey);
  }
}
</style>
