<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <CognitoAuth />

  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CognitoAuth from './components/CognitoAuth.vue'

export default {
  name: 'App',
  components: {
    CognitoAuth,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
