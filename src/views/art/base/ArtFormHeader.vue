<template lang="pug">
  div.art-header
    div.wrapper
      div.title
        div.maintitle {{formModel.name}}
        div.subtitle {{provincesName}}·{{formModel.city}}
        div.subtitle {{natureName}}　{{industryName}}　{{formModel.scale}}　{{formModel.life}}
      div
        div.btn-option(v-on:click="onLogoutClick")
          i.art-iconfont.icon-tuichu
        div.btn-option(v-on:click="optionClick")
          i.art-iconfont.icon-chilun
</template>
<script type="text/ecmascript-6">
  import {Cache, EventBus} from 'kalix-base'
  import FormModel from '../recruit/companyModel'
  import {logoutURL} from '@/config/global.toml'

  const usersURL = '/camel/rest/users'
  const companysURL = 'camel/rest/companys'

  export default {
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        natureName: '',
        industryName: '',
        provincesName: ''
      }
    },
    mounted() {
      this.getUser()
    },
    activated() {
      EventBus.$emit('ON_COMPANY_INFO_REFIESH', this.getUser())
    },
    methods: {
      getUser() {
        this._axiosRequest(usersURL, {jsonStr: '{id: ' + Cache.get('id') + '}'})
          .then(res => {
            if (res.data && res.data.totalCount) {
              let org = res.data.data[0]
              this.getCompany(org.code)
            }
          })
      },
      getCompany(code) {
        this._axiosRequest(companysURL,
          {
            jsonStr: '{"%code%": "' + code + '"}',
            page: 1,
            start: 0,
            limit: 10
          })
          .then(res => {
            if (res.data && res.data.totalCount) {
              this.formModel = res.data.data[0]
              this.natureName = this._dictTranslate(this.formModel.nature, '企业性质')
              this.industryName = this._dictTranslate(this.formModel.industry, '企业行业')
              this.provincesName = this._dictTranslate(this.formModel.region, '省份')
            }
          })
      },
      onLogoutClick() {
        this.axios.get(logoutURL, {}).then(response => {
          Cache.clear()
          this.$router.push({name: '/'})
        })
      },
      optionClick() {
        this.$emit('optionClick', this.formModel)
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
    .btn-option
      color #fff
      padding 6px
      margin-right -6px
      & + .btn-option
        margin-top 16px
</style>
