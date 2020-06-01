<template lang="html">
  <div class="show-summary">
    <header>
      <span class="highlight">{{show.actTitle}}</span>
      <span> will be performing at </span>
      <span class="highlight">{{show.venueTitle}}</span>
    </header>
    <p>{{show.description}}</p>
    <footer>
      <span>$:{{show.price}}</span>
      <router-link 
        class='default-link'
        :to='{name: "show", params: {id: show._id}}'>
        View details
      </router-link>
      <span class="highlight">{{readableDate(show.showDate)}}</span>
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
  justify-content: space-between;
  padding-bottom: var(--alt-spacing);
  padding-right: var(--alt-spacing);
  padding-left: var(--alt-spacing);
}
</style>
