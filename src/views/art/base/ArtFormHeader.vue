<template lang="pug">
  div.art-header
    div.wrapper
      div.title
        div.maintitle 企业名称
          span.area 中国·长春
        div.subtitle 上市公司　文化传播　500人以上　50年
    div.btn-option(v-on:click="optionClick")
      i.art-iconfont.icon-chilun
</template>
<script type="text/ecmascript-6">
  import '../base/font/iconfont.css'

  export default {
    methods: {
      optionClick() {
        this.$emit('optionClick')
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .art-header
    position relative
    top 0
    left 0
    width 100%
    height 80px
    background-color #58443d
    .wrapper
      display flex
      align-items: center;
      justify-content: center;
      height: 100%;
      .title
        color #ffffff
        text-align center
        flex 1
        .maintitle
          position relative
          font-size 20px
          display inline-block
          .area
            position absolute
            font-size 10px
            bottom 0
            left 100%
            white-space nowrap
            padding-left 12px
        .subtitle
          font-size 10px
          margin-top 10px
    .btn-option
      position absolute
      top 50%
      right 9px
      transform translate3d(0, -50%, 0)
      color #fff
      padding 6px
</style>
