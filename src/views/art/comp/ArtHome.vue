<template lang="pug">
  div.art-home
    art-top
</template>
<script type="text/ecmascript-6">
  import ArtTop from './ArtTop'

  export default {
    components: {
      ArtTop
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border.styl"
  .art-home
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color #ebebeb
</style>
