// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from '@/config/axios'
import VueAxios from 'vue-axios'
import router from './router'
import KalixBase from 'kalix-base'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './element-ui'
// import FastClick from 'fastclick'

// var VConsole = require('vconsole/dist/vconsole.min')
// eslint-disable-next-line
// var vConsole = new VConsole()

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(KalixBase)
Vue.use(router)

// FastClick.attach(document.body)

// Vue.use(ElementUI)

window.Vue = Vue
/* eslint-disable no-new */
new window.Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
