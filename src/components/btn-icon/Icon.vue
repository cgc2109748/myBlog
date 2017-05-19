<template>
  <span class="btn-icon" :class="[iconSet, icon]" :aria-label="ariaLabel">
    <svg class="btn-icon__svg" v-if="useSvg">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#' + icon"></use>
    </svg>

    <slot v-else>{{ removeText ? null : icon }}</slot>
  </span>
</template>

<script>
export default {
  name: 'btn-icon',
  props: {
    icon: String,
    iconSet: {
      type: String,
      default: 'material-icons'
    },
    ariaLabel: String,
    removeText: {
      type: Boolean,
      default: false
    },
    useSvg: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
/* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'), local('MaterialIcons-Regular'), url(https://fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

$btn-icon-font-size  : rem-calc(24px) !default;
$btn-icon-size       : 1em !default;
.btn-icon {
  cursor: inherit;
  display: inline-block;
  font-size: $btn-icon-font-size;
  height: $btn-icon-size;
  user-select: none;
  vertical-align: middle;
  width: $btn-icon-size;
  svg {
    fill: currentColor;
    height: $btn-icon-size;
    margin: 0;
    padding: 0;
    width: $btn-icon-size;
  }
}
</style>
