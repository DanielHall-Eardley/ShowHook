<template>
  <div id="about-me" v-bind:style="aboutPos">
    <h2 v-if="getUserType">
      Hi, I'm {{about.name.content}}!
    </h2>
    <h3 v-else>
      {{getUserType? "Hosted by" : "About"}}
      {{about.name.content}}</h3>
    <p v-if="getUserType">
      {{about.address}},
      Joined in {{about.dateJoined}}
    </p>
    <p>{{about.bio}}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    about: Object,
    aboutPos: Object
  },
  computed:{
    getUserType(){
      let type = this.about.userType
      if(type === "act" || "venue"){
        return false
      }else if(type === "person"){
        return true
      }
    },
  }
};
</script>

<style lang="scss">
#about-me {
  padding: var(--spacing);
  margin: var(--spacing);
  background: var(--alt-primary);
  border-radius: var(--border-radius);
  p {
    margin-top: 2px;
  }
  h2{
      margin: 5px;
  }
}
</style>
