import Vue from 'vue'
import VueResource from 'vue-resource'
import auth from 'src/auth/index'
Vue.use(VueResource)

describe('#register()', () => {
  it('dummy test', () => {
    expect(auth.onChange()).to.be.a.function
  })

  it('should save the token in localStorage', () => {
    const fakeContext = {
      '$http': {
        post () {
          return Promise.resolve({
            body: {
              _kmd: {
                authtoken: '!@kbsjaddasuhoqdjknsa'
              }
            }
          })
        }
      }
    }
    return auth.register(fakeContext, {name: 'reda'}, () => {})
    .then(() => {
      expect(localStorage.getItem('idToken')).to.be.equal('!@kbsjaddasuhoqdjknsa')
    })
  })

  it('should fail, cause of bad request', () => {
    const fakeContext = {
      '$http': {
        post () {
          return Promise.reject({
            body: {
              description: 'Something weirdo happend'
            }
          })
        }
      }
    }
    return auth.register(fakeContext, {}, () => {})
    .then(() => {
      // console.log()
      expect(fakeContext.responseMsg).to.be.equal('Something weirdo happend')
    })
  })
})
