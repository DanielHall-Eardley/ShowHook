<template lang="html">
  <section class="other">
    <h2 class="subheading">Other</h2>
    <div class="container">
      <div class="add-guest">
        <label for="">Add to Guestlist</label>
        <input 
          type="text" 
          placeholder='Enter full name of guest'
          class='default-input'
          v-model='guest'
          v-on:change='addGuest'>  
        <div class='guest-list' v-if='show.guestList.length > 0'> 
          <h3>Guest List</h3>
          <ul>
            <li v-for='guest in show.guestList'>{{guest}}</li>
          </ul>
        </div>
      </div>
      <div class="add-condition">
        <label for="">Add any requirements</label>
        <input 
          type="text"
          class='default-input'
          placeholder="Add any extra conditions"
          v-model='condition'
          v-on:change="addCondition">
        <div 
          class="act-condition-list" 
          v-if="show.actRequirements.length > 0">
          <h3>Act requirements</h3>
          <ul class='act-conditions'>
            <li v-for='condition in show.actRequirements'>{{condition}}</li>
          </ul>
        </div>
        <div 
          class="venue-condition-list" 
          v-if="show.venueRequirements.length > 0">
          <h3>Venue requirements</h3>
          <ul class="venue-conditions">
            <li v-for='condition in show.venueRequirements'>{{condition}}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['userType'],
  data () {
    return { 
      guest: "",
      condition: ""
    }
  },
  methods:{
    addGuest(){
      this.$store.commit('updateGuestList', this.guest)

      this.guest = ""
    },
    addCondition(){
      this.$store.commit('updateConditionList', {
        condition: this.condition,
        userType: this.userType
      })

      this.condition = ""
    },
  },
  computed:{
    show () {
      return this.$store.state.showSetup
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


  .add-guest, .add-condition {
    margin-bottom: var(--alt-spacing);
    display: grid;
    row-gap: var(--alt-spacing);
  }

  .guest-list, 
  .act-condition-list,
  .venue-condition-list {
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
