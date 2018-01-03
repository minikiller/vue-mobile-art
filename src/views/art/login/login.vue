<template lang="pug">
  div.login(data-login)
    div.from-warpper
      div.form
        div.logo
        el-form.loginForm(v-bind:model="loginForm" v-bind:rules="rules" ref="loginForm")
          el-form-item(label="" prop="name")
            el-input(v-model="loginForm.name" placeholder="请输入登录名")
              i.icon-login-user(slot="prefix")
          el-form-item(label="" prop="pass")
            el-input(type="password" v-model="loginForm.pass" placeholder="请输入密码" auto-complete="off")
              i.icon-lock(slot="prefix")
          el-form-item(label="")
            div.btn-submit(v-on:click="onSubmit('loginForm')" size="large")
              span 登录
          el-form-item(label="")
            router-link.link-btn(tag="div" v-bind:to="{name:'signup'}") 注册
</template>

<script type="text/ecmascript-6">
  import './login.styl'
  import {Message, Cache} from 'kalix-base'
  import Login from '@/api/login'

  const usersURL = '/camel/rest/users'
  const FunctionCategroyURL = '/camel/rest/functioncategorys'
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
    mounted() {
      Cache.clear()
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Login.remoteLogin({
              'username': this.loginForm.name,
              'password': this.loginForm.pass
            }).then(data => {
              console.log('data', data)
              if (data.success) {
                console.log('[onSubmit] data.success', data)
                Cache.save('id', data.user.id)
                Cache.save('access_token', data.access_token)
                Cache.save('user_token', data.user.token)
                Cache.save('user_name', data.user.name)
                console.log('access token is: ', data.access_token)
                this.getDict(() => {
                  this._getFunctionCategroy(() => {
                    this._getCurrentUser(data.user.id, () => {
                      this.$router.push({name: 'recuittest'})
                    })
                  })
                })
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
      },
      _getFunctionCategroy(callBack) {
        if (!Cache.get('FUNCTION-CATEGROY-DICT')) {
          this.axios.request({
            method: 'GET',
            url: FunctionCategroyURL,
            params: {}
          }).then(res => {
            Cache.save('FUNCTION-CATEGROY', JSON.stringify(res.data.children))
            callBack()
          })
        } else {
          callBack()
        }
      },
      _getCurrentUser(_id, callBack) {
        if (!Cache.get('CurrentUser')) {
          this.$http.get(usersURL, {
            params: {jsonStr: '{id: ' + _id + '}'}
          }).then(res => {
            if (res.data.totalCount) {
              Cache.save('CurrentUser', JSON.stringify(res.data.data[0]))
              // console.log('GetCurrentUser Complet!')
              callBack()
            }
          })
        } else {
          // console.log('GetCurrentUser Complet!')
          callBack()
        }
      },
      getDict(callBack) {
        /* 初始化数据字典 */
        const name = 'art'
        const DictURL = `/camel/rest/${name}/dicts`
        const DictKey = `${name.toUpperCase()}-DICT-KEY`
        const data = {
          page: 1,
          start: 0,
          limit: 200
        }
        this.axios.request({
          method: 'GET',
          url: DictURL,
          params: data
        }).then(response => {
          console.log('art response', response)
          if (response.data) {
            Cache.save(DictKey, JSON.stringify(response.data.data))
            console.log('GetDict complet!')
            callBack()
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
