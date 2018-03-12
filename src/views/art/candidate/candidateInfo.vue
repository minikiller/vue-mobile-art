<!--
  描述：学生个人基本信息
  开发人：juezhan
  开发日期：2018年2月12日09:43:03
-->
<template lang="pug">
  art-base-form(
  title="个人基本信息"
  bizKey="role"
  ref="kalixBizDialog"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    div.el-form(slot="slotForm")
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
        input.el-input__inner(type="date" v-model="formModel.birthday")
      el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.nation")
      el-form-item.s-flex_item.kalix-form-table-td(label="籍贯" prop="placeOfOrigin" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.placeOfOrigin")
      el-form-item.s-flex_item.kalix-form-table-td(label="现联系地址" prop="address" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.address")
      el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.politicalStatus")
      el-form-item.s-flex_item.kalix-form-table-td(label="入党(团)时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
        input.el-input__inner(type="date" v-model="formModel.joinPartyDate")
      el-form-item.s-flex_item.kalix-form-table-td(label="邮政编码" prop="postalcode" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.postalcode")
      el-form-item.s-flex_item.kalix-form-table-td(label="家庭联系电话" prop="homePhone" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.homePhone")
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
  import FormModel from './model'
  import ArtDistSelect from '../base/ArtDistSelect'
  import ArtYearSelect from '../base/ArtYearSelect'
  import ArtMajor from '../base/ArtMajor'
  import {StudentURL} from '../config.toml'

  export default {
    data() {
      return {
        isVisible: false,
        targetURL: StudentURL,
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
    },
    mounted() {
    },
    methods: {},
    components: {
      ArtBaseForm,
      ArtDistSelect,
      ArtYearSelect,
      ArtMajor
    }
  }
</script>
<style lang="stylus" type="text/stylus">
</style>
