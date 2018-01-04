<template lang="pug">
  kalix-qrcode(title="就业智能推荐系统" v-bind:resUrl="url")
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
