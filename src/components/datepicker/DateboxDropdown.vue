<template>
  <transition name="datepicker-slide">
    <div class="datepicker" v-if="visible" @click.stop :style="{ top:dateboxTop }">
      <div class="datepicker_header">
        <div class="datepicker_year">
          <transition name="slideh">
            <span v-for="year in [year]" :class="dayDirection">{{ year }}</span>
          </transition>
        </div>
        <div class="datepicker_date">
          <transition name="slideh">
            <span v-for="d in [date_formatted]" transition="slideh" :class="dayDirection">{{ d }}</span>
          </transition>
        </div>
      </div>
      <transition name="slidew">
        <div class="datepicker_wrapper" :class="classWeeks">
          <div v-if="datepicker">
            <div class="datepicker_controls">
              <div class="datepicker_month">
                <transition name="slideh" tag="span">
                  <span v-for="month in [month]" @click="showPicker" :class="classDirection">{{ month.getFormatted() }}</span>
                </transition>
              </div>
              <button class="datepicker_next" @click="nextMonth()">
                <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
              </button>
              <button class="datepicker_prev" @click="prevMonth()">
                <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path> </svg>
              </button>
            </div>
              <div class="datepicker_week">
                <div v-for="(day, $index) in days" class="datepicker_weekday">
                  {{ day }}
                </div>
              </div>
              <div class="datepicker_days" :class="classWeeks">
                <transition name="slidev">
                  <div v-for="month in [month]" :class="classDirection">
                    <div class="datepicker_day" :style="{ width:( (month.getWeekStart() + 1) * 41) + 'px' }">
                    </div>
                    <div class="datepicker_day" @click="selectDate(day)" v-for="day in month.getDays()" :class="{ selected: isSelected(day), 'today': isToday(day) }">
                      <span class="datepicker_day_corner"></span>
                      <span class="datepicker_day_effect"></span>
                      <span class="datepicker_day_text">{{ day.format('D') }}</span>
                    </div>
                  </div>
                </transition>
              </div>
            <div class="datepicker_actions">
              <div class="datepicker_actions_groups">
                <button class="ui button" @click="selectToday"><i class="add to calendar icon"></i> 今天 </button>
                <button class="ui button timepicker_btn" @click="showTimePicker"><i class="wait icon"></i> 选择时间 </button>
                <!-- <button class="ui button"><i class="trash icon"></i> 清空 </button> -->
                <button class="ui button" @click="submit">确定</button>
                <!-- <button class="ui button" @click="cancel">取消</button> -->
              </div>
            </div>
          </div>
          <div class="pickers" v-if="pickers">
            <div class="datepicker_controls">
              <div class="datepicker_month">
                <transition name="slideh">
                  <span v-for="year in [month]" @click="showPicker" :class="classDirection" @onchange="picker_changeMonth">{{ month.getYear()}} 年</span>
                </transition>
              </div>
              <button class="datepicker_next" @click="nextYear()">
                <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
              </button>
              <button class="datepicker_prev" @click="prevYear()">
                <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path> </svg>
              </button>
            </div>
            <div class="ui grid" style="margin:0;">
                <div class="four wide column month" v-for="month in months" @click="hidePicker">
                  <span class="datepicker_month_corner"></span>
                  <span class="datepicker_month_effect"></span>
                  <span class="datepicker_month_text" :name="month.num">{{ month.text }}</span>
                </div>
            </div>
          </div>
          <div class="timepicker" v-if="timepicker">
            <table class="timepicker-table">
              <tbody>
                <tr>
                  <td><a tabindex="-1" @click="addHour()"><i class="icon chevron up"></i></a></td>
                  <td></td>
                  <td><a tabindex="-1" @click="addMinute()"><i class="icon chevron up"></i></a></td>
                </tr>
                <tr>
                  <td><span class="time-hour">10</span></td>
                  <!-- <td><input type="text">10</input></td> -->
                  <td><span>:</span></td>
                  <td><span class="time-minute">26</span></td>
                </tr>
                <tr>
                  <td><a tabindex="-1" @click="minusHour()"><i class="icon chevron down"></i></a></td>
                  <td></td>
                  <td><a tabindex="-1" @click="minusMinute()"><i class="icon chevron down"></i></a></td>
                </tr>
              </tbody>
            </table>
            <div class="timepicker-submit">
              <span @click="hideTimePicker">确定</span>
            </div>
            <!-- <div class="datepicker_controls">
              <div class="datepicker_month">
                <span v-for="year in [month]" @click="showPicker" transition="slideh" :class="classDirection" @onchange="picker_changeMonth">{{ month.getYear()}} 年</span>
              </div>
              <button class="datepicker_next" @click="nextYear()">
                <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
              </button>
              <button class="datepicker_prev" @click="prevYear()">
                <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path> </svg>
              </button>
            </div>
            <div class="ui grid" style="margin:0;">
                <div class="four wide column month" v-for="month in months" @click="hidePicker">
                  <span class="datepicker_month_corner"></span>
                  <span class="datepicker_month_effect"></span>
                  <span class="datepicker_month_text" :name="month.num">{{ month.text }}</span>
                </div>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>


<script>
/* eslint-disable */
import moment from 'moment'
import {defaultProps} from 'src/utils'
import Month from './modules/month'
import cx from 'classnames'

export default {
  props: defaultProps({
    date: Object,
    // today: Object,
    pickertype: String,
    visible: true,
    inputYear: Number,
    inputMonth: Number,
    dateboxTop: String
  }),
  data () {
    return {
      days: ['日', '一', '二', '三', '四', '五', '六'],
      months: [
              {text: '一月', num: '0'},
              {text: '二月', num: '1'},
              {text: '三月', num: '2'},
              {text: '四月', num: '3'},
              {text: '五月', num: '4'},
              {text: '六月', num: '5'},
              {text: '七月', num: '6'},
              {text: '八月', num: '7'},
              {text: '九月', num: '8'},
              {text: '十月', num: '9'},
              {text: '十一月', num: '10'},
              {text: '十二月', num: '11'}
      ],
      today: moment(),
      month: new Month(this.date.month(), this.date.year()),
      // year:new Month(this.date.year()),
      classDirection: 'off',
      dayDirection: 'off',
      pickerWrapper: false,
      datepicker: true,
      pickers: false,
      timepicker: false,
      hour: '',
      minute: ''
    }
  },
  computed: {
    // month(){
    //   if(this.date.isValid()){
    //     return new Month(this.date.month(), this.date.year())
    //   }else{
    //     let _today = moment()
    //     return new Month(_today.month(), _today.year())
    //   }
    // },
    year () {
      let _today = moment()
      if (this.date.isValid()) {
        _today = this.date
      }
      return _today.format('YYYY')
    },
    classWeeks () {
      // return 'has-' + this.month.getWeeks() + '-weeks'
      return cx({
        [`has-${this.month.getWeeks()}-weeks`]: 1,
        'pickers-wrapper': this.pickerWrapper
      })
    },
    date_formatted () {
      let _today = moment()
      if (this.date.isValid()) {
        _today = this.date
      }
      return _today.format('dddd DD MMMM')
    }
    // today() {
    //   return this.ttoday
    // }
  },
  methods: {
    isSelected (day) {
      // debugger
      return this.date.unix() === day.unix()
    },
    isToday (day) {
      // debugger
      return this.today.format('YYYY-MM-DD') == day.format('YYYY-MM-DD')
    },
    selectDate (day) {
      this.dayDirection = 'direction-next'
      if (day.isBefore(this.date)) {
        this.dayDirection = 'direction-prev'
      }
      // this.date = day.clone()
      this.$emit('change', day.clone())
      // this.$dispatch('change', this.date)
    },
    selectToday () {
      if (this.today.month() == this.month.month && this.today.year() == this.month.year) {
        document.getElementsByClassName('today')[0].click()
      } else {
        let month = this.today.month()
        let year = this.today.year()
        this.month = new Month(month, year)
        setTimeout(() => document.getElementsByClassName('today')[0].click(), 0.3)
      }
    },
    nextMonth () {
      this.classDirection = 'direction-next'
      let month = this.month.month + 1
      let year = this.month.year
      if (month > 11) {
        year += 1
        month = 0
      }
      this.month = new Month(month, year)
    },
    prevMonth () {
      this.classDirection = 'direction-prev'
      let month = this.month.month - 1
      let year = this.month.year
      if (month < 0) {
        year -= 1
        month = 11
      }
      this.month = new Month(month, year)
    },
    nextYear () {
      this.classDirection = 'direction-next'
      let month = this.month.month
      let year = this.month.year + 1
      if (year > 2999) {
        year = 2999
      }
      this.month = new Month(month, year)
      this.pickerYear = year
    },
    prevYear () {
      this.classDirection = 'direction-prev'
      let month = this.month.month
      let year = this.month.year - 1
      if (year < 1949) {
        year = 1949
      }
      this.month = new Month(month, year)
      this.pickerYear = year
    },
    picker_changeMonth (inputYear, inputMonth) {
      let month = Number(inputMonth) - 1
      let year = Number(inputYear)
      this.month = new Month(month, year)
    },
    submit () {

      // this.$dispatch('change',this.date)
      this.$emit('change', this.date)
      this.$emit('closeDatePicker');// 通知关闭控件
    },
    cancel () {
      // this.$dispatch('cancel')
      this.$emit('cancel')
    },
    getDateBoxTop () {
      const _dateboxTop = Number(this.dateboxTop.replace('%', ''))
      if (_dateboxTop < 0) {
        this.$parent.dateboxTop = '-760%'
      }
    },
    resetDateBoxTop () {
      const _dateboxTop = Number(this.dateboxTop.replace('%', ''))
      if (_dateboxTop < 0) {
        this.$parent.dateboxTop = '-1095%'
      }
    },
    showPicker () {
      this.datepicker = false
      this.pickers = true
      this.pickerWrapper = true
      this.getDateBoxTop()
    },
    hidePicker () {
      this.month = new Month(Number(event.target.parentElement.querySelector('.datepicker_month_text').getAttribute('name')), Number($('.pickers .datepicker_month span').text().replace('年', '')))
      this.pickerWrapper = false
      this.datepicker = true
      this.pickers = false
      this.resetDateBoxTop()
    },
    showTimePicker () {
      this.datepicker = false
      this.pickers = false
      this.pickerWrapper = true
      this.timepicker = true
      this.getDateBoxTop()
    },
    hideTimePicker () {
      this.hour = $('.time-hour').text()
      this.minute = $('.time-minute').text()
      this.$emit('change', this.date, this.hour, this.minute)
      this.datepicker = true
      this.timepicker = false
      this.pickerWrapper = false
      this.resetDateBoxTop()
    },
    addHour () {
      if (Number($('.time-hour').text()) < 24) {
        // debugger
        $('.time-hour').text(Number($('.time-hour').text()) + 1)
      }
    },
    minusHour () {
      if (Number($('.time-hour').text()) > 0) {
        $('.time-hour').text(Number($('.time-hour').text()) - 1)
      }
    },
    addMinute () {
      if (Number($('.time-minute').text()) < 60) {
        $('.time-minute').text(Number($('.time-minute').text()) + 1)
      }
    },
    minusMinute () {
      if (Number($('.time-minute').text()) > 0) {
        $('.time-minute').text(Number($('.time-minute').text()) - 1)
      }
    }
  },
  watch: {
    visible (val, oldVal) {
      if (val === false) {
        this.classDirection = 'off'
        this.dayDirection = 'off'
        this.datepicker = true
        this.pickers = false
        this.timepicker = false
        this.pickerWrapper = false
      }
    }
  }

}

</script>
