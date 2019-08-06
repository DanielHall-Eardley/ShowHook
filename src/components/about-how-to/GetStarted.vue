<template lang="html">
  <div class="get-started-container">
    <h1 class='get-started-heading'>
      <span class="heading-main">Let's make booking shows easy</span>
      <span class='heading-sub'>Connect, book more gigs and grow your career</span>
    </h1>
    <div class="get-started-grid-container">
      <div>
        <h2>I'm a Musician</h2>
        <ul>
          <li>I wants more gigs</li>
          <li>I want industry exposure</li>
          <li>My band needs a professional EPK</li>
          <li>I want to network with other musicians</li>
        </ul>
        <button>Get Started</button>
      </div>
      <div>
        <h2>I'm a Venue</h2>
        <ul>
          <li>I want to find great talent</li>
          <li>I need to advertise playing oppertunities</li>
          <li>I need help with bookings</li>
          <li>I need to find musicans to match my venue</li>
        </ul>
        <button>Get Started</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/globalStyles/variables.scss';
@import '@/globalStyles/mixins.scss';

  .get-started-container{
    background-image: url('https://via.placeholder.com/1000');
    padding: var(--spacing);
    .get-started-heading{
      text-align: center;
    }
    .get-started-grid-container{
      margin: 0px auto;
      width: 80%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 5%;
      div{
        border: solid 5px var(--primary);
        padding: var(--spacing);
        h2{
          text-align: center;
        }
        ul{
          font-size: $paragraph;
        }
        button{
          margin: 0px auto;
          display: block;
          @include button
        }
      }
    }
  }
</style>
