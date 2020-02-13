<template>
  <div class="title-container">
    <h1>{{data.title}}</h1>
    <svg 
      @click="showEdit = !showEdit"
      v-if="editable"
      class="edit-icon">
      <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
    </svg>
    <span>{{data.address.description}}<b> / </b></span>
    <span>{{showGenres}}<b> / </b></span>
    <ReviewStars 
      :rating="data.overallRating"
      v-if="data.overallRating">
      </ReviewStars>
    <span>{{data.overallRating}} ({{countReviews}})</span>
    <div class="title-edit" v-if="showEdit">
      <input 
        type="text" 
        placeholder="Edit Title"
        class="edit-input"
        v-model="title"
        name="title"
        v-on:change="editProfile($event, userType)"
      >
      <input 
        type="text"
        placeholder="Add Genre or Enter Genre to be removed"
        v-on:change="editProfile($event, userType)"
        class="edit-input"
        name="genres"
        v-model="genres"
      >
      </div>
  </div>
</template>

<script>
  import editMixin from "@/mixins/editMixin"
  import ReviewStars from "@/components/profile/shared/ReviewStars"

  export default{
    mixins: [editMixin],
    components: {
      ReviewStars
    },
    props: ["data", "editable", "userType"],
    data() {
      return {
        showEdit: false,
        title: "",
        genres: ""
      }
    },
    computed:{
      countReviews(){
        let count = this.data.reviews.length
        if (count < 1){
          return "No reviews yet"
        }
        
        return count + " Reviews"
      },
      showGenres(){
        let genres = ""
        for(let genre of this.data.genres){
          genres +=  genre + " "
        }
        return genres
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .title-container{
    padding: var(--spacing);
    border-bottom: var(--light-border);
    position: relative;

    h1{
      font-size: 4rem;
      font-family: var(--heading-font); 
      margin-bottom: var(--alt-spacing);
    }

    span{
      display: inline-block;
      font-size: var(--subheading-size);
    }

    .title-edit {
      margin-top: var(--spacing);
    }

    input {
      height: 4rem;
      width: 35rem;
      margin-right: var(--spacing);
    }

    b {
      font-size: 2.2rem;
      color: var(--primary);
    }
  }
</style>
