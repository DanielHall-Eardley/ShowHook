<template lang="html">
  <div class="show-summary">
    <header>
      <span class="highlight">{{show.actTitle}}</span>
      <span> performing at </span>
      <span class="highlight">{{show.venueTitle}}</span>
    </header>
    <p>{{show.description}}</p>
    <footer>
      <span class='price'>${{show.price}}</span>
      <router-link 
        class='default-link'
        :to='{
          name: "admin-show", 
          params: {showId: show._id},
          query: {idType: userIdType}
        }'>
        View details
      </router-link>
      <span class="date highlight">{{readableDate(show.showDate)}}</span>
    </footer>
  </div>
</template>

<script>
import formatDate from '@/helper/formatDate'

export default {
  props: ['show'],
  methods:{
    readableDate(date) {
      return formatDate(date, false)
    },
  },
  computed: {
    userIdType() {
      return this.$store.state.baseUser.userType.toLowerCase() + 'Id'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/globalStyles/helper.scss';

.show-summary{
  border-radius: var(--border-radius);
  font-size: 1.8rem;
  border: solid var(--light-pink) 1px;
  height: 16rem;
  display: flex;
  flex-direction: column;
  margin-right: var(--alt-spacing);
  flex: 1 0 48rem;
}

header {
  background-color: var(--light-pink);
  padding: var(--alt-spacing);
}

.highlight {
  color: var(--primary);
}

p {
  padding: var(--alt-spacing);
  flex: 1;
  overflow: hidden;
}

footer {
  display: flex;
  align-items: center;
  padding-bottom: var(--alt-spacing);
  padding-right: var(--alt-spacing);
  padding-left: var(--alt-spacing);

  .price {
    margin-right: auto;
  }

  .date {
    margin-left: var(--alt-spacing);
  }
}
</style>
