<template>
    <div class="v-row" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
import {defaultProps} from '../../utils'

export default {
  props: defaultProps({
    gutter: Number,
    pack: String,
    display: String,
    align: String
  }),
  ready () {
    if (this.gutter) {
      let half = this.gutter / 2
      this.$el.style.marginLeft = -half + 'px'
      this.$el.style.marginRight = -half + 'px'
      for (let $child of this.$children) {
        $child.$el.style.paddingLeft = half + 'px'
        $child.$el.style.paddingRight = half + 'px'
      }
    }
  },
  computed: {
    classes () {
      return [
        this.display ? `v-row-${this.display}` : '',
        this.pack ? `v-row-flex-${this.pack}` : '',
        this.align ? `v-row-flex-${this.align}` : ''
      ]
    }
  }
}
</script>
