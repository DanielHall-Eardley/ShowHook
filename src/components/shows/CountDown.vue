<template lang="html">
  <div class="countdown">
    <VueCountdown :time="countDown">
      <template slot-scope="props">{{ props.days }} days | {{ props.hours }} hours | {{ props.minutes }} minutes</template>
    </VueCountdown>
  </div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
  props: {
    show: Object,
    toggleEdit: Boolean
  },
  components:{
    VueCountdown
  },
  computed: {
    countDown(){
      let currentDate = new Date()
      let showDate = new Date(this.show.date)
      let diff =  showDate - currentDate
      return diff
    }
  },
}
</script>

<style lang="scss" scoped>
  .countdown{
    background-color: var(--alt-primary);
    color: white;
    padding: var(--spacing);
    border-radius: 5px;
    span{
      display: block;
      font-size: 1.2rem;
      text-align: center;
    }
  }
</style>
