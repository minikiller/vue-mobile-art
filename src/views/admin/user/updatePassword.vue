<template lang="pug">
  div.update-password
    art-header(title="修改密码")
    div.bd
      div.wrapper
        el-form(ref="dialogForm" v-bind:model="formModel")
          el-form-item.s-flex_item.kalix-form-table-td(label="原密码" prop="oldPassword" v-bind:rules="rules.oldPassword" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.oldPassword" type="password" )
          el-form-item.s-flex_item.kalix-form-table-td(label="新密码" prop="password" v-bind:rules="rules.password" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.password"  type="password")
          el-form-item.s-flex_item.kalix-form-table-td(label="确认密码" prop="confirmPassword" v-bind:rules="rules.confirmPassword" v-bind:label-width="labelWidth")
            el-input(v-model="formModel.confirmPassword"  type="password")
        div.btns
          el-button.btn-item(type="primary" v-on:click="onSubmitClick") 保 存
</template>
<script type="text/ecmascript-6">
  import ArtHeader from '../../comp/header'
  import {Message, Cache} from 'kalix-base'

  const userURL = '/camel/rest/users'

  export default {
    activated() {
      this.formModel.id = Cache.get('id')
    },
    data() {
      var validateOldPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'))
        } else {
          this.axios.request({
            method: 'GET',
            url: userURL + '/' + Cache.get('id') + '/password/' + this.formModel.oldPassword,
            data: this.formModel,
            params: {}
          }).then(response => {
            if (response.data) {
              callback()
            } else {
              callback(new Error('旧密码错误'))
            }
          }).catch(() => {
          })
        }
      }
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formModel.confirmPassword !== '') {
          }
          callback()
        }
      }
      var validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formModel.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        targetURL: userURL,
        formModel: {},
        rules: {
          oldPassword: [{validator: validateOldPassword, required: true, trigger: 'blur'}],
          password: [
            {validator: validatePassword, trigger: 'blur', required: true}
          ],
          confirmPassword: [
            {validator: validateConfirmPassword, trigger: 'blur', required: true}
          ]
        },
        labelWidth: '80px'
      }
    },
    components: {
      ArtHeader
    },
    methods: {
      onSubmitClick() {
        this.$refs.dialogForm.validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            this.$http.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                this.$refs.dialogForm.resetFields()
                this.resultRedirect('success')
              } else {
                Message.error(response.data.msg)
              }
              this._afterDialogClose()
              this.visible = false
            })
          } else {
            Message.error('请检查输入项！')
            return false
          }
        })
      },
      resultRedirect(target) {
        this.$router.push({name: 'recruitResult', params: {key: target}})
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .bd
    position fixed
    left 0
    top 48px
    bottom 0
    width 100%
    overflow hidden
    .wrapper
      padding 15px

  .btns
    display flex
    .btn-item
      flex 1
      background-color #ae935c
      color #ffffff
</style>
