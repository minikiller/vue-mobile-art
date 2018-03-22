<template lang="pug">
  div.list-item
    div.title
      div.item(v-on:click="onChecked")
        i.art-iconfont.icon-xuanze.icon-1(v-if="itemData.isChecked")
        i.art-iconfont.icon-xuanze1.icon-2(v-else)
      div.main(v-on:click="onChecked") {{itemData.position}}
      div.item
        div.btn-edit(v-on:click="onEdit")
          i.art-iconfont.icon-bianji
    div.center
      div.s-flex
        div.s-flex_item
          label 岗位需求：
          div(v-html="itemData.positionRequires")
        div
          label 岗位个数：
          | {{itemData.jobNumbers}}
      div.s-flex
        div.s-flex_item
          label 学历：
          | {{itemData.educationName}}
        div.s-flex_item(style="text-align:right;")
          label 薪资：
          | {{itemData.salary}}
      div.s-flex
        div.s-flex_item
          label 职能类别：
          | {{itemData.functionCategoryId|getDiscName}}
        div.s-flex_item(style="text-align:right;")
          label 工作类型：
          | {{itemData.jobTypeName}}
      div
        label 应用技术名称：
        | {{itemData.appliedTechnology}}
      div
        label 个人要求：
        | {{itemData.personRequiresName}}
      div
        label 工作省份：
        | {{itemData.regionName}}
      div
        label 实习薪资：
        | {{itemData.probationSalaryName}}
      div
        label 转正薪资：
        | {{itemData.salaryName}}
      div.s-flex
        div.s-flex_item
          label 发布时间：
          | {{itemData.creationDate}}
        div.btn-del(v-on:click="onDelete")
          i.art-iconfont.icon-shanchu
          | 删除
</template>
<script type="text/ecmascript-6">
  import {Cache} from 'kalix-base'

  export default {
    props: {
      itemData: null
    },
    filters: {
      getDiscName(value) {
        let cacheData = JSON.parse(Cache.get('FUNCTION-CATEGROY-OBJ'))
        let name = ''
        if (cacheData[value] && cacheData[value].name) {
          name = cacheData[value].name
        }
        return name
      }
    },
    methods: {
      getItem(value) {
        // return
      },
      onEdit() {
        this.$router.push({name: 'recruitFormInfo', params: {item: this.itemData}})
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
