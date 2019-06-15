<template lang="html">
  <div class="offer-container">
    <header>
      <AppName></AppName>
      <button>Save And Exit</button>
    </header>
    <main>
      <div class='offer-details'>
        <div class='offer reciever'>
          <h2>{{offerType}}</h2>
          <p>{{getSeller.location.content}}</p>
        </div>
        <div class="offer giver">
          <p><b>{{getOfferPerson.name}}</b>
            <br>
            {{getOfferPerson.location}}
          </p>
        </div>
        <div class='offer details-general'>
          <span>GENERAL</span>
          <img :src="toggleOfferDetails('general')" alt="icon">
        </div>
        <div class='offer details-schedule'>
          <span>SCHEDULE</span>
          <img :src="toggleImage('schedule')" alt="icon">
        </div>
        <div class='offer details-other'>
          <span>OTHER</span>
          <img :src="toggleOfferDetails('other')" alt="icon">
        </div>
      </div>
      <div class="img-submit">
        <div>
          <img :src="getSeller.banner" alt="banner image">
        </div>
        <button>Cancel</button>
        <button>Submit</button>
      </div>
    </main>
  </div>
</template>

<script>
import AppName from '@/components/AppName.vue'

export default {
  data(){
    return{
      general: false,
      schedule: false,
      other: false,
    }
  },
  components:{
    AppName
  },
  computed:{
    offerType(){
      let seller = this.getSeller
      if(seller.type === 'venue'){
        return `Book${seller.name.content}`
      }else{
        return `Make an offer to ${seller.name.content}`
      }
    },
    getSeller(){
      return this.$store.state.userConfig.user
    },
    getOfferPerson(){
      return this.$store.state.userConfig.currentUser
    }
  },
  methods:{
    toggleImage(name){
      if(this[name]){
        return 'https://via.placeholder.com/60/red'
      }else{
        return 'https://via.placeholder.com/60/green'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/globalStyles/mixins.scss';

  .offer-container{
    header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 4px var(--alt-primary);
      padding: 0px var(--spacing);
      button{
        @include alt-button;
        height: 70%;
      }
    }
    main{
      display: grid;
      padding: var(--spacing);
      grid-template-columns: 2fr minmax(0, 1fr);
      grid-column-gap: var(--spacing);
    }
  }

.offer{
  border-bottom: solid 0.5px var(--secondary-six);
  padding: var(--spacing) 0px;
}

.offer-details{
  .reciever, .giver{
    h2{
      margin: 0;
    }
    p{
      margin: 0;
    }
  }
}

  .img-submit{
    div{
      width: 100%;
    }
    img{
      width: 100%;
      object-fit: contain;
    }
    button:first-of-type{
      @include alt-button;
    }
    button:last-child{
      @include button;
    }
  }
</style>
