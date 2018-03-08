<template lang="pug">
  div.list-footer
    router-link.btn(tag="div" v-bind:to="{name:redirectName}" v-html="text")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: '新建信息'
      },
      // 重定向地址的 name
      redirectName: {
        type: String,
        required: true
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .list-footer
    height 50px
    line-height 50px
    .btn
      font-size 16px
      text-align center
      color #ffffff
      background-color #ae935c

</style>
