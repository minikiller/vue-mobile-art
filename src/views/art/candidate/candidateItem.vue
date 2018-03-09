<template lang="pug">
  div.list-item
    div.title
      div.item(v-on:click="onChecked")
        i.art-iconfont.icon-xuanze.icon-1(v-if="itemData.isChecked")
        i.art-iconfont.icon-xuanze1.icon-2(v-else)
      div.main(v-on:click="onEdit") {{itemData.position}} {{itemData.city}}
      div.item
        div.btn-edit(v-on:click="onEdit")
          i.art-iconfont.icon-bianji
    div.center
      div.s-flex
        div.s-flex_item
          label 薪资：
          | {{itemData.salary}}
        div.s-flex_item
          label 学历：
          | {{itemData.education}}
      div.s-flex
        div.s-flex_item
          label 工作省份：
          | {{itemData.regionName}}
        div.s-flex_item
          label 工作类型：
          | {{itemData.jobType}}
      div.s-flex
        div.s-flex_item
          label 期望行业：
          | {{itemData.expectingIndustryName}}
      div.s-flex
        div.s-flex_item
          label 所学软件：
          | {{itemData.learningSofts}}
      div.s-flex
        div.s-flex_item
          label 发布时间：
          | {{itemData.creationDate}}
        div.btn-del(v-on:click="onDelete")
          i.art-iconfont.icon-shanchu
          | 删除
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      itemData: null
    },
    filters: {
      getDiscName(value) {
        console.log('%c getDiscName value', 'color:#ff00ff', value)
      }
    },
    methods: {
      onEdit() {
      },
      onDelete() {
      },
      onChecked() {
        this.itemData.isChecked = !this.itemData.isChecked
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border"
  .list-item
    position relative
    padding 0 15px
    background-color #ffffff
    &:after
      setBottomLine(#b5b5b5)
    &:before
      setTopLine(#b5b5b5)
    .title
      position relative
      display flex
      height 34px
      line-height 34px
      font-size 16px
      &:after
        setBottomLine(#b5b5b5)
      .main
        flex 1
      .item
        &:first-child
          padding 0 6px
          margin-left -6px
        &:last-child
          margin-left 8px
    .center
      padding 6px 6px 12px
      font-size 14px
      color #333333
      line-height 26px
      label
        color #999999

    .btn-edit
      padding 0 6px
      margin-right -6px
      color #999999

    .btn-del
      background-color #ff7318
      color #ffffff
      padding 0 8px
      border-radius 3px
      .art-iconfont
        font-size 14px
        margin-right 4px
    .icon-1
      font-size 16px
      color #ff7318
    .icon-2
      font-size 16px
      color #b5b5b5
</style>
