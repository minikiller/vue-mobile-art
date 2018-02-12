<!--
  描述：通用头部
  开发人：桑杨
  开发日期：2018年2月9日16:11:05
-->
<template lang="pug">
  div.header
    div.wrapper
      div.item
        div(v-if="isVisibleLeft" v-on:click="goBack") 返回
      div.title {{title}}
      div.item
        div(v-if="isVisibleRight" v-on:click="goBack") 关闭
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      isVisibleLeft: {
        type: Boolean,
        default: true
      },
      isVisibleRight: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      goBack() {
        // this.$router.push({name: 'recuitTest'})
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .header
    position fixed
    top 0
    left 0
    width 100%
    height 48px
    line-height 48px
    background-color #58443d
    color #ffffff
    .wrapper
      display flex
      padding 0 15px
      .item
        flex 1
        font-size 12px
        &:first-child
          text-align left
        &:last-child
          text-align right
      .title
        font-size 16px

</style>
