<template lang="html">
  <div class="offer-page">
    <Menu></Menu>
    <OfferSummary></OfferSummary>
    <section class="conversation">
      <General></General>
      <Schedule></Schedule>
      <Other></Other>
    </section>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import OfferSummary from '@/components/offers/OfferSummary.vue'
import General from "@/components/offers/General.vue"
import Schedule from "@/components/offers/Schedule.vue"
import Other from "@/components/offers/Other.vue"

export default {
  components:{
    Menu,
    OfferSummary,
    General,
    Schedule,
    Other
  }
}
</script>

<style lang="scss">
.offer{
}

.conversation{
  background-color: var(--light-pink);
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: [offer-start] 1fr [offer-end message-start] 2fr [message-end];
}
</style>

/*Notes from Jozef
*/
