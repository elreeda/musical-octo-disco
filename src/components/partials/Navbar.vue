<template>
  <header v-if="!(this.$route.path === '/login' || this.$route.path === '/register')" class="site-header">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">markdown^</router-link>
        </div>
        <ul class="nav navbar-nav navbar-right text-capitalize">
          <li v-if="this.$route.path !== '/browse-documents'"><router-link to="/browse-documents">browse documents</router-link></li>
          <li v-if="loggedIn"><router-link to="/editor" class="btn btn-success">+ new document</router-link></li>
          <li v-if="!loggedIn"><router-link class="btn btn-primary" to="/login">login</router-link></li>
          <li v-if="loggedIn"><a class="btn btn-primary" v-on:click="logout">logout</a></li>
        </ul>
      </div>
    </nav>

    <span v-if="false" class="spinner">
      <i class="fa fa-spinner"></i>
      <span class="text">Loading...</span>
    </span>
  </header>
</template>

<script>
import auth from '../../auth/index'

export default {
  name: 'Navbar',
  data () {
    return {
      loggedIn: auth.checkAuth()
    }
  },
  methods: {
    logout () {
      auth.logout()
      this.$router.push('/')
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }
}
</script>

<style scoped>
/**
 * site-header
 */
.site-header {
  position: relative;
}
.site-header .navbar {
  margin-bottom: 0;
}
.site-header .spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #fff;
}

.editor-wrapper .documents-nav {
  padding: 0;
  height: 100%;
  padding-bottom: 5em;
  overflow-y: auto;
}
.editor-wrapper .documents-nav .nav li a {
  padding-top: 1em;
  padding-bottom: 1em;
}
.editor-wrapper .documents-nav .nav li.active a {
  padding-top: 2em;
  padding-bottom: 2em;
  border-left: .5em solid #F77E40;
}
/**
 * spinner
 */
.spinner {
  display: inline-block;
}
@-webkit-keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.spinner .fa {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  margin-right: .25em;
}
</style>
