<!--
  描述：通用头部
  开发人：桑杨
  开发日期：2018年2月9日16:11:05
-->
<template lang="pug">
  div.header
    div.wrapper
      div.item
        div(v-if="isVisibleLeft" v-on:click="goBack") 返回首页
      div.title {{title}}
      div.item
        div(v-if="isVisibleRight" v-on:click="goBack") 关闭
</template>
<script type="text/ecmascript-6">
  import {Cache} from 'kalix-base'

  // 学生登录
  const USER_TYPE_STU = 1
  // 企业登录
  const USER_TYPE_COM = 3

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      isVisibleLeft: {
        type: Boolean,
        default: true
      },
      isVisibleRight: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      goBack() {
        let currentUser = JSON.parse(Cache.get('CurrentUser'))
        this.optionLink = currentUser.userType
        switch (currentUser.userType) {
          case USER_TYPE_STU:
            this._getStudent()
            this.$router.push({name: 'candidate'})
            break
          case USER_TYPE_COM:
            this._getCompany()
            this.$router.push({name: 'recuitTest'})
            break
        }
      },
      _getStudent() {
        // 获取学生信息
        let currentStudent = JSON.parse(Cache.get('CurrentStudent'))
        this.$myConsoleLog(' currentStudent ', currentStudent, '#8B1C62')
        if (currentStudent) {
          this.formModel = currentStudent
        }
      },
      _getCompany() {
        // 获取企业信息
        let currentCompany = JSON.parse(Cache.get('CurrentCompany'))
        if (currentCompany) {
          this.formModel = currentCompany
          this.natureName = this._dictTranslate(this.formModel.nature, '企业性质')
          this.industryName = this._dictTranslate(this.formModel.industry, '企业行业')
          this.provincesName = this._dictTranslate(this.formModel.region, '省份')
        }
      },
      _dictTranslate(_value, _type) {
        let dict = JSON.parse(Cache.get('ART-DICT-KEY'))
        if (dict) {
          let item = dict.find(e => {
            return e.value === _value && e.type === _type
          })
          return item ? item.label : ''
        }
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .header
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

</style>
