<template lang="pug">
  div.container
    art-form-header
    div.list-title
      div.title 我的简历
      div.operation(v-if="tableData.length")
        span.btn-item(v-if="false")
          i.art-iconfont.icon-sousuo
          | 搜索
        span.btn-item(v-if="true" v-on:click="checkAll")
          i.art-iconfont.icon-xuanze.icon-1(v-if="isCheckAll")
          i.art-iconfont.icon-xuanze1.icon-2(v-else)
          | 全选
        span.btn-item(v-if="true" v-on:click="deleteChecked")
          i.art-iconfont.icon-shanchu
          | 删除选中
    div.list-wrapper
      transition(name="loading")
        div.loading(v-if="isLoading") 加载中……
      scroll.shortcut(v-if="tableData.length" v-bind:refreshDelay="120" ref="shortcut" v-bind:data="tableData"
      v-bind:pullup="true"
      v-bind:pulldown="true"
      v-on:scrollToEnd="scrollToEnd"
      v-on:pulldown="pulldown"
      )
        div
          split
          template(v-for="item in tableData")
            art-item(v-bind:itemData="item" v-on:itemCheckedClick="onItemChecked" v-on:itemEditClick="onItemEdit" v-on:itemDeletetClick="onItemDelete")
            split
          div.load-more
            div(v-if="!isFinish") 加载更多
            div(v-else) 没有更多记录
      div.no-list(v-if="!tableData.length")
        router-link.cnt(tag="spdivan" v-bind:to="{name:'candidateForm'}")
          i.art-iconfont.icon-meiyouchaxunjieguo.icon
          div.text 还没有简历
            br
            | 点击
            span.here [这里]
            | 新建简历
    div.footer
      router-link.btn(tag="div" v-bind:to="{name:'candidateForm'}") 新建简历
</template>
<script type="text/ecmascript-6">
  import ArtFormHeader from '../base/ArtFormHeader'
  import Scroll from '../base/scroll'
  import Split from '../base/split'

  export default {
    data() {
      return {
        isFinish: false,
        isLoading: false,
        tableData: []
      }
    },
    methods: {
      onItemChecked() {
      },
      init() {
        if (!this.currentUser) {
          this.currentUser = JSON.parse(Cache.get('CurrentUser'))
        }
        this.getCompanyCode()
      }
    },
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
    top 0
    left 0
    width 100%
    height 100%
    .list-title
      position relative
      display flex
      height 34px
      line-height 34px
      padding 0 15px
      background-color #ffffff
      &:after
        setBottomLine(#b5b5b5)
      .title
        flex 1
        font-size 14px
        &:before
          content ''
          width 6px
          height 16px
          display inline-block
          border-radius 3px
          margin-right 6px
          background-color #58443d
          float left
          margin-top 9px

      .operation
        .btn-item
          font-size 15px
          .art-iconfont
            font-size 16px
            margin-right 4px
          &.btn-item
            margin-left 8px
          .icon-1
            color #ff7318
          .icon-2
            color #b5b5b5

    .list-wrapper
      flex 1
      overflow hidden
      .no-list
        text-align center
        margin-top 50%
        color #999999
        .cnt
          .icon
            font-size 48px
          .text
            margin-top 10px
            font-size 11px
            line-height 16px
            .here
              color #ae935c
              margin 0 4px

    .footer
      height 50px
      line-height 50px
      .btn
        font-size 16px
        text-align center
        color #ffffff
        background-color #ae935c

</style>
