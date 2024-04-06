import { subDays } from 'date-fns'
import winston, { format } from 'winston'
import printf = format.printf
import prettyPrint = format.prettyPrint
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'

import env from '../env'
import { ThingGroupDevice } from '../types/types'

export const API_URI_PREFIX = process.env.HOST ? process.env.HOST : `${env.HOST}:${env.PORT}`

export const getStartIsoTimestamp = (date: Date, amount = 1): string => {
  return subDays(date, amount).toISOString()
}

export const getWinstonFormatOptions = (): winston.Logform.Format => {
  return winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.label({
      label: env.SERVICE_NAME,
    }),
    winston.format.json(),
    printf(({ level, statusCode, message, messageObject, label, timestamp, validationErrors }) => {
      return JSON.stringify({
        timestamp,
        label,
        level,
        message,
        statusCode,
        messageObject,
        validationErrors,
      })
    }),
    prettyPrint({ colorize: true })
  )
}

export const getWinstonTransportConsole = (): ConsoleTransportInstance => {
  return new winston.transports.Console({
    format: getWinstonFormatOptions(),
  })
}

// class AppUtil {
const getFirstArrayElement = (list: ThingGroupDevice[]): ThingGroupDevice | null => {
  return list.length === 1 ? list[0] : null
}

// TODO change file to be module with interface

export default { getFirstArrayElement }
