<template>
  <div
    class="popover"
    role="dialog"
    tabindex="-1"
    :class="{ 'is-raised': raised }"
    @keydown.esc="closeDropdown"
  >
    <slot></slot>
    <div class="popover__focus-redirector" tabindex="0" @focus="restrictFocus"></div>
  </div>
</template>

<script>
import {defaultProps, classlist} from 'src/utils'
import Drop from 'tether-drop'
export default {
  name: 'popover',
  props: defaultProps({
      trigger: true,
      dropdownPosition: 'bottom left',
      openOn: 'click',
      containFocus: false,
      focusRedirector: Function,
      raised: true
  }),
  data() {
    return {
      dropInstance: null,
      lastfocusedElement: null
    }
  },
  computed: {
    triggerEl() {
      return this.$parent.$refs[this.trigger]
    }
  },
  mounted() {
    if (this.triggerEl) {
      this.initializeDropdown()
    }
  },
  beforeDestroy() {
    if (this.dropInstance) {
      this.dropInstance.destroy()
    }
  },
  methods: {
    initializeDropdown() {
      this.dropInstance = new Drop({
        target: this.triggerEl,
        content: this.$el,
        position: this.dropdownPosition,
        constrainToWindow: true,
        openOn: this.openOn
      });
      if (this.dropdownPosition !== 'bottom left') {
        this.dropInstance.open()
        this.dropInstance.close()
        this.dropInstance.open()
        this.dropInstance.close()
      }
      this.dropInstance.on('open', this.onOpen)
      this.dropInstance.on('close', this.onClose)
    },
    openDropdown() {
      if (this.dropInstance) {
        this.dropInstance.open()
      }
    },
    closeDropdown() {
      if (this.dropInstance) {
        this.dropInstance.close()
      }
    },
    toggleDropdown(e) {
      if (this.dropInstance) {
        this.dropInstance.toggle(e)
      }
    },
    positionDrop() {
      const drop = this.dropInstance
      const windowWidth = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth
      const width = drop.drop.getBoundingClientRect().width
      const left = drop.target.getBoundingClientRect().left
      const availableSpace = windowWidth - left
      if (width > availableSpace) {
        const direction = width > availableSpace ? 'right' : 'left'
        drop.tether.attachment.left = direction
        drop.tether.targetAttachment.left = direction
        drop.position()
      }
    },
    onOpen() {
      this.positionDrop()
      classlist.add(this.triggerEl, 'has-dropdown-open')
      this.lastfocusedElement = document.activeElement
      this.$el.focus()
      this.$emit('open')
    },
    onClose() {
      classlist.remove(this.triggerEl, 'has-dropdown-open')
      if (this.lastfocusedElement) {
        this.lastfocusedElement.focus()
      }
      this.$emit('close')
    },
    restrictFocus(e) {
      if (!this.containFocus) {
        this.closeDropdown()
        return
      }
      e.stopPropagation();
      if (this.focusRedirector) {
        this.focusRedirector(e)
      } else {
        this.$el.focus()
      }
    },
    open() {
      this.openDropdown()
    },
    close() {
      this.closeDropdown()
    },
    toggle() {
      this.toggleDropdown()
    }
  }
}
</script>

<style lang="scss">
.popover {
  background-color: white;
  outline: none;
  &.is-raised {
    box-shadow: 0 2px 4px -1px rgba(black, 0.2),
                0 4px 5px 0 rgba(black, 0.14),
                0 1px 10px 0 rgba(black, 0.12);
}
  .menu {
    border: none;
  }
}
.popover__focus-redirector {
  opacity: 0;
  position: absolute;
}
.drop-element {
  display: none;
  max-height: 100%;
  max-width: 100%;
  opacity: 0;
  position: absolute;
  transition: opacity 0.2s ease;
  z-index: 60;
  &,
  &:after,
  &:before,
  & *,
  & *:after,
  & *:before {
    box-sizing: border-box;
  }
  &.drop-open {
    display: block;
  }
  &.drop-after-open {
    opacity: 1;
  }
}
</style>
