<!--
  描述：艺术中心-注册选择
  开发人：桑杨
  开发日期：2018年2月9日09:06:26
-->
<template lang="pug">
  div.sign-up
    div.container
      div.logo
      router-link.btn.com(tag="div" v-bind:to="{name:'signUpCom'}")
        div.text 招聘企业
      router-link.btn.stu(tag="div" v-bind:to="{name:'signUpStu'}")
        div.text 就业学生
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Login from '@/api/login'
  import Result from './result'
  import {Cache} from 'kalix-base'
  import Scroll from '../base/scroll'

  const usersURL = '/camel/rest/users'
  const logoutURL = '/logout'

  export default {
    data() {
      let validateSpace = (rule, value, callback) => {
        let reg = new RegExp('\\s')
        let r = value.substr(1).match(reg)
        if (r != null) {
          callback(new Error('登录名不能包含空格'))
        }
        callback()
      }
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formModel.confirmPassword !== '') {
            this.$refs.loginForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      let validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formModel.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        name: 'Login Form',
        formModel: Object.assign({}, FormModel),
        rules: {
          code: [
            {required: true, message: '请输入企业组织机构代码', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          loginName: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            {min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur'},
            {required: true, validator: validateSpace, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validateConfirmPassword, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入正确的邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          phone: [{required: true, message: '请输入固定电话', trigger: 'blur'}]
        }
      }
    },
    created() {
      this.autoLogin()
      // setInterval(() => {
      //   this.$refs.scrollForm.refresh()
      // }, 500)
    },
    methods: {
      onChange(val) {
        console.log('onChange:', arguments)
      },
      focus() {
      },
      onSubmit() {
        for (let i in this.formModel) {
          console.log('onSubmit i:', i)
          console.log('onSubmit:', this.formModel[i])
        }
        this.$refs.loginForm.validate((valid) => {
          // this.$refs.result.open({
          //   state: 0,
          //   msg: '无法注册',
          //   callBack: () => {
          //     console.log('this', this)
          //     this.$refs.loginForm.resetFields()
          //     this.autoLoginOut()
          //   }
          // })
          // 阻止继续执行
          // valid = false
          if (valid) {
            this.formModel.userType = 3 // 招聘公司
            if (!this.loginState) {
              this.$refs.result.open({
                state: 0,
                msg: '服务器忙'
              })
              return false
            }
            this.axios.request({
              method: 'POST',
              url: usersURL,
              data: this.formModel
            }).then(response => {
              let resultParams = {
                callBack: () => {
                  console.log('this', this)
                  this.$refs.loginForm.resetFields()
                  this.autoLoginOut()
                }
              }
              if (response.data.success) {
                resultParams.state = 1
              } else {
                resultParams.state = 0
                resultParams.msg = response.data.msg
              }
              this.$refs.result.open(resultParams)
            })
          } else {
            return false
          }
        })
      },
      resultClose() {
        this.$refs.loginForm.resetFields()
      },
      goLogin() {
        this.$refs.loginForm.resetFields()
        this.$router.push({name: '/'})
      },
      // 自动登录
      autoLogin() {
        this.loginState = false
        let username = 'admin'
        let password = '123'
        Login.remoteLogin({
          username,
          password
        }).then(data => {
          this.loginState = data.success
          if (this.loginState) {
            Cache.save('id', data.user.id)
            Cache.save('access_token', data.access_token)
            Cache.save('user_token', data.user.token)
            Cache.save('user_name', data.user.name)
          }
          console.log('this.loginState', this.loginState)
        })
      },
      // 自动退出
      autoLoginOut() {
        this.axios.get(logoutURL, {}).then(response => {
          Cache.clear()
        })
      }
    },
    components: {
      Result,
      Scroll
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .sign-up
    position fixed
    width 100%
    height 100%
    background 50% 50% url("./login_bg.png") no-repeat
    background-size cover
    .container
      width 100%
      top 15%
      left 0
      position fixed
      .logo
        width 100%
        margin-bottom 50px
        background url("./login_oa_top.png") no-repeat center center
        background-size contain
        &:after
          padding-top 20%
          display block
          content ''
      .btn
        position relative
        margin 0 50px
        border-radius 5px
        & + .btn
          margin-top 50px
        &:before
          content ''
          display block
          padding-top 20%
        &:after
          position absolute
          content ''
          width 200%
          height 200%
          top 0
          left 0
          border 1px solid rgba(0, 0, 0, 0.2)
          box-sizing border-box
          border-radius 10px
          transform scale(0.5)
          transform-origin 0 0
        .text
          position absolute
          width 100%
          left 0
          top 50%
          transform translate3d(0, -50%, 0)
          text-align center
          color #ffffff
        &.com
          background-color #ae935c
        &.stu
          background-color #402e27
</style>
