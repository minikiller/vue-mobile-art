<template lang="pug">
  div.qrcode
    div.title {{title}}
    kalix-qrcode.kalix-qrcode(v-bind:value="resUrl" data-qrcode)
</template>
<script type="text/ecmascript-6">
  import KalixQrcode from '@/components/qrcode/qrcode'

  export default {
    props: {
      title: '',
      resUrl: ''
    },
    components: {
      KalixQrcode
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .qrcode
    position fixed
    top 20%
    left 0
    text-align center
    width 100%
    .title
      font-size 24px
      margin-bottom 50px
    .kalix-qrcode[data-qrcode]
      display inline-block
      border 1px solid #ededed
      padding 10px
      width 200px
      img
        width 100%
</style>
