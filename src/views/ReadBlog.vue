<template>
  <main class="read-blog">
    <div class="banner-container">
      <img :src="blog.imgUrl" alt="Blog Banner Photo">
      <h1>{{blog.title}}</h1>
    </div>
    <div class="text-container">
      <p>{{blog.content}}</p>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    const blog = this.$store.state.userConfig.selectedBlog

    if (!blog) {
      this.$store.dispatch("getBlogDetails", {
        blogId: this.$route.params.blogId,
        profileId: this.$route.params.profileId,
        userType: this.$route.params.userType,
      })
    }
  },
  computed: {
    blog() {
      return this.$store.state.userConfig.selectedBlog
    }
  }
}
</script>

<style lang="scss" scoped>
  .read-blog {

    .banner-container {
      width: 100%;
      height: 50vh;
      position: relative;

      img {
        height: 100%;
        object-fit: cover;
        display: block;
      }

      h1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .text-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 1.6rem;
        margin-top: var(--spacing);
        width: 50rem;
        height: 10rem;
        overflow: hidden;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        line-height: 150%;
      }
    }
  }
</style>