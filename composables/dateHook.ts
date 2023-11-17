import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'

dayjs.locale(fr)

export default function dateHook() {
  function toFormat(date: Date | string, format: string) {
    return dayjs(date).locale('fr').format(format)
  }

  function isSameDay(date1: Date | string, date2: Date | string) {
    return dayjs(date1).isSame(dayjs(date2), 'day')
  }

  function isBefore(date1: Date, date2: Date) {
    return dayjs(date1).isBefore(dayjs(date2))
  }

  function toNextMonth(date: Date) {
    return dayjs(date).add(1, 'month').toDate()
  }

  function toPreviousMonth(date: Date) {
    return dayjs(date).subtract(1, 'month').toDate()
  }

  function toToday() {
    return dayjs().toDate()
  }

  function getDatePeriod(date: Date, view: 'month' | 'week') {
    return {
      start: dayjs(date).startOf(view).toDate(),
      end: dayjs(date).endOf(view).toDate(),
    }
  }

  return {
    toFormat,
    isBefore,
    isSameDay,
    toNextMonth,
    toPreviousMonth,
    toToday,
    getDatePeriod,
  }
}
