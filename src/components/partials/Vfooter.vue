<template>
  <footer v-if="!(this.$route.path === '/login' || this.$route.path === '/register')" class="site-footer container-fluid text-center">
    <p>made with <i class="fa fa-heart-o"></i> by folks at <a href="">Hidden Founders</a></p>
  </footer>
</template>

<script>
export default {
  name: 'Vfooter'
}
</script>

<style scoped>
.site-footer {
  margin-top: 2em;
}
</style>
