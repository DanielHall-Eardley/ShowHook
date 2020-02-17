<template lang="html">
  <div class="input-details">
    <keep-alive>
      <component :is="getComponent" ></component>
    </keep-alive>
  </div>
</template>

<script>
import Genres from '@/components/edit/shared/Genres.vue'
import LegalAgreement from '@/components/edit/shared/LegalAgreement.vue'
import Address from '@/components/edit/shared/Address'
import Details from "../edit-venue/Details"
import Amenities from "../edit-venue/Amenities"
import Photos from "../shared/Photos"
import Description from "../edit-venue/Description"
import Preferences from "../edit-venue/Preferences"
import Pricing from "@/components/edit/shared/Pricing"
import Rules from "../edit-venue/Rules"
import Bio from "../edit-act/Bio"
import Links from "../edit-act/Links"
import Requirements from "../edit-act/Requirements"
import Type from "../edit-act/Type"

export default {
  components:{
    Genres,
    LegalAgreement,
    Address,
    Details,
    Amenities,
    Photos,
    Description,
    Preferences,
    Pricing,
    Rules,
    Links,
    Bio,
    Requirements,
    Type
  },
  computed:{
    getComponent(){
      return this.$store.getters.getComponent.name
    }
  },
}
</script>

<style lang="scss">
  .input-details{
    overflow-y: scroll;
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    padding: var(--spacing);

    h1{
      color: var(--primary);
      font-size: 3rem;
    }
  }

  .slide-enter-active{
    animation: slide-in .3s ease-out forwards;
  }

  .slide-leave-active{
    animation: slide-out .3s ease-out forwards;
  }

  @keyframes slide-in{
    0%{
      transform: translateX(-100%);
    }

    100%{
      transform: translateX(0);
    }
  }

  @keyframes slide-out{
    0%{
      transform: translateX(0);
    }

    100%{
      transform: translateX(110%);
    }
  }
</style>
