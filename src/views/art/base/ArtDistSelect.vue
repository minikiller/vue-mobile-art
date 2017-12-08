<template lang="pug">
  div.art-select
    select.select(v-model='currentValue')
      option(v-for="item in items" v-bind:value="item.value") {{item.label}}
</template>
<script type="text/ecmascript-6">
  import Cache from 'kalix-base'

  export default {
    props: {
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
        currentValue: this.value,
        selectedOptions: []
      }
    },
    mounted() {
      this.getDict()
    },
    methods: {
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
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .art-select
    .select
      width 100%
      -webkit-appearance: none;
      border: 0;
      outline: 0;
      background-color: transparent;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      position: relative;
      z-index: 1;
      padding-left: 15px;
      border-radius 0
      border-bottom 1px solid #d8dce5
    &:after
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #C8C8CD;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: absolute;
      top: 50%;
      right: 15px;
      margin-top: -4px;
</style>
