<!--
描述：企业信息
开发人：juezhan
开发日期：2017年12月7日
-->
<template lang="pug">
  transition(name="show")
    div.art-company-info(v-if="isVisible" data-art="data-art")
      div.hd
        div.wrapper
          div.item
            div(v-on:click="onClose") 返回
          div.title 企业信息
          div.item
            div(v-on:click="onClose") 关闭
      div.bd
        scroll.scroll-form(v-bind:refreshDelay="120" ref="scrollForm")
          div.wrapper
            div 基本信息
            el-form(ref="dialogForm" v-bind:model="formModel")
              el-form-item.s-flex_item.kalix-form-table-td(label="企业组织机构代码" prop="code" v-bind:label-width="labelWidth")
                el-input.s-flex_item(v-model="formModel.code" readonly)
              el-form-item.s-flex_item.kalix-form-table-td(label="企业名称" prop="name" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.name" readonly)
              el-form-item.s-flex_item.kalix-form-table-td(label="邮箱" prop="email" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.email" readonly)
              el-form-item.s-flex_item.kalix-form-table-td(label="固定电话" prop="phone" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.phone" readonly)
              el-form-item.kalix-form-table-td(label="手机" prop="mobile" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.mobile" readonly)
              div 详细信息
              el-form-item.s-flex_item.kalix-form-table-td(label="企业详细地址" prop="address" v-bind:rules="rules.address" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.address")
              el-form-item.s-flex_item.kalix-form-table-td(label="企业性质" prop="companyNature" v-bind:label-width="labelWidth")
                art-dist-select(v-model="formModel.nature" appName="art" dictType="企业性质")
              el-form-item.s-flex_item.kalix-form-table-td(label="企业规模" prop="companyScale" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.scale")
              el-form-item.s-flex_item.kalix-form-table-td(label="企业行业" prop="companyIndustry" v-bind:label-width="labelWidth")
                art-dist-select(v-model="formModel.industry" appName="art" dictType="企业行业" style="width:100%")
              el-form-item.s-flex_item.kalix-form-table-td(label="企业年限" prop="companyLife" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.life")
              el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.region")
              el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.city")
      div.ft
        div.btns
          el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>
<script type="text/ecmascript-6">
  import FormModel from './companyModel'
  import {Message, EventBus} from 'kalix-base'
  import ArtDistSelect from '../base/ArtDistSelect'
  import Scroll from '../base/scroll'

  const companysUrl = '/camel/rest/companys'

  export default {
    data() {
      return {
        isVisible: false,
        formModel: Object.assign({}, FormModel),
        rules: {
          address: [{required: true, message: '请输入企业详细地址', trigger: 'blur'}]
        },
        labelWidth: '140px'
      }
    },
    mounted() {
    },
    methods: {
      initSwiper() {
        setTimeout(() => {
          this.$refs.scrollForm.refresh()
        }, 20)
      },
      open(row) {
        this.isVisible = true
        this.formModel = row
        this.initSwiper()
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
                this.$router.push({path: '/art/recuit/success/company'})
              } else {
                this.resultRedirect('error')
              }
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
        this.$router.push({path: `/art/recuit/${target}/company`})
      }
    },
    components: {
      ArtDistSelect,
      Scroll
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .scroll-form
    height: 100%
    overflow: hidden

  .art-company-info[data-art]
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
