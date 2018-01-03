<template lang="pug">
  div.art-form(data-artform)
    div
      art-form-header(v-on:optionClick="optionClick")
      div.list-title
        div.title 我的招聘信息
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
          div.cnt
            i.art-iconfont.icon-meiyouchaxunjieguo.icon
            div.text 还没有应聘信息
              br
              | 点击
              span.here(v-on:click="openFormInfo") [这里]
              | 新建应聘信息
      div.footer
        router-link.btn(tag="div" v-if="false" v-bind:to="{path:'/art/recruitforminfo'}") 新建招聘信息
        div.btn(v-on:click="openFormInfo") 新建招聘信息
    recruit-company-info(ref="companyInfo")
    recruit-form-info(ref="formInfo" v-bind:isVisible.sync="isContinueAdd")
</template>
<script type="text/ecmascript-6">
  import ArtFormHeader from '../base/ArtFormHeader'
  import RecruitCompanyInfo from './recruitCompanyInfo'
  import RecruitFormInfo from './recruitFormInfo'
  import ArtItem from './ArtItem'
  import {PageConfig} from '@/config/global.toml'
  import {RecruitURL} from '../config.toml'
  import '../base/font/iconfont.css'
  import {Message, Cache} from 'kalix-base'
  import Scroll from '../base/scroll'
  import Split from '../base/split'
  import FormModel from './model'

  const companysURL = '/camel/rest/companys'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        tableData: [],
        isContinueAdd: false,
        isCheckAll: false,
        isLoading: false,
        isFinish: false,
        companyCode: '',
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        }
      }
    },
    created() {
      this.chkContinue()
    },
    mounted() {
      this.tempArr = []
      /* eslint-disable */
      document.addEventListener("WeixinJSBridgeReady", function () {
        WeixinJSBridge.call("showToolbar")
      })
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    },
    watch: {
      '$route': 'chkContinue'
    },
    methods: {
      init() {
        if (!this.currentUser) {
          this.currentUser = JSON.parse(Cache.get('CurrentUser'))
        }
        this.getCompanyCode()
      },
      getCompanyCode() {
        if (!Cache.get('CurrentCompany')) {
          console.log('this.currentUser.code', this.currentUser.code)
          this.$http.get(companysURL, {
            params: {
              jsonStr: '{"%code%": "' + this.currentUser.code + '"}',
              page: 1,
              start: 0,
              limit: 10
            }
          }).then(res => {
            if (res.data.totalCount) {
              console.log('=== res', res)
              let company = res.data.data[0]
              console.log('=== company', company)
              this.companyCode = this.currentUser.code
              /* 新注册用户-完善企业信息 */
              if (!company.address) {
                // this.$emit('update:isVisible', true)
                this.optionClick(company)
              }
              Cache.save('CurrentCompany', JSON.stringify(company))
            }
          })
        } else {
          this.companyCode = this.currentUser.code
        }
      },
      chkContinue() {
        this.init()
        this.isContinueAdd = false
        this.isFinish = false
        this.pager.currentPage = 1
        this.isLoading = true
        console.log('%cthis.$route', '#550000', this.$route)
        if (this.$route.name === 'recuittest') {
          if (this.$route.params.key === 'continue-add') {
            this.isContinueAdd = true
          }
        }
        this.getData()
      },
      optionClick(company) {
        this.$refs.companyInfo.open(company)
      },
      openFormInfo() {
        // 添加招聘信息
        this.$refs.formInfo.open()
      },
      getData() {
        if (!this.isFinish) {
          let _data = {
            jsonStr: '{"%companyCode%": "' + this.currentUser.code + '"}',
            page: this.pager.currentPage,
            start: this.pager.start,
            limit: this.pager.limit
          }
          console.log('_data', _data)
          this.$http.get(RecruitURL, {
            params: _data
          }).then(response => {
            console.log('response', response)
            let resData = response.data.data.map((item, index) => {
              item.rowNumber = index + this.rowNo
              item.isChecked = false
              return item
            })
            if (this.pager.currentPage === 1) {
              // 刷新
              this.tempArr = resData
            } else {
              // 追加
              this.tempArr = this.tempArr.concat(resData)
            }
            this.tableData = this.tempArr

            // 已经显示全部记录
            this.isFinish = (response.data.totalCount === this.tableData.length)
            this.pager.currentPage += 1
            this.isLoading = false
            if (this.$refs.shortcut) {
              this.$refs.shortcut.refresh()
            }
          })
        }
      },
      onItemEdit(item) {
        this.$refs.formInfo.open(item)
      },
      onItemDelete(item) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: RecruitURL + '/' + item.id,
            params: {},
            data: {
              id: item.id
            }
          })
        }).then(response => {
          this.tableData.splice(this.tableData.findIndex(e => e.id === item.id), 1)
          Message.success(response.data.msg)
        }).catch(() => {
        })
      },
      onItemChecked(item) {
        let temp1 = this.tableData.filter(e => {
          return e.isChecked
        })
        this.isCheckAll = this.tableData.length === temp1.length
      },
      checkAll() {
        //  全选
        this.isCheckAll = !this.isCheckAll
        this.tableData.map(item => {
          item.isChecked = this.isCheckAll
        })
      },
      deleteChecked() {
        this.oneByOneDelete()
      },
      oneByOneDelete() {
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
                url: RecruitURL + '/' + item.id
              }).then(() => {
                this.tableData.splice(this.tableData.findIndex(e => e.id === item.id), 1)
              })
            }
          })
        }).then(() => {
          //  cancel
        })
      },
      batchDelete() {
        //  删除选中
        let ids = []
        this.tableData.forEach(item => {
          if (item.isChecked) {
            ids.push(item.id)
          }
        })
        if (ids.length > 0) {
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return this.axios.request({
              method: 'DELETE',
              url: `${RecruitURL}/remove`,
              params: {
                ids: ids.join(':')
              }
            })
          }).then(response => {
            Message.success(response.data.msg)
            this.getData()
          }).catch(() => {
          })
        } else {
          Message.error('至少选择一项')
        }
      },
      scrollToEnd() {
        // 上拉
        this.getData()
      },
      pulldown() {
        // 下拉刷新
        this.isLoading = true
        this.isFinish = false
        setTimeout(() => {
          this.pager.currentPage = 1
          this.getData()
        }, 1000)
      }
    },
    components: {
      Scroll,
      ArtFormHeader,
      RecruitCompanyInfo,
      RecruitFormInfo,
      ArtItem,
      Split
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  *:active,
  *:focus
    outline none

  *
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)

  .el-message-box
    width 320px
</style>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border"
  .art-form
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color #ebebeb

  .shortcut
    height: 100%
    overflow: hidden

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
    position: fixed;
    width: 100%;
    top: 114px;
    bottom: 50px;
    left: 0;
    overflow: hidden;
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
    position fixed
    width 100%
    bottom 0
    left 0
    height 50px
    line-height 50px
    .btn
      font-size 16px
      text-align center
      color #ffffff
      background-color #ae935c

  .load-more
    margin 0
    padding 0 0 20px
    height 50px
    line-height 50px
    text-align center
    font-size 10px
    color #999999

  .loading
    margin 0
    padding 0
    height 50px
    line-height 50px
    text-align center
    font-size 10px
    color #999999

  .loading-leave-active
    transition height .5s

  .loading-leave-active
    height 0

</style>
