<template lang="pug">
  div.swiper-container
    div.swiper-wrapper
      div.swiper-slide
        slot
</template>
<script type="text/ecmascript-6">
  import Swiper from 'swiper'

  export default {
    mounted() {
    },
    methods: {
      start() {
        setTimeout(() => {
          /* eslint-disable */
          new Swiper('.swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
              el: '.swiper-scrollbar'
            },
            mousewheel: true
          })
        }, 500)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .swiper-container
    width 100%
    height 100%
</style>
