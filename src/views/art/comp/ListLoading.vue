<template lang="pug">
  transition(name="loading")
    div.loading(v-if="isLoading") {{text}}
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: '加载中……'
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .loading
    margin 0
    padding 0
    height 50px
    line-height 50px
    text-align center
    font-size 10px
    color #999999

  .loading-leave-active
    transition height .5s

  .loading-leave-active
    height 0
</style>
