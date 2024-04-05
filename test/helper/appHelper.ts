import { addDays, getUnixTime, subDays } from 'date-fns'

export const getUnixStartTimestamp = (date: Date, amount = 1): number => {
  return getUnixTime(subDays(date, amount))
}

export const getUnixEndTimestamp = (date: Date, amount = 1): number => {
  return getUnixTime(addDays(date, amount))
}
