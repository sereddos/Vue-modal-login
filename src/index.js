// JS
import './js/'

// SCSS
import './assets/scss/main.scss'

// Vue.js
window.Vue = require('vue')

// Vue components (for use in html)
Vue.component('modal-login', require('./components/modal_login.vue').default);

// Vue init
const app = new Vue({
  el: '#app'
})
