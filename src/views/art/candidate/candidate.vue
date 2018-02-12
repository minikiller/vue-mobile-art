<template lang="pug">
  div.container
    art-form-header
    div.list-title
      div.title 我的简历
</template>
<script type="text/ecmascript-6">
  import ArtFormHeader from '../base/ArtFormHeader'
  import Scroll from '../base/scroll'
  import Split from '../base/split'

  export default {
    components: {
      Scroll,
      ArtFormHeader,
      Split
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .container
    position fixed
    display flex
    flex-flow column
</style>
