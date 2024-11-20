import winston from 'winston'

import env from './env'
import AppUtil from './util/AppUtil'

const logger: winston.Logger = winston.createLogger({
  level: env.LOG_LEVEL,
  transports: [AppUtil.getWinstonTransportConsole()],
})

logger.debug({
  message: 'Environment variables',
  messageObject: { ...env },
})

export default logger
