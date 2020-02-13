<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
:root {
  --primary: #EE7396;
  --alt-primary:  #555555;
  --secondary-one: #5CD2C2;
  --secondary-two: #307B87;
  --secondary-three: #7C2051;
  --secondary-four: #F4A991;
  --secondary-six: #8b8d8e;
  --light-pink: #f0edef;
  --light-grey: #dbdbdb;
  --heading-font: "Libre Franklin", sans-serif;
  --text-font: "Libre Baskerville", sans-serif;
  --subheading-size: 1.8rem;
  --gradient-three: #7C2051, #F4A991;
  --gradient-two: #307B87, #5CD2C2;
  --gradient-one: #32FBFC, #3214F2;
  --spacing: 2rem;
  --alt-spacing: 1rem;
  --border-radius: 1rem;
  --text-color: white;
  --box-shadow-default: 0 1rem 3rem rgba(black, .4);
  --light-border: solid .5px var(--light-grey);
}

#app {
  height: 100%;
}

*, *::before, *::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
  font-size: 62.5%;
}

body {
  margin: 0;
  height: 100vh;
  font-family: var(--text-font);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}

//shared styles
.section-heading{
  margin-bottom: var(--alt-spacing);
  font-size: 2.5rem;
  font-weight: 200;
}
</style>
