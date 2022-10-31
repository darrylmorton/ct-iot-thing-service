import env from '../env'
import { getUnixTime, subDays } from 'date-fns'

export const API_URI_PREFIX = process.env.HOST ? process.env.HOST : `${env.HOST}:${env.PORT}`

export const getUnixStartTimestamp = (today: Date) => {
  const startTimestamp: number = getUnixTime(subDays(today, 1))

  return getUnixTime(startTimestamp)
}

export const getUnixEndTimestamp = (today: Date) => {
  return getUnixTime(today)
}
