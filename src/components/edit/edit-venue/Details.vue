<template>
  <section class="venue-details">
    <h3 class="section-heading">
      Provide information about your venue
    </h3>
    <div class="venue-details-form">
      <select class="edit-input" v-model="venueType">
        <option disabled value="">Choose your venue type</option>
        <option>Bar</option>
        <option>Shared Space</option>
        <option>Private Space</option>
      </select>
      <input 
        v-model="guestLimit"
        class="edit-input"
        type="number" 
        placeholder="How many guests can your venue accommodate?"
      >
      <input 
        v-model="numberOfBathrooms"
        class="edit-input"
        type="number" 
        placeholder="How bathrooms does your venue have?"
      >
      <div>
        <input
          v-model="bathroomType"
          type="radio"
          checked
          id="shared"
          class="radio-input"
          name="bathroom"
          value="shared"
          hidden
        >
        <label for="shared">
          Shared Bathroom
        </label>
      </div>
      <div>
        <input 
          v-model="bathroomType"
          type="radio" 
          id="private"          
          class="radio-input"
          name="bathroom"
          value="private"
          hidden
        >
        <label for="private">
          Private Bathroom
        </label>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      venueType: "",
      guestLimit: null,
      numberOfBathrooms: null,
      bathroomType: null
    }
  },
  updated() {
    this.addVenueDetails()
  },
  methods: {
    addVenueDetails() {
      let venueDetails = {
        venueType: this.venueType,
        guestLimit: this.guestLimit,
        numberOfBathrooms: this.numberOfBathrooms,
        bathroomType: this.bathroomType
      }

      this.$store.commit("addVenueDetails", venueDetails)
    }
  }
}
</script>

<style lang="scss" scoped>
  .venue-details {

    &-form {
      display: grid;
      grid-row-gap: var(--spacing)
    }

    select, input {
      width: 50%;
      height: 4rem; 
      font-size: 1.8rem;
    }

    h4 {
      font-size: 1.8rem;
    }

    label {
      font-size: 1.8rem;
      position: relative;
    }

    input[type="radio"]:checked + label::after{
      background-color: var(--primary);
    }

    label::after {
      display: inline-block;
      content: "";
      height: 3rem;
      width:3rem;
      border-radius: 50%;
      border: solid var(--primary) 2px; 
      position: absolute;
      top: -2px;      
      margin-left: var(--alt-spacing);
    }
  }
</style>