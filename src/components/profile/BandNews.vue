<template lang="html">
  <div class="news">
    <div class="article-container">
      <div v-for="(article, i) in news"
      v-bind:class="i === prevIndex ? 'highlighted' : null">
        <img
        v-bind:src="article.image"
        alt="news banner"
        v-on:click="toggleContent(i)">
        <h3>{{article.title}}</h3>
        <a href="article.link.url">{{article.link.name}}</a>
      </div>
    </div>
    <p v-if="showContent">{{articleSummary}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      articleSummary: "",
      prevIndex: "",
      showContent: false,

    }
  },
  props:{
    news: Array,
  },
  methods:{
    toggleContent(i){
      let article = this.news[i]
      if(this.prevIndex !== i){
        this.articleSummary = article.content
        this.prevIndex = i
        this.showContent = true
      }else if(i === this.prevIndex){
        this.showContent = !this.showContent
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .news{
    margin: var(--spacing);
    border-bottom: solid 0.5px var(--primary);
    .article-container{
      display: flex;
      justify-content: space-between;

      div{
        height: 25vh;
        padding: var(--spacing)
      }
    }
    img{
      height: 55%;
      object-fit: cover;
    }
    p{
      margin-bottom: 0px;
      margin-left: 0px;
      margin-right: 0px;
      padding: var(--spacing);
      border: solid 0.5px var(--primary);
      border: solid 0.5px var(--primary);
    }
    .highlighted{
      border: solid 0.5px var(--primary);
    }
  }
</style>
