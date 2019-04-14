<template lang="html">
  <div class="book-show" v-bind:style="bookPos">
    <div>
      <span><b>{{price}} per night</b></span>
    </div>
    <div>
      <button v-if="type === 'act' ? true : false"
      v-on:click="showForm">
        {{toggleOfferForm === true ? "Hide" : "Make an Offer"}}
      </button>
      <MakeOffer v-bind:showForm="toggleOfferForm"
      v-bind:shows="shows">
      </MakeOffer>
      <router-link
        v-bind:to="{name: 'booking', params: {id: id}}">
        Book
      </router-link>
      <button class="alt-button">Save to wishlist</button>
      <router-link to="/contact/:id">
        Contact {{type === "venue" ? "venue" : "act"}}
      </router-link>
    </div>
  </div>
</template>

<script>
import MakeOffer from "@/components/MakeOffer.vue"

export default {
  components:{
    MakeOffer
  },
  props:{
    bookPos: Object,
    price: String,
    type: String,
    shows: Array,
    id: String
  },
  data(){
    return{
      toggleOfferForm: false,
    }
  },
  methods:{
    showForm(){
      this.toggleOfferForm = !this.toggleOfferForm
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/globalStyles/mixins.scss";

  .book-show{
    position: sticky;
    bottom: 0px;
    display: flex;
    background: var(--secondary-one);
    div{
      background: var(--secondary-two);
      padding: var(--spacing);
      span{
        font-size: 1.5rem;
        }
    }
    div:last-of-type{
      flex: 1;
      display: flex;
      justify-content: space-between;
      background: var(--secondary-one);
        button, a{
        @include button();
      }
    }
  }
</style>
