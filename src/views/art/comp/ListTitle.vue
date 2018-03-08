<template lang="pug">
  div.list-title
    div.title {{title}}
    div.operation(v-if="listData.length")
      span.btn-item(v-if="false")
        i.art-iconfont.icon-sousuo
        | 搜索
      span.btn-item(v-if="true" v-on:click="checkAll")
        i.art-iconfont.icon-yuangongqudaoAPP-fuxuankuangxuanzhong.icon-1(v-if="isCheckAll")
        i.art-iconfont.icon-yuangongqudaoAPP-fuxuankuangweixuanzhong.icon-2(v-else)
        | 全选
      span.btn-item(v-if="true" v-on:click="deleteChecked")
        i.art-iconfont.icon-shanchu
        | 删除选中
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      listData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isCheckAll: false
      }
    },
    methods: {
      //  全选
      checkAll() {
        this.isCheckAll = !this.isCheckAll
        this.$emit('checkAll', this.isCheckAll)
      },
      deleteChecked() {
        this.$emit('deleteChecked')
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border"
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
        font-size 14px
        .art-iconfont
          font-size 14px
          margin-right 4px
        &.btn-item
          margin-left 8px
        .icon-1
          color #ff7318
</style>
