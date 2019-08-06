<template lang="html">
  <div class="information-container">
    <h2>What do you get as a Showhook member?</h2>
    <div class="grid-container">
      <span>
        <b>Professional EPK & Listings</b><br>
        The Electronic Press Kit for musicians is a industry
        standard and the listing for a show space is
        becoming popular. We built this tool as a result of
        direct feedback from indepenant musicians and diy
        venues. We want to give you a platform to showcase
        what you do best, and help you create amazing
        memories.
      </span>
      <span>
        <b>Search</b><br>
        Our search tools allow you to find your next gig, by
        narrowing results by locations, genre, availiblity and
        price, direclty message the band or the venue and
        confirm quickly.
      </span>
      <span>
        <b>Reviews & Metrics</b><br>
        Not only will you be able to review your experience to
        build a platform based on confidence and trust, but
        you will also have your social statistics to allow you to
        gauge
      </span>
      <span>
        <b>Messaging</b><br>
        Feel free to communicate with either musicans or
        venues to develop your network and to book more
        shows.
      </span>
      <span>
          <b>Book shows & sale tickets</b><br>
        Showhook is the most innovative ways to book
        shows, sale tickets, accept pay out (split or flat fee)
        and manage your calendar. We are making booking
        your next shows as simple as pluging in a guitar.
      </span>
      <span>
        <b>Unique networking opportunities</b><br>
        Browse and contact a wide array of oppotunities. As
        our community grows, so does your career.
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/globalStyles/variables.scss';

  .information-container{
    padding: var(--spacing);
    h2{
      font-size: $sub-heading;
      text-align: center;
    }
    .grid-container{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-gap: var(--spacing);

      span{
        font-size: $paragraph
      }
    }
  }
</style>
