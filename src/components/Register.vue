<template>
  <main class="site-main">
    <div class="auth-container">
      <div class="auth-form container">
        <h1 class="text-center">Register</h1>

        <form class="form well" v-on:submit.prevent="register">
          <div v-if='responseMsg !== null' class="messages text-center">
            <p class="text-danger">{{responseMsg}}</p>
          </div>
          <div class="form-group">
            <label for="register-username">Username</label>
            <input type="text" class="form-control" id="register-username" placeholder="Username" v-model="newUser.username" />
            <p v-if='!validation.username' class="text-danger">Your username sir ?</p>
          </div>
          <div class="form-group">
            <label for="register-email-address">Email address</label>
            <input type="email" class="form-control" id="register-email-address" placeholder="Email" v-model="newUser.email" />
            <p v-if='!validation.email' class="text-danger">Your email ? a valid one ?</p>
          </div>
          <div class="form-group">
            <label for="register-password">Password</label>
            <input type="password" class="form-control" id="register-password" placeholder="Password" v-model="newUser.password" />
            <p v-if='!validation.password' class="text-danger">Super secret password ?</p>
          </div>
          <div class="form-group">
            <label for="register-confirm-password">Confirm password</label>
            <input type="password" class="form-control" id="register-confirm-password" placeholder="Confirm password" v-model="newUser.confirmPassword" />
            <p v-if='!validation.confirmPassword' class="text-danger">Enter the same password !</p>
          </div>
          <button
            type="submit"
            class="btn btn-default btn-block"
            :disabled="isValid && toArray(newUser).every(v => v !== null) ? false : true"
            >REGISTER</button>
        </form>

        <div class="well text-center">
          <router-link to='/login'>Already have an account? click here.</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import toArray from 'lodash/toArray'

const SIGNUP_URL = 'https://baas.kinvey.com/user/kid_B1l1-6XHe'
const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'Register',
  data () {
    return {
      newUser: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      },
      responseMsg: null
    }
  },
  methods: {
    register () {
      if (this.isValid) {
        this.$http.post(SIGNUP_URL, this.newUser, {
          headers: { Authorization: 'Basic a2lkX0IxbDEtNlhIZTphOGMyMDA3N2IwNDA0NGI2OTEwYzA1MWI0MzczODBjNg==' }
        })
        .then(response => {
          console.log(response.body)
        })
        .catch(err => {
          this.responseMsg = err.body.description
        })
      }
    }
  },
  computed: {
    validation () {
      const user = this.newUser
      return {
        username: user.username === null || !!user.username.trim(),
        email: user.email === null || emailRE.test(user.email),
        password: user.password === null || !!user.password,
        confirmPassword: user.confirmPassword === null || (!!user.confirmPassword && user.confirmPassword === user.password)
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
