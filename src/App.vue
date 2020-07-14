<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { apiHost } from './global.js'

export default {
  async beforeCreate () {
    const defaultNameSpace = io.connect(apiHost)
    const namespaces = ['booking', 'bookingSummary']

    if (!this.$store.state.namespaces) {
    const nsObj = {}

    namespaces.forEach(ns => {
      nsObj[ns] = io.connect(apiHost + '/' + ns)
    })

    this.$store.commit('createNameSpaces', nsObj)
    }
    
    defaultNameSpace.on('testClient', data => {
      console.log(data.msg)
      defaultNameSpace.emit('testServer', {msg: 'Server is connected to main namespace'})
      defaultNameSpace.emit('sendNameSpaces', namespaces)
    })
  }
}
</script>

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
  --pink-border: solid .5px var(--primary);
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

.paragraph-heading{
  margin-bottom: var(--alt-spacing);
  font-size: 2rem;
  font-weight: 200;
  color: var(--primary);
}

.btn-disabled {
  background-color: var(--light-grey);
  color: var(--secondary-six);
  padding: var(--alt-spacing);
  border-radius: var(--border-radius);
}

.pink-highlight {
  color: var(--primary);
  margin: 0 6px;
}

.router-link-exact-active {
  color: var(--primary) !important;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
}

img::after {
  content: 'Image not found';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--light-pink);
  color: var(--secondary-six);
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 1.6rem;
  word-spacing: 3px;
  line-height: 140%;
}
</style>
