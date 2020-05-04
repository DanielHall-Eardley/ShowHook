<template lang="html">
  <section class="blog">
    <div class="title-edit-container">
      <h3 class="paragraph-heading">
        {{blogs.length > 0 ? 'Blogs' : 'Add A Blog'}}
      </h3>
      <svg 
        @click="showEdit = !showEdit"
        v-if="editable">
        <use xlink:href="@/assets/sprite.svg#icon-edit"></use>
      </svg>
    </div>
    <div class="blog-container" v-if="blogs.length > 0">
      <div class="blog-pics">
        <button @click="pageBack" class="primary-button">Back</button>
          <div  
            v-for="blog in blogs"
            :key="blog._id"
            @click="showSummary(blog._id)">
            <img :src="blog.imgUrl" alt="Blog Photo">
            <span>{{blog.title}}</span>
          </div>
        <button @click="pageForward" class="primary-button">Forward</button>
      </div>
      <div class="blog-link">
        <p>{{blogs[selectedBlog].content}}</p>
        <button class="default-link" @click="blogDetails">
          Read this blog
        </button> 
      </div>    
    </div>
    <div class="blog-input" v-if="showEdit">
      <input 
        type="text" 
        name="title" 
        v-model="title"
        class="default-input"
        placeholder="Enter a title for your new blog"
      >
      <BlogPhoto :editable="editable" v-on:updatePhoto="photo = $event"></BlogPhoto>
      <textarea 
        name="content" 
        v-model="content" 
        class="default-input"
        placeholder="Enter the content for your new blog">
      </textarea>
      <button class="primary-button" @click="submitBlog">
        Submit Blog
      </button>
    </div>
  </section>
</template>

<script>
  import BlogPhoto from "./BlogPhoto"

  export default {
    components: {
      BlogPhoto
    },
    data(){
      return{
        showEdit: false,
        title: "",
        content: "",
        photo: null,
        page: 0,
        selectedBlog: 2
      }
    },
    props: ["blogs", "editable", "profileId", "userType"],
    methods:{
      blogDetails() {
        const blog = this.blogs[this.selectedBlog]
        this.$store.commit("updateSelectedBlog", {
          blog
        })
        this.$router.push({name: 'blog', params: {
          blogId: blog._id, 
          userType: this.userType,
          profileId: this.profileId
        }})
      },
      submitBlog() {
        if (!this.title || !this.content) {
          alert("Your blog is incomplete")
          return
        }

        this.$store.dispatch("createBlog", {
          title: this.title,
          imgUrl: this.photo,
          content: this.content,
          path: this.$route.fullPath,
        })
      },
      showSummary(id) {
        const index = this.blogs.findIndex(el => el._id.toString() === id.toString())
  
        if (index === -1) {
          alert("There was a problem retrieving this blog")
          return
        }

        this.selectedBlog = index
      },
      pageBack() {
        if (this.blogs.length < 2) {
          return
        }

        this.page++
        this.$store.dispatch("getBlogs", {
          id: this.profileId,
          page: this.page,
          userType: this.userType
        })
      },
      pageForward() {
        if (this.page === 0) {
          return
        }

        this.page--
        this.$store.dispatch("getBlogs", {
          id: this.profileId,
          page: this.page,
          userType: this.userType
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .blog{
    padding: var(--spacing);
    border-bottom: var(--light-border);

    &-input {
      display: flex;
      flex-wrap: wrap;

      p {
        font-size: 1.6rem;
        margin-bottom: var(--spacing);
      }

      input {
        height: 4rem;
        flex: 1;
        margin: var(--spacing) 0;
      }

      textarea {
        width: 100%;
        height: 40vh;
        margin-bottom: var(--spacing);
        padding: var(--alt-spacing);
      }
    }

    &-container {

      .blog-link {
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

        button {
          border: none;
          background-color: inherit;
        }
      }

      .blog-pics {
        display: grid;
        grid-template-columns: min-content repeat(3, 1fr) min-content;
        grid-column-gap: var(--alt-spacing);
        height: 30vh;

        div {
          position: relative;
        }

        button {
          align-self: center;
        }

        img {
          height: 100%;
          object-fit: cover;
          display: block;
        }

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>
