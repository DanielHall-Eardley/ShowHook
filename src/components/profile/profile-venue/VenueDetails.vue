<template lang="html">
  <section class="venue-details">
    <h3 class="paragraph-heading">Details</h3>
    <svg 
      @click="showEdit = !showEdit"
      v-if="editable" 
      class="edit-icon">
      <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
    </svg>
    <div class="details-category-container">
      <h4>Amenities:</h4>
      <div>
        <span v-for="amenity in amenitiesArray" :key="amenity">
          {{amenity}}
        </span>
      </div>
    </div>
    <div class="details-category-container">
      <h4>Pricing:</h4>
      <div>
        <span v-for="(price, key) in pricingObject" :key="key">
          {{key}}: {{price}}
        </span>
      </div>
    </div>
    <div class="details-category-container">
      <h4>Rules:</h4>
      <div>
        <span v-for="rule in rulesArray">
          {{rule.rule}}: {{rule.enforced ? "Allowed" : "Not Allowed"}}
        </span>
        </div>
    </div>
    <div class="details-category-container">
      <h4>Suitable For:</h4>
      <div>
        <span v-for="(actType, index) in suitableArray" :key="index">
          {{actType}}
        </span>
      </div>
    </div> 
    <div class="edit-venue-details" v-if="showEdit">
      <input 
        type="text"
        class="edit-input"
        id="edit-amenity"
        placeholder="Add a new amenity or enter amenity to be removed"
        v-model="amenities"
        v-on:change="editProfile($event, 'Venue')"
        name="amenities"
      >
      <Pricing :editable="editable"></Pricing>
      <Rules :editable="editable"></Rules>
    </div> 

  </section>
</template>

<script>
  import editMixin from "@/mixins/editMixin"
  import Pricing from "@/components/edit/edit-venue/Pricing"
  import Rules from "@/components/edit/edit-venue/Rules"

  export default {
    components: {
      Pricing,
      Rules
    },
    mixins: [editMixin],
    props: [
      "amenitiesArray", 
      "rulesArray", 
      "pricingObject", 
      "editable",
      "suitableArray"
    ],
    data() {
      return {
        showEdit: false,
        amenities: ""
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .venue-details{
    padding: var(--spacing);
    padding-bottom: var(--alt-spacing);
    border-bottom: var(--light-border);
    font-size: 1.8rem;
    position: relative;

    svg {
      top: var(--spacing);
    }
  
    .details-category-container {
      display: grid;
      grid-auto-flow: column;      
      grid-template-columns: 15rem 1fr;
      grid-template-rows: 10rem;

      &:not(:last-child) {
        margin-bottom: var(--alt-spacing);
      }

      div {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }

      span {
        margin-bottom: var(--alt-spacing);
      }
    }

    .edit-venue-details {
      display: grid;
      grid-row-gap: var(--spacing);

      input {
        height: 4rem;
      }

      #edit-amenity, #edit-rules {
        width: 40rem;
      }

      div {
        display: flex;

        input:not(:last-child) {
          margin-right: var(--alt-spacing);
        }
      }
    }
  }
</style>
