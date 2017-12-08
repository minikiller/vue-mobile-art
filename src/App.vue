<template lang="pug">
  div#app
    <!--img(src="./assets/logo.png")-->
    keep-alive
      router-view
</template>

<script>
  export default {
    name: 'app'
  }
</script>
<style>
  @import "/assets/css/icon-font.css"
  @import "/assets/css/fa-font.css"
</style>
<style lang="stylus" type="text/stylus">
  @import "/assets/stylus/comm.styl"
  #app
    height 100%
</style>
