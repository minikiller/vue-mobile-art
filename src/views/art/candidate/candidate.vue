<!--
  描述：艺术中心-学生主页
  开发人：桑杨
  开发日期：2018年3月8日10:20:10
-->
<template lang="pug">
  div.container
    art-top
    list-wrapper(
    listTitle="我的简历"
    noListText="还没有简历<br/>点击<span class=\"here\">[这里]</span>新建简历"
    noListRedirectName="candidateForm"
    listFooterText="新建简历"
    listFooterRedirectName="candidateForm"
    v-bind:targetURL="targetURL"
    v-bind:dictDefine="dictDefine"
    v-bind:jsonStr="jsonStr"
    )
      div(slot="slotListContent" slot-scope="scope")
        template(v-for="item in scope.data")
          candidate-item(v-bind:itemData="item")
          split
</template>
<script type="text/ecmascript-6">
  import ArtTop from '../comp/ArtTop'
  import ListWrapper from '../comp/ListWrapper'
  import CandidateItem from './candidateItem'

  import Scroll from '../base/scroll'
  import Split from '../base/split'

  import {Cache} from 'kalix-base'
  import {CandidateURL} from '../config.toml'

  export default {
    data() {
      return {
        isFinish: false,
        isLoading: false,
        tableData: [],
        targetURL: CandidateURL,
        jsonStr: '',
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
    created() {
      let currentUser = JSON.parse(Cache.get('CurrentUser'))
      this.jsonStr = '{"%code%": "' + currentUser.code + '"}'
    },
    mounted() {
      this.init()
    },
    methods: {
      onItemChecked() {
      },
      init() {
        this._chkStudentInfo()
      },
      getCompanyCode() {
      },
      // 检查是否有“专业”信息
      _chkStudentInfo() {
        let currentStudent = JSON.parse(Cache.get('CurrentStudent'))
        if (!currentStudent.majorId) {
          this.$router.push({name: 'candidateInfo'})
        }
      }
    },
    components: {
      Scroll,
      ArtTop,
      Split,
      ListWrapper,
      CandidateItem
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
