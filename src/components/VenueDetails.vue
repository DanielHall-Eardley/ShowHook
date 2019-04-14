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
    padding: var(--spacing);
    background: var(--alt-primary);
    border-radius: var(--border-radius);
    margin: var(--spacing);
    div{
      display: grid;
      grid-template-columns: 1fr 3fr;
      margin: var(--spacing);
      border-bottom: solid 1px var(--primary);
      p{
        grid-column: 1/2;
        grid-row: 1/2;
      }
      div{
        grid-column: 2/3;
        grid-row: 1/2;
        margin: var(--spacing);
        display: flex;
        flex-wrap: wrap;
        border: none;
      }
      span{
        width: 50%;
      }
    }
  }
</style>
