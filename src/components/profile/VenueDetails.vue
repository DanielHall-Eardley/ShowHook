<template lang="html">
  <div class="venue-details">
    <div v-for="(det, i) in venueDetails">
      <p>
        <b>{{det.subHeading}}</b>
      </p>
      <div>
        <span v-for="object in det.content">
          <img v-if="checkProperties(object, 'icon')" v-bind:src="object.icon" alt="icon">
          {{checkProperties(object, 'rule')? object.rule : null}}:
          {{object.text}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    venueDetails: Array
  },
  methods:{
    checkProperties(obj, prop){
      if(obj.hasOwnProperty(prop) !== true){
        return false
      }else{
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .venue-details{
    margin: var(--spacing);
    border-bottom: solid 0.5px var(--primary);
    div{
      display: grid;
      grid-template-columns: 1fr 3fr;
      p{
        grid-column: 1/2;
        grid-row: 1/2;
      }
      div{
        grid-column: 2/3;
        grid-row: 1/2;
        padding: var(--spacing);
        display: flex;
        flex-wrap: wrap;
        border-bottom: solid 0.5px var(--primary)
      }
      span{
        width: 50%;
      }
    }
  }
</style>
