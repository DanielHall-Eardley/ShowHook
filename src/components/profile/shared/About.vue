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
        <p>
          {{userInformation}} {{name}}
        </p>
        <p>Joined: {{joinedAt}}</p>
      </div>
      <p class="text">{{text}}</p>
      <div class="about-inline">
        <router-link 
          :to="{name: 'messages', params: {userId: userId}}"
          class="default-link">
          Contact {{userType}}
        </router-link>
        <router-link 
          class="default-link"
          :to="{name: 'profile', params: {id: userId}}">
          View {{name}}'s Profile
        </router-link>
        <router-link 
          v-for='member in members'
          :key='member._id'
          :to="{name: 'profile', params: {id: member._id}}">
          {{member.name}}
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
    props: ["text", "name", "userId", "joinedAt", "editable", "userType", 'members'],
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

    .text {
      overflow-wrap: break-word;
      margin-bottom: var(--alt-spacing);
      line-height: 150%;
      word-spacing: 2px;
      margin: var(--spacing) 5rem;
    }

    .about-inline {
      display: flex;
      font-weight: bold;
      margin-bottom: var(--alt-spacing);
      align-items: center;

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
