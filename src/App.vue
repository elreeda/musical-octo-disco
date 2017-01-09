<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <Vfooter></Vfooter>
  </div>
</template>

<script>
import Navbar from './components/partials/Navbar'
import Vfooter from './components/partials/Vfooter'

export default {
  name: 'App',
  components: {
    Navbar,
    Vfooter
  }
}
</script>

<style>

</style>
