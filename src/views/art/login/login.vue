<template lang="pug">
  div.login(data-login)
    div.from-warpper
      div.form
        div.logo
        el-form.loginForm(v-bind:model="loginForm" v-bind:rules="rules" ref="loginForm")
          el-form-item(label="" prop="name")
            el-input(v-model="loginForm.name")
              i.icon-login-user(slot="prefix")
          el-form-item(label="" prop="pass")
            el-input(type="password" v-model="loginForm.pass" auto-complete="off")
              i.icon-lock(slot="prefix")
          el-form-item(label="")
            el-button.btn-submit(v-on:click="onSubmit('loginForm')" size="large") 登录
</template>

<script type="text/ecmascript-6">
  import './login.styl'
  import {Message, Cache} from 'kalix-base'
  import Login from '@/api/login'

  export default {
    data() {
      return {
        name: 'Login Form',
        loginForm: {
          name: '',
          pass: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Login.remoteLogin({
              'username': this.loginForm.name,
              'password': this.loginForm.pass
            }).then(data => {
              if (data.success) {
                console.log('[onSubmit] data.success', data.success)
                Cache.save('id', data.user.id)
                Cache.save('access_token', data.access_token)
                Cache.save('user_token', data.user.token)
                Cache.save('user_name', data.user.name)
                console.log('access token is: ', data.access_token)
                // this.setSaveLogin({
                //   access_token: data.access_token,
                //   user_name: data.user.name,
                //   user_token: data.user.token,
                //   user_id: data.user.id
                // })
                this.$router.push({path: '/art/recuittest'})
                // window.location.href = '/art/recuittest'
              } else {
                Message.error(data.message)
              }
            }).catch(error => {
              Message.error(error.message)
            })
          } else {
            return false
          }
        })
      }
    },
    components: {},
    computed: {}
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
