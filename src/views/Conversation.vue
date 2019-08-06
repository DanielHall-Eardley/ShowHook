<template lang="html">
  <div class="offer-page">
    <Menu></Menu>
    <OfferSummary></OfferSummary>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import OfferSummary from '@/components/offers/OfferSummary.vue'

export default {
  components:{
    Menu,
    OfferSummary
  }
}
</script>

<style lang="scss">
</style>
