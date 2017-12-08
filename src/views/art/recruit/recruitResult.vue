<template lang="pug">
  div.art-result(v-bind:class="result.type")
    div.wrapper
      i.icon(v-bind:class="result.icon")
    div.title {{result.title}}
    div.btn-list
      el-button.btn-item(v-on:click="goHome" type="warning" plain) 返回首页
      el-button.btn-item(v-on:click="continueAdd" type="success" plain) 继续添加
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        result: {
          title: '',
          cls: ''
        }
      }
    },
    mounted() {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
      let key = this.$route.params.key
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
      this.result = params[key]
    },
    methods: {
      goHome() {
        this.$router.push({path: '/art/recuittest'})
      },
      continueAdd() {
        // this.$router.push({path: '/art/recuittest/continueAdd'})
        window.location.href = '/art/recuittest/continueAdd'
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
