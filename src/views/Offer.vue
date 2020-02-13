<template lang="html">
  <div class="offer-page">
    <p v-if="error">{{error}}</p>
    <Menu></Menu>
    <BaseOffer :offer="offerData"></BaseOffer>
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
import Menu from '@/components/shared/Menu.vue'
import BaseOffer from '@/components/offers/BaseOffer.vue'
import General from "@/components/offers/General.vue"
import Schedule from "@/components/offers/Schedule.vue"
import Other from "@/components/offers/Other.vue"
import Messages from "@/components/offers/Messages.vue"

import getAdminDataFn from "@/helper/getAdminDataFn"

export default {
  components:{
    Menu,
    BaseOffer,
    General,
    Schedule,
    Other,
    Messages
  },
  data(){
    return {
      error: null
    }
  },
  async created() {
    const offerId = this.$route.params.id

    await this.$store.dispatch("autoLogin", this.$route.fullPath)
    const userId = this.$store.state.userConfig.baseUser.userId

    const responseData = await getAdminDataFn(
      "conversation/" + offerId + " " + userId, 
      this.$store.state.userConfig.token
    )

    if (responseData.messages) {
      this.error = responseData.messages
    }
    this.$store.commit("loadOfferConversation", responseData)
  },
  computed: {
    offerData() {
      return this.$store.state.userConfig.offer
    }
  }
}
</script>

<style lang="scss">
  .offer-page-conversation{
    font-size: 1.6rem;
    display: grid;
    grid-template-columns: [offer-start] 1fr [offer-end message-start] 2fr [message-end];
  }
</style>

