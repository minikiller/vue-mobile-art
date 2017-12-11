<template lang="pug">
  kalix-qrcode(title="企业信息登记表" v-bind:resUrl="url")
</template>
<script type="text/ecmascript-6">
  import {QrcodeMixin} from './qrcodeMixin'

  export default {
    data() {
      return {
        name: 'com'
      }
    },
    mixins: [QrcodeMixin],
    mounted() {
      console.log('url', this.url)
    }
  }
</script>
