const SIGNUP_URL = 'https://baas.kinvey.com/user/kid_B1l1-6XHe'
const LOGIN = `${SIGNUP_URL}/login`

export default {
  register (context, newUser, cb) {
    cb = arguments[arguments.length - 1]
    return context.$http.post(SIGNUP_URL, newUser, {
      headers: { Authorization: 'Basic a2lkX0IxbDEtNlhIZTphOGMyMDA3N2IwNDA0NGI2OTEwYzA1MWI0MzczODBjNg==' }
    })
    .then(response => {
      localStorage.setItem('idToken', response.body._kmd.authtoken)
      if (cb) { cb(true) }
      this.onChange(true)
    })
    .catch(err => {
      context.responseMsg = err.body.description
      this.onChange(false)
    })
  },

  login (context, credentials, cb) {
    cb = arguments[arguments.length - 1]
    return context.$http.post(LOGIN, credentials, {
      headers: { Authorization: 'Basic a2lkX0IxbDEtNlhIZTphOGMyMDA3N2IwNDA0NGI2OTEwYzA1MWI0MzczODBjNg==' }
    })
    .then(response => {
      localStorage.setItem('idToken', response.body._kmd.authtoken)
      if (cb) { cb(true) }
      this.onChange(true)
    })
    .catch(err => {
      if (cb) { cb(false) }
      context.responseMsg = err.body.description
      this.onChange(false)
    })
  },

  logout (cb) {
    localStorage.removeItem('idToken')
    if (cb) { cb() }
    this.onChange(false)
  },

  checkAuth () {
    return !!localStorage.getItem('idToken')
  },

  getAuthHeader () {
    return {
      Authorization: `Bearer ${localStorage.getItem('idToken')}`
    }
  },

  onChange () {}
}
