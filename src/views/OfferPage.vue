<template lang="html">
  <div class="offer-page">
    <Menu></Menu>
    <Error errorType="error"></Error>
    <header v-if="offer.status === 'Pending'">
      <h1>
        {{
          checkUserType === "receiver" ? 
          "Accept to begin negotiations with " + offer.offerorName + " of " + offer.offerorTitle :
          "Awaiting a response from " + offer.receiverName + " of " + offer.receiverTitle
        }}
      </h1>
      <div class="button-container">
        <button class="alt-button" @click="deleteOffer(offer._id)">
          {{checkUserType === "receiver" ? "Reject" : "Cancel Offer"}}
        </button>
        <button 
          v-if="checkUserType === 'receiver'"
          class="primary-button"
          @click="updateOffer('Negotiating', offer._id)">
          Accept
        </button>
      </div>
    </header>
    <header v-if="offer.status === 'Negotiating'">
      <h1>
        You are negotiating with {{offer[checkUserType + "Name"]}}
      </h1>
      <div class="button-container">
        <button class="alt-button" @click="deleteOffer(offer._id)">
          Cancel Offer
        </button>
        <button @click="finalizeShow" class="primary-button">
          Accept Show Setup
        </button>
      </div>
    </header>
    <section class="offer-page-conversation">
      <div class="offer-page-details">
        <General :show="show"></General>
        <Schedule :show="show"></Schedule>
        <Other :show="show"></Other>
        <button @click="submitShowChanges">Submit Changes</button>
      </div>
      <div class="offer-page-messages">
        <Messages 
          :array="offer.messageArray"
          :offerorId="offer.offerorId"
          :receiverId="offer.receiverId">
        </Messages>
      </div>
    </section>
    <SendMessage :offerId='offer._id'/>
  </div>
</template>

<script>
import Menu from '@/components/shared/Menu.vue'
import Error from '@/components/shared/Error.vue'
import General from "@/components/offers/General.vue"
import Schedule from "@/components/offers/Schedule.vue"
import Other from "@/components/offers/Other.vue"
import Messages from "@/components/offers/Messages.vue"
import SendMessage from "@/components/offers/SendMessage.vue"

import getDataFn from "@/helper/getDataFn"

export default {
  components:{
    Menu,
    General,
    Schedule,
    Other,
    Messages,
    Error, 
    SendMessage
  },
  async created() {
    this.$store.commit("clearError")
    const offerId = this.$route.params.id
    await this.$store.dispatch("autoLogin", this.$route.fullPath)

    const responseData = await getDataFn("conversation/" + offerId)

    if (responseData.messages) {
      this.$store.commit("upateError", responseData.messages)
    }
    this.$store.commit("loadOffer", responseData)

    const io = this.$store.state.appConfig.namespaces.offer
    
    io.emit('joinRoom', {
        roomId: responseData.offer._id.toString()
      }
    )

    io.on('updateMessage', message => {
      this.$store.commit('loadOfferMessage', message)
    })
  },
  updated () {
    const list = document.querySelector('.offer-page-messages')
    list.scroll({
      top: list.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  },
  beforeDestroy () {
    const io = this.$store.state.appConfig.namespaces.offer

    io.emit('leaveRoom', {
        roomId: this.offer._id.toString()
      }
    )
  },
  methods: {
    deleteOffer(id) {
      this.$store.dispatch("deleteOffer", {
        path: this.$route.fullPath,
        offerId: id
      })
    },
    updateOffer(status, id) {
      this.$store.dispatch("updateOffer", {
        offerId: id,
        status: status, 
        path: this.$route.fullPath
      })
    },
    submitShowChanges() {

    },
    finalizeShow() {

    }
  },
  computed: {
    offer() {
      return this.$store.state.userConfig.offer
    },
    show() {
      return this.$store.state.userConfig.showSetup
    },
    checkUserType() {
      const id = this.$store.state.userConfig.baseUser.userId

      if (id === this.offer.receiverId) {
        return "receiver"
      }

      return "offeror"
    },
  }
}
</script>

<style lang="scss">
  .offer-page {
    height: 100%;

    header {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 10vh;
      padding: 0 var(--spacing);
      border-bottom: var(--light-border);
      color: var(--primary);

      h1 {
        margin: var(--spacing) 0;
      }

      .button-container {
        margin-left: auto;
    
        button:last-child {
          margin-left: var(--spacing);
        }
      }
    }
  }

  .offer-page-conversation{
    font-size: 1.6rem;
    display: grid;
    grid-template-columns: 1.4fr 2fr;
    height: 70vh;
  }

  .offer-page-details {
    height: 100%;
    overflow-y: auto;
    border-right: var(--light-border);
  }

  .offer-page-messages {
    height: 100%;
    overflow-y: auto;
  }
</style>

