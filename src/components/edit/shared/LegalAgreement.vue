<template lang="html">
  <div class="laws-container">
    <h3 class="section-heading">Terms and Conditions</h3>
    <p>
      <b>Take a moment to review your local laws.
        We want to make sure you get off to a great start!
      </b>
    </p>
    <p>
      Please educate yourself about the laws in your jurisdiction
      before listing your space.
    </p>
    <p>
      Most cities have rules covering venue sharing, and the specific
      codes and ordinances can appear in many places(such as zoning,
      building, licensing or tax codes). In most places you must register
      to get a permit or obtain a license before you list your property
      or accept guests. You may also be resposible for collecting and
      remitting taxes. In some places venue sharing may be prohibited.
    </p>
    <p>
      Since you are responsible for your own decision to list or book,
      should get comfortable with the applicable rules before listing on
      .shh. To get you started we offer some helpful resources under
      <a>'Your City Laws'</a>
    </p>
    <p>
      By accepting our Terms of Service and listing your space, you certify
      that you will follow applicable laws and regulations
    </p>
    <div class="accept-container">
      <input 
        type="checkbox" 
        id="legal" 
        hidden
        v-on:change="addLegalAgreement($event)"
      >
      <label for="legal">
        Click to confirm you have read and accept the terms and conditions.
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addLegalAgreement(e) {
      this.$store.commit("addLegalAgreement", e.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
  .laws-container {
    font-size: 1.8rem;

    p {
      margin-bottom: var(--alt-spacing);
    }
  }

  .accept-container {
    label::after {
      content:"";
      display: inline-block;
      height: 2rem;
      width: 2rem;
      border: solid var(--primary);
      border-radius: .5rem;
      margin-left: var(--alt-spacing);
      margin-bottom: -4px;
      }

    input:checked + label::after {
      background-color: var(--primary);
    }
  }
</style>
