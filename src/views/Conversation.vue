<template lang="html">
  <div class="offer-page">
    <Menu></Menu>
    <OfferSummary></OfferSummary>
    <section class="offer-page-conversation">
      <div class="offer-page-details">
        <General></General>
        <Schedule></Schedule>
        <Other></Other>
      </div>
      <div class="offer-page-messages">
        <Messages></Messages>
      </div>
    </section>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import OfferSummary from '@/components/offers/OfferSummary.vue'
import General from "@/components/offers/General.vue"
import Schedule from "@/components/offers/Schedule.vue"
import Other from "@/components/offers/Other.vue"
import Messages from "@/components/offers/Messages.vue"

export default {
  components:{
    Menu,
    OfferSummary,
    General,
    Schedule,
    Other,
    Messages
  }
}
</script>

<style lang="scss">
.offer{
}

.offer-page-conversation{
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: [offer-start] 1fr [offer-end message-start] 2fr [message-end];
}
</style>

/*Notes from Jozef
*/
