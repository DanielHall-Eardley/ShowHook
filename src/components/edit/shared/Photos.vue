<template>
  <section id="photos">
    <div class="controls">
      <label for="photo-upload" class="primary-button">
        Choose
      </label>
      <input 
        type="file"
        accept="image/*"
        multiple
        hidden
        id="photo-upload"
        @input="choosePhoto($event)">
      <button class='primary-button' @click='getS3Signatures(photoFileArray)'>
        Upload
      </button>
      <button class='primary-button'>Remove Selected</button>
    </div>
    <div class="photo-preview">
      <div v-for="photo in photoPreviewArray" :key="photo.filePath">
        <img :src="photo.filePath" alt="Preview photo">
        <label for="">{{photo.fileSize}}</label>
      </div>
    </div>
  </section>
</template>

<script>
  import postDataFn from '@/helper/postDataFn'

  export default {
    props: ['existingPhotos', 'maxPhoto', 'emitResult'],
    data() {
      return {
        photoPreviewArray: [],
        photoFileArray: []
      }
    },
    methods: {
      choosePhoto(e) {
        this.$store.commit('clearError')
        const max = parseInt(this.maxPhoto) || 10
        const existing = this.existingPhotos || []

        if (this.photoPreviewArray.length + existing.length >= max) {
          return this.$store.commit('updateError', `Maximum of ${max} photo(s)`)
        }

        let photoArray = [...this.photoPreviewArray]
        let fileArray = [...this.photoFileArray]

        for (let i = 0; i < e.target.files.length; i++) {
          const fileType = e.target.files[i].type

          if(!this.checkFileType(fileType)) {
            return this.$store.commit('updateError', "File type must be of jpg, jpeg or png")
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
              this.$store.commit('updateError', 'A duplicate file was ommitted') 
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
        this.photoFileArray = fileArray
      },
      async getS3Signatures(photoFileArray) {
        /*This function submits an array of objects to the server, 
        each object contains a file name and file type for an individual image.
        The server uses this information to create a signed url for S3 upload
        on the client side*/
        this.$store.commit('clearError')

        if (photoFileArray.length < 1) {
          return this.$store.commit('updateError', 'No images selected')
        }
        
        const s3PhotoInfo = []

        /*This is important to ensure consistent destructuring of the
        signed url when it returns from the server*/
        for (let file of photoFileArray) {
          if (this.checkFileName(file.name)) {
            return this.$store.commit('updateError', 'Only "-" "." special characters are allowed are allowed in file names')
          }
          
          const s3FileUpload = {
            fileName: `${file.name}_${this.$uuid.v4()}`,
            fileExtension: file.type
          }

          s3PhotoInfo.push(s3FileUpload)
        }

        const photos = JSON.stringify({
          s3PhotoInfo
        })

        const headers = {
          'Authorization': 'Bearer ' + this.$store.state.token,
          'Content-Type': 'application/json'
        }

        const response = await postDataFn('/admin/photo/s3-signatures', photos, headers, 'POST')
      
        if (response.error) {
          return this.$store.commit('updateError', {error: response.error})
        }
    
        this.savePhotosToS3(response.signatures)
      },
      async savePhotosToS3 (signatureArray) {
        /*This function uses the signed url to complete the image
        upload to S3*/
        console.log(signatureArray)
        const photoUrlArray = []
        for (let url of signatureArray) {

          /*Extract the base url from all the query parameters,
          so it can be saved to the database and referenced to access image*/
          const urlToSave = url.split('?')[0]

          /*Extract base file name to find the correct file on the 
          client side to upload with signed url*/
          const rawFileName = urlToSave.split('_')[0].split('.com/')[1]
          const file = this.photoFileArray.find(file => file.name === rawFileName)

          if (!file) {
            return this.$store.commit('updateError', 'There was a problem uploading your images')
          } 

          //upload image
          const uploadResult = await fetch(url, {
            headers : {
              'Content-Type': file.type,
            },
            body: file,
            method: 'PUT'
          })

          if (uploadResult.status !== 200) {
            return this.$store.commit('updateError', 'There was a problem uploading your images')
          }

          //Store photo url after successful upload
          photoUrlArray.push(urlToSave)
        }
        
        /*Add array of photo urls to local state to be
        stored with product update or creation*/
        if (this.emitResult) {
          return this.$emit('updatePhoto', photoUrlArray)
        } 

        this.$store.commit('addPhotos', {photoUrlArray})
      },
      checkFileName(fileName) {
        /*Check the filename of image to uploaded for special characters*/

        const regex = /[_!@#$%^?*&`~\/\\:"'|;\[\]\{\}=+<>]/gm
        const checkForSpecialChar = fileName.match(regex)
        return checkForSpecialChar
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

<style scoped>
  .photo-preview {
    margin: var(--spacing) 0;
    display: grid;
    grid-auto-rows: 20rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: var(--spacing);
  }

  .photo-preview div {
    position: relative;
  }

  .photo-preview img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
    transition: all .2s;
}

  .photo-preview img:hover {
    filter: grayscale(100%) brightness(20%);
  }

  .photo-preview img:hover + label {
    opacity: 1;
  }

  .photo-preview label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.6rem;
    color: red;
    opacity: 0;
    transition: all .2s;
  }

  .controls {
    display: flex;
    margin-bottom: var(--alt-spacing);
  }

  .controls *:not(:last-child) {
    margin-right: var(--spacing)
  }
</style>