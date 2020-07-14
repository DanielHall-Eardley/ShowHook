<template lang="html">
  <section class="venue-details">
    <h3 class="paragraph-heading">Details</h3>
    <svg 
      @click="showEdit = !showEdit"
      v-if="editable" 
      class="edit-icon">
      <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
    </svg>
    <div class="flex-container">
       <div class="details-container">
        <h4>Amenities:</h4>
        <ul>
          <li v-for="amenity in amenitiesArray" :key="amenity">
            {{amenity}}
          </li>
        </ul>
      </div>
      <div class="details-container">
        <h4>Rules:</h4>
        <ul>
          <li v-for="rule in rulesArray">
            {{rule.rule}}: {{rule.enforced ? "Allowed" : "Not Allowed"}}
          </li>
        </ul>
      </div>
      <div class="details-container">
        <h4>Suitable For:</h4>
        <ul>
          <li v-for="(actType, index) in suitableArray" :key="index">
            {{actType}}
          </li>
        </ul>
      </div> 
    </div>
    <div class="edit-venue-details" v-if="showEdit">
      <input 
        type="text"
        class="default-input"
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
  import Pricing from "@/components/edit/shared/Pricing"
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

  .flex-container {
    display: flex;
    flex-wrap: wrap;

    h4 {
      margin-bottom: var(--alt-spacing);
      font-size: 1.7rem;
    }
  }


  .details-container {
    flex: 1 0 30rem;
    background-color: var(--light-pink);
    min-height: 12rem;
    border-radius: var(--border-radius);
    padding: var(--alt-spacing);
    margin-bottom: var(--spacing);
    margin-right: var(--spacing);
  }

  .details-container ul{
    margin-left: 2rem;
    font-size: 1.6rem;
  }
</style>
