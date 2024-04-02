import winston from 'winston'

import env from './env'
import { getWinstonTransportConsole } from './util/AppUtil'

const logger: winston.Logger = winston.createLogger({
  level: env.LOG_LEVEL,
  transports: [getWinstonTransportConsole()],
})

logger.debug({
  message: 'Environment variables',
  messageObject: { ...env },
})

export default logger
