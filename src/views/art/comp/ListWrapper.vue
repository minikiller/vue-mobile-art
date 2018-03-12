<template lang="pug">
  div.list-container
    list-title(
    v-bind:title="listTitle"
    v-bind:listData="tableData"
    v-on:checkAll="onCheckAll"
    v-on:deleteChecked="deleteChecked")
    div.list-wrapper
      list-loading(v-bind:isLoading="listLoadingIsLoading")
      scroll.shortcut(v-if="tableData.length" v-bind:refreshDelay="120" ref="shortcut" v-bind:data="tableData"
      v-bind:pullup="true"
      v-bind:pulldown="true"
      v-on:scrollToEnd="scrollToEnd"
      v-on:pulldown="pullDown"
      )
        div
          slot(name="slotListContent" v-bind:data="tableData")
          list-load-more(v-bind:isFinish="listLoadMoreIsFinish")
      no-list(v-bind:listData="tableData" v-bind:text="noListText" v-bind:redirectName="noListRedirectName")
    list-footer(v-bind:text="listFooterText" v-bind:redirectName="listFooterRedirectName")
</template>
<script type="text/ecmascript-6">
  import Scroll from '../base/scroll'
  import ListLoading from './ListLoading'
  import NoList from './NoList'
  import ListFooter from './ListFooter'
  import ListTitle from './ListTitle'
  import ListLoadMore from './ListLoadMore'
  import {PageConfig} from '@/config/global.toml'
  import {Message, Cache} from 'kalix-base'
  import {DictKeyValueObject} from '@/common/keyValueObject'

  export default {
    props: {
      listTitle: {
        type: String,
        default: ''
      },
      noListText: {
        type: String,
        default: ''
      },
      noListRedirectName: {
        type: String,
        required: true
      },
      listFooterText: {
        type: String,
        default: ''
      },
      listFooterRedirectName: {
        type: String,
        default: ''
      },
      // getData 请求地址
      targetURL: {
        type: String,
        required: true
      },
      // 数据字典定义
      dictDefine: {
        type: Array
      }
    },
    data() {
      return {
        tableData: [],
        listLoadMoreIsFinish: false,
        listLoadingIsLoading: false,
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        }
      }
    },
    mounted() {
      this.$myConsoleLog('mounted', 'mounted', '#FF5555')
      this.init()
    },
    activated() {
      this.$myConsoleLog('activated', 'activated', '#FF5555')
      this.init()
    },
    methods: {
      init() {
        this.tempArr = []
        this._getCurrentUser()
        this.listLoadMoreIsFinish = false
        this.pager.currentPage = 1
        this._getData()
      },
      onCheckAll(flag) {
        this.tableData.map(item => {
          item.isChecked = flag
        })
      },
      deleteChecked() {
        this._oneByOneDelete()
      },
      scrollToEnd() {
        // 上拉
        this._getData()
      },
      pullDown() {
        // 下拉刷新
        this.listLoadingIsLoading = true
        this.listLoadMoreIsFinish = false
        setTimeout(() => {
          this.pager.currentPage = 1
          this._getData()
        }, 1000)
      },
      _oneByOneDelete() {
        // 逐个删除
        let ids = []
        this.tableData.forEach(item => {
          if (item.isChecked) {
            ids.push(item.id)
          }
        })
        if (!ids.length) {
          Message.error('至少需要选中一条记录！')
          return false
        }
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.forEach(item => {
            if (item.isChecked) {
              this.axios.request({
                method: 'DELETE',
                url: this.targetURL + '/' + item.id
              }).then(() => {
                this.tableData.splice(this.tableData.findIndex(e => e.id === item.id), 1)
              })
            }
          })
        }).catch(() => {
          //  cancel
        })
      },
      _getCurrentUser() {
        this.currentUser = JSON.parse(Cache.get('CurrentUser'))
        // this.$myConsoleLog('[this.currentUser]', this.currentUser, '#005555')
      },
      _getData() {
        // this.$myConsoleLog('getData this.isFinish', this.listLoadMoreIsFinish, '#191970')
        if (!this.listLoadMoreIsFinish) {
          let _data = {
            jsonStr: '{"%code%": "' + this.currentUser.code + '"}',
            page: this.pager.currentPage,
            start: this.pager.start,
            limit: this.pager.limit
          }
          console.log('_data', _data)
          this.$http.get(this.targetURL, {
            params: _data
          }).then(response => {
            // console.log('response', response)
            this.$myConsoleLog('response', response, '#550000')
            if (response.data.data) {
              let resData = response.data.data.map((item, index) => {
                item.rowNumber = index + this.rowNo
                item.isChecked = false
                return item
              })
              // 设置数据字典
              if (this.dictDefine) {
                this.setDictDefine(resData)
              }
              if (this.pager.currentPage === 1) {
                // 刷新
                this.tempArr = resData
              } else {
                // 追加
                this.tempArr = this.tempArr.concat(resData)
              }
            }
            this.tableData = this.tempArr

            // 已经显示全部记录
            this.listLoadMoreIsFinish = (response.data.totalCount === this.tableData.length)
            this.pager.currentPage += 1
            this.listLoadingIsLoading = false
            if (this.$refs.shortcut) {
              this.$refs.shortcut.refresh()
            }
          })
        }
      },
      setDictDefine(_data) { // 处理数据字典
        this.dictDefine.forEach((item) => {
          //  获取 对应的键值对 对象
          let _keyObj = DictKeyValueObject(item.cacheKey, item.type)
          console.log('[kalix]-[baseTable.vue] dict should get key is ', _keyObj)
          _data.forEach(function (e) {
            //  检测 _keyObj 是否存在
            if (_keyObj) {
              // 替换对应的列值
              e[item.targetField] = _keyObj[e[item.sourceField]]
            }
          })
          console.log('[kalix]-[baseTable.vue] _data ', _data)
        })
      }
    },
    components: {
      Scroll,
      ListLoading,
      NoList,
      ListFooter,
      ListTitle,
      ListLoadMore
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .list-container
    flex 1
    display flex
    flex-flow column
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

    .shortcut
      height: 100%
      overflow: hidden
</style>
