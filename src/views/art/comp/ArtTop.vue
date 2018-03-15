<template lang="pug">
  div.art-header
    div.wrapper
      div.title
        div.maintitle {{formModel.name}}
        template(v-if="userType === 1")
          div.subtitle {{formModel.entranceYear}}届　{{formModel.majorName}}　{{formModel.trainingLevel}}　{{formModel.period}}
          div.subtitle {{formModel.nation}}　{{formModel.placeOfOrigin}}
        template(v-if="userType === 3")
          div.subtitle {{provincesName}}·{{formModel.city}}
          div.subtitle {{natureName}}　{{industryName}}　{{formModel.scale}}　{{formModel.life}}
      div.btn-wrapper
        div.btn-option(v-on:click="onShowMenu")
          i.art-iconfont.icon-chilun
    div.menu(ref="menu" v-if="isShowMenu" v-on:click.self="onCloseMenu")
      div.menu-wrapper
        div.item(v-on:click="optionClick")
          div.btn-option
            i.art-iconfont.icon-chilun
          | 设置
        div.item(v-on:click="onUpdatePasswordClick")
          div.btn-option
            i.art-iconfont.icon-unie604
          | 修改密码
        div.item(v-on:click="onLogoutClick")
          div.btn-option
            i.art-iconfont.icon-tuichu
          | 退出
</template>
<script type="text/ecmascript-6">
  import {Cache} from 'kalix-base'
  import FormModel from '../recruit/companyModel'
  import {logoutURL} from '@/config/global.toml'

  // const usersURL = '/camel/rest/users'
  // const companysURL = 'camel/rest/companys'
  const USER_TYPE_STU = 1 // 学生登录
  const USER_TYPE_COM = 3 // 企业登录

  export default {
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        natureName: '',
        industryName: '',
        provincesName: '',
        isShowMenu: false,
        userType: -100
      }
    },
    mounted() {
    },
    activated() {
      this.getUser()
    },
    methods: {
      onCloseMenu(callBack) {
        this.isShowMenu = false
        if (typeof callBack === 'function') {
          this.$nextTick(() => {
            callBack()
          })
        }
      },
      onShowMenu() {
        this.isShowMenu = true
        console.log(this.parent)
        setTimeout(() => {
          document.body.appendChild(this.$refs.menu)
        }, 20)
      },
      getUser() {
        let currentUser = JSON.parse(Cache.get('CurrentUser'))
        this.optionLink = currentUser.userType
        switch (currentUser.userType) {
          case USER_TYPE_STU:
            this._getStudent()
            this.optionLink = 'candidateInfo'
            this.userType = USER_TYPE_STU
            break
          case USER_TYPE_COM:
            this._getCompany()
            this.optionLink = 'companyInfo'
            this.userType = USER_TYPE_COM
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
        // this.$myConsoleLog(' currentCompany ', currentCompany, '#8B1C62')
        if (currentCompany) {
          this.formModel = currentCompany
          this.natureName = this._dictTranslate(this.formModel.nature, '企业性质')
          this.industryName = this._dictTranslate(this.formModel.industry, '企业行业')
          this.provincesName = this._dictTranslate(this.formModel.region, '省份')
        }
      },
      onLogoutClick() {
        this.onCloseMenu()
        // 退出
        this.$confirm('此操作将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get(logoutURL, {})
            .then(response => {
              Cache.clear()
              this.$router.push({name: '/'})
            })
        }).catch(() => {
        })
      },
      onUpdatePasswordClick() {
        this.onCloseMenu(() => {
          this.$router.push({path: '/user/updatePassword'})
        })
      },
      optionClick() {
        this.onCloseMenu(() => {
          this.$router.push({name: this.optionLink})
        })
      },
      _axiosRequest(reqUrl, reqParams) {
        return this.axios.request({
          method: 'GET',
          url: reqUrl,
          params: reqParams
        })
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
  @import "../../../assets/stylus/border.styl"
  .art-header
    position relative
    top 0
    left 0
    width 100%
    height 100px
    background-color #58443d
    .wrapper
      display flex
      align-items center
      justify-content center
      height 100%
      padding 0 15px
      box-sizing border-box
      .title
        color #ffffff
        text-align left
        flex 1
        .maintitle
          position relative
          font-size 22px
          display inline-block
        .area
          position absolute
          font-size 10px
          bottom 0
          left 100%
          white-space nowrap
          padding-left 12px
        .subtitle
          font-size 10px
          margin-top 8px
      .btn-wrapper
        height 100%
        padding 15px 0
        box-sizing border-box
    .btn-option
      color #fff
      padding 6px
      margin -6px
      & + .btn-option
        margin-top 16px

  .menu
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .1)
    .menu-wrapper
      background-color #ffffff
      position fixed
      top 39px
      right 8px
      font-size 14px
      border-radius 4px
      width 130px
      box-shadow 4px 4px 6px rgba(0, 0, 0, 0.45)
      &:after
        content ''
        display block
        width 9px
        height 9px
        background-color #ffffff
        position absolute
        top -4px
        right 10px
        transform rotate(45deg)
        pointer-events none
      .item
        position relative
        padding 10px 15px
        line-height 22px
        &:before
          setTopLine()
        &:first-child
          &:before
            visibility hidden
        .btn-option
          display inline-block
          color #888888
          padding: 0;
          margin: 0;
          margin-right 12px
          float left
          .art-iconfont
            font-size 20px
</style>
