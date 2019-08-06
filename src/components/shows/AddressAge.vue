<template lang="html">
  <div class="address-age">
    <div v-if='!toggleEdit'>
      <img src="https://via.placeholder.com/50/red" alt="icon">
      <p>{{show.venueName}}<br>
      {{show.venueAddress}} / {{show.ageRestriction}}</p>
    </div>
    <div class='edit-address-age' v-else>
      <input placeholder="Venue Name"
        name='venueName'
        type="text"
        class='default-input'
        v-on:input='updateShow($event)'>
      <input placeholder="Age Restriction"
        type="text"
        name='ageRestriction'
        class='default-input'
        v-on:input='updateShow($event)'>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    show: Object,
    toggleEdit: Boolean
  },
  methods:{
    updateShow(e){
      let payload = {
        id: this.show.id,
        name: e.target.name,
        value: e.target.value
      }
      this.$store.commit('updateShow', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/globalStyles/helper.scss';

 .address-age{
   position: absolute;
   bottom: var(--spacing);
   left: var(--spacing);
   img{
     height: 3rem;
     object-fit: cover;
     margin-right: var(--spacing)
   }
  p{
     margin: 0;
     display: inline-block;
     font-size: 1.2rem;
     font-weight: 400;
   }
   .edit-address-age{
     border: dashed .5px var(--primary);
     padding: var(--spacing);
   }
 }
</style>
