<!--
  描述：职能类别 组件
  开发人：桑杨
  开发日期：2018年3月22日14:57:44
-->
<template lang="pug">
  div.casacde
    div.casacde-ipt_wrapper
      div.casacde-ipt(v-on:click="onClick") {{currentText}}
    div.mark(v-if="visible" ref="cascadeMark")
    transition(name="show")
      div.options-wrapper(v-if="visible" ref="casacdeWrapper")
        div.btn-close(v-on:click="close")
          i.art-iconfont.icon-shibai1
        div.options-hd
          div.title 职能类别
        div.options-bd
          scroll.scroll-cell(v-bind:refreshDelay="120" ref="scrollCell")
            div
              div.cell(v-for="(item,index) in options")
                split(v-if="index!==0")
                div.s-flex.cell-title
                  div.s-flex_item.tit(v-on:click="selected(item)" v-bind:class="{'active':item.code === currentValue}") {{item.name}}
                div.cell-cnt(v-if="item.children.length")
                  div.cell-item(v-for="itemChildren in item.children")
                    el-button(plain size="small" v-on:click="selected(itemChildren)" v-bind:class="{'active':itemChildren.code === currentValue}") {{itemChildren.name}}
</template>
<script type="text/ecmascript-6">
  import {Cache} from 'kalix-base'
  import Split from '../base/split'
  import Scroll from '../base/scroll'

  export default {
    props: {
      value: null
    },
    data() {
      return {
        currentText: '',
        currentValue: this.value,
        visible: false,
        options: [] // 表格数据
      }
    },
    created() {
      this.getData()
    },
    mounted() {
    },
    methods: {
      selected(item) {
        this.$emit('input', item.id)
        this.currentValue = item.id
        this.currentText = item.name
        this.visible = false
        // console.log('item.code', item.code)
      },
      close() {
        this.visible = false
      },
      onClick() {
        this.visible = true
        this.$nextTick(() => {
          document.body.appendChild(this.$refs.cascadeMark)
          document.body.appendChild(this.$refs.casacdeWrapper)
        })
      },
      getData() {
        let cacheData = JSON.parse(Cache.get('FUNCTION-CATEGROY'))
        this.options = cacheData[0].children
        this.setCurrentText()
      },
      setCurrentText() {
        console.log('this.currentValue', this.currentValue)
        console.log('this.options', this.options)
        this.currentText = ''
        if (!this.currentValue) {
          return false
        }
        this.options.forEach((e) => {
          let itemA = (e.id === this.currentValue) ? e : null
          if (itemA) {
            this.currentText = itemA.name
            return false
          }
          e.children.forEach(e2 => {
            if (e2.id === this.currentValue) {
              this.currentText = e2.name
              return false
            }
          })
        })
      }
    },
    components: {
      Split,
      Scroll
    },
    watch: {
      value(newValue, oldValue) {
        this.currentValue = newValue
        this.setCurrentText()
      }
      // options(newValue, oldValue) {
      //   let itemA = newValue.find(e => {
      //     let item = e.code === this.currentValue
      //     if (!item) {
      //       return e.children.find(e2 => {
      //         return e2.code === this.currentValue
      //       })
      //     } else {
      //       return item
      //     }
      //   })
      //   this.currentText = itemA.name
      // }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border"

  .mark
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .6)
    z-index 99

  .casacde
    .casacde-ipt_wrapper
      position relative
      &:after
        setBottomLine(#b5b5b5)

    .casacde-ipt
      border 0
      width 100%
      height 40px

  .options-wrapper
    position fixed
    top 0
    right 0
    height 100%
    width 90%
    background-color #ffffff
    padding 0
    box-sizing border-box
    z-index 2001
    .btn-close
      position absolute
      width 30px
      height 30px
      text-align center
      line-height 30px
      background-color #f00
      color #fff
      left -30px
      top 8px
    .cell
      .cell-title
        position relative
        padding 10px 15px
        &:after
          setBottomLine(#b5b5b5)
          left 15px
        .tit
          &.active
            color #076df0
      .icon
        font-size 12px
      .cell-cnt
        padding 10px 8px
        .cell-item
          font-size 14px
          display inline-block
          width 50%
          padding 8px
          box-sizing border-box
          .el-button
            display block
            width 100%
            &.active
              border-color #076df0
              color #076df0

  .options-hd
    position relative
    text-align left
    height 40px
    line-height 40px
    padding 0 15px
    &:after
      setBottomLine(#b5b5b5)

  .options-bd
    position absolute
    overflow auto
    bottom 0
    right 0
    left 0
    top 40px

  .options-ft
    position fixed
    bottom 15px
    right 15px

  .scroll-cell
    height: 100%
    overflow: hidden

  .show-enter-active,
  .show-leave-active
    transition all .5s

  .show-enter,
  .show-leave-active
    transform translate3d(100%, 0, 0)
</style>
