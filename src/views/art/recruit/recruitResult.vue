<!--
  描述：提交信息反馈结果
  开发人：juezhan
  开发日期：2018年3月5日09:59:17
-->
<template lang="pug">
  div.art-result(v-bind:class="result.type")
    div.wrapper
      i.icon(v-bind:class="result.icon")
    div.title {{result.title}}
    div.btn-list
      el-button.btn-item(v-if="result.type==='error'" v-on:click="goLogin" type="warning" plain) 重新登录
      template(v-else)
        el-button.btn-item(v-on:click="goHome" type="warning" plain) 返回首页
        el-button.btn-item(v-if="isList" v-on:click="continueAdd" type="success" plain) 继续添加

</template>
<script type="text/ecmascript-6">
  import {Cache} from 'kalix-base'

  const RESULT = {title: '', cls: '', type: ''}
  const USER_TYPE_STU = 1 // 学生登录
  const USER_TYPE_COM = 3 // 企业登录
  export default {
    data() {
      return {
        result: Object.assign({}, RESULT),
        isList: true,
        goHomeName: '',
        continueAddName: ''
      }
    },
    activated() {
      this.result = Object.assign({}, RESULT)
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
      this.$myConsoleLog('this.$route', this.$route, '#009ACD')
      let params = {
        success: {
          type: 'success',
          title: '保存成功！',
          icon: 'art-iconfont icon-chenggong1'
        },
        error: {
          type: 'error',
          title: '保存失败！',
          icon: 'art-iconfont icon-shibai'
        },
        close: {
          type: 'close',
          title: '谢谢再见！',
          icon: 'art-iconfont icon-jiangbeishengli'
        }
      }
      if (this.$route.name === 'recruitResult') {
        this.isList = !(this.$route.params.status === 'company')
        this.result = params[this.$route.params.key]
      }
      let currentUser = JSON.parse(Cache.get('CurrentUser'))
      switch (currentUser.userType) {
        case USER_TYPE_STU:
          this.goHomeName = 'candidate'
          this.continueAddName = 'candidateForm'
          break
        case USER_TYPE_COM:
          this.goHomeName = 'recuitTest'
          this.continueAddName = 'recruitFormInfo'
          break
      }
    },
    methods: {
      goLogin() {
        this.$router.push({name: '/'})
      },
      goHome() {
        this.$router.push({name: this.goHomeName})
      },
      continueAdd() {
        this.$router.push({name: this.continueAddName})
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .art-result
    max-width 640px
    margin 0 auto
    box-sizing border-box
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
    .title
      font-size 24x
      color #555555
    .btn-list
      margin-top 50px
      text-align center
      .btn-item
        & + .btn-item
          margin-left 30px

    &.success
      .icon
        color rgb(67, 132, 52)
    &.error
      .icon
        color rgb(255, 0, 51)
    &.close
      .icon
        color rgb(0, 124, 199)
</style>
