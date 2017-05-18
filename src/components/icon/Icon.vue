<template>
  <span v-if="tag=='span'" class="v-icon">
    <awesome-icon :name="name" :scale="scale" :spin="spin" :flip="flip" :label="label">
      <slot></slot>
    </awesome-icon>
  </span>
  <div v-else class="v-icon">
    <awesome-icon :name="name" :scale="scale" :spin="spin" :flip="flip" :label="label">
      <slot></slot>
    </awesome-icon>
  </div>
</template>

<script>
import { defaultProps, oneOf, oneOfType } from '../../utils'
// import cx from 'classnames'
import awesomeIcon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons'

export default {
  props: defaultProps({
    name: {
      type: String,
      required: true
    },
    tag: oneOf(['div', 'span'], 'div'),
    scale: oneOfType([Number, String]),
    spin: false,
    flip: {
      validator: (val) => {
        return val === 'horizontal' || val === 'vertical'
      }
    },
    label: String
  }),
  components: { awesomeIcon }
}
</script>

<style lang="css">
.v-icon{
  /*color: #404040;*/
  /*opacity: .8;*/
}
</style>
