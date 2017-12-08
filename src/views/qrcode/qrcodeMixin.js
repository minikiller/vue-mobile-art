import KalixQrcode from './qrcode.vue'
import {webURL} from '@/config/global.toml'

export const QrcodeMixin = {
  components: {
    KalixQrcode
  },
  data() {
    return {
      url: webURL + '/qrcode/login/stu'
    }
  }
}
