<template>
  <main class="profile">
    <Menu/>
    <h1 class='title'>
      <span class='name'>{{profile.name}}</span>
      <svg class='edit' v-if='routeName === "admin-profile"' @click='showEdit = !showEdit'>
        <use href='@/assets/sprite.svg#icon-edit'></use>
      </svg>
      {{profile.verified ? 'Verified' : 'Not Verified'}}
      <svg class='verified' v-if='profile.verified'>
        <use href='@/assets/sprite.svg#icon-check'></use>
      </svg>
      <svg class='unverified' v-if='!profile.verified'>
        <use href='@/assets/sprite.svg#icon-cross'></use>
      </svg>
    </h1>
    <div role='form' class='edit-profile' v-if='showEdit'>
      <label for="profile-bio">Write something about yourself...</label>
      <textarea class='default-input' id="profile-bio" v-on:input='updateBio($event)'></textarea>
      <label for="photos">Choose a profile picture</label>
      <Photos maxPhoto='1' :emitResult='true' v-on:updatePhoto='updatePhoto($event)'/>
      <button class='primary-button' @click='saveProfileChanges(profile._id)'>
        Update profile
      </button>
    </div>
    <article class="bio">
      <img :src='profile.profilePhoto' alt="Profile image">
      <p>{{profile.name}} has been a member since {{readableDate(profile.createdAt)}}</p>
      <p>{{profile.bio}}</p>
    </article>
    <nav
      class="associated-account" 
      role='navigation' 
      v-if='profile.userType === "Act" || profile.userType === "Venue"'>
      <router-link 
        class='default-link'
        :to='{
          name: profile.userType.toLowerCase(),
          params: {id: profile.userData._id}
        }'>
        {{profile.name}} 
        {{profile.userType.toLowerCase() === 'venue' ? 'is the host of' : 'is a member of'}} 
        {{profile.userData.title}}
      </router-link>
    </nav>
    <section class='ticket-list' v-if='routeName === "admin-profile"'>
      <Ticket :ticket='ticket' v-for='ticket in profile.tickets' :key='ticket._id'/>
    </section>
  </main>
</template>

<script>
import Menu from "@/components/shared/Menu";
import Ticket from '@/components/shared/Ticket'
import Photos from '@/components/edit/shared/Photos'

import getAdminDataFn from '../helper/getAdminDataFn'
import getDataFn from '../helper/getDataFn'
import postDataFn from '../helper/postDataFn'
import readableDateMixin from '@/mixins/readableDateMixin'
import checkLoginMixin from '@/mixins/checkLoginMixin'

export default {
  mixins: [readableDateMixin, checkLoginMixin],
  components: {
    Menu,
    Ticket,
    Photos
  },
  async created() {
    await this.checkLogin()

    const token = this.$store.state.token
    const id = this.$route.params.id
    const profileType = this.$store.state.baseUser.userType
    let response
    if (this.$route.name === "admin-profile") {
      response = await getAdminDataFn(`admin/profile/${profileType}/${id}`, token)
      this.editable = true
    } else {
      response = await getDataFn(`profile/${profileType}/${id}`)
    }

    if (response.error) {
      return this.$store.commit('updateError', response.error) 
    }
 
    this.profile = response.profile
  },
  data() {
    return {
      editable: false,
      profile: {},
      showEdit: false
    }
  },
  methods: {
    updatePhoto(photoArray) {
      this.profile.profilePhoto = photoArray[0]
    },
    updateBio(event) {
      this.profile.bio = event.target.value
    },
    async saveProfileChanges(profileId) {
      const userId = this.$store.state.baseUser.userId
      const profileType = this.$store.state.baseUser.userType
      const token = this.$store.state.token
      
      const headers = {
        "Content-Type": 'application/json',
        'Authorization': 'Bearer ' + token
      }
      
      const body = JSON.stringify({
        bio: this.profile.bio,
        profilePhoto: this.profile.profilePhoto,
        userId,
        profileType,
      })

      const response = await postDataFn('/admin/profile/update', body, headers, 'PUT')

      if (response.error) {
        return this.$store.commit('updateError', response.error)
      }
      
      this.showEdit = false
      this.profile = response.profile
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    }
  }
};
</script>

<style scoped>
  .title {
    display: flex;
    padding: 0 var(--spacing);
    align-items: center;
    border-bottom: var(--light-border);
    height: 8vh;
    color: var(--alt-primary);
  }

  .name {
    color: var(--primary);
    margin-right: var(--spacing);
  }

  .title .edit {
    fill: var(--primary);
    height: 2.2rem;
    width: 2.2rem;
    margin-right: auto;
  }

  .title svg {
    height: 3rem;
    width: 3rem;
  }

  .unverified {
    fill: var(--secondary-three);
  }

  .verified {
    fill: var(--primary);
  }

  .edit-profile {
    padding: var(--spacing);
    border-bottom: var(--light-border);
  }

  .edit-profile label {
    display: block;
    font-size: 1.6rem;
    margin-bottom: var(--alt-spacing);
  }

  .edit-profile textarea {
    margin-bottom: var(--spacing);
    height: 20rem;
    padding: var(--alt-spacing);
  }

  .bio {
    padding: var(--spacing);
    display: grid;
    grid-template-columns: 25rem 1fr;
    grid-template-rows: max-content auto;
    column-gap: var(--spacing);
    row-gap: var(--alt-spacing);
  }

  .bio img {
    height: 25rem;
    width: 100%;
    object-fit: cover;
    margin-right: var(--spacing);
    grid-row: 1 / 3;
  }

  .associated-account {
    margin: 0 var(--spacing);
  }

  .ticket-list {
    padding-top: var(--spacing);
    padding-left: var(--spacing);
    padding-right: var(--spacing);
  }
</style>
