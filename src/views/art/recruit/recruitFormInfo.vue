<!--
  描述：艺术中心-企业-招聘信息
  开发人：桑杨
  开发日期：2018年3月15日09:09:22
-->
<template lang="pug">
  art-base-form(
  title="招聘信息"
  bizKey="role"
  ref="recruitForm"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    div.form-wrapper(slot="slotForm")
      el-form-item.s-flex_item.kalix-form-table-td(label="岗位名称" prop="position" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.position")
      el-form-item.s-flex_item.kalix-form-table-td(label="工作省份" prop="region" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.region" appName="art" dictType="省份")
      el-form-item.s-flex_item.kalix-form-table-td(label="工作城市" prop="city" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.city")
      el-form-item.s-flex_item.kalix-form-table-td(label="岗位要求" prop="positionRequires" v-bind:label-width="labelWidth")
        el-input(v-model="positionRequires" type="textarea" v-bind:rows="4")
      el-form-item.s-flex_item.kalix-form-table-td(label="岗位所需软件" prop="requireSofts" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.requireSofts" type="textarea" v-bind:rows="4")
      el-form-item.s-flex_item.kalix-form-table-td(label="岗位个数" prop="jobNumbers" v-bind:label-width="labelWidth")
        el-input-number(v-model="formModel.jobNumbers" v-bind:min="1" style="float:right")
      el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.education" appName="art" dictType="学历")
      el-form-item.s-flex_item.kalix-form-table-td(label="职能类别" prop="functionCategoryId" v-bind:label-width="labelWidth")
        art-cascade(v-model="formModel.functionCategoryId")
      el-form-item.s-flex_item.kalix-form-table-td(label="实习薪资" prop="probationSalary" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.probationSalary" appName="art" dictType="月薪")
      el-form-item.s-flex_item.kalix-form-table-td(label="转正薪资" prop="salary" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.salary" appName="art" dictType="月薪")
      el-form-item.s-flex_item.kalix-form-table-td(label="应用技术名称" prop="appliedTechnology" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.appliedTechnology")
      el-form-item.s-flex_item.kalix-form-table-td(label="个人要求" prop="personRequires" v-bind:label-width="labelWidth")
        art-dist-check-list(v-model="formModel.personRequires" appName="art" dictType="个人要求" style="width:100%")
      el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.jobType" appName="art" dictType="工作类型" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import ArtBaseForm from '../comp/ArtBaseForm'
  import FormModel from './model'
  import {Cache} from 'kalix-base'
  import {RecruitURL} from '../config.toml'
  import ArtDistSelect from '../base/ArtDistSelect'
  import ArtDistCheckList from '../base/ArtDistCheckList'
  import ArtCascade from '../base/ArtCascade'

  export default {
    props: {
      isVisible: false
    },
    activated() {
      this.open()
    },
    deactivated() {
      this.positionRequires = ''
      sessionStorage.removeItem('CurrentRecruit')
    },
    data() {
      let validateSpace = (rule, value, callback) => {
        let reg = new RegExp('\\s')
        let r = value.substr(0).match(reg)
        if (r != null) {
          callback(new Error('不能包含空格'))
        }
        callback()
      }
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          companyCode: [{required: true, message: '请输入企业组织机构代码', trigger: 'blur'}],
          companyName: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
          position: [
            {required: true, message: '请输入岗位名称', trigger: 'blur'},
            {validator: validateSpace, trigger: 'blur|change'}
          ]
        },
        targetURL: RecruitURL,
        labelWidth: '100px',
        positionRequires: ''
      }
    },
    created() {
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
      getItem() {
        let itemId = this.$route.params.itemId
        let item = JSON.parse(Cache.get('RECRUIT_CURRENT_ITEM'))
        return (item.id === (itemId * 1)) ? item : null
      },
      open() {
        let item = this.getItem()
        if (item) {
          this.formModel = item
          this.isEdit = true
          this.positionRequires = this.formModel.positionRequires.replace(/<br \/>/g, '\n')
        } else {
          this.formModel = Object.assign({}, FormModel)
          this.isEdit = false
          this.positionRequires = ''
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
        this.$myConsoleLog('rec', rec, '#551A8B')
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
      ArtBaseForm,
      ArtDistSelect,
      ArtDistCheckList,
      ArtCascade
    }
  }
</script>
<style lang="stylus" type="text/stylus">
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

</style>
<style scoped lang="stylus" type="text/stylus">
  .form-wrapper
    padding 15px
</style>
