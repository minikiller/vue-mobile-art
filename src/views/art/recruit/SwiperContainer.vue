<template lang="pug">
  div.swiper-container(v-bind:data-key="dataKey")
    div.swiper-wrapper
      div.swiper-slide
        div.swiper-main(ref="swiperMain")
          div.up-load 加载中……
          slot
          div.bottom-link 没有了
</template>
<script type="text/ecmascript-6">
  import Swiper from 'swiper'

  export default {
    data() {
      return {
        dataKey: (new Date()).getTime()
      }
    },
    mounted() {
    },
    methods: {
      start() {
        setTimeout(() => {
          // console.log(this.$refs.swiperMain.offsetHeight)
          /* eslint-disable */
          let isRefresh = false
          let swiper = new Swiper('.swiper-container[data-key="' + this.dataKey + '"]', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
              el: '.swiper-scrollbar'
            },
            mousewheel: true,
            on: {
              touchMove: (event) => {
                if (swiper.translate < -(this.$refs.swiperMain.offsetHeight - swiper.height * 2)) {
                  console.log('加载')
                }
                if (swiper.translate > 150) {
                  isRefresh = true
                }
              },
              transitionEnd: (event) => {
                if (isRefresh) {
                  // 刷新
                  swiper.setTransition(200)
                  swiper.setTranslate(50)
                  setTimeout(() => {
                    swiper.setTranslate(0)
                    isRefresh = false
                  }, 5000)
                }
              }
            }
          })
        }, 500)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .swiper-container
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    .swiper-main
      position relative
      margin 0
    .up-load
      position absolute
      height 50px
      line-height 50px
      text-align center
      width 100%
      top -50px
      left 0
    .bottom-link
      font-size 12px
      text-align center
      height 20px
      line-height 20px

</style>
