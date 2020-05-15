<template lang="html">
  <div id="profile-summary">
    <div v-for="icon in iconArray">
      <img v-bind:src="icon.src" alt="icon">
      <span>{{icon.label}}</span>
    </div>
    <router-link to="/contact/:id">Contact host</router-link>
    <p>Response time:<b> {{responseData.time}}</b></p>
    <p>Response rate:<b> {{responseData.rate}}</b></p>
  </div>
</template>

<script>
export default {
  computed:{
    iconArray(){
      let user = this.$store.state.user
      let name = user.name
      let email = user.email
      let phone = user.phone
      let reviews = user.reviews
      let iconArray = []
        if(name.verified &&
          email.verified &&
          phone.verified === true &&
          reviews.length > 0){
          iconArray = [
            {label: "verified", src: "https:via.placeholder.com/100"},
            {label: "reviewed", src: "https:via.placeholder.com/100"},
          ]
        }else{
          iconArray = [
            {label: "unverified", src: "https:via.placeholder.com/100"},
            {label: "no reviews yet", src: "https:via.placeholder.com/100"},
          ]
        }
        return iconArray
    },
    responseData(){
     return this.$store.state.user.responseData
    }
  }
}
</script>

<style lang="scss">
#profile-summary{
  display: flex;
  height: 5vh;
  padding: var(--spacing);
  justify-content: space-between;
  div{
    display: flex;
    height: 100%;
    justify-content: space-between;
    span{
      margin-left: var(--spacing);
    }
  }
  img{
    height: 100%;
    object-fit: cover;
  }
}
</style>
