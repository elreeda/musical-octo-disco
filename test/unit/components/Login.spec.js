/* eslint-disable */
import Vue from 'vue'
import Login from 'src/components/Login'

describe('Login.vue', () => {
  it('sets the correct default data', () => {
    expect(typeof Login.data).to.be.function
    const defaultData = Login.data()
    expect(defaultData.responseMsg).to.be.null
    expect(defaultData.credentials.username).to.be.null
    expect(defaultData.credentials.password).to.be.null
  })
})
