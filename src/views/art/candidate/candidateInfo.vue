<!--
  描述：学生个人基本信息
  开发人：juezhan
  开发日期：2018年2月12日09:43:03
-->
<template lang="pug">
  div.candidate-info
    art-header(title="个人基本信息" v-bind:isVisibleLeft="isEnable" v-bind:isVisibleRight="isEnable")
    div.bd
      scroll.scroll-form(v-bind:refreshDelay="120" ref="scrollForm")
        div.wrapper
          el-form(ref="dialogForm" v-bind:model="formModel")
            div.table-title 基本信息
            el-form-item.s-flex_item.kalix-form-table-td(label="学号" prop="code" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.code" disabled)
            el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.name" disabled)
            el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.sex" disabled)
            el-form-item.s-flex_item.kalix-form-table-td(label="邮箱" prop="email" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.email" disabled)
            el-form-item.s-flex_item.kalix-form-table-td(label="固定电话" prop="phone" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.phone" disabled)
            el-form-item.s-flex_item.kalix-form-table-td(label="手机" prop="mobile" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.mobile" disabled)
            div.table-title 详细信息
            el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:rules="rules.majorId" v-bind:label-width="labelWidth")
              art-major(v-model="formModel.majorId" v-bind:treeDataURL="orgURL" v-bind:parentNodeId="orgId")
            el-form-item.s-flex_item.kalix-form-table-td(label="辅导员" prop="instructor" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.instructor")
            el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" v-bind:label-width="labelWidth")
              input.el-input__inner(type="date")
            el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.nation")
            el-form-item.s-flex_item.kalix-form-table-td(label="籍贯" prop="placeOfOrigin" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.placeOfOrigin")
            el-form-item.s-flex_item.kalix-form-table-td(label="现联系地址" prop="address" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.address")
            el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.politicalStatus")
            el-form-item.s-flex_item.kalix-form-table-td(label="入党(团)时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
              input.el-input__inner(type="date")
            el-form-item.s-flex_item.kalix-form-table-td(label="邮政编码" prop="postalcode" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.postalcode")
            el-form-item.s-flex_item.kalix-form-table-td(label="家庭联系电话" prop="homePhone" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.homePhone")
            el-form-item.s-flex_item.kalix-form-table-td(label="生源省份" prop="province" v-bind:label-width="labelWidth")
              art-dist-select(v-model="formModel.region" appName="art" dictType="省份")
            el-form-item.s-flex_item.kalix-form-table-td(label="入学年份" prop="entranceYear" v-bind:label-width="labelWidth")
              art-year-select(v-model="formModel.entranceYear")
            el-form-item.s-flex_item.kalix-form-table-td(label="学生培养层次" prop="trainingLevel" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.trainingLevel")
            el-form-item.s-flex_item.kalix-form-table-td(label="学习年限" prop="period" v-bind:label-width="labelWidth")
              el-input(v-model="formModel.period")
    div.ft
      div.btns
        el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>
<script type="text/ecmascript-6">
  import ArtHeader from '../../comp/header'
  import FormModel from './model'
  import {Message, EventBus, Cache} from 'kalix-base'
  import ArtDistSelect from '../base/ArtDistSelect'
  import ArtYearSelect from '../base/ArtYearSelect'
  import ArtMajor from '../base/ArtMajor'
  import Scroll from '../base/scroll'
  import Util from '@/common/Util'

  const companysUrl = '/camel/rest/companys'

  export default {
    data() {
      return {
        isVisible: false,
        formModel: Object.assign({}, FormModel),
        rules: {
          address: [{required: true, message: '请输入企业详细地址', trigger: 'blur'}]
        },
        labelWidth: '140px',
        isEnable: true,
        orgURL: '/camel/rest/orgs',
        orgId: 22601
      }
    },
    activated() {
      this.open()
    },
    mounted() {
    },
    methods: {
      goBack() {
        this.$router.goBack()
      },
      initSwiper() {
        setTimeout(() => {
          this.$refs.scrollForm.refresh()
        }, 20)
      },
      open() {
        let row = JSON.parse(Cache.get('CurrentStudent'))
        this.$myConsoleLog(' CurrentStudent open ', row, '#8B1C62')
        this.isVisible = true
        this.formModel = row
        // this.initSwiper()
        // if (!row.address) {
        //   this.isEnable = false
        // } else {
        //   this.isEnable = true
        // }
      },
      close() {
        this.isVisible = false
      },
      onClose() {
        this.close()
      },
      onCancelClick() {
      },
      onSubmitClick() {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.$delete(this.formModel, 'version')
            this.$delete(this.formModel, 'version_')
            this.axios.request({
              method: 'POST',
              url: companysUrl,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                this.isVisible = false
                this.$refs.dialogForm.resetFields()
                EventBus.$emit('ON_COMPANY_INFO_REFIESH')
                this.resultRedirect('success')
                // this.$router.push({path: '/art/recuit/success/company'})
              } else {
                this.resultRedirect('error')
              }
              Util.setCurrentCompany(this.formModel.code)
              // 刷新列表
              console.log('[kalix] dialog submit button clicked !')
              this.isVisible = false
            })
          } else {
            Message.error('请检查输入项！')
            return false
          }
        })
      },
      initData() {
        this.formModel.companyName = ''
        this.formModel.companyNature = null
        this.formModel.companyScale = ''
        this.formModel.companyIndustry = null
        this.formModel.companyLife = ''
        this.formModel.region = ''
        this.formModel.city = ''
      },
      resultRedirect(target) {
        // this.$router.push({path: `/art/recuit/${target}/company`})
        // window.location.href = '/art/recuit/' + target + '/company'
        this.$router.push({name: 'recruitResult', params: {key: target, status: 'company'}})
      }
    },
    components: {
      ArtHeader,
      ArtDistSelect,
      ArtYearSelect,
      ArtMajor,
      Scroll
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .scroll-form
    height: 100%
    overflow: hidden

  .candidate-info
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background-color #ffffff
    .hd
      position fixed
      top 0
      left 0
      width 100%
      height 48px
      line-height 48px
      background-color #58443d
      color #ffffff
      .wrapper
        display flex
        padding 0 15px
        .item
          flex 1
          font-size 12px
          &:first-child
            text-align left
          &:last-child
            text-align right
        .title
          font-size 16px

    .bd
      position fixed
      left 0
      top 48px
      bottom 70px
      width 100%
      overflow hidden
      .wrapper
        padding 15px
    .ft
      position fixed
      bottom 0
      left 0
      width 100%
      padding 15px
      text-align center
      box-sizing border-box
      background-color #ffffff
      .btns
        display flex
        .btn-item
          flex 1
          background-color #ae935c
          color #ffffff

    .swiper-container
      width 100%
      height 100%

    .el-input__inner
      border-radius 0
      border-width 0 0 1px 0 !important

  .show-enter-active,
  .show-leave-active
    transition all .5s

  .show-enter,
  .show-leave-active
    transform translate3d(100%, 0, 0)
</style>
