import { cleanEnv, str, port, host } from 'envalid'
import dotenv from 'dotenv'

import { version } from '../package.json'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './test/test.env' })
} else if (process.env.NODE_ENV === 'production') {
  // @ts-ignore
  const dbSecrets: any = JSON.parse(process.env.DB_SECRETS)

  process.env.DB_USERNAME = dbSecrets.username
  process.env.DB_PASSWORD = dbSecrets.password
}

const env = cleanEnv(process.env, {
  LOG_LEVEL: str({ default: 'info', devDefault: 'debug' }),
  API_VERSION: str({ default: version }),
  API_MAJOR_VERSION: str({ default: 'v1' }),
  HOST: host({ devDefault: 'localhost' }),
  PORT: port({ default: 3002 }),
  DB_HOST: host({ devDefault: 'localhost' }),
  DB_PORT: port({ default: 5432 }),
  DB_NAME: str({ default: 'things' }),
  DB_USERNAME: str({ devDefault: 'postgres' }),
  DB_PASSWORD: str({ devDefault: 'postgres' }),
})

export default env
