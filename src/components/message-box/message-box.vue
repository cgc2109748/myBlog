<template>
  <transition name="msgbox-fade">
    <div class="message-box__wrapper" v-show="value" @click.self="handleWrapperClick">
      <div class="message-box" :class="customClass">
        <div class="message-box__header" v-if="title !== undefined">
          <div class="message-box__title">{{ title || t('myui.messagebox.title') }}</div>
          <i class="fa fa-2x fa-close" @click="handleAction('cancel')" v-if="showClose"></i>
        </div>
        <div class="message-box__content" v-if="message !== ''">
          <div class="message-box__status" :class="[ typeClass ]"></div>
          <div class="message-box__message" :style="{ 'margin-left': typeClass ? '50px' : '0' }"><p>{{ message }}</p></div>
          <div class="message-box__input" v-show="showInput">
            <!-- <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input"></input> -->
            <div class="message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="message-box__btns">
          <button class="message-box__button" :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText || t('myui.messagebox.cancel') }}</button>
          <button class="message-box__button" ref="confirm" :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText || t('myui.messagebox.confirm') }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from 'src/utils/popup'
import Locale from 'src/locale/mixins'
// import ElInput from 'element-ui/packages/input';
import vButton from 'components/button'
import { addClass, removeClass } from 'src/utils/dom'
// import { t } from 'element-ui/src/locale';
const t = window.t
let typeMap = {
    success: 'circle-check',
    info: 'information',
    warning: 'exclamation-circle',
    error: 'circle-cross'
  }

export default {
    mixins: [Popup, Locale],
    // mixins: [Popup],

    props: {
      modal: {
        default: true
      },
      lockScroll: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      }
    },

    components: {
      // ElInput,
      vButton
    },

    computed: {
      typeClass () {
        return this.type && typeMap[this.type] ? `${this.type} fa fa-${typeMap[this.type]}` : ''
      },

      confirmButtonClasses () {
        return `message-box__button--primary ${this.confirmButtonClass}`
      },
      cancelButtonClasses () {
        return `${this.cancelButtonClass}`
      }
    },

    methods: {
      doClose () {
        this.value = false
        this._closing = true

        this.onClose && this.onClose()

        if (this.lockScroll) {
          setTimeout(() => {
            if (this.modal && this.bodyOverflow !== 'hidden') {
              document.body.style.overflow = this.bodyOverflow
              document.body.style.paddingRight = this.bodyPaddingRight
            }
            this.bodyOverflow = null
            this.bodyPaddingRight = null
          }, 200)
        }
        this.opened = false

        if (!this.transition) {
          this.doAfterClose()
        }
      },

      handleWrapperClick () {
        if (this.closeOnClickModal) {
          this.close()
        }
      },

      handleAction (action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return
        }
        var callback = this.callback
        this.value = false

        callback(action)
      },

      validate () {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || t('myui.messagebox.error')
            addClass(this.$refs.input.$el.querySelector('input'), 'invalid')
            return false
          }
          var inputValidator = this.inputValidator
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue)
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || t('myui.messagebox.error')
              addClass(this.$refs.input.$el.querySelector('input'), 'invalid')
              return false
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult
              return false
            }
          }
        }
        this.editorErrorMessage = ''
        removeClass(this.$refs.input.$el.querySelector('input'), 'invalid')
        return true
      }
    },

    watch: {
      inputValue (val) {
        if (this.$type === 'prompt' && val !== null) {
          this.validate()
        }
      },

      value (val) {
        if (this.$type === 'alert' || this.$type === 'confirm') {
          this.$nextTick(() => {
            // this.$refs.confirm.$el.focus();
          })
        }
        if (this.$type !== 'prompt') return
        if (val) {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.$refs.input.$el.querySelector('input').focus()
            }
          }, 500)
        } else {
          this.editorErrorMessage = ''
          removeClass(this.$refs.input.$el.querySelector('input'), 'invalid')
        }
      }
    },

    data () {
      return {
        title: undefined,
        message: '',
        type: '',
        customClass: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      }
    }
  }
</script>

<style lang="scss">
.v-modal {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: rgb(0, 0, 0);
}
</style>
