<!--
  描述：艺术中心-学生注册
  开发人：桑杨
  开发日期：2017年12月26日
-->
<template lang="pug">
  div.signup
    scroll.scroll-form(v-bind:refreshDelay="120" ref="scrollForm")
      div.from-warpper
        div.title 企业信息注册
        el-form.loginForm(v-bind:model="formModel" v-bind:rules="rules" ref="loginForm")
          el-form-item(label="" prop="code")
            el-input(v-model="formModel.code" v-on:focus="focus" placeholder="学号")
          el-form-item(label="" prop="name")
            el-input(v-model="formModel.name" placeholder="姓名")
          el-form-item(label="" prop="email")
            el-input(v-model="formModel.email" placeholder="邮箱")
          el-form-item(label="" prop="phone")
            el-input(v-model="formModel.phone" placeholder="固定电话")
          el-form-item(label="" prop="loginName")
            el-input(v-model="formModel.loginName" placeholder="请输入登录名")
          el-form-item(label="" prop="password")
            el-input(type="password" v-model="formModel.password" placeholder="请输入密码" auto-complete="off")
          el-form-item(label="" prop="confirmPassword")
            el-input(type="password" v-model="formModel.confirmPassword" placeholder="确认密码" auto-complete="off")
          el-form-item(label="")
            el-button.btn-submit(v-on:click="onSubmit" size="large") 注册
          el-form-item(label="")
            div.link-btn(v-on:click="goLogin") 返回登录
    result(ref="result" v-on:close="resultClose")
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
          code: [{required: true, message: '请输入企业组织机构代码', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          loginName: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            {min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validateConfirmPassword, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
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
      focus() {
      },
      onSubmit() {
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
          if (valid) {
            this.formModel.userType = 1 // 学生
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
  .scroll-form
    height: 100%
    overflow: hidden

  .signup
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background 50% 0% url("./login_bg.png") no-repeat
    background-size cover
    overflow hidden
    .from-warpper
      padding 0 15px
      .title
        text-align center
        padding 40px 0 35px
        color #58443d
        font-weight bold
        letter-spacing 10px
        font-size 20px
      .btn-submit
        display block
        width 100%
        margin-top 30px
        background url("./button-bg.png") 50% 50% no-repeat
        background-size cover
        color #5c4611
        border none
      .link-btn
        font-size 14px
        text-align center
        text-decoration underline
        color #cdb886
</style>
