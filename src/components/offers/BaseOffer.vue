<template lang="html">
  <section class="offer">
    <form action="" class="base-offer">
      <span class="sender">
        <b>Offer from: </b>{{offer.offeror}}
      </span>
      <span class="receiver">
        <b>To: </b>{{offer.receiver}}
      </span>
      <span class="date">
        <b>On: </b>{{formattedDate}}
      </span>
      <span class="payment">
        <b>For: </b>${{offer.price}}
      </span>
      <span class="status">
        <b>Status: </b>{{offer.status}}
      </span>
      <router-link 
        class="default-link" 
        :to="{name: 'profile', params: {id: offer.offerorId}}">
        <b>Offeror:</b> {{offer.offerorContact}}
      </router-link>
      <router-link 
        class="default-link" 
        :to="{name: 'profile', params: {id: offer.receiverId}}">
        <b>Recipeant:</b> {{offer.receiverContact}}
      </router-link>
      <button class="submit">Submit Offer</button>
    </form>
  </section>
</template>

<script>


  export default {
    props: ["offer"],
    computed: {
      formattedDate() {
        return new Date(this.offer.bookingDate)
          .toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            year: "numeric",
            formatMatcher: "basic"
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../globalStyles/mixins.scss';
@import '../../globalStyles/helper.scss';

.offer{
  width: 100%;
  font-size: 1.6rem;
  border-bottom: var(--light-border);

  .base-offer{
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--spacing);
    justify-items: center;

    color: var(--alt-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing);
  }

  .sender{

  }

  .receiver{

  }

  .date{

  }

  .payment{

  }

  .submit{
    
  }
}
</style>
