import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
import { type TypeOfView } from '~~/store'

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

  function toNextPeriod(date: Date, view: TypeOfView) {
    return dayjs(date).add(1, view).toDate()
  }

  function toPreviousPeriod(date: Date, view: TypeOfView) {
    return dayjs(date).subtract(1, view).toDate()
  }

  function toToday() {
    return dayjs().toDate()
  }

  function getDatePeriod(date: Date, view: 'month' | 'week') {
    return {
      start: toFormat(dayjs(date).startOf(view).toDate(), 'YYYY-MM-DD'),
      end: toFormat(dayjs(date).endOf(view).toDate(), 'YYYY-MM-DD'),
    }
  }

  function isToday(date1: Date) {
    return isSameDay(new Date(), date1)
  }

  function isInCurrentMonth(date1: Date) {
    return dayjs().isSame(dayjs(date1), 'month')
  }

  function isInCurrentWeek(date1: Date) {
    return dayjs().isSame(dayjs(date1), 'week')
  }

  return {
    toFormat,
    isBefore,
    isInCurrentMonth,
    isInCurrentWeek,
    isSameDay,
    isToday,
    toNextPeriod,
    toPreviousPeriod,
    toToday,
    getDatePeriod,
  }
}
