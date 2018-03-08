<template lang="pug">
  div.list-load-more
    div(v-if="!isFinish") 加载更多
    div(v-else) 没有更多记录
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      isFinish: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .list-load-more
    margin 0
    padding 0 0 20px
    height 50px
    line-height 50px
    text-align center
    font-size 10px
    color #999999

</style>
