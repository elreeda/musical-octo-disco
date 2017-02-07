/* eslint-disable */
import Vue from 'vue'
import Login from 'src/components/Home'

describe('Login.vue', () => {
  it('sets the correct default data', () => {
    expect(typeof Login.data).to.be.function
    const defaultData = Login.data()
    expect(defaultData.loggedIn).to.be.boolean
  })
})
