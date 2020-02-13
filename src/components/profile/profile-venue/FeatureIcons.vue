<template>
  <div class="features-container">
    <figure>
      <svg>
        <use :xlink:href="'some/link'"></use>
      </svg>
      <figcaption>{{feature.venueType}}</figcaption>
    </figure>
    <figure>
      <svg>
        <use :xlink:href="'some/link'"></use>
      </svg>
      <figcaption>{{feature.guestLimit}}</figcaption>
    </figure>
    <figure>
      <svg>
        <use :xlink:href="'some/link'"></use>
      </svg>
      <figcaption>{{feature.bathroomType}}</figcaption>
    </figure>
    <figure>
      <svg>
        <use :xlink:href="'some/link'"></use>
      </svg>
      <figcaption>{{feature.numberOfBathrooms}}</figcaption>
    </figure>        
  </div>
</template>

<script>
  export default{
    props:{
      feature: Object,
    }
  }
</script>

<style lang="scss">
  .features-container{
    display: flex;
    justify-content: space-around;
    border-bottom: var(--light-border);
    padding: var(--spacing);

    svg {
      height: 5rem;
      width: 5rem;
    }

    figcaption{
      text-align: center;
      font-size: 1.6rem;
    }
  }
</style>
