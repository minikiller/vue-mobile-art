import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ComQrcode from '@/views/qrcode/comQrcode'
import StrQrcode from '@/views/qrcode/strQrcode'
import QrcodeLogin from '@/views/qrcode/qrcodeLogin'
// import candidateForm from '@/views/art/candidate/candidateForm'
// import recruitForm from '@/views/art/recruit/recruitForm'
// import recruitResult from '@/views/art/recruit/recruitResult'

const _import = require('@/api/_import_' + process.env.NODE_ENV)

const candidateForm = _import('art/candidate/candidateForm')
const recruitForm = _import('art/recruit/recruitForm')
const recruitResult = _import('art/recruit/recruitResult')
/* 测试用 */
const recuitTest = _import('art/recruit/recuitTest')
const recruitFormInfo = _import('art/recruit/recruitFormInfo')

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
      path: '/art/recuittest',
      name: 'recuittest',
      component: recuitTest
    },
    {
      path: '/art/recruitforminfo',
      name: 'recruitforminfo',
      component: recruitFormInfo
    },
    {
      path: '/art/candidateform',
      name: 'candidateform',
      component: candidateForm
    },
    {
      path: '/art/recuit/:key',
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
