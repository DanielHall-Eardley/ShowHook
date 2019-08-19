<template lang="html">
  <section class="other">

    <h2 class="subheading">
      <span>Other</span>
      <svg v-if="!showSection" @click="toggleExpand">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-down"></use>
      </svg>
      <svg v-else @click="toggleExpand">
        <use xlink:href="@/assets/sprite.svg#icon-triangle-up"></use>
      </svg>
    </h2>

    <div class="expand-container" v-show="showSection">
      <div class="select">
        <button class="select-backline" @click="changeSelection('backline')" type="button">
          Backline
        </button>
        <button class="select-merchandise" @click="changeSelection('merch')" type="button">
          Merchandise
        </button>
        <button class="select-accomodation" @click="changeSelection('accomodation')" type="button">
          Accomodation
        </button>
        <button class="select-travel" @click="changeSelection('travel')" type="button">
          Travel
        </button>
        <button class="select-guest-list" @click="changeSelection('guest')" type="button">
        Guest List
        </button>
        <button class="select-condition" @click="changeSelection('condition')" type="button">
          Conditions
        </button>
      </div>

      <div class="backline" v-if="currentSelection === 'backline'">
        <textarea :placeholder="offer.backline"
          name="backline"
          v-on:input="updateOffer($event)">
        </textarea>
      </div>

      <div class="merchandise" v-if="currentSelection === 'merch'">
        <div class="toggle">
          <label for="" class="toggle-label">
            Who is responsible for selling the merch?
          </label>
          <button class="toggle-artist"
            name="merchSeller"
            type="button"
            :class="offer.merchSeller === 'artist' ? 'highlight-offer' : null"
            @click="toggleArtistVenue($event, 'artist')">
            Artist
          </button>
          <button class="toggle-venue"
            name="merchSeller"
            type="button"
            :class="offer.merchSeller === 'venue' ? 'highlight-offer' : null"
            @click="toggleArtistVenue($event, 'venue')">
            Venue
          </button>
        </div>
        <label for="" class="merchandise-percentage-label">
          What percentage of the sales does the {{offer.merchSeller}} keep?
        </label>
        <input type="number"
          :placeholder="updateMerch"
          :value="updateMerch"
          class="edit-input merchandise-percentage-input"
          v-on:input="updateMerchDetails($event)">
      </div>

      <div class="accomodation" v-if="currentSelection === 'accomodation'">
        <div class="toggle">
          <label class="toggle-label">
            Who is responsible for accomodation?
          </label>
          <button class="toggle-artist"
            name="accomodationProvider"
            type="button"
            :class="offer.accomodationProvider === 'artist' ? 'highlight-offer' : null"
            @click="toggleArtistVenue($event, 'artist')">
            Artist
          </button>
          <button class="toggle-venue"
            name="accomodationProvider"
            type="button"
            :class="offer.accomodationProvider === 'venue' ? 'highlight-offer' : null"
            @click="toggleArtistVenue($event, 'venue')">
            Venue
          </button>
        </div>
        <div class="accomodation-details" v-if="offer.accomodationProvider === 'venue'">
          <label class="accomodation-details-rooms">Number of rooms</label>
          <input type="number"
          class="edit-input accomodation-details-rooms-input"
            v-on:input="updateDetails($event)"
            :placeholder="offer.venueAccRoom"
            :value="offer.venueAccRoom"
            name="rooms">
          <label class="accomodation-details-address">Address</label>
          <input type="text"
            class="edit-input accomodation-details-address-input"
            v-on:input="updateDetails($event)"
            :placeholder="offer.venueAccAddress"
            :value="offer.venueAccAddress"
            name="address">
        </div>
      </div>

      <div class="travel" v-if="currentSelection === 'travel'">
        <div class="toggle">
          <label class="toggle-label">
            Who is responsible for travel expenses?
          </label>
          <button class="toggle-artist"
            name="travelProvider"
            type="button"
            :class="offer.travelProvider === 'artist' ? 'highlight-offer' : null"
            @click="toggleArtistVenue($event, 'artist')">
            Artist
          </button>
          <button class="toggle-venue"
            name="travelProvider"
            type="button"
            :class="offer.travelProvider === 'venue' ? 'highlight-offer' : null"
            @click="toggleArtistVenue($event, 'venue')">
            Venue
          </button>
        </div>
        <div class="travel-expenses" v-if="offer.travelProvider === 'venue'">
          <label class="travel-expenses-label">
            How much will you cover of the travel expenses?
          </label>
          <input type="number"
            class="edit-input travel-expenses-input"
            name="travel"
            v-on:input="updateDetails($event)"
            :placeholder="offer.travelExpenses"
            :value="offer.travelExpenses">
        </div>
      </div>

      <div class="guest-list" v-if="currentSelection === 'guest'">
        <label class="guest-list-artist-label">
          Number of guests for artist
        </label>
        <input type="number"
          class="edit-input guest-list-artist-input"
          :placeholder="offer.artistGuestList"
          :value="offer.artistGuestList"
          name="artistGuestList"
          v-on:input="updateOffer($event)">
        <label class="guest-list-venue-label">
          Number of guest for venue
        </label>
        <input type="number"
          class="edit-input guest-list-venue-input"
          :placeholder="offer.venueGuestList"
          :value="offer.venueGuestList"
          name="venueGuestList"
          v-on:input="updateOffer($event)">
      </div>

      <div class="condition" v-if="currentSelection === 'condition'">
        <textarea type="text"
          :placeholder="offer.conditionText"
          :value="offer.conditionText"
          name="conditionText"
          v-on:input="updateOffer($event)">
        </textarea>
        <button class="condition-upload">Upload Files</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      currentSelection: "backline",
      showSection: false,
    }
  },
  methods:{
    changeSelection(task){
      this.currentSelection = task
    },
    toggleArtistVenue(e, type){
      this.$store.commit("toggleArtistVenue", {
        name: e.target.name,
        type: type
      })
    },
    updateOffer(e){
      this.$store.commit("updateOffer", e.target)
    },
    updateMerchDetails(e){
      let name;
      if(this.offer.merchSeller === "artist"){
        name = "merchPercentageArtist"
      }else{
        name = "merchPercentageVenue"
      }
      this.$store.commit("updateOffer", {
        name: name,
        value: e.target.value
      })
    },
    updateDetails(e){
      let name;
      if(this.offer.accomodationProvider === "venue" && e.target.name === "rooms"){
        name = "venueAccRoom"
      }else if (this.offer.accomodationProvider === "venue" && e.target.name === "address"){
        name = "venueAccAddress"
      }else if (this.travelProvider === "venue" && e.target.name === "travel"){
        name = "travelExpenses"
      }
      this.$store.commit("updateOffer", {
        name: name,
        value: e.target.value
      })
    },
    toggleExpand(){
      this.showSection = !this.showSection
    }
  },
  computed:{
    offer(){
      return this.$store.state.userConfig.offer
    },
    updateMerch(){
      return this.offer.merchSeller === 'venue' ?
      this.offer.merchPercentageVenue :
      this.offer.merchPercentageArtist
    }
  },
}
</script>

<style lang="scss">
@import '../../globalStyles/mixins.scss';

.other{
  background-color: white;
  padding: var(--spacing);

  .toggle{

    &-label{
      display: block;
      margin-bottom: var(--alt-spacing);
    }

    &-artist, &-venue{
      padding: .5rem 1rem;
      transition: all .3s;
      display: inline-block;
      border: solid .5px var(--primary);
      font-size: 1.4rem;
      background-color: white;
      outline: none;
    }

    &-artist{
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }

    &-venue{
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      border-left: 0;
    }
  }

  .select{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-gap: var(--alt-spacing);
    margin: var(--alt-spacing) 0;

    button{
      padding: 1rem 0;
      border-radius: 1rem;
      border: solid 0.5px var(--primary);
      background-color: white;
      color: var(--alt-primary);
      outline: none;
      transition: all 0.3s;
      box-shadow: 0 1rem 3rem rgba(black, .2);
      &:hover{
        background-color: var(--primary);
        border: solid 0.5px var(--primary);
      }
      &:active, &:focus{
        background-color: var(--primary);
        border: solid 0.5px var(--primary);
      }
    }
  }

  textarea{
    width: 100%;
    height: 20rem;
    outline: none;
    border: none;
    background-color: var(--secondary-six);
    font-size: 2rem;
    border-radius: var(--border-radius);
    padding: var(--alt-spacing);

    &::placeholder{
      color: black;
    }

    &:focus{
      background-color: lighten($alt-primary, 50%);
    }
  }

  .merchandise{
    display: grid;
    grid-row-gap: var(--alt-spacing);

    &-percentage-input{
      width: 15rem;
    }
  }

  .accomodation{
    &-details{
      display: grid;
      grid-row-gap: var(--alt-spacing);
      margin-top: var(--alt-spacing);

      &-rooms-input{
        width: 10rem;
      }
    }
  }

  .travel{
    &-expenses{
      display: grid;
      grid-row-gap: var(--alt-spacing);
      margin-top: var(--alt-spacing);

      &-input{
        width: 10rem;
      }
    }
  }

  .guest-list{
    display: grid;
    grid-row-gap: var(--alt-spacing);

    &-artist-input, &-venue-input{
      width: 10rem;
    }
  }

  .highlight-offer{
    background-color: var(--primary);
  }
}


</style>
