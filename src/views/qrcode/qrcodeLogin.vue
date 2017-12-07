<template lang="pug">
  div.qrcode-login
    div.title 欢迎，登录中请稍后……
</template>
<script type="text/ecmascript-6">
  import Login from '@/api/login'
  import Cache from '@/api/cache'

  export default {
    methods: {
      init() {
        let key = this.$route.params.key
        let params = {
          stu: {
            username: 'admin',
            password: '123',
            resUrl: '/art/RecruitForm'
          },
          com: {
            username: 'admin',
            password: '123',
            resUrl: '/art/recuittest'
          }
        }
        setTimeout(() => {
          this.login(params[key])
        }, 500)
      },
      login(params) {
        Login.remoteLogin({
          username: params.username,
          password: params.password
        }).then(data => {
          if (data.success) {
            Cache.save('id', data.user.id)
            Cache.save('access_token', data.access_token)
            Cache.save('user_token', data.user.token)
            Cache.save('user_name', data.user.name)
            Cache.save('loginname', params.username)
            this.$router.push({path: params.resUrl})
          }
        })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .qrcode-login
    .title
      position fixed
      top 40%
      left 0
      width 100%
      font-size 18px
      text-align center
</style>
