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
          el-form-item(label="" style="text-align:center;")
            router-link.link-btn(tag="div" v-bind:to="{name:'signUp'}") 注册
</template>

<script type="text/ecmascript-6">
  import './login.styl'
  import {Message, Cache} from 'kalix-base'
  import Login from '@/api/login'
  import Util from '@/common/Util'

  const usersURL = '/camel/rest/users'
  const FunctionCategroyURL = '/camel/rest/functioncategorys'
  const USER_TYPE_STU = 1 // 学生登录
  const USER_TYPE_COM = 3 // 企业登录
  export default {
    activated() {
      console.log('login activated')
      Cache.clear()
      this.loginForm.name = ''
      this.loginForm.pass = ''
    },
    deactivated() {
      console.log('login deactivated')
    },
    data() {
      return {
        name: 'Login Form',
        loginForm: {
          name: '',
          pass: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
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
                Cache.save('id', data.user.id)
                Cache.save('access_token', data.access_token)
                Cache.save('user_token', data.user.token)
                Cache.save('user_name', data.user.name)
                console.log('access token is: ', data.access_token)
                this.getDict(() => {
                  this._getFunctionCategroy(() => {
                    this._getCurrentUser(data.user.id, () => {
                      let currentUser = JSON.parse(Cache.get('CurrentUser'))
                      this.$myConsoleLog(' 当前用户 ', currentUser, '#8B795E')
                      switch (currentUser.userType) {
                        case USER_TYPE_STU:
                          this.$myConsoleLog('LOGIN USER_TYPE_STU：', USER_TYPE_STU, '#838B83')
                          Util.setCurrentStudent(currentUser.code, () => {
                            this.$myConsoleLog('LOGIN USER_TYPE_STU 2：', USER_TYPE_STU, '#838B83')
                            this.$router.push({path: '/art_candidate'})
                          })
                          break
                        case USER_TYPE_COM:
                          this.$myConsoleLog('LOGIN USER_TYPE_COM：', USER_TYPE_COM, '#473C8B')
                          Util.setCurrentCompany(currentUser.code, () => {
                            this.$myConsoleLog('LOGIN USER_TYPE_COM 2：', USER_TYPE_STU, '#838B83')
                            this.$router.push({path: '/art_company'})
                          })
                          break
                      }
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
      // 获取职能类别
      _getFunctionCategroy(callBack) {
        if (!Cache.get('FUNCTION-CATEGROY-DICT')) {
          this.axios.request({
            method: 'GET',
            url: FunctionCategroyURL,
            params: {}
          }).then(res => {
            this._getFunctionCategroyObjects(res.data.children)
            Cache.save('FUNCTION-CATEGROY', JSON.stringify(res.data.children))
            callBack()
          })
        } else {
          callBack()
        }
      },
      _getCurrentUser(_id, callBack) {
        this.$http.get(usersURL, {
          params: {jsonStr: '{id: ' + _id + '}'}
        }).then(res => {
          if (res.data.totalCount) {
            Cache.save('CurrentUser', JSON.stringify(res.data.data[0]))
            callBack()
          }
        })
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
      },
      // 获取职能类别对象
      _getFunctionCategroyObjects(cacheData) {
        let items = {}
        cacheData[0].children.forEach(e => {
          items[e.id] = e
          e.children.forEach(ie => {
            items[ie.id] = ie
          })
        })
        Cache.save('FUNCTION-CATEGROY-OBJ', JSON.stringify(items))
      }
    },
    components: {},
    computed: {}
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
