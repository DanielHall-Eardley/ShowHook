<template>
  <div class="send-message">
    <input 
      type="text" 
      class='default-input'
      v-model='input'
      v-on:keyup.enter='sendMessage'>
    <button class='primary-button' @click='sendMessage'>Send</button>
  </div>
</template>

<script>
export default {
  props: ['offerId'],
  data () {
    return {
      input: ''
    }
  },
  methods: {
    sendMessage () {
      this.$store.dispatch('sendMessage', {
        messageType: 'offer',
        message: this.input,
        offerId: this. offerId
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .send-message {
    display: flex;
    height: 10vh;
    padding: var(--alt-spacing);
    border-top: var(--light-border);

    & input {
      flex: 1;
      margin-right: var(--spacing);
    }
  }
</style>