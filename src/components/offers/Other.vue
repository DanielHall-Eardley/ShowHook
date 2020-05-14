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
    <div class="edit-offer" v-if='showSection'>
      <div class="add-list">
        <label for="">Add to Guestlist</label>
        <input 
          type="text" 
          placeholder='Enter full name of guest'
          class='default-input'
          v-model='guest'
          v-on:change='addGuest'>  
        <div class='guest-list' v-if='getGuestList.length > 0'> 
          <h3 class='subheading'>Guest List</h3>
          <ul>
            <li v-for='guest in getGuestList'>{{guest}}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return { 
      showSection: false,
      guest: "",
    }
  },
  methods:{
    addGuest(){
      this.$store.commit('updateGuestList', this.guest)
    },
    toggleExpand(){
      this.showSection = !this.showSection
    }
  },
  computed:{
    getGuestList () {
      return this.$store.state.userConfig.showSetup.guestList
    }
  },
}
</script>

<style lang="scss">
@import '../../globalStyles/helper.scss';

.other{
  background-color: white;
  padding: var(--spacing);
  border-bottom: var(--light-border);
  border-right: var(--light-border);

  input{
    height: 4rem;
    font-size: 1.6rem;
  }

  .add-list{
    display: grid;
    grid-row-gap: var(--alt-spacing);
  }

  .guest-list {
    ul {
      list-style: none;
    }

    li {
      padding-left: var(--alt-spacing);
      padding-top: var(--alt-spacing);
    }
  }
}


</style>
