<!--
  描述：学生个人基本信息
  开发人：juezhan
  开发日期：2018年2月12日09:43:03
-->
<template lang="pug">
  art-base-form(
  title="个人基本信息"
  bizKey="role"
  ref="candidateInfo"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    template(slot="slotForm")
      div.el-form.form-wrapper
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
      split
      div.el-form.form-wrapper
        div.table-title 详细信息
        el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:rules="rules.majorId" v-bind:label-width="labelWidth")
          art-major(v-model="formModel.majorId" v-bind:treeDataURL="orgURL" v-bind:parentNodeId="orgId")
        el-form-item.s-flex_item.kalix-form-table-td(label="班级" prop="className" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.className")
        el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.nation")
        el-form-item.s-flex_item.kalix-form-table-td(label="籍贯" prop="placeOfOrigin" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.placeOfOrigin")
        el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" v-bind:label-width="labelWidth")
          input.el-input__inner(type="date" v-model="formModel.birthday")
        el-form-item.s-flex_item.kalix-form-table-td(label="现联系地址" prop="address" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.address")
        el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.politicalStatus")
        el-form-item.s-flex_item.kalix-form-table-td(label="入党(团)时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
          input.el-input__inner(type="date" v-model="formModel.joinPartyDate")
        <!--el-form-item.s-flex_item.kalix-form-table-td(label="邮政编码" prop="postalcode" v-bind:label-width="labelWidth")-->
        <!--el-input(v-model="formModel.postalcode")-->
        <!--el-form-item.s-flex_item.kalix-form-table-td(label="家庭联系电话" prop="homePhone" v-bind:label-width="labelWidth")-->
        <!--el-input(v-model="formModel.homePhone")-->
        el-form-item.s-flex_item.kalix-form-table-td(label="生源省份" prop="province" v-bind:label-width="labelWidth")
          art-dist-select(v-model="formModel.province" appName="art" dictType="省份")
        el-form-item.s-flex_item.kalix-form-table-td(label="入学年份" prop="entranceYear" v-bind:label-width="labelWidth")
          art-year-select(v-model="formModel.entranceYear")
        el-form-item.s-flex_item.kalix-form-table-td(label="学生培养层次" prop="trainingLevel" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.trainingLevel")
        el-form-item.s-flex_item.kalix-form-table-td(label="学习年限" prop="period" v-bind:label-width="labelWidth")
          el-input(v-model="formModel.period")
</template>
<script type="text/ecmascript-6">
  import ArtBaseForm from '../comp/ArtBaseForm'
  import Split from '../base/split'
  import ArtDistSelect from '../base/ArtDistSelect'
  import ArtYearSelect from '../base/ArtYearSelect'
  import ArtMajor from '../base/ArtMajor'
  import FormModel from './model'
  import {StudentURL} from '../config.toml'
  import {Cache} from 'kalix-base'

  export default {
    data() {
      return {
        isVisible: false,
        targetURL: StudentURL,
        formModel: Object.assign({}, FormModel),
        rules: {
          address: [{required: true, message: '请输入企业详细地址', trigger: 'blur'}]
        },
        labelWidth: '100px',
        isEnable: true,
        orgURL: '/camel/rest/orgs',
        orgId: 22601
      }
    },
    activated() {
      this.$refs.candidateInfo.open(JSON.parse(Cache.get('CurrentStudent')))
    },
    mounted() {
    },
    methods: {},
    components: {
      ArtBaseForm,
      ArtDistSelect,
      ArtYearSelect,
      ArtMajor,
      Split
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border"
  .form-wrapper
    padding 0 15px

  .table-title
    font-size 14px
    position relative
    padding 15px
    margin 0 -15px 15px
    &:before
      content ''
      display block
      width 6px
      height 14px
      background-color #58443d
      float left
      margin-right 6px
      border-radius 4px

    &:after
      setBottomLine()
</style>
<style lang="stylus" type="text/stylus">
  .el-input__inner
    border-radius 0
    border-width 0 0 1px 0 !important
</style>
