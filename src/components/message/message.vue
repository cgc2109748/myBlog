<template>
  <transition name="v-message-fade">
    <div class="v-message" :class="messageClasses" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
      <!-- <img class="v-message__icon" :src="typeImg" alt=""> -->
      <v-icon scale="1.7" :spin="iconSpin" class="v-message__icon" :name="iconType"></v-icon>
      <div class="v-message__group">
        <p>{{ message }}</p>
      </div>
      <div v-if="showClose" class="v-message__closeBtn" @click="handleClose">
        <v-icon :name="'close'"></v-icon>
      </div>
    </div>
  </transition>
</template>

<script>
import vIcon from '../icon'
// import { defaultProps, oneOf } from 'src/utils'
const types = {
  'success': 'check',
  'warning': 'exclamation',
  'info': 'info',
  'error': 'close',
  'loading': 'spinner'
}
export default {
  components: { vIcon },
  // props: defaultProps({
  //   type: oneOf(['success', 'info', 'waring', 'error'], 'info'),
  //   closable: false,
  //   showIcon: false
  // }),
  data () {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconSpin: false,
      onClose: null,
      showClose: false,
      closed: false,
      timer: null
    }
  },
  mounted () {
    if (this.type === 'loading') {
      this.iconSpin = true
    }
    this.startTimer()
  },
  computed: {
    iconType () {
      return types[this.type] || ''
    },
    messageClasses () {
      return [
        `${this.type}`
      ]
    }
  },
  methods: {
    handleClose () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    },

    clearTimer () {
      clearTimeout(this.timer)
    },

    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.handleClose()
          }
        }, this.duration)
      }
    }
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.visible = false
          this.$el.addEventListener('transitionend', () => {
            this.$destroy(true)
            this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
          })
        }, 500)
      }
    }
  }
}
</script>
