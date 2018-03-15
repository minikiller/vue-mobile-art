<template lang="pug">
  div.container
    art-top
    list-wrapper(
    listTitle="我的招聘信息"
    noListText="还没有招聘信息<br/>点击<span class=\"here\">[这里]</span>新建招聘信息"
    noListRedirectName="recruitFormInfo"
    listFooterText="新建招聘信息"
    listFooterRedirectName="recruitFormInfo"
    v-bind:targetURL="targetURL"
    v-bind:dictDefine="dictDefine"
    )
      div(slot="slotListContent" slot-scope="scope")
        template(v-for="item in scope.data")
          recruit-item(v-bind:itemData="item")
          split
</template>
<script type="text/ecmascript-6">
  import ArtTop from '../comp/ArtTop'
  import ListWrapper from '../comp/ListWrapper'
  import RecruitItem from './recruitItem'
  import Split from '../base/split'

  import {RecruitURL} from '../config.toml'

  export default {
    data() {
      return {
        isFinish: false,
        isLoading: false,
        tableData: [],
        targetURL: RecruitURL,
        dictDefine: [
          { // 定义数据字典的显示
            cacheKey: 'ART-DICT-KEY',
            type: '省份',
            targetField: 'regionName',
            sourceField: 'region'
          },
          {
            cacheKey: 'ART-DICT-KEY',
            type: '企业行业',
            targetField: 'expectingIndustryName',
            sourceField: 'expectingIndustry'
          }
        ],
        currentUser: null
      }
    },
    components: {
      ArtTop,
      Split,
      ListWrapper,
      RecruitItem
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
    background-color #ebebeb

</style>
<style lang="stylus" type="text/stylus">
  .el-message-box
    width 300px
</style>
