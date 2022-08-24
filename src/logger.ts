import pino from 'pino'
import env from './env'

const logger = pino(
  {
    name: 'THING_SERVICE',
    level: env.LOG_LEVEL,
  },
  process.stdout
)

logger.debug('Environment variables: %j', { ...env })

export default logger
