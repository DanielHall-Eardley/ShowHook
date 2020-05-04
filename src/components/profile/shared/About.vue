<template>
  <section class="about">
    <h3 class="paragraph-heading">About</h3>
    <svg 
      @click="showEdit = !showEdit"
      v-if="editable"
      class="edit-icon">
      <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
    </svg>
    <div class="about-container">
      <div class="about-inline">
        <p v-if="userInformation">
          {{userInformation}} {{name}}
        </p>
        <p>Joined: {{joinedAt}}</p>
      </div>
      <div class="text-container">
        <p class="text">{{text}}</p>
      </div>
      <div class="about-inline">
        <router-link 
          :to="{name: 'messages', params: {userId: userId}}"
          class="default-link">
          Contact {{userType}}
        </router-link>
        <router-link 
          v-if="userInformation" 
          class="default-link"
          :to="{name: 'profile', params: {userId: userId}}">
          View {{name}}'s Profile
        </router-link>
      </div>
    </div>
    <div class="about-edit" v-if="showEdit">
      <textarea 
        type="text" 
        placeholder="Edit Description"
        class="default-input"
        v-on:change="editProfile($event, userType)"
        v-model="description"
        name="description">
      </textarea>  
      </div>
  </section>
</template>

<script>
  import editMixin from "@/mixins/editMixin"

  export default {
    mixins: [editMixin],
    props: ["text", "name", "userId", "joinedAt", "editable", "userType"],
    data() {
      return {
        showEdit: false,
        description: ""
      }
    },
    computed:{
      userInformation () {
        if (this.userType.toLowerCase() === "venue") {
          return "Hosted By:"
        } else if (this.userType.toLowerCase() === "act") {
          return "Members:"
        }

        return false
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/globalStyles/helper";

  .about {
    padding: var(--spacing);
    border-bottom: var(--light-border);
    font-size: 1.8rem;
    position: relative;

    .text-container {
      display: flex;
      justify-content: center;
    }
    .text {
      width: 50rem;
      overflow-wrap: break-word;
      margin-bottom: var(--alt-spacing);
      line-height: 150%;
    }

    .about-inline {
      display: flex;
      font-weight: bold;
      margin-bottom: var(--alt-spacing);

      p{
        margin-right: var(--spacing);
      }

      a {
        margin-right: var(--spacing);
      }
    }

    textarea {
      margin-top: var(--spacing);
      height: 30rem;
      width: 70%;
      font-size: 1.8rem;
      font-family: inherit;
      padding-top: var(--alt-spacing);
    }
  }
</style>
