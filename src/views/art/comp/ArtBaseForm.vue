<template lang="pug">
  div.art-base-form
    art-header(v-bind:title="title" v-bind:isVisibleLeft="isEnable" v-bind:isVisibleRight="isEnable")
    div.bd
      scroll.scroll-form(v-bind:refreshDelay="120" ref="scrollForm")
        div.wrapper
          el-form(ref="dialogForm" v-bind:model="formModel")
            slot(name="slotForm")
    div.ft
      div.btns
        el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>
<script type="text/ecmascript-6">
  import ArtHeader from './ArtHeader'
  import Scroll from '../base/scroll'
  import {Message, Cache} from 'kalix-base'
  import Util from '@/common/Util'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      },
      targetURL: {  // 业务数据提交的url,包括add，delete，update
        type: String
      }
    },
    data() {
      return {
        isEnable: true,
        tempFormModel: JSON.stringify(Object.assign({}, this.formModel))
      }
    },
    activated() {
      this.open()
    },
    methods: {
      onSubmitClick() {
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.$delete(this.formModel, 'version')
            this.$delete(this.formModel, 'version_')
            this.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                this.$refs.dialogForm.resetFields()
                // Util.setCurrentCompany(this.formModel.code)
                Util.setCurrentStudent(this.formModel.code)
                this.resultRedirect('success')
              } else {
                this.resultRedirect('error')
              }
            })
          } else {
            Message.error('请检查输入项！')
            return false
          }
        })
      },
      open() {
        let row = JSON.parse(Cache.get('CurrentStudent'))
        this.$myConsoleLog(' CurrentStudent open ', row, '#8B1C62')
        this.isVisible = true
        if (row) {
          this.isEdit = true
          this.$emit('update:formModel', row)  // 设置sync才有效
        } else {
          this.isEdit = false
          this.$emit('update:formModel', JSON.parse(this.tempFormModel))
        }
      },
      resultRedirect(target) {
        this.$router.push({name: 'recruitResult', params: {key: target, status: 'candidate'}})
      }
    },
    components: {
      ArtHeader,
      Scroll
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .art-base-form
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background-color #ffffff
    display flex
    flex-flow column
    .bd
      flex 1
      overflow hidden
      .scroll-form
        height: 100%
        overflow: hidden
      .wrapper
        padding 15px
    .ft
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

</style>
