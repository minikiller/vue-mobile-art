import KalixQrcode from './qrcode.vue'
// import {webURL} from '@/config/global.toml'

export const QrcodeMixin = {
  components: {
    KalixQrcode
  },
  computed: {
    url() {
      // return webURL + '/login'
      return window.location.origin
    }
  }
}
