import { cleanEnv, str, num, port } from 'envalid'
import dotenv from 'dotenv'

import { version } from '../package.json'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './test/test.env' })
}

const env = cleanEnv(process.env, {
  LOG_LEVEL: str({ default: 'info', devDefault: 'debug' }),
  PORT: port({ devDefault: 3002 }),
  API_VERSION: str({ default: version }),
  API_MAJOR_VERSION: str({ default: 'v1' }),
  JWT_SECRET: str({ devDefault: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321' }),
  DB_HOST: str({ devDefault: 'localhost' }),
  DB_PORT: num({ devDefault: 5432 }),
  DB_USERNAME: str({ devDefault: 'postgres' }),
  DB_PASSWORD: str({ devDefault: 'postgres' }),
  DB_NAME: str({ default: 'things' }),
})

export default env
