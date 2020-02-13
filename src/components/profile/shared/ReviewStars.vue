<template>
  <span class="review-stars">
    <svg 
      v-for="n in 5" 
      :key="n"
      :class="n <= rating ? 'highlight' : null">
      <use xlink:href="@/assets/sprite.svg#icon-star"></use>
    </svg>
  </span>
</template>

<script>
export default {
  props: ["rating"]
}
</script>

<style lang="scss" scoped>
  .review-stars {
    margin: 0 .5rem;

    svg {
      height: 1.5rem;
      width: 1.5rem;
      fill: var(--alt-primary);
    }

    .highlight {
      fill: var(--primary);
    }
  }
</style>