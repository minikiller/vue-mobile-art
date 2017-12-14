<template lang="pug">
  div.kalix-check-list
    label.kalix-check-cell(v-for="(item,index) in items" v-bind:for="bindLabelFor(index)" v-bind:key="item.value")
      div.s-flex
        div.s-flex_item {{item.label}}-{{item.value}}
        div
          input.kalix-check-input(type="checkbox" v-bind:id="bindLabelFor(index)" v-model="currentValue" v-bind:value="item.value")
          i.icon-1.art-iconfont.icon-xuanze1
          i.icon-2.art-iconfont.icon-xuanze
</template>
<script type="text/ecmascript-6">
  import {Cache} from 'kalix-base'

  export default {
    props: {
      checkKey: {
        type: String,
        default: 'item'
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      appName: {  // 应用名称
        type: String,
        required: true
      },
      dictType: { // 数据字典类别
        type: String,
        required: true
      },
      disabled: Boolean, // 是否禁止
      value: null
    },
    data() {
      return {
        items: [],
        currentValue: [],
        selectedOptions: []
      }
    },
    mounted() {
      this.initValue()
      this.getDict()
    },
    methods: {
      bindLabelFor(index) {
        return `checkbox-${this.checkKey}-${index}`
      },
      initValue() {
        this.currentValue = []
        if (this.value.length > 0) {
          this.currentValue = this.value.split(',')
        }
      },
      getDict() {
        this.name = this.appName.toUpperCase()
        if (this.name) {
          const DictURL = `/camel/rest/${this.name}/dicts`
          const DictKey = `${this.name.toUpperCase()}-DICT-KEY`
          if (!Cache.get(DictKey)) {
            const data = {
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(DictURL, {
              params: data
            }).then(response => {
              if (response.data) {
                Cache.save(DictKey, JSON.stringify(response.data.data))
                this.initItems(response.data.data)
              }
            })
          } else {
            this.visibleChange()
          }
        }
      },
      visibleChange() {
        const DictKey = `${this.appName.toUpperCase()}-DICT-KEY`
        let data_ = JSON.parse(Cache.get(DictKey)) // get data from cache
        this.initItems(data_)
        if (this.multiple) {
          this.selectedOptions = JSON.parse('[' + this.value + ']')
        }
      },
      initItems(data_) {
        this.items = data_.filter(item => {
          return item.type === this.dictType
        })
        console.log('items', this.items)
      }
    },
    watch: {
      value(newValue) {
        this.initValue()
      },
      currentValue(newValue) {
        this.$emit('input', newValue.join(','))
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../../assets/stylus/border"

  .kalix-check-list
    position relative
    &:after
      setBottomLine()
    label
      *
        pointer-events: none
    .kalix-check-cell
      position relative
      display block
      font-size 16px
      &:after
        setTopLine(#b5b5b5)
      &:first-child
        &:after
          display none
      .weui-cells_checkbox
      .kalix-check-input
        position absolute
        z-index -1
        top -100000px
        & ~ .icon-1,
        & ~ .icon-2
          font-size 26px
        & ~ .icon-1
          display inline-block
          color #C9C9C9
        & ~ .icon-2
          display none
          color #FF9900
        &:checked
          & ~ .icon-1
            display none
          & ~ .icon-2
            display inline-block
</style>
