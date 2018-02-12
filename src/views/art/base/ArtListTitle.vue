<template lang="pug">
  div.art-list-title
    div.title {{title}}
    div.operation(v-if="tableData.length")
      span.btn-item(v-if="false")
        i.art-iconfont.icon-sousuo
        | 搜索
      span.btn-item(v-if="true" v-on:click="checkAll")
        i.art-iconfont.icon-xuanze.icon-1(v-if="isCheckAll")
        i.art-iconfont.icon-xuanze1.icon-2(v-else)
        | 全选
      span.btn-item(v-if="true" v-on:click="deleteChecked")
        i.art-iconfont.icon-shanchu
        | 删除选中
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      tableData: {
        type: Array,
        default: []
      }
    },
    methods: {
      checkAll() {
      },
      deleteChecked() {
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
