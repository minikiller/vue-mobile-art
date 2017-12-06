import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ComQrcode from '@/views/art/comQrcode'
import StrQrcode from '@/views/art/strQrcode'
import QrcodeLogin from '@/views/art/qrcodeLogin'
// import candidateForm from '@/views/art/candidate/candidateForm'
// import recruitForm from '@/views/art/recruit/recruitForm'
// import recruitResult from '@/views/art/recruit/recruitResult'

const _import = require('@/api/_import_' + process.env.NODE_ENV)

const candidateForm = _import('art/candidate/candidateForm')
const recruitForm = _import('art/recruit/recruitForm')
const recruitResult = _import('art/recruit/recruitResult')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/art/recruitform',
      name: 'recruitform',
      component: recruitForm
    },
    {
      path: '/art/candidateform',
      name: 'candidateform',
      component: candidateForm
    },
    {
      path: '/art/result/:key',
      name: 'recruitResult',
      component: recruitResult
    },
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
