import { getUnixTime, subDays } from 'date-fns'

import env from '../env'

export const API_URI_PREFIX = process.env.HOST ? process.env.HOST : `${env.HOST}:${env.PORT}`

export const getStartIsoTimestamp = (date: Date) => {
  return subDays(date, 1).toISOString()
}

export const getUnixStartTimestamp = (date: Date) => {
  return getUnixTime(subDays(date, 1))
}

export const getUnixEndTimestamp = (date: Date) => {
  return getUnixTime(date)
}
