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
    v-bind:jsonStr="jsonStr"
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
  import {Cache} from 'kalix-base'

  import {RecruitURL} from '../config.toml'

  export default {
    data() {
      return {
        isFinish: false,
        isLoading: false,
        tableData: [],
        targetURL: RecruitURL,
        jsonStr: '',
        dictDefine: [
          {
            // 定义数据字典的显示
            cacheKey: 'ART-DICT-KEY',
            type: '企业性质',
            targetField: 'companyNatureName',
            sourceField: 'companyNature'
          },
          {
            cacheKey: 'ART-DICT-KEY',
            type: '省份',
            targetField: 'regionName',
            sourceField: 'region'
          },
          {
            cacheKey: 'ART-DICT-KEY',
            type: '工作类型',
            targetField: 'jobTypeName',
            sourceField: 'jobType'
          },
          {
            cacheKey: 'ART-DICT-KEY',
            type: '月薪',
            targetField: 'probationSalaryName',
            sourceField: 'probationSalary'
          },
          {
            cacheKey: 'ART-DICT-KEY',
            type: '月薪',
            targetField: 'salaryName',
            sourceField: 'salary'
          },
          {
            cacheKey: 'ART-DICT-KEY',
            type: '学历',
            targetField: 'educationName',
            sourceField: 'education'
          },
          {
            cacheKey: 'ART-DICT-KEY',
            type: '个人要求',
            targetField: 'personRequiresName',
            sourceField: 'personRequires',
            isMultiselect: true
          }
        ],
        currentUser: null
      }
    },
    created() {
      let currentUser = JSON.parse(Cache.get('CurrentUser'))
      this.jsonStr = '{"%companyCode%": "' + currentUser.code + '"}'
      this.$myConsoleLog('jsonStr', this.jsonStr)
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
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
