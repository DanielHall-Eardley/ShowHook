<template>
  <div class="blog-photo">
    <label for="blog-photo-upload" class="primary-button">
      Choose a photo for your new blog
    </label>
    <input 
      type="file"
      accept="image/*"
      hidden
      id="blog-photo-upload"
      @input="uploadPhoto($event)"
    >
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: null,
      }
    },
    methods: {
      uploadPhoto(e) {
        this.error = null 
        const fileType = e.target.files[0].type

        if(!this.checkFileType(fileType)) {
          return this.error = "File type must be of jpg, jpeg or png"
        }
        
        const fileName = e.target.files[0].name

        const photo = {
          fileName: fileName,
          fileSize: this.returnFileSize(e.target.files[0].size)
        }
        
        this.$emit("updatePhoto", photo)
      },
      checkFileType(fileType) {
        const allowedFileTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png"
        ]

        for(let type of allowedFileTypes) {
          if (fileType === type) {
            return true 
          }
        }  

        return false
      },
      returnFileSize(number) {
        if(number < 1024) {
          return number + 'bytes';
        } else if(number >= 1024 && number < 1048576) {
          return (number/1024).toFixed(1) + 'KB';
        } else  if(number >= 1048576) {
          return (number/1048576).toFixed(1) + 'MB';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .blog-photo {
    flex: 1;
    margin: var(--spacing) 0;
    margin-left: var(--spacing);
    
    label {
      display: block;
      font-size: 1.6rem;
    }
  }
</style>