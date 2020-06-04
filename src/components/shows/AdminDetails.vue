<template>
  <section class='admin-info' v-if='editable'>
    <h3 class='section-heading'>Info for the Act and Venue</h3>
    <div class="flex-container">
      <div class="guestlist">
        <p>Guestlist</p>
        <ul>
          <li v-for="guest in show.guestlist" :key='guest'>
            {{guest}}
          </li>
        </ul>
      </div>
      <div class="act-requirements">
        <p>Act Requirements</p>
        <ul>
          <li 
            v-for="requirement in show.actRequirements" 
            :key='requirement'>
            {{requirement}}
          </li>
        </ul>
      </div>
      <div class="venue-requirements">
        <p>Venue Requirements</p>
        <ul>
          <li 
            v-for="requirement in show.venueRequirements" 
            :key='requirement'>
            {{requirement}}
          </li>
        </ul>
      </div>
      <div class="schedule-summary">
        <p>Schedule</p>
        <ul>
          <li v-for='(task, key) in show.schedule' :key='key'>
            {{key}}: {{task.start}} - {{task.end}}
          </li>
        </ul>
      </div>
    </div>
    <div class="price-fixed" v-if="show.priceType === 'Fixed'">
      <span class='highlight-pink'>{{show.venueTitle}}</span>
      <span> will pay </span>
      <span class='highlight-pink'>{{show.actTitle}}</span>
      <span class='highlight-pink'> ${{show.price}}</span>
      <span> for this show</span>
    </div>
    <div class="price-split" v-if="show.priceType === 'Split'">
      <span class='highlight-pink'>{{show.venueTitle}}</span>
      <span> will receive {{show.venueProfit}}%  and </span>
      <span class='highlight-pink'>{{show.actTitle}}</span>
      <span class='highlight-pink'>will receive {{show.actProfit}} </span>
      <span> of the profits from ticket sales</span>
    </div>
  </section>
</template>

<script>
export default {
  props: ['show', 'editable']
}
</script>

<style lang='scss' scoped>
  .admin-info {
    padding: var(--spacing);
    padding-right: 0;
    border-bottom: var(--light-border);
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;

    p {
      margin-bottom: var(--alt-spacing);
      font-size: 1.7rem;
    }

    div {
      flex: 1 0 30rem;
      background-color: var(--light-pink);
      min-height: 12rem;
      border-radius: var(--border-radius);
      padding: var(--alt-spacing);
      margin-bottom: var(--spacing);
      margin-right: var(--spacing);
    }

    .schedule-summary ul{
      margin-left: 2rem;
      font-size: 1.6rem;
    }
  }

  .price-fixed, .price-split {
    font-size: 2rem;
  }
</style>