<template lang="pug">
  div.art-form
    div
      art-form-header(v-on:optionClick="optionClick")
      div.list-title
        div.title 我的招聘信息
        div.operation
          span.btn-item
            i.art-iconfont.icon-guanli
            | 管理
          span.btn-item
            i.art-iconfont.icon-xuanze1
            | 全选
          span.btn-item
            i.art-iconfont.icon-shanchu
            | 删除选中
      div.list-wrapper
        swiper-container(ref="swiperContainer")
          div.split
          template(v-for="item in tableData")
            art-item(v-bind:itemData="item" v-on:itemEditClick="onItemClick")
            div.split
        div.no-list(v-if="false")
          div.cnt
            i.art-iconfont.icon-meiyouchaxunjieguo.icon
            div.text 还没有应聘信息
              br
              | 点击
              span.here [这里]
              | 新建应聘信息
      div.footer
        router-link.btn(tag="div" v-if="false" v-bind:to="{path:'/art/recruitforminfo'}") 新建招聘信息
        div.btn(v-on:click="openFormInfo") 新建招聘信息
    recruit-company-info(ref="companyInfo")
    recruit-form-info(ref="formInfo")
</template>
<script type="text/ecmascript-6">
  import ArtFormHeader from '../base/ArtFormHeader'
  import RecruitCompanyInfo from './recruitCompanyInfo'
  import RecruitFormInfo from './recruitFormInfo'
  import ArtItem from './ArtItem'
  import {PageConfig} from '@/config/global.toml'
  import {RecruitURL} from '../config.toml'
  import SwiperContainer from './SwiperContainer'

  export default {
    data() {
      return {
        tableData: [],
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
      this.tempArr = []
      /* eslint-disable */
      document.addEventListener("WeixinJSBridgeReady", function () {
        WeixinJSBridge.call("showToolbar")
      })
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })

      this.getData()
    },
    methods: {
      optionClick() {
        this.$refs.companyInfo.open()
      },
      openFormInfo() {
        this.$refs.formInfo.open()
      },
      getData() {
        let _data = {
          jsonStr: this.jsonStr,
          page: 1,
          start: this.pager.start,
          limit: this.pager.limit
        }
        this.$http.get(RecruitURL, {
          params: _data
        }).then(response => {
          let resData = response.data.data.map((item, index) => {
            item.rowNumber = index + this.rowNo
            item.isChecked = false
            return item
          })
          this.tableData = this.tempArr.concat(resData)
          this.$refs.swiperContainer.start()
        })
      },
      onItemClick(item) {
        this.$refs.formInfo.open(item)
      }
    },
    components: {
      ArtFormHeader,
      RecruitCompanyInfo,
      RecruitFormInfo,
      ArtItem,
      SwiperContainer
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border"
  .art-form
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color #ebebeb

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

  .list-wrapper
    position: fixed;
    width: 100%;
    top: 114px;
    bottom: 50px;
    left: 0;
    overflow: hidden;
    .split
      height: 10px;
      background-color: #ebebeb;
    .no-list
      text-align center
      margin-top 50%
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

</style>
