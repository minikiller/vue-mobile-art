<template lang="pug">
  kalix-qrcode(title="学生信息登记表" v-bind:resUrl="url")
</template>
<script type="text/ecmascript-6">
  import {QrcodeMixin} from './qrcodeMixin'
  import {baseURL} from '@/config/global.toml'

  export default {
    mixins: [QrcodeMixin],
    data() {
      return {
        url: baseURL + '/qrcode/login/stu'
      }
    }
  }
</script>
