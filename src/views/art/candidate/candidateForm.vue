<!--
  描述：艺术中心-学生应聘-我的简历
  开发人：桑杨
  开发日期：2017年8月17日
-->

<template lang="pug">
  art-base-form(
  title="我的简历"
  bizKey="role"
  ref="candidateForm"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL")
    div.form-wrapper(slot="slotForm")
      el-form-item.s-flex_item.kalix-form-table-td(label="期望岗位" prop="position" v-bind:rules="rules.position" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.position" type="textarea")
      el-form-item.s-flex_item.kalix-form-table-td(label="工作省份" prop="region" v-bind:rules="rules.region" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.region" appName="art" dictType="省份")
      el-form-item.s-flex_item.kalix-form-table-td(label="工作城市" prop="city" v-bind:rules="rules.city" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.city")
      el-form-item.s-flex_item.kalix-form-table-td(label="期望行业" prop="expectingIndustry" v-bind:rules="rules.expectingIndustry" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.expectingIndustry" appName="art" dictType="企业行业" style="width:100%")
      el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.jobType" appName="art" dictType="工作类型" style="width:100%")
      el-form-item.s-flex_item.kalix-form-table-td(label="所学软件" prop="learningSofts" v-bind:rules="rules.learningSofts" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.learningSofts" type="textarea")
      el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:rules="rules.education" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.education" appName="art" dictType="学历")
      el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
        art-dist-select(v-model="formModel.salary" appName="art" dictType="月薪")
      el-form-item.kalix-form-table-td(label="个人特点" prop="skills" v-bind:rules="rules.skills" v-bind:label-width="labelWidth")
        art-dist-check-list(v-model="formModel.skills" appName="art" dictType="个人要求" multiple placeholder="请选择,可多选")
</template>

<script type="text/ecmascript-6">
  import ArtBaseForm from '../comp/ArtBaseForm'
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
          code: [{required: true, message: '请输入学号', trigger: 'blur'}],
          name: [{required: true, message: '请通过学号查询学生姓名', trigger: 'blur'}],
          region: [{required: true, message: '请选择期望工作省份', trigger: 'change'}],
          city: [{required: true, message: '请输入期望工作城市', trigger: 'blur'}],
          expectingIndustry: [{required: true, message: '请选择期望工作行业', trigger: 'change'}],
          jobType: [{required: true, message: '请选择期望工作类型', trigger: 'change'}],
          position: [{required: true, message: '请输入期望岗位', trigger: 'blur'}],
          learningSofts: [{required: true, message: '请输入所学软件', trigger: 'blur'}],
          education: [{required: true, message: '请选择学历', trigger: 'change'}],
          salary: [{required: true, message: '请选择薪资', trigger: 'change'}],
          skills: [{required: true, message: '请选择个人特点,可多选', trigger: 'change'}]
        },
        targetURL: CandidateURL,
        labelWidth: '80px',
        orgURL: '/camel/rest/orgs',
        orgId: 22601
      }
    },
    activated() {
      this.open()
      this.$myConsoleLog(' candidateForm ', 'activated', '#005555')
    },
    mounted() {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    },
    methods: {
      open() {
        let item = this.$route.params.item
        this.$myConsoleLog(' this.$route.params.item ', this.$route.params.item, '#884888')
        // this.initSwiper()
        if (item) {
          this.formModel = item
          this.isEdit = true
          // this.positionRequires = this.formModel.positionRequires.replace(/<br \/>/g, '\n')
        } else {
          this.formModel = Object.assign({}, FormModel)
          this.isEdit = false
          // this.positionRequires = ''
          // console.log('FormModel', FormModel)
        }
        this.getStudent()
        this.$refs.candidateForm.open(item)
      },
      listScroll() {
        let inputs = document.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].blur()
        }
      },
      initSwiper() {
        setTimeout(() => {
          // this.$refs.scrollForm.refresh()
          this.$refs.scrollForm.scrollTo(0, 0, 100)
        }, 20)
      },
      initData() {
        // this.$set(this.formModel, 'name', '')
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
        let currentUser = JSON.parse(Cache.get('CurrentUser'))
        if (currentUser) {
          let studentNo = currentUser.code
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
                this.formModel.code = rec.code
              }
            })
          }
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
                this._resultRedirect('success')
                // window.open(window.location.origin + '/art/result/' + target)
              } else {
                this._resultRedirect('error')
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
      _resultRedirect(target) {
        this.$router.push({name: 'recruitResult', params: {key: target, status: 'candidate'}})
        // window.open(window.location.origin + '/art/result/' + target)
      }
    },
    components: {
      ArtBaseForm,
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
