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
        div.swiper-container
          div.swiper-wrapper
            div.swiper-slide
              div.wrapper
                el-form(ref="dialogForm" v-bind:model="formModel")
                  el-form-item.s-flex_item.kalix-form-table-td(label="企业组织机构代码" prop="companyCode" v-bind:rules="rules.companyCode" v-bind:label-width="labelWidth")
                    div.s-flex(style="align-items: center;")
                      el-input.s-flex_item(v-model="formModel.companyCode")
                      el-button(type="primary" size="mini" icon="el-icon-search" v-on:click="getCompany" style="margin-left:8px;") 查询
                  el-form-item.s-flex_item.kalix-form-table-td(label="企业名称" prop="companyName" v-bind:rules="rules.companyName" v-bind:label-width="labelWidth")
                    el-input(v-model="formModel.companyName")
                  el-form-item.s-flex_item.kalix-form-table-td(label="企业性质" prop="companyNature" v-bind:label-width="labelWidth")
                    art-dist-select(v-model="formModel.companyNature" appName="art" dictType="企业性质")
                  el-form-item.s-flex_item.kalix-form-table-td(label="企业规模" prop="companyScale" v-bind:label-width="labelWidth")
                    el-input(v-model="formModel.companyScale")
                  el-form-item.s-flex_item.kalix-form-table-td(label="企业行业" prop="companyIndustry" v-bind:label-width="labelWidth")
                    art-dist-select(v-model="formModel.companyIndustry" appName="art" dictType="企业行业" style="width:100%")
                  el-form-item.s-flex_item.kalix-form-table-td(label="企业年限" prop="companyLife" v-bind:label-width="labelWidth")
                    el-input(v-model="formModel.companyLife")
                  el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
                    el-input(v-model="formModel.region")
                  el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
                    el-input(v-model="formModel.city")
      div.ft
        div.btns
          el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Message from 'kalix-base'
  import {RecruitURL} from '../config.toml'
  import Vue from 'vue'
  import Swiper from 'swiper'
  import ArtDistSelect from '../base/ArtDistSelect'

  export default {
    data() {
      return {
        isVisible: false,
        formModel: Object.assign({}, FormModel),
        rules: {
          companyCode: [{required: true, message: '请输入企业组织机构代码', trigger: 'blur'}],
          companyName: [{required: true, message: '请输入企业名称', trigger: 'blur'}]
        },
        targetURL: RecruitURL,
        labelWidth: '140px'
      }
    },
    mounted() {
    },
    methods: {
      initSwiper() {
        setTimeout(() => {
          /* eslint-disable */
          new Swiper('.swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
              el: '.swiper-scrollbar'
            },
            mousewheel: true
          })
        }, 500)
      },
      open() {
        this.isVisible = true
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
          console.log('valid', valid)
          if (valid) {
            Vue.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
//                Message.success(response.data.msg)
                this.visible = false
                this.$refs.dialogForm.resetFields()
                // this.resultRedirect('success')
                this.$router.push({path: '/art/recuit/success'})
                // window.open(window.location.origin + '/art/recuit/' + target)
              } else {
                this.resultRedirect('error')
              }
              // 刷新列表
              console.log('[kalix] dialog submit button clicked !')
              this.visible = false
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
      getCompany() {
        this.initData()
        let companyCode = this.formModel.companyCode
        let sort = '[{\'property\': \'creationDate\', \'direction\': \'DESC\'}]'
        if (companyCode) {
          let params = {
            params: {
              'jsonStr': {'companyCode': companyCode},
              'page': 1,
              'limit': 1,
              'sort': sort
            }
          }
          Vue.axios.get(RecruitURL, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              this.formModel.companyName = rec.companyName
              this.formModel.companyNature = rec.companyNature
              this.formModel.companyScale = rec.companyScale
              this.formModel.companyIndustry = rec.companyIndustry
              this.formModel.companyLife = rec.companyLife
              this.formModel.region = rec.region
              this.formModel.city = rec.city
            }
          })
        } else {
          alert('请输入企业组织机构代码')
        }
      },
      resultRedirect(target) {
        window.open(window.location.origin + '/art/recuit/' + target)
      }
    },
    components:{
      ArtDistSelect
    }
  }
</script>
<style lang="stylus" type="text/stylus">
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
