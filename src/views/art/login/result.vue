<template lang="pug">
  div.result(v-if="isVisible")
    template(v-if="state===1")
      div.wrapper.success
        i.icon.art-iconfont.icon-chenggong1
      div.title 注册成功！
      div.timer {{timer}} 秒钟后返回登录页
      div.btn-list
        el-button.btn-item(v-on:click="goLogin" type="warning" plain) 立即登录
    template(v-if="state===0")
      div.wrapper.error
        i.icon.art-iconfont.icon-shibai
      div.title 注册失败！
      div.msg {{msg}}
      div.btn-list
        el-button.btn-item(v-on:click="goSignUp" type="warning" plain) 重新注册
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isVisible: false,
        state: -1,
        msg: '',
        timer: 3
      }
    },
    methods: {
      open(_params) {
        let params = _params || {state: -1, msg: ''}
        this.msg = params.msg
        this.state = params.state
        this.isVisible = true
        if (typeof callBack === 'function') {
          params.callBack(this)
        }
        if (params.state === 1) {
          let mt = setInterval(() => {
            this.timer -= 1
            if (this.timer < 1) {
              clearInterval(mt)
              this.goLogin()
            }
          }, 1000)
        }
      },
      close() {
        this.isVisible = false
        this.$emit('close')
        this.msg = -1
        this.state = ''
      },
      goLogin() {
        this.close()
        this.$router.push({path: '/login'})
      },
      goSignUp() {
        this.close()
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .result
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color #ffffff
    text-align center
    .wrapper
      position relative
      &:before
        content ''
        display block
        padding-top 50%
      .icon
        position absolute
        top: 50%
        left 50%
        transform: translate3d(-50%, -50%, 0)
        font-size 100px
        color #ffffff
      &.success
        .icon
          color rgb(67, 132, 52)
      &.error
        .icon
          color rgb(255, 0, 51)
    .title
      font-size 24px
      color #555555
    .timer,
    .msg
      font-size 16px
      color #737373
      margin-top 30px
    .btn-list
      margin-top 30px
      text-align center
      .btn-item
        & + .btn-item
          margin-left 30px
</style>
