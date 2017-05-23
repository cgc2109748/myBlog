<template>
  <div class="datepicker-container">
    <!-- <div class="ui action input"> -->
      <!-- <input type="text" :value="date_formatted" :disabled="!!args.disabled"> -->
      <button class="datepicker-button"  @click="_toggleDatepicker">
      </button>
    <!-- <div> -->
    <!-- <input type="text" value="{{ date_formatted }}" @click="_toggleDatepicker"> -->
    <input type="hidden" :name="name" :value="date_raw">
    <!--
    :today="todayDefault"
    -->
    <datebox-dropdown :datebox-top="dateboxTop"  :date="date"
    :visible="showDatepicker" @change="selectDate" @cancel="hideDatepicker" @closeDatePicker='handleClosePicker'></datebox-dropdown>
  </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
import {defaultProps} from 'src/utils'
import DateboxDropdown from './DateboxDropdown.vue'

moment.locale('zh-cn')

export default {
  components: { DateboxDropdown },
  props: defaultProps({
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    value: String,
    // name: {
    //   type: String
    // },
    pickertypes: {
      type: String
    },
    titleInfo: Object,
    args: Object,
    // businessArgs: Object,
    onChange: function () {}
  }),
  data () {
    return {
      showDatepicker: false,
      pickertype: this.pickertypes,
      // ttoday: moment(this.today,'YYYY-MM-DD'),
      date: this.value != null ? moment(this.value) : moment(),
      // date: this.value,
      todayDefault: moment(),
      valueSpliter: '',
      name: this.args.name,
      dateboxTop: '100%'
    }
  },
  computed: {
    date_formatted () {
      // if(this.args.type.replace('DateBox-','') == 'DateTime'){
      //   return this.date.format(this.args.format.replace('yyyy','YYYY').replace('dd','DD'))
      // }else {
      //   return this.date.format(this.format)
      // }

      let _format = this.args.format.replace('yyyy', 'YYYY').replace('dd', 'DD')

      if (this.value == null) {
        return ''
      } else {
        return moment(this.value).format(_format)  // xyz
        // return this.date.format(_format)
      }
      switch (this.args.type) {
        case 'DateBox-DateTime':
          // _format =
          break
        case 'DateBox-Date':

          break
        case 'DateBox-Time':

          break
        default:

      }
    },
    date_raw: function () {
      return this.date.format('YYYY-MM-DD')
    }
  },
  mounted () {
    if (this.args.disabled) {
      $(this.$el.querySelector('button.datepicker-button')).css('cursor', 'not-allowed')
      // this.$el.querySelector("input").disabled = true
    }
    this.$emit('bindEvent', this, this.args)
  },
  methods: {
    handleClosePicker(){
      this.hideDatepicker();//点击确认关闭控件xyz
    },
    selectDate: function(date,hour,minute) {

      this.date = date
      if (hour && minute) {
        date.set({'hour': Number(hour), 'minute': Number(minute)})
        this._change(this.args.name, _.join(date.format('YYYY-MM-DD HH:mm:SS'), this.valueSpliter))
      } else {
        this._change(this.args.name, _.join(date.format('YYYY-MM-DD HH:mm:SS'), this.valueSpliter))
      }
      // this.hideDatepicker() 选择完日期不关闭控件 xyz
    },
    _toggleDatepicker () {
      if (!this.args.disabled) {
        this.showDatepicker = !this.showDatepicker
        if (!this.showDatepicker) {
          document.removeEventListener('click', this.hideDatepicker)
        } else {
          setTimeout(() => document.addEventListener('click', this.hideDatepicker), 0)
        }
        this.getElementViewBottom(event.target.parentElement, event.target.parentElement.offsetHeight)
      }
    },
    hideDatepicker: function () {
      this.showDatepicker = false
      document.removeEventListener('click', this.hideDatepicker)
    },
    getElementViewBottom (element, _height) {
      var actualTop = element.offsetTop
      　　　　var current = element.offsetParent
      　　　　while (current !== null) {
        　　　　　　actualTop += current.offsetTop
        　　　　　　current = current.offsetParent
      　　　　}
      　　　　if (document.compatMode == 'BackCompat') {
        　　　　　　var elementScrollTop = document.body.scrollTop
      　　　　} else {
        　　　　　　var elementScrollTop = document.documentElement.scrollTop
      　　　　}
      var innerHeight = window.innerHeight
      var ElementViewBottom = innerHeight - actualTop - elementScrollTop - _height
      if (ElementViewBottom < 474) {
        this.dateboxTop = '-725%'
      } else {
        this.dateboxTop = '100%'
      }
    },
    _change (fieldName, value) {
      // let
      this.$emit('datachange', fieldName, value)
      this.$emit('onchange', this)
    }
  }

}

</script>

<style media="screen">
  .datepicker-container {
    position: relative;
  }
  .datepicker-container .ui.action.input {
    border-radius: 0.28571429rem;
  }
  .datepicker-container .ui.icon.button {
    border-radius: 0 0.28571429rem 0.28571429rem 0 !important;
  }
  .datepicker-container .ui.icon.button i {
    margin-right: 0;
  }
</style>
