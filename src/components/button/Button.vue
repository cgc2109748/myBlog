<template>
    <button
        class="button"
        ref="button"

        :class="classes"
        :disabled="disabled || loading"
        :type="buttonType"

        @click="onClick"
        @focus.once="onFocus"
    >
        <div class="button__content">
            <div class="button__icon" v-if="icon || $slots.icon">
                <slot name="icon">
                    <btn-icon :icon="icon"></btn-icon>
                </slot>
            </div>

            <slot></slot>

            <btn-icon
                class="button__dropdown-icon"
                v-if="hasDropdown && iconPosition !== 'right'"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M6.984 9.984h10.03L12 15z"/>
                </svg>
            </btn-icon>
        </div>

        <div class="button__focus-ring" :style="focusRingStyle"></div>

        <!-- <progress-circular
            class="button__progress"
            disable-transition

            :color="progressColor"
            :size="18"
            :stroke="4.5"

            v-show="loading"
        ></progress-circular> -->

        <ripple trigger="button" v-if="!disableRipple && !disabled"></ripple>

        <popover
            ref="dropdown"
            trigger="button"
            :dropdown-position="dropdownPosition"
            :open-on="openDropdownOn"
            @close="onDropdownClose"
            @open="onDropdownOpen"
            v-if="hasDropdown">
            <slot name="dropdown"></slot>
        </popover>
    </button>
</template>

<script>
// import ProgressCircular from 'components/progress-circular'
import Popover from 'components/popover'
import BtnIcon from 'components/btn-icon'
import Ripple from 'components/ripple'
import {defaultProps} from 'src/utils'
export default {
    name: 'button',
    props: defaultProps({
      type: 'primary', // 'primary' or 'secondary',
      buttonType: 'submit', // HTML default,
      color: 'default', // 'default', 'primary', 'accent', 'green', 'orange', or 'red',
      size: 'normal', // 'small', 'normal', 'large',
      raised: false,
      icon: '',
      iconPosition: 'left', // 'left' or 'right',
      loading: false,
      hasDropdown: false,
      dropdownPosition: 'bottom left',
      openDropdownOn: 'click', // 'click', 'hover', 'focus', or 'always',
      disableRipple: false,
      disabled: false
    }),
    data() {
      return {
        focusRing: {
          top: 0,
          left: 0,
          size: 0
        }
      }
    },
    computed: {
      classes() {
        return [
          `button--type-${this.type}`,
          `button--color-${this.color}`,
          `button--icon-position-${this.iconPosition}`,
          `button--size-${this.size}`,
          { 'is-raised': this.raised },
          { 'is-loading': this.loading },
          { 'is-disabled': this.disabled || this.loading },
          { 'has-dropdown': this.hasDropdown }
        ]
      },
      focusRingStyle() {
        return {
          height: this.focusRing.size + 'px',
          width: this.focusRing.size + 'px',
          top: this.focusRing.top + 'px',
          left: this.focusRing.left + 'px'
        }
      },
      progressColor() {
        if (this.color === 'default' || this.type === 'secondary') {
          return 'black'
        }
        return 'white'
      }
    },
    methods: {
      onClick(e) {
        this.$emit('click', e)
      },
      onFocus() {
        const bounds = {
          width: this.$el.clientWidth,
          height: this.$el.clientHeight
        };
        this.focusRing.size = bounds.width - 16 // 8px of padding on left and right
        this.focusRing.top = -1 * (this.focusRing.size - bounds.height) / 2
        this.focusRing.left = (bounds.width - this.focusRing.size) / 2
      },
      onDropdownOpen() {
        this.$emit('dropdown-open')
      },
      onDropdownClose() {
        this.$emit('dropdown-close')
      },
      openDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.open()
        }
      },
      closeDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.close()
        }
      },
      toggleDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.toggle()
        }
      }
    },
    components: {
        // ProgressCircular,
        Popover,
        Ripple,
        BtnIcon
    }
};
</script>

<style lang="scss">
</style>
