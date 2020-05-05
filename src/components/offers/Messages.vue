<template lang="html">
  <section class="message-list">
    <div 
      class="message" 
      v-for="message in array"
      :class="{
        'highlight-offeror': checkId(message.userId, 'offerorId'), 
        'highlight-receiver': checkId(message.userId, 'receiverId')
      }">
      <h4>{{message.name}}</h4>
      <p>{{message.content}}</p>
      <span>{{formatDate(message.createdAt)}}</span> 
    </div>
  </section>
</template>

<script>
  export default {
    props: ["array", "offerorId", "receiverId"],
    methods: {
      formatDate(date) {
        const options = {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: "numeric",
            minute: "numeric"
          }
        
        return new Date(date).toLocaleString("en-CA", options)
      },
      checkId(id, type) {
        if (id === this[type]) {
          return true
        }

        return false
      },
    }
  }
</script>

<style lang="scss">
  @import "@/globalStyles/variables.scss";

  .message-list {
    padding: var(--spacing);

    .message {
      display: grid;
      grid-row-gap: var(--alt-spacing);
      padding: var(--alt-spacing);
      border-radius: var(--border-radius);

      &:not(:last-child) {
        margin-bottom: var(--spacing);
      }

      span {
        justify-self: end;
      }
    };
  }

  .highlight-offeror {
    background-color: lightblue;
  }

  .highlight-receiver {
    background-color: lightseagreen;
  }
</style>
