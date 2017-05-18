<template>
  <div :class="wrapClasses" :style="styles">
    <div :class="[prefixCls + '-tail']"><i></i></div>
    <div :class="[prefixCls + '-head']">
      <div :class="[prefixCls + '-head-inner']">
        <span v-if="!icon && currentStatus != 'finish' && currentStatus != 'error'">{{ stepNumber }}</span>
        <span v-else :class="iconClasses">{{ index }}</span>
      </div>
    </div>
    <div :class="[prefixCls + '-main']">
      <div :class="[prefixCls + '-title']">{{ title }}
        <div class="steps-title-date">{{date}}</div>
      </div>
      <div class="steps-content" :class="{'has-text': hasText}">
        <slot name="content">
          <!-- <div v-if="content" :class="[prefixCls + '-content']">{{ content }}</div> -->
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import { oneOf } from 'src/utils/assist'
const prefixCls = 'steps'
const iconPrefixCls = 'icon'
export default {
  name: 'Step',
  props: {
    status: {
      validator (value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error'])
      }
    },
    title: {
      type: String,
      default: ''
    },
    // content: {
    //   type: String
    // },
    date: {
      type: String
    },
    icon: {
      type: String
    },
    type: {
      type: String
    },
    index: {
      type: Number
    },
    text: {
      type: String
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      stepNumber: '',
      nextError: false,
      total: 1,
      currentStatus: ''
    }
  },
  created () {
    this.currentStatus = this.status;
  },
  computed: {
    hasText () {
      return !_.isEmpty(this.text)
    },
    wrapClasses () {
        return [
            `${prefixCls}-item`,
            `${prefixCls}-status-${this.currentStatus}`,
            {
                [`${prefixCls}-custom`]: !!this.icon,
                [`${prefixCls}-next-error`]: this.nextError
            }
        ];
    },
    iconClasses () {
      let icon = ''
      if (this.icon) {
        icon = this.icon;
      } else {
        if (this.currentStatus == 'finish') {
          icon = 'fa fa-checkmark';
        } else if (this.currentStatus == 'error') {
          icon = 'fa fa-close';
        }
      }
      return [
        `${prefixCls}-icon`,
        `${iconPrefixCls}`,
        {
          [`${iconPrefixCls}-${icon}`]: icon != ''
        }
      ]
    },
    styles () {
      return {
        width: `${1/this.total*100}%`
      }
    }
  },
  watch: {
    status (val) {
      this.currentStatus = val
      if (this.currentStatus == 'error') {
        this.$parent.setNextError()
      }
    }
  }
}
</script>
