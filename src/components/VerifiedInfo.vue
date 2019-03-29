<template>
  <div id="verified-info" v-bind:style="infoPos">
    <p><b>Verified Information</b></p>
    <div v-for="info in contactInfo">
      <img v-bind:src="showIcon(info.verified)" alt="icon">
      <span>{{info.content}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      infoPos: Object,
      contactInfo: Array
    },
    methods:{
      showIcon(v){
        if(v){
          return "https://via.placeholder.com/20"
        }else{
          return "https://via.placeholder.com/30"
        }
      }
    }
  }
</script>

<style lang="scss">
  #verified-info{
    margin: var(--spacing);
    padding: var(--spacing);
    background: var(--primary);
    p{
      border-bottom: solid 0.5 black;
    }
    img{
      height: 5vh;
      margin-right: var(--spacing);
    }
    div{
      display: flex;
      padding: var(--spacing);
      align-items: center;
      border-bottom: solid 0.5px black;
    }
  }

</style>
