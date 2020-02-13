<template>
  <div class="offer-summary-item">
    <img :src="summary.senderPic" alt="Profile picture">
    <span class="offer-summary-list-item-name">{{summary.sender}}</span>
    <span class="offer-summary-list-item-message">{{}}</span>
    <span class="offer-summary-list-item-offer"
      :style="highlight(summary.status)">
      {{item.offerStatus}}
    </span>
    <span class="offer-summary-list-item-timestamp">{{summary.createdAt}}</span>
  </div>
</template>

<script>
  export default {
    props: ["summary"]
  }
</script>

<style>

</style>