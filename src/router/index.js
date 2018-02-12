import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ComQrcode from '@/views/qrcode/comQrcode'
import StuQrcode from '@/views/qrcode/stuQrcode'
// import QrcodeLogin from '@/views/qrcode/qrcodeLogin'
import {Cache} from 'kalix-base'

Vue.use(Router)

const _import = require('@/api/_import_' + process.env.NODE_ENV)

const recruitForm = _import('art/recruit/recruitForm')
const recruitResult = _import('art/recruit/recruitResult')
const recruitFormInfo = _import('art/recruit/recruitFormInfo')
const Login = _import('art/login/login')
const StudentLogin = _import('art/login/studentLogin')
const signUp = _import('art/login/signup')
const signUpCom = _import('art/login/signUpCom')
const signUpStu = _import('art/login/signUpStu')
const RecruitCompanyInfo = _import('art/recruit/recruitCompanyInfo')
const UpdatePassword = _import('admin/user/updatePassword')
/* 企业招聘 */
const ArtCompanyIndex = _import('art/recruit/index')
const recuitTest = _import('art/recruit/recuitTest')
/* 学生应聘 */
// const ArtCandidateIndex = _import('art/candidate/index')
const candidate = _import('art/candidate/candidate')
const candidateForm = _import('art/candidate/candidateForm')
const candidateInfo = _import('art/candidate/candidateInfo')

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
      path: '/sign-up',  // 新用户注册
      name: 'signUp',
      component: signUp
    },
    {
      path: '/sign-up-com',  // 新用户注册
      name: 'signUpCom',
      component: signUpCom
    },
    {
      path: '/sign-up-stu',  // 新用户注册
      name: 'signUpStu',
      component: signUpStu
    },
    {
      path: '/art/recruitform',
      name: 'recruitform',
      component: recruitForm
    },
    {
      path: '/art_candidate',  // 艺术中心 企业招聘
      component: ArtCompanyIndex,
      children: [
        {
          path: '',
          name: 'candidate',
          component: candidate
        },
        {
          path: '/art/candidate_form',
          name: 'candidateForm',
          component: candidateForm
        },
        {
          path: '/art/candidate_info',
          name: 'candidateInfo',
          component: candidateInfo
        }
      ]
    },
    {
      path: '/qrcode/comqrcode',  // 企业信息登记 二维码
      name: 'comqrcode',
      component: ComQrcode
    },
    {
      path: '/qrcode/stuqrcode',  // 学生信息登记 二维码
      name: 'stuqrcode',
      component: StuQrcode
    },
    {
      path: '/art_company',  //  艺术中心 招聘公司
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
  if (to.name === 'signUp') {
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
