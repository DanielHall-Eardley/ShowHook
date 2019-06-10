<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
:root {
  --primary: #EE7396;
  --alt-primary:  #d6d6d6;
  --secondary-one: #5CD2C2;
  --secondary-two: #307B87;
  --secondary-three: #7C2051;
  --secondary-four: #F4A991;
  --secondary-six: #8b8d8e;
  --heading-font: "Benton Sans";
  --text-font: "Helevetica Neue";
  --subheading-size: 1.2rem;
  --gradient-three: #7C2051, #F4A991;
  --gradient-two: #307B87, #5CD2C2;
  --gradient-one: #32FBFC, #3214F2;
  --spacing: 20px;
  --alt-spacing: 10px;
  --border-radius: 10px;
  --text-color: white;
  --divider-height: 1vh
}

#app {
  height: 100%;
}

body {
  margin: 0px;
  height: 100vh;
}

a, .fake-link {
  text-decoration: none;
  color: black;
  &:hover {
    color: var(--primary)
  }
  &:active {
    color: var(--alt-primary)
  }
}
</style>
