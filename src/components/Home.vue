<template>
  <div class="home">
    <div class="site-hero jumbotron">
      <div class="container text-center">
        <h1 class="title text-uppercase">Markdown to Markup</h1>
        <p class="lead">A free web text editor that supports <em>markdown</em>.</p>
        <router-link v-if="!loggedIn" class="btn btn-primary btn-lg text-uppercase" to="/register">signup now</router-link>
      </div>
    </div>
    <main class="site-main container">
      <div class="title row text-center">
        <h2>Latest public documents</h2>
      </div>
      <Documents></Documents>
    </main>
  </div>
</template>

<script>
import Documents from './Documents'

// import auth from './auth'

export default {
  name: 'hello',
  components: {
    Documents
  },
  data () {
    return {
      loggedIn: !!localStorage.getItem('idToken')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
