import KalixQrcode from './qrcode.vue'
import {webURL} from '@/config/global.toml'

export const QrcodeMixin = {
  components: {
    KalixQrcode
  },
  computed: {
    url() {
      return webURL + '/qrcode/login/' + this.name
    }
  }
}
