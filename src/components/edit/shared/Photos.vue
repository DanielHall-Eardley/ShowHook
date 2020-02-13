<template>
  <section class="photos">
    <h3 v-if="!editable" class="section-heading">Upload photos</h3>
    <label for="photo-upload" class="primary-button">
      Choose photos
    </label>
    <input 
      type="file"
      accept="image/*"
      multiple
      hidden
      id="photo-upload"
      @input="uploadPhoto($event)"
    >
    <p class="error" v-if="error">{{error}}</p>
    <div class="photos-preview">
      <div v-for="photo in photoPreviewArray" :key="photo.filePath">
        <img :src="photo.filePath" alt="Preview photo">
        <label for="">{{photo.fileSize}}</label>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['editable'],
    data() {
      return {
        photoPreviewArray: [],
        error: null
      }
    },
    methods: {
      uploadPhoto(e) {
        let photoArray = [...this.photoPreviewArray]
        this.error = null 

        let fileArray = []
        for (let i = 0; i < e.target.files.length; i++) {
          const fileType = e.target.files[i].type

          if(!this.checkFileType(fileType)) {
            return this.error = "File type must be of jpg, jpeg or png"
          }

          const fileName = e.target.files[i].name
          const filePath = window.URL.createObjectURL(e.target.files[i])

          if (photoArray.length < 1) {
            fileArray.push(e.target.files[i])
            photoArray.push({
              filePath: filePath,
              fileName: fileName,
              fileSize: this.returnFileSize(e.target.files[i].size)
            })
          }else {
            let duplicatePhoto = false
            for (let obj of photoArray) {
              if(fileName === obj.fileName) {
                duplicatePhoto = true
              }
            }
            
            if (duplicatePhoto) {
              this.error = "Error: A duplicate file was ommitted"
            } else {
            fileArray.push(e.target.files[i])
              photoArray.push({
                filePath: filePath,
                fileName: fileName,
                fileSize: this.returnFileSize(e.target.files[i].size)
              })
            } 
          }
        }
        this.photoPreviewArray = photoArray
        this.$store.commit("addPhotos", {
          photos: fileArray,
        })
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
  @import "@/globalStyles/helper.scss";

  .photos {
    label[for="photo-upload"] {
      display: block;
      font-size: 1.8rem;
      width: 50%;
    }

    &-preview {
      margin-top: var(--spacing);
      display: grid;
      grid-auto-rows: 20rem;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      grid-gap: var(--spacing);

      div {
        position: relative;
      }
     
      img {
        height: 100%;
        width: 100%;
        display: block;
        object-fit: cover;
        transition: all .2s;
      }

      img:hover{
        filter: grayscale(100%) brightness(20%);
      }

      img:hover + label {
        opacity: 1;
      }

      label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.6rem;
        color: red;
        opacity: 0;
        transition: all .2s;
      }
    }

    .error {
      font-size: 1.8rem;
      margin: var(--spacing) 0;
    }
  }
</style>