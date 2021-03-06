<template>
  <div class="textbox" :class="classes">
    <div class="textbox__icon-wrapper" v-if="icon || $slots.icon">
      <slot name="icon">
        <btn-icon :icon="icon"></btn-icon>
      </slot>
    </div>

    <div class="textbox__content">
      <label class="textbox__label">
        <div
            class="textbox__label-text"
            :class="labelClasses"
            v-if="label || $slots.default"
        >
          <slot>{{ label }}</slot>
        </div>

        <input
            class="textbox__input"
            ref="input"

            :autocomplete="autocomplete ? autocomplete : null"
            :disabled="disabled"
            :max="maxValue"
            :maxlength="enforceMaxlength ? maxlength : null"
            :min="minValue"
            :name="name"
            :number="type === 'number' ? true : null"
            :placeholder="hasFloatingLabel ? null : placeholder"
            :readonly="readonly"
            :required="required"
            :step="stepValue"
            :type="type"
            :value="value"

            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="updateValue($event.target.value)"
            @keydown.enter="onKeydownEnter"
            @keydown="onKeydown"

            v-autofocus="autofocus"
            v-if="!multiLine"
        >

        <textarea
            class="textbox__textarea"
            ref="textarea"

            :autocomplete="autocomplete ? autocomplete : null"
            :disabled="disabled"
            :maxlength="enforceMaxlength ? maxlength : null"
            :name="name"
            :placeholder="hasFloatingLabel ? null : placeholder"
            :readonly="readonly"
            :required="required"
            :rows="rows"
            :value="value"

            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="updateValue($event.target.value)"
            @keydown.enter="onKeydownEnter"
            @keydown="onKeydown"

            v-autofocus="autofocus"
            v-else
        >{{ value }}</textarea>
      </label>

      <div class="textbox__feedback" v-if="hasFeedback || maxlength">
        <div class="textbox__feedback-text" v-if="showError">
          <slot name="error">{{ error }}</slot>
        </div>

        <div class="textbox__feedback-text" v-else-if="showHelp">
          <slot name="help">{{ help }}</slot>
        </div>

        <div class="textbox__counter" v-if="maxlength">
          {{ value.length + '/' + maxlength }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import autofocus from 'src/utils/directives/autofocus'
import BtnIcon from 'components/btn-icon'
import autosize from 'autosize'
export default {
    name: 'textbox',
    props: {
      name: String,
      placeholder: String,
      value: {
        type: [String, Number],
        required: true
      },
      icon: String,
      iconPosition: {
        type: String,
        default: 'left' // 'left' or 'right'
      },
      label: String,
      floatingLabel: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text' // all the possible HTML5 input types, except those that have a special UI
      },
      multiLine: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autocomplete: String,
      autofocus: {
        type: Boolean,
        default: false
      },
      autosize: {
        type: Boolean,
        default: true
      },
      min: Number,
      max: Number,
      step: {
        type: String,
        default: 'any'
      },
      maxlength: Number,
      enforceMaxlength: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      help: String,
      error: String,
      invalid: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isActive: false,
        isTouched: false,
        initialValue: this.value,
        autosizeInitialized: false
      }
    },
    computed: {
      classes() {
        return [
          `textbox--icon-position-${this.iconPosition}`,
          { 'is-active': this.isActive },
          { 'is-invalid': this.invalid },
          { 'is-touched': this.isTouched },
          { 'is-multi-line': this.multiLine },
          { 'has-counter': this.maxlength },
          { 'is-disabled': this.disabled },
          { 'has-label': this.hasLabel },
          { 'has-floating-label': this.hasFloatingLabel }
        ];
      },
      labelClasses() {
        return {
          'is-inline': this.hasFloatingLabel && this.isLabelInline,
          'is-floating': this.hasFloatingLabel && !this.isLabelInline
        };
      },
      hasLabel() {
        return Boolean(this.label) || Boolean(this.$slots.default)
      },
      hasFloatingLabel() {
        return this.hasLabel && this.floatingLabel;
      },
    isLabelInline() {
        return this.value.length === 0 && !this.isActive;
      },
      minValue() {
        if (this.type === 'number' && this.min !== undefined) {
          return this.min
        }
        return null
      },
      maxValue() {
        if (this.type === 'number' && this.max !== undefined) {
          return this.max
        }
        return null
      },
      stepValue() {
        return this.type === 'number' ? this.step : null
      },
      hasFeedback() {
        return Boolean(this.help) || Boolean(this.error)
      },
      showError() {
        return this.invalid && Boolean(this.error)
      },
      showHelp() {
        return !this.showError && Boolean(this.help)
      }
    },
    mounted() {
        if (this.multiLine && this.autosize) {
            autosize(this.$refs.textarea)
            this.autosizeInitialized = true
        }
    },
    beforeDestroy() {
        if (this.autosizeInitialized) {
            autosize.destroy(this.$refs.textarea)
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        },
        onChange(e) {
            this.$emit('change', this.value, e)
        },
        onFocus(e) {
            this.isActive = true;
            this.$emit('focus', e)
        },
        onBlur(e) {
            this.isActive = false
            this.$emit('blur', e)
            if (!this.isTouched) {
                this.isTouched = true
                this.$emit('touch')
            }
        },
        onKeydown(e) {
            this.$emit('keydown', e)
        },
        onKeydownEnter(e) {
            this.$emit('keydown-enter', e)
        },
        reset() {
            // Blur the input if it's focused to prevent required errors
            // when it's value is reset
            if (
                document.activeElement === this.$refs.input ||
                document.activeElement === this.$refs.textarea
            ) {
                document.activeElement.blur()
            }
            this.updateValue(this.initialValue)
            this.resetTouched();
        },
        resetTouched(options = { touched: false }) {
            this.isTouched = options.touched
        },
        refreshSize() {
            if (this.autosizeInitialized) {
                autosize.update(this.$refs.textarea)
            }
        }
    },
    components: {
      BtnIcon
    },
    directives: {
      autofocus
    }
}
</script>

<style lang="scss">
@import 'src/assets/styles/themes/default/index';
.textbox {
  align-items: flex-start;
  display: flex;
  font-family: $font-stack;
  margin-bottom: $ui-input-margin-bottom;
  &:hover:not(.is-disabled) {
    .textbox__label-text {
      color: $ui-input-label-color--hover;
    }
    .textbox__input,
    .textbox__textarea {
      border-bottom-color: $ui-input-border-color--hover;
    }
  }
  &.is-active:not(.is-disabled) {
    .textbox__input,
    .textbox__textarea {
      border-bottom-color: $ui-input-border-color--active;
      border-bottom-width: $ui-input-border-width--active;
    }
    .textbox__label-text,
    .textbox__icon-wrapper .ui-icon {
      color: $ui-input-label-color--active;
    }
  }
  &.has-label {
    .textbox__icon-wrapper {
      padding-top: $ui-input-icon-margin-top--with-label;
    }
  }
  &.has-counter {
    .textbox__feedback-text {
      padding-right: rem-calc(48px);
    }
  }
  &.has-floating-label {
    .textbox__label-text {
        // Behaves like a block, but width is the width of its content.
        // Needed here so label doesn't overflow parent when scaled.
      display: table;
      &.is-inline {
        color: $ui-input-label-color; // So the hover styles don't override it
        cursor: text;
        transform: translateY($ui-input-label-top--inline) scale(1.1);
      }
      &.is-floating {
        transform: translateY(0) scale(1);
      }
    }
  }
  &.is-invalid:not(.is-disabled) {
    .textbox__label-text,
    .textbox__icon-wrapper .ui-icon,
    .textbox__counter {
      color: $ui-input-label-color--invalid;
    }
    .textbox__input,
    .textbox__textarea {
      border-bottom-color: $ui-input-border-color--invalid;
    }
    .textbox__feedback {
      color: $ui-input-feedback-color--invalid;
    }
  }
  &.is-disabled {
    .textbox__input,
    .textbox__textarea {
      border-bottom-style: $ui-input-border-style--disabled;
      border-bottom-width: $ui-input-border-width--active;
      color: $ui-input-text-color--disabled;
    }
    .textbox__icon-wrapper .ui-icon {
      opacity: $ui-input-icon-opacity--disabled;
    }
    .textbox__feedback {
      opacity: $ui-input-feedback-opacity--disabled;
    }
  }
}
.textbox__label {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
}
.textbox__icon-wrapper {
  flex-shrink: 0;
  margin-right: rem-calc(12px);
  padding-top: $ui-input-icon-margin-top;
  .ui-icon {
    color: $ui-input-icon-color;
  }
}
.textbox__content {
  flex-grow: 1;
}
.textbox__label-text {
  color: $ui-input-label-color;
  font-size: $ui-input-label-font-size;
  line-height: $ui-input-label-line-height;
  margin-bottom: $ui-input-label-margin-bottom;
  transform-origin: left;
  transition: color 0.1s ease, transform 0.2s ease;
}
.textbox__input,
.textbox__textarea {
  background: none;
  border: none;
  border-bottom-color: $ui-input-border-color;
  border-bottom-style: solid;
  border-bottom-width: $ui-input-border-width;
  border-radius: 0;
  color: $ui-input-text-color;
  cursor: auto;
  display: block;
  font-family: $font-stack;
  font-size: $ui-input-text-font-size;
  font-weight: normal;
  margin: 0;
  outline: none;
  padding: 0;
  transition: border 0.1s ease;
  width: 100%;
}
.textbox__input {
  height: $ui-input-height;
}
.textbox__textarea {
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: rem-calc(6px);
  resize: vertical;
}
.textbox__feedback {
  color: $ui-input-feedback-color;
  font-size: $ui-input-feedback-font-size;
  line-height: $ui-input-feedback-line-height;
  margin: 0;
  padding-top: $ui-input-feedback-padding-top;
  position: relative;
}
.textbox__counter {
  position: absolute;
  right: 0;
  top: $ui-input-feedback-padding-top;
}
// ================================================
// Icon position
// ================================================
.textbox--icon-position-right {
  .textbox__icon-wrapper {
    margin-left: rem-calc(8px);
    margin-right: 0;
    order: 1;
  }
}
</style>
