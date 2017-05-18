<template lang="html">
  <div :class="classes" :style="{'padding': paddingHandeler,'margin-top': mtHandeler,'margin-bottom': mbHandeler}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    span: [String, Number],
    offset: [String, Number],
    push: [String, Number],
    pull: [String, Number],
    order: [String, Number],
    xs: [String, Number],
    sm: [String, Number],
    md: [String, Number],
    lg: [String, Number],
    padding: {
      type: Boolean,
      default: true
    },
    mb: {
      type: Number,
      default: 0
    },
    mt: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      prefixCls: 'v-col'
    }
  },
  computed: {
    classes () {
      const props = this
      const prefixCls = this.prefixCls
      let sizeClassObj = {};
      ['xs', 'sm', 'md', 'lg'].forEach(size => {
        let sizePros = {}
        if (typeof props[size] === 'number') {
          sizePros.span = props[size]
        } else if (typeof props[size] === 'object') {
          sizePros = props[size] || {}
        }

        sizeClassObj = Object.assign({}, sizeClassObj, {
          [`${prefixCls}-${size}-${sizePros.span}`]: sizePros.span !== undefined,
          [`${prefixCls}-${size}-${sizePros.order}`]: sizePros.order || sizePros.order === 0,
          [`${prefixCls}-${size}-${sizePros.offset}`]: sizePros.offset || sizePros.offset === 0,
          [`${prefixCls}-${size}-${sizePros.push}`]: sizePros.push || sizePros.push === 0,
          [`${prefixCls}-${size}-${sizePros.pull}`]: sizePros.pull || sizePros.pull === 0
        })
      })
      return [
        this.span ? `${prefixCls}-${this.span}` : '',
        this.offset ? `${prefixCls}-offset-${this.offset}` : '',
        this.push ? `${prefixCls}-push-${this.push}` : '',
        this.pull ? `${prefixCls}-pull-${this.pull}` : '',
        this.order ? `${prefixCls}-order-${this.order}` : '',
        sizeClassObj
      ]
    },
    paddingHandeler () {
      if (this.padding) {
        return '0.6rem'
      } else {
        return '0'
      }
    },
    mtHandeler () {
      return this.mt + 'px'
    },
    mbHandeler () {
      return this.mb + 'px'
    }
  }
}
</script>

<style lang="scss">
</style>
