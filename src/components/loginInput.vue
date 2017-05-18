<template lang="html">
  <div class="login-input">
    <span class="input input--isao">
      <input style="font-size: 20px;"
      class="input__label input__field input__field--isao"
      @blur="bl"
      @click="click"
      @change="change($event)"
      :type="type"
      :autocomplete="autocomplete"
      :placeholder="placeholder">
      <label class="input__label input__label--isao" :data-content="title">
        <span class="input__label-content input__label-content--isao">
          {{ title }}
        </span>
      </label>
    </span>
  </div>
</template>

<script>
import { defaultProps } from '@/utils'
export default {
  props: defaultProps({
    type: 'text',
    name: '',
    title: '',
    placeholder: '',
    autocomplete: 'off'
  }),
  data () {
    return {
      focus: false,
      value: '',
    }
  },
  methods: {
    bl (ev) {
      ev.target.parentElement.className = ev.target.parentElement.className.replace(' input__filled', '')
      this.focus = false
    },
    click (ev) {
      if(!this.focus) {
        ev.target.parentElement.className = ev.target.parentElement.className + ' input__filled';
        ev.target.focus()
        this.focus = true
      } else {
        return
      }
    },
    change (e) {
      this.$emit('change',this.name, e.target.value)
    }
  },
  watch: {
  }
}
</script>

<style lang="scss">
.input {
  position: relative;
  z-index: 1;
  display: inline-block;
  // margin: 1em;
  max-width: 400px;
  width: calc(100% - 2em);
  vertical-align: top;

  input:-webkit-autofill {
    outline:none;
//     -webkit-box-shadow: 0 0 0px 100px white inset !important;  //不能为transparent的任意颜色，利用内部阴影遮住浏览器默认的黄色背景
// 　　box-shadow: 0 0 0px 100px white inset !important;
    transition: background-color 999999s ease-in-out 0s;
    // -webkit-text-fill-color: #aaa;
    border: none;
  }
}
.input__field {
  position: relative;
  display: block;
  float: right;
  padding: 0.8em;
  width: 60%;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  color: #aaa;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
}
.input__label {
  display: inline-block;
  float: right;
  padding: 0 1em;
  width: 40%;
  color: #6a7989;
  font-weight: bold;
  // font-size: 70.25%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.input__label-content {
  position: relative;
  display: block;
  padding: 1.6em 0;
  width: 100%;
}

.input__field--isao {
  z-index: 10;
  padding: 0.75em 0.1em 0.25em;
  width: 100%;
  background: transparent;
  color: #afb3b8;
  &:focus {
    color: rgba(45, 120, 244, 0.8);
    transition: all .3s;

    & + .input__label--isao {
      pointer-events: none;
      &::before {
        background-color: rgba(45, 120, 244, 0.8);
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
      &::after {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      .input__label-content--isao {
        opacity: 0;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
      }
    }
  }
}
.input__label--isao {
  position: relative;
  overflow: hidden;
  padding: 0;
  width: 100%;
  color: #dadada;
  text-align: left;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 3px;
    background: #dadada;
    -webkit-transform: scale3d(1, 0.4, 1);
    transform: scale3d(1, 0.4, 1);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-transition: -webkit-transform 0.3s, background-color 0.3s;
    transition: transform 0.3s, background-color 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }
  &::after {
    content: attr(data-content);
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.75em 0.15em;
    color: rgba(45, 120, 244, 0.8);
    opacity: 0;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: opacity 0.3s, transform 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    pointer-events: none;
  }
}
.input__label-content--isao {
  padding: 0.75em 0.15em;
  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
</style>
