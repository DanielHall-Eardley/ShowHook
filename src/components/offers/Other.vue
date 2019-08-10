<template lang="html">
  <section class="other">

    <h2 class="subheading">Other</h2>
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
      <textarea class="backline-textarea" :placeholder="offer.backline"></textarea>
    </div>

    <div class="merchandise" v-if="currentSelection === 'merch'">
      <div class="toggle">
        <label for="" class="toggle-label">
          Who is responsible for selling the merch?
        </label>
        <button class="toggle-artist"
          name="merchSeller"
          type="button"
          :class="toggle === 'artist' ? 'highlight-offer' : null"
          @click="toggleArtistVenue($event, 'artist')">
          Artist
        </button>
        <button class="toggle-venue"
          name="merchSeller"
          type="button"
          :class="toggle === 'venue' ? 'highlight-offer' : null"
          @click="toggleArtistVenue($event, 'venue')">
          Venue
        </button>
      </div>
      <label for="" class="merchandise-percentage-label">
        What percentage of the sales does the {{offer.merchSeller}} keep?
      </label>
      <input type="text" placeholder="%" class="edit-input merchandise-percentage-input">
    </div>

    <div class="accomodation" v-if="currentSelection === 'accomodation'">
      <div class="toggle">
        <label for="" class="toggle-label">
          Who is responsible for accomodation?
        </label>
        <button class="toggle-artist"
          name="accomodationProvider"
          type="button"
          :class="toggle === 'artist' ? 'highlight-offer' : null"
          @click="toggleArtistVenue($event, 'artist')">
          Artist
        </button>
        <button class="toggle-venue"
          name="accomodationProvider"
          type="button"
          :class="toggle === 'venue' ? 'highlight-offer' : null"
          @click="toggleArtistVenue($event, 'venue')">
          Venue
        </button>
      </div>
      <div class="accomodation-details">
        <label class="accomodation-details-rooms">Number of rooms</label>
        <input type="number" class="edit-input accomodation-details-rooms-input">
        <label class="accomodation-details-address">Address</label>
        <input type="text" class="edit-input accomodation-details-address-input">
      </div>
    </div>

    <div class="travel" v-if="currentSelection === 'travel'">
      <div class="toggle">
        <label for="" class="toggle-label">
          Who is responsible for travel expenses?
        </label>
        <button class="toggle-artist">Artist</button>
        <button class="toggle-venue">Venue</button>
      </div>
      <div class="travel-expenses">
        <label class="travel-expenses-label">
          How much will cover of the travel expenses?
        </label>
        <input type="text" class="travel-expenses-input">
      </div>
    </div>

    <div class="guest-list" v-if="currentSelection === 'guest'">
      <label class="guest-list-artist-label"></label>
      <input type="text" class="guest-list-artist-input">
      <label class="guest-list-venue-label"></label>
      <input type="text" class="guest-list-venue-input">
    </div>

    <div class="condition" v-if="currentSelection === 'condition'">
      <input type="text" class="condition-input">
      <ul class="condition-list">
        <li></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      currentSelection: "backline",
      toggle: "artist"
    }
  },
  methods:{
    changeSelection(task){
      this.currentSelection = task
    },
    toggleArtistVenue(e, type){
      this.toggle = type

      this.$store.commit("toggleArtistVenue", {
        name: e.target.name,
        type: type
      })
    }
  },
  computed:{
    offer(){
      return this.$store.state.userConfig.offer
    }
  },
}
</script>

<style lang="scss">
@import '../../globalStyles/mixins.scss';

.other{
  background-color: white;
  padding: var(--spacing);
  border-radius: var(--border-radius);
  grid-column: col-start 5 /span 2;
  align-self: start;

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
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--alt-spacing);
    margin: var(--alt-spacing) 0;

    button{
      @include button;
    }
  }

  .backline{
    &-textarea{
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
  }

  .merchandise{
    display: grid;
    grid-row-gap: var(--alt-spacing);

    &-percentage-label{

    }

    &-percentage-input{

    }
  }

  .accomodation{

    &-details{

      &-rooms{

      }

      &-rooms-input{

      }

      &-address{

      }

      &-address-input{

      }
    }
  }

  .travel{

    &-expenses{

      &-label{

      }

      &-input{

      }
    }
  }

  .geust-list{

    &-artist-label{

    }

    &-artist-input{

    }

    &-venue-label{

    }

    &-venue-input{

    }
  }

  .condition{

    &-input{

    }

    &-list{

    }
  }

  .highlight-offer{
    background-color: var(--primary);
  }
}


</style>
