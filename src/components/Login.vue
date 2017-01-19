<template>
  <main class="site-main">
    <div class="auth-container">
      <div class="auth-form container">
        <h1 class="text-center">Login</h1>

        <form class="form well" v-on:submit.prevent="login">
          <div v-if='responseMsg !== null' class="messages text-center">
            <p class="text-danger">{{responseMsg}}</p>
          </div>
          <div class="form-group">
            <label for="login-email-address">Username</label>
            <input type="text" class="form-control invalid" id="login-email-address" placeholder="Username" v-model="credentials.username" />
            <p v-show='!validation.username' class="text-danger">Enter your username</p>
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" class="form-control" id="login-password" placeholder="Password" v-model="credentials.password" />
            <p v-show='!validation.password' class="text-danger">You can't login without a password</p>
            <div class="text-right">
              <a href="">Forgotten password?</a>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-default btn-block"
            :disabled="isValid && toArray(credentials).every(v => v !== null) ? false : true">LOGIN</button>
        </form>

        <div class="well text-center">
          <router-link to='/register'>You don't have an account? click here.</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import toArray from 'lodash/toArray'
import auth from '../auth/index'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        username: null,
        password: null
      },
      responseMsg: null
    }
  },
  methods: {
    login () {
      if (this.isValid) {
        auth.login(this, this.credentials, loggedIn => {
          if (!loggedIn) {
            this.responseMsg = 'Something weirdo happend, Try later m8.'
          } else {
            this.$router.push('/')
          }
        })
      }
    }
  },
  computed: {
    validation () {
      return {
        username: this.credentials.username === null || !!this.credentials.username,
        password: this.credentials.password === null || !!this.credentials.password
      }
    },
    isValid () {
      const validation = this.validation
      return Object.keys(validation).every((key) => validation[key])
    },
    toArray () {
      return toArray
    }
  }
}
</script>

<style scoped>
.auth-container {
  height: 100vh;
}
.auth-form {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 320px;
}
</style>
