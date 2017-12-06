import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ComQrcode from '@/views/art/comQrcode'
import StrQrcode from '@/views/art/strQrcode'
import QrcodeLogin from '@/views/art/qrcodeLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/qrcode/comqrcode',
      name: 'comqrcode',
      component: ComQrcode
    },
    {
      path: '/qrcode/strqrcode',
      name: 'strqrcode',
      component: StrQrcode
    },
    {
      path: '/qrcode/login/:key',
      name: 'qrcodelogin',
      component: QrcodeLogin
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
