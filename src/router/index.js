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
const StudentLogin = _import('art/login/studentLogin')
const SignUp = _import('art/login/signup')
const RecruitCompanyInfo = _import('art/recruit/recruitCompanyInfo')
const UpdatePassword = _import('admin/user/updatePassword')
const ArtCompanyIndex = _import('art/recruit/index')
/* 测试用 */
const recuitTest = _import('art/recruit/recuitTest')

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/studentlogin',
      name: 'studentlogin',
      component: StudentLogin
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
      path: '/art/candidateform',
      name: 'candidateform',
      component: candidateForm
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
    {
      path: '/artcompany',
      name: 'artCompanyIndex',
      component: ArtCompanyIndex,
      children: [
        {
          path: '',
          name: 'recuitTest',
          component: recuitTest
        },
        {
          path: '/art/result/formInfo',
          name: 'recruitFormInfo',
          component: recruitFormInfo
        },
        {
          path: '/art/result/companyInfo',
          name: 'companyInfo',
          component: RecruitCompanyInfo
        },
        {
          path: '/art/result/:key/:status',
          name: 'recruitResult',
          component: recruitResult
        },
        {
          path: '/user/updatePassword',
          name: 'updatePassword',
          component: UpdatePassword
        }
      ]
    },
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
    next({name: 'login'})
    return
  }
  console.log('to', to)
  next()
})

export default router
