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

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(KalixBase)
// Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
