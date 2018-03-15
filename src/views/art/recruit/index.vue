<template lang="pug">
  transition(v-bind:name="transitionName")
    keep-alive
      router-view.child-view
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        transitionName: ''
      }
    },
    beforeRouteUpdate(to, from, next) {
      let isBack = this.$router.isBack
      // this.$myConsoleLog('Route isBack', isBack, '#228B22')
      // this.$myConsoleLog('Route to', to, '#B22222')
      // this.$myConsoleLog('Route from', from, '#00008B')
      if (to.name === 'recuitTest' || to.name === 'candidate') {
        isBack = true
      }
      // this.$myConsoleLog('Route isBack', isBack, '#8B3A3A')
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .child-view
    position absolute
    width 100%
    transition all .8s cubic-bezier(.55, 0, .1, 1)

  .slide-left-enter,
  .slide-right-leave-active
    opacity 0
    transform translate(100%, 0)

  .slide-left-leave-active,
  .slide-right-enter
    opacity 0
    transform translate(-100%, 0)

</style>
