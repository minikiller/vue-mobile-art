<!--
  招聘信息
-->
<template lang="pug">
  transition(name="show")
    div.art-company-info(v-if="isVisible" data-art="data-art")
      div.hd
        div.wrapper
          div.item
            div(v-on:click="onClose") 返回
          div.title 招聘信息
          div.item
            div(v-on:click="onClose") 关闭
      div.bd
        scroll.scroll-form(v-bind:refreshDelay="120" ref="scrollForm"
        v-bind:beforeScroll="true"
        v-on:beforeScroll="listScroll")
          div.wrapper
            el-form(ref="dialogForm" v-bind:model="formModel" v-bind:rules="rules")
              el-form-item.s-flex_item.kalix-form-table-td(label="岗位名称" prop="position" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.position")
              el-form-item.s-flex_item.kalix-form-table-td(label="工作省份" prop="region" v-bind:label-width="labelWidth")
                art-dist-select(v-model="formModel.region" appName="art" dictType="省份")
              el-form-item.s-flex_item.kalix-form-table-td(label="工作城市" prop="city" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.city")
              el-form-item.s-flex_item.kalix-form-table-td(label="岗位要求" prop="positionRequires" v-bind:label-width="labelWidth")
                el-input(v-model="positionRequires" type="textarea"
                v-bind:rows="4")
              el-form-item.s-flex_item.kalix-form-table-td(label="岗位所需软件" prop="positionRequires" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.requireSofts")
              el-form-item.s-flex_item.kalix-form-table-td(label="岗位个数" prop="jobNumbers" v-bind:label-width="labelWidth")
                el-input-number(v-model="formModel.jobNumbers" v-bind:min="1" style="float:right")
              el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.education")
              el-form-item.s-flex_item.kalix-form-table-td(label="职能类别" prop="functionCategoryId" v-bind:label-width="labelWidth")
                art-cascade(v-model="formModel.functionCategoryId")
              el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
                el-input-number(v-model="formModel.salary" v-bind:step="500"  style="float:right")
              el-form-item.s-flex_item.kalix-form-table-td(label="应用技术名称" prop="appliedTechnology" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.appliedTechnology")
              el-form-item.s-flex_item.kalix-form-table-td(label="个人要求" prop="personRequires" v-bind:label-width="labelWidth")
                art-dist-check-list(v-model="formModel.personRequires" appName="art" dictType="个人要求" style="width:100%")
              el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
                art-dist-select(v-model="formModel.jobType" appName="art" dictType="工作类型" style="width:100%")
      div.ft
        div.btns
          el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {Message, Cache} from 'kalix-base'
  import {RecruitURL} from '../config.toml'
  import ArtDistSelect from '../base/ArtDistSelect'
  import ArtDistCheckList from '../base/ArtDistCheckList'
  import Scroll from '../base/scroll'
  import ArtCascade from '../base/ArtCascade'

  export default {
    props: {
      isVisible: false
    },
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          companyCode: [{required: true, message: '请输入企业组织机构代码', trigger: 'blur'}],
          companyName: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
          position: [{required: true, message: '请输入岗位名称', trigger: 'blur'}]
        },
        targetURL: RecruitURL,
        labelWidth: '100px',
        positionRequires: ''
      }
    },
    mounted() {
    },
    methods: {
      listScroll() {
        let inputs = document.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].blur()
        }
      },
      initSwiper() {
        setTimeout(() => {
          this.$refs.scrollForm.refresh()
        }, 20)
      },
      open(item) {
        this.$emit('update:isVisible', true)
        this.initSwiper()
        if (item) {
          this.formModel = item
          this.isEdit = true
          this.positionRequires = this.formModel.positionRequires.replace(/<br \/>/g, '\n')
        } else {
          this.formModel = Object.assign({}, FormModel)
          this.isEdit = false
          this.positionRequires = ''
          // console.log('FormModel', FormModel)
        }
        this.getCompany()
      },
      close() {
        this.$emit('update:isVisible', false)
      },
      onClose() {
        this.close()
      },
      onCancelClick() {
      },
      getCompany() {
        let rec = JSON.parse(Cache.get('CurrentCompany'))
        this.formModel.companyName = rec.name
        this.formModel.companyCode = rec.code
        this.formModel.companyEmail = rec.email
        this.formModel.companyPhone = rec.phone
        this.formModel.companyMobile = rec.mobile
        this.formModel.companyNature = rec.nature
        this.formModel.companyScale = rec.scale
        this.formModel.companyIndustry = rec.industry
        this.formModel.companyLife = rec.life
        this.formModel.companyRegion = rec.region
        this.formModel.companyCity = rec.city
        this.formModel.companyAddress = rec.address
      },
      onSubmitClick() {
        this.formModel.positionRequires = this.positionRequires.replace(/[\r\n]/g, '<br />')
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
//                Message.success(response.data.msg)
                this.visible = false
                this.$refs.dialogForm.resetFields()
                this.resultRedirect('success')
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
      resultRedirect(target) {
        this.$emit('update:isVisible', false)
        console.log('resultRedirect', {name: 'recruitResult', params: {key: target}})
        this.$router.push({name: 'recruitResult', params: {key: target, status: 'ok'}})
      }
    },
    components: {
      ArtDistSelect,
      ArtDistCheckList,
      ArtCascade,
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

    .el-input__inner
      border-radius 0
      border-width 0 0 1px 0 !important

    .el-input-number__decrease,
    .el-input-number__increase
      border-radius 50%
      border 0
      background-color transparent
      color #fff
      &:after
        position absolute
        display block
        content ''
        width 20px
        height 20px
        background-color #ffa200
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
        border-radius 50%
        z-index -1

  .show-enter-active,
  .show-leave-active
    transition all .5s

  .show-enter,
  .show-leave-active
    transform translate3d(100%, 0, 0)
</style>
