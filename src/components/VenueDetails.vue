<template lang="html">
  <div class="venue-details">
    <div v-for="(det, i) in venueDetails">
      <p v-bind:style="getGridRow(i)">
        <b>{{det.subHeading}}</b>
      </p>
      <div>
        <span v-bind:style="getGridRow(i)" v-for="object in det.content">
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
    getGridRow(i){
      let firstCord = i + 1
      firstCord.toString()
      let secondCord = i + 2
      secondCord.toString()
      let rowCord = firstCord + "/" + secondCord
      console.log(rowCord)
      return {
        gridRow: rowCord
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .venue-details{
    div{
      display: grid;
      grid-template-columns: 1fr 3fr;
      margin: var(--spacing);
      p{
        grid-column: 1/2;
      }
      div{
        grid-column: 2/3;
        margin: var(--spacing);
        display: flex;
        flex-wrap: wrap;
      }
      span{
        width: 50%;
      }
    }
  }
</style>
