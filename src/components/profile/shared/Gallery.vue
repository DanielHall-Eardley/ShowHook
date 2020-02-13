<template lang="html">
  <section class="pictures">
    <div class="title-edit-container">
      <h3 class="paragraph-heading">Pictures</h3>
      <svg 
        @click="showEdit = !showEdit"
        v-if="editable">
        <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
      </svg>
    </div>
    <img v-for="pic in pictures"
    v-bind:src="pic" alt="Gallery picture">
    <Photos v-if="showEdit" :editable="editable"></Photos>
  </section>
</template>

<script>
  import Photos from "@/components/edit/shared/Photos"
  
  export default {
    data() {
      return {
        showEdit: false
      }
    },
    props: ["pictures", "editable"],
    components: {
      Photos
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .pictures{
    padding: var(--spacing);
    border-bottom: var(--light-border);
    
    img{
      height: 30vh;
      display: inline-block;
      width: calc(98.5% / 4);
      margin-right: 0.5%;
    }
    img:nth-child(4), img:nth-child(8){
      margin-right: 0px;
    }
  }
</style>
