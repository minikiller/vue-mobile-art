<template lang="pug">
  div.art-select
    select.select(v-model='currentValue')
      option(v-for="item in items" v-bind:key="item" v-bind:value="item") {{item}}
</template>
<script type="text/ecmascript-6">
  const currentYear = (new Date()).getUTCFullYear()
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      yearStart: {
        type: Number,
        default: () => {
          return currentYear - 10
        }
      },
      yearEnd: {
        type: Number,
        default: () => {
          return currentYear
        }
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
        this.$myConsoleLog('this.yearStart', this.yearStart, '#104E8B')
        this.$myConsoleLog('this.yearEnd', this.yearEnd, '#551A8B')
        for (let i = this.yearStart; i <= this.yearEnd; i++) {
          this.items.push(i)
        }
      }
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', newValue)
      },
      value(newValue) {
        this.currentValue = newValue
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
