<template lang="pug">
  div.no-list(v-if="!listData.length" v-on:click="onNewData")
    div.cnt
      i.art-iconfont.icon-meiyouchaxunjieguo.icon
      div.text(v-html="text")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      listData: {
        type: Array,
        default: []
      },
      text: {
        type: String,
        default: '还没有记录<br/><span>[这里]</span>新建一条记录'
      },
      // 重定向地址的 name
      redirectName: {
        type: String,
        required: true
      }
    },
    methods: {
      onNewData() {
        this.$router.push({name: this.redirectName})
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .no-list
    text-align center
    margin-top 50%
    color #999999
    .cnt
      .icon
        font-size 48px
      .text
        margin-top 10px
        font-size 11px
        line-height 16px
        .here
          color #ae935c
          margin 0 4px

</style>
<style lang="stylus" type="text/stylus">
  .no-list
    .here
      color #ae935c
      margin 0 4px
</style>
