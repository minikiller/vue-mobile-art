import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ComQrcode from '@/views/qrcode/comQrcode'
import StuQrcode from '@/views/qrcode/stuQrcode'
// import QrcodeLogin from '@/views/qrcode/qrcodeLogin'
import {Cache} from 'kalix-base'

Vue.use(Router)

const _import = require('@/api/_import_' + process.env.NODE_ENV)

const candidateForm = _import('art/candidate/candidateForm')
const recruitForm = _import('art/recruit/recruitForm')
const recruitResult = _import('art/recruit/recruitResult')
const recruitFormInfo = _import('art/recruit/recruitFormInfo')
const Login = _import('art/login/login')
const SignUp = _import('art/login/signup')
/* 测试用 */
const recuitTest = _import('art/recruit/recuitTest')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/art/recruitform',
      name: 'recruitform',
      component: recruitForm
    },
    {
      path: '/art/recuittest',
      name: 'recuittest',
      component: recuitTest,
      children: [
        {
          path: ':key',
          component: recuitTest,
          name: 'recuittest'
        }
      ]
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
      component: recruitResult,
      children: [
        {
          path: ':status',
          name: 'recruitResult',
          component: recruitResult
        }
      ]
    },
    {
      path: '/qrcode/comqrcode',
      name: 'comqrcode',
      component: ComQrcode
    },
    {
      path: '/qrcode/stuqrcode',
      name: 'stuqrcode',
      component: StuQrcode
    },
    // {
    //   path: '/qrcode/login/:key',
    //   name: 'qrcodelogin',
    //   component: QrcodeLogin
    // },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.path.search(/\/qrcode\//i)) {
    // 进入二维码页面
    next()
    return
  }
  if (to.name === 'signup') {
    // 进入注册
    next()
    return
  }
  if (Cache.get('id') === null && to.name !== 'login') {
    next({path: '/login'})
    return
  }
  console.log('to', to)
  next()
})

export default router
