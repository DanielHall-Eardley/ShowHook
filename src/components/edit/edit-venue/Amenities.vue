<template>
  <section class="venue-amenities">
    <h3 class="section-heading">Venue Amenities</h3>
    <div class="venue-amenities-container">
      <div>
        <input 
          type="checkbox"
          id="essentials"
          v-model="essentials"
          hidden
        >
        <label for="essentials" type="checkbox">
          Essentials
        </label>
      </div>
      <div>
        <input 
          type="checkbox"
          id="wifi"
          hidden
          v-model="wifi"
        >
        <label for="wifi" type="checkbox">
          Wifi
        </label>
      </div>
      <div>
        <input 
          type="checkbox"
          id="storage-area"
          hidden
          v-model="storage"
        >  
        <label for="storage-area" type="checkbox">
          Storage Area
        </label>
      </div>
      <div>
        <input 
          type="checkbox"
          id="backline"
          hidden
          v-model="backline"
        >
        <label for="backline" type="checkbox">
          Backline
        </label>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        essentials: false,
        wifi: false,
        storage: false,
        backline: false
      }
    },
    updated() {
      this.addVenueAmenities()
    },
    methods: {
      addVenueAmenities() {
        const venueAmenities = {
          essentials: this.essentials,
          backline: this.backline,
          wifi: this.wifi,
          storage: this.storage
        }
        
        this.$store.commit("addVenueAmenities", venueAmenities)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .venue-amenities {
    
    &-container {
      display: grid;
      grid-row-gap: var(--spacing);

      label {
        font-size: 1.8rem;
        position: relative;
      }

      label::after {
        content:"";
        display: inline-block;
        height: 2rem;
        width: 2rem;
        border: solid var(--primary);
        border-radius: .5rem;
        position: absolute;
        top: 2px;
        margin-left: var(--spacing);
      }

      input[type="checkbox"]:checked + label::after {
        background-color: var(--primary);
      }
    }
  }
</style>

