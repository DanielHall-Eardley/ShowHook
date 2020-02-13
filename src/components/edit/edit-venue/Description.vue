<template>
  <section class="venue-description">
    <h3 class="section-heading">
      Describe your venue
    </h3>
    <input  
      class="edit-input" 
      type="text"  
      v-model="listingTitle"
      placeholder="Listing title"
    >
    <textarea 
      class="edit-input" 
      v-model="venueDescription"
      placeholder="Describe your venue; What makes it great, What is nearby?">
    </textarea>
    <fieldset>
      <input 
        type="checkbox" 
        hidden="hidden"
        id="solo"
        v-model="solo"
      >
      <label for="solo">Solo</label>
      <input 
        type="checkbox" 
        hidden="hidden"
        id="duo"
        v-model="duo"
      >
      <label for="duo">Duo</label>
      <input 
        type="checkbox" 
        hidden="hidden"
        id="band"
        v-model="band"
      >
      <label for="band">Band</label>
      <input 
        type="checkbox" 
        hidden="hidden"
        id="dj"
        v-model="dj"
      >
      <label for="dj">DJ</label>
    </fieldset>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        solo: false,
        duo: false,
        band: false,
        dj: false,
        listingTitle: null,
        venueDescription: null
      }
    },
    updated() {
      const venueDescription = {
        suitableActTypes: {
          solo: this.solo,
          duo: this.duo,
          band: this.band,
          dj: this.dj
        },
        listingTitle: this.listingTitle,
        venueDescription: this.venueDescription
      }

      this.$store.commit("addVenueDescription", venueDescription)
    }
  }
</script>

<style lang="scss" scoped>
  .venue-description {
    display: grid;
    grid-row-gap: var(--spacing);
    input[type="text"] {
      height: 4rem;
      width: 50%;
      font-size: 1.8rem;
    }

    textarea {
      height: 15rem;      
      font-size: 1.8rem;
      font-family: var(--text-font);
      padding-top: var(--alt-spacing);
    }

    fieldset {
      border: none;
      display: grid;
    }

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

    input[type="checkbox"] {
      display: none;
    }
  }
</style>