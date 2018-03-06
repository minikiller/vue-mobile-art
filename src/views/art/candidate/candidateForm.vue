<!--
  描述：艺术中心-学生应聘-我的简历
  开发人：桑杨
  开发日期：2017年8月17日
-->

<template lang="pug">
  div.art-company-info(data-art="data-art")
    art-header(title="我的简历")
    div.bd
      scroll.scroll-form(v-bind:refreshDelay="120" ref="scrollForm"
      v-bind:beforeScroll="true"
      v-on:beforeScroll="listScroll")
        div.wrapper
          keep-alive
            el-form(ref="dialogForm" v-bind:model="formModel")
              el-form-item.s-flex_item.kalix-form-table-td(label="工作省份" prop="region" v-bind:rules="rules.region" v-bind:label-width="labelWidth")
                art-dist-select(v-model="formModel.region" appName="art" dictType="省份")
              el-form-item.s-flex_item.kalix-form-table-td(label="工作城市" prop="city" v-bind:rules="rules.city" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.city")
              el-form-item.s-flex_item.kalix-form-table-td(label="期望行业" prop="expectingIndustry" v-bind:rules="rules.expectingIndustry" v-bind:label-width="labelWidth")
                art-dist-select(v-model="formModel.industry" appName="art" dictType="企业行业" style="width:100%")
              el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
                art-dist-select(v-model="formModel.jobType" appName="art" dictType="工作类型" style="width:100%")
              el-form-item.s-flex_item.kalix-form-table-td(label="期望岗位" prop="position" v-bind:rules="rules.position" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.position" type="textarea")
              el-form-item.s-flex_item.kalix-form-table-td(label="所学软件" prop="learningSofts" v-bind:rules="rules.learningSofts" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.learningSofts" type="textarea")
              el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:rules="rules.education" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.education")
              el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
                el-input-number(v-model="formModel.salary" v-bind:step="500" style="width:100%")
              el-form-item.kalix-form-table-td(label="个人特点" prop="skills" v-bind:rules="rules.skills" v-bind:label-width="labelWidth")
                art-dist-check-list(v-model="formModel.skills" appName="art" dictType="个人要求" multiple placeholder="请选择,可多选")
              el-form-item.s-flex_item.kalix-form-table-td(label="入学年份" prop="entranceYear" v-bind:label-width="labelWidth")
                art-year-select(v-model="formModel.entranceYear")
              el-form-item.s-flex_item.kalix-form-table-td(label="学生培养层次" prop="trainingLevel" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.trainingLevel")
              el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:rules="rules.majorId" v-bind:label-width="labelWidth")
                art-major(v-model="formModel.majorId" v-bind:treeDataURL="orgURL" v-bind:parentNodeId="orgId")
              el-form-item.s-flex_item.kalix-form-table-td(label="学习年限" prop="period" v-bind:label-width="labelWidth")
                el-input(v-model="formModel.period")
      div.ft
        div.btns
          el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {CandidateURL, StudentURL} from '../config.toml'
  import Vue from 'vue'
  import {formatDate} from '@/api/typeFormat'
  import {Message, Cache} from 'kalix-base'
  import Scroll from '../base/scroll'
  import ArtHeader from '../../comp/header'
  import ArtDistSelect from '../base/ArtDistSelect'
  import ArtYearSelect from '../base/ArtYearSelect'
  import ArtDistCheckList from '../base/ArtDistCheckList'
  import ArtMajor from '../base/ArtMajor'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          studentNo: [{required: true, message: '请输入学号', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        targetURL: CandidateURL,
        labelWidth: '110px',
        orgURL: '/camel/rest/orgs',
        orgId: 22601
      }
    },
    activated() {
      this.open()
    },
    mounted() {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    },
    methods: {
      open() {
        let item = JSON.parse(Cache.get('CurrentRecruit'))
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
        this.getStudent()
      },
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
      onCodeFocus() {
        this.initData()
      },
      initData() {
        let currentUser = JSON.parse(Cache.get('CurrentUser'))
        // this.$myConsoleLog('[CurrentUser]', currentUser, '#550000')
        // this.$set(this.formModel, 'name', '')
        this.formModel.code = currentUser.code
        this.formModel.name = ''
        this.formModel.sex = ''
        this.formModel.email = ''
        this.formModel.phone = ''
        this.formModel.mobile = ''
        this.formModel.majorId = null
        this.formModel.majorName = ''
        this.formModel.instructor = ''
//        this.formModel.identificationCard = ''
        this.formModel.birthday = null
        this.formModel.nation = ''
        this.formModel.placeOfOrigin = ''
        this.formModel.politicalStatus = ''
        this.formModel.joinPartyDate = null
        this.formModel.address = ''
        this.formModel.postalcode = ''
        this.formModel.homePhone = ''
        this.formModel.province = null
        this.formModel.entranceYear = null
        this.formModel.trainingLevel = ''
        this.formModel.period = ''
      },
      getStudent() {
        this.initData()
        let studentNo = this.formModel.code
        // let sort = '[{\'property\': \'updateDate\', \'direction\': \'DESC\'}]'
        if (studentNo) {
          let params = {
            params: {
              'jsonStr': {'code': studentNo},
              'page': 1,
              'limit': 1,
              'sort': null
            }
          }
          Vue.axios.get(StudentURL, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              /* this.$nextTick(() => {
               this.formModel = Object.assign({}, rec)
               }) */
              // this.$set(this.formModel, 'majorId', rec.majorId)
              this.formModel.name = rec.name
              this.formModel.sex = rec.sex
              this.formModel.email = rec.email
              this.formModel.phone = rec.phone
              this.formModel.mobile = rec.mobile
              this.formModel.majorId = rec.majorId
              this.formModel.majorName = rec.majorName
              this.formModel.instructor = rec.instructor
//              this.formModel.identificationCard = rec.identificationCard
              this.formModel.birthday = rec.birthday
              this.formModel.nation = rec.nation
              this.formModel.placeOfOrigin = rec.placeOfOrigin
              this.formModel.politicalStatus = rec.politicalStatus
              this.formModel.joinPartyDate = rec.joinPartyDate
              this.formModel.address = rec.address
              this.formModel.postalcode = rec.postalcode
              this.formModel.homePhone = rec.homePhone
              this.formModel.province = rec.province
              this.formModel.entranceYear = rec.entranceYear
              this.formModel.trainingLevel = rec.trainingLevel
              this.formModel.period = rec.period
            }
          })
        } else {
          alert('请输入学号')
        }
      },
      onCancelClick() {
        this.resultRedirect('close')
      },
      onSubmitClick() {
        // 保证日期时间提交验证
        if (this.formModel.birthday !== '') {
          this.formModel.birthday = formatDate(new Date(this.formModel.birthday), 'yyyy-MM-dd hh:mm:ss')
        }
        if (this.formModel.joinPartyDate !== '') {
          this.formModel.joinPartyDate = formatDate(new Date(this.formModel.joinPartyDate), 'yyyy-MM-dd hh:mm:ss')
        }
        console.log('this.formModel.birthday', this.formModel.birthday)
        console.log('this.formModel.joinPartyDate', this.formModel.joinPartyDate)

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
                this.$router.push({path: '/art/result/success'})
                // window.open(window.location.origin + '/art/result/' + target)
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
      resultRedirect(target) {
        this.$router.push({path: '/art/result/' + target})
        // window.open(window.location.origin + '/art/result/' + target)
      }
    },
    components: {
      ArtHeader,
      Scroll,
      ArtDistSelect,
      ArtDistCheckList,
      ArtMajor,
      ArtYearSelect
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .scroll-form
    height: 100%
    overflow: hidden

  .art-form
    position fixed
    top 0px
    left 0px
    overflow hidden
    width 100%
    height 100%
    background-color #ffffff
    .wrapper
      padding 0 12px
    .s-flex
      display block
    .kalix-form-table
      .kalix-form-table-td
        border-right none
        border-bottom 1px solid #000
        &:last-child
          border-bottom 0
    .ipt-date
      width: 100%;
      height 40px
      border: 0;
      outline: 0;
      box-sizing border-box
      -webkit-appearance: none;
      background-color: transparent;
      font-size: inherit;
      color: inherit;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    .form-container
      position: fixed;
      top 12px
      left 0px
      bottom 64px
      width 100%
      overflow: hidden;
    .footer-toolbar
      position fixed
      left 0
      bottom 0
      width 100%
      padding 12px
      text-align center
      box-sizing border-box
      background-color #ffffff
      .btns
        display flex
        margin 0 -6px
        .btn-item
          flex 1
          margin 0 6px

    .swiper-container
      width 100%
      height 100%
    .el-select
      width 100% !important

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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance: none !important

  input::-webkit-calendar-picker-indicator
    display none
</style>
