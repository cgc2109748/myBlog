import moment from 'moment'
import { extendMoment } from 'moment-range'
const Monent = extendMoment(moment)

export default class Month {
  constructor (month, year) {
    this.start = moment([year, month])
    this.end = this.start.clone().endOf('month')
    this.month = month
    this.year = year
  }

  getWeekStart () {
    return this.start.weekday()
  }

  getWeeks () {
    if (this.end.week() > this.start.week()) {
      return this.end.week() - this.start.week() + 1
    } else {
      return 6
    }
  }

  getDays () {
    const range = Monent.range(this.start, this.end)
    const arr = Array.from(range.by('days', {exclusive: true}))
    // return Monent.range(this.start, this.end).toArray('days')
    return arr
  }

  getFormatted () {
    return this.start.format('MMMM YYYY')
  }

  getYear () {
    return this.start.format('YYYY')
  }

  getMonth () {
    return this.start.format('MMMM')
  }

  getMonthInNumber () {
    return this.start.format('M')
  }
}
