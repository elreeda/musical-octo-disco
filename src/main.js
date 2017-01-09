// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/bootswatch/cosmo/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.css'

import Vue from 'vue'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import Editor from './components/Editor'
import Documents from './components/Documents'
import Login from './components/Login'
import Register from './components/Register'
import Notfound from './components/Notfound'
import auth from './components/auth'

Vue.use(VueRouter)
Vue.use(vueResource)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register,
      beforeEnter (to, from, next) {
        if (auth.checkAuth()) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      component: Login,
      beforeEnter (to, from, next) {
        if (auth.checkAuth()) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/editor',
      component: Editor
    },
    {
      path: '/browse-documents',
      component: Documents
    },
    {
      path: '/40000000000000000000004.php',
      component: Notfound
    },
    {
      path: '*',
      redirect: '/40000000000000000000004.php'
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
