<template lang="html">
  <section class="messages">
    <div class="messages-normal" v-for="message in messages">
      <figure class="messages-normal-box">
      <img :src="message.pic" alt="Profile picture" class="messages-normal-pic">
      </figure>
      <p class="messages-normal-text"
        :class="message.messageType === 'receiver' ? 'receiver' : 'sender'">
        {{message.text}}
      </p>
    </div>
    <div class="messages-special">
      <h3 class="messages-special-heading">
        Confirmed {{offer.receiver}} arrives on {{offer.date}}
      </h3>
      <p class="messages-special-text">
        Be sure to message {{offer.receiver}} with promotions with updates
      </p>
      <button class="messages-special-change">
        Change or Cancel
      </button>
      <button class="messages-special-link">
        Event Page
      </button>
    </div>
    <div class="messages-special">
      <h3 class="messages-special-heading">
        (name) sent you Counter updateOffer
      </h3>
      <p class="messages-special-text">
        You have 24 hours to review this new offer
      </p>
      <button class="messages-special-change">
        Send Counter Offer
      </button>
      <button class="messages-special-link">
        Accept
      </button>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    messages(){
      return this.$store.state.userConfig.messageArray
    },
    offer(){
      return this.$store.state.userConfig.offer
    },
  },
  methods:{

  }
}
</script>

<style lang="scss">
@import "@/globalStyles/variables.scss";
@import "@/globalStyles/mixins.scss";

  .messages{
    grid-column: message-start / message-end;
    grid-row: 1 / -1;
    background-color: white;
    padding: var(--spacing) 10rem;;
    border-left: var(--light-border);

    &-normal{
      display: flex;
      margin-bottom: 5rem;
      &-box{
        height: 8rem;
      }

      &-pic{
        height: 100%;
        display: block;
        object-fit: cover;
        border-radius: 50%;
      }

      &-text{
        width: 80%;
        padding: var(--spacing);

        border: solid .5px var(--secondary-one);
        border-radius: var(--border-radius);
      }

      .sender{
        margin-left: auto;
        background-color: rgba($secondary-one, .3);
      }

      .receiver{
        margin-right: auto;
        order: -1;
        border: solid .5px var(--secondary-four);
        background-color: rgba($secondary-four, .3);
      }
    }

    &-special{
      border-radius: var(--border-radius);
      border: solid .5px var(--primary);
      padding: var(--spacing);
      margin-bottom: 5rem;

      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: var(--spacing);
      grid-column-gap: var(--spacing);
      &-heading{
        grid-column: 1 / -1;
      }

      &-link{
        grid-row: 3 / 4;
        ;
      }

      &-change{
        grid-row: 3 / 4;
        ;
      }

      &-text{
        grid-column: 1 / -1;
        grid-row: 2 / 3;
      }
    }
  }
</style>
