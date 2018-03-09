<template lang="pug">
  div.art-base-form
    art-header(v-bind:title="title" v-bind:isVisibleLeft="isEnable" v-bind:isVisibleRight="isEnable")
    div.bd
      scroll.scroll-form(v-bind:refreshDelay="120" ref="scrollForm")
        div.wrapper
          el-form(ref="dialogForm" v-bind:model="formModel")
            slot(name="slotForm")
    div.ft
      div.btns
        el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>
<script type="text/ecmascript-6">
  import ArtHeader from './ArtHeader'
  import Scroll from '../base/scroll'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isEnable: true
      }
    },
    methods: {
      onSubmitClick() {
      }
    },
    components: {
      ArtHeader,
      Scroll
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .art-base-form
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background-color #ffffff
    display flex
    flex-flow column
    .bd
      flex 1
      overflow hidden
      .scroll-form
        height: 100%
        overflow: hidden
      .wrapper
        padding 15px
    .ft
      width 100%
      padding 15px
      text-align center
      box-sizing border-box
      background-color #ffffff
      .btns
        display flex
        .btn-item
          flex 1
          background-color #ae935c
          color #ffffff

</style>
