import { cleanEnv, str, port, host } from 'envalid'
import dotenv from 'dotenv'

import { version } from '../package.json'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import logger from './logger'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './test/test.env' })
} else if (process.env.NODE_ENV === 'production') {
  const setEnvs = async () => {
    const secretsManagerClient = new SecretsManagerClient({
      region: process.env.AWS_REGION,
    })
    const secretsManagerCommand = new GetSecretValueCommand({
      SecretId: process.env.THINGS_SECRETS_NAME,
    })

    try {
      const secretsManagerResult = await secretsManagerClient.send(secretsManagerCommand)
      const dbSecrets: any = JSON.parse(<string>secretsManagerResult.SecretString)

      process.env.DB_USERNAME = dbSecrets.username
      process.env.DB_PASSWORD = dbSecrets.password
    } catch (err) {
      // eslint-disable-next-line no-console
      logger.error(`ThingServiceSecretsManagerError ${err}`)
    }
  }

  setEnvs().then((done) => done)
}

const env = cleanEnv(process.env, {
  LOG_LEVEL: str({ default: 'info', devDefault: 'debug' }),
  API_VERSION: str({ default: version }),
  API_MAJOR_VERSION: str({ default: 'v1' }),
  PORT: port({ default: 3002 }),
  DB_HOST: host({ devDefault: 'localhost' }),
  DB_PORT: port({ default: 5432 }),
  DB_NAME: str({ default: 'things' }),
  DB_USERNAME: str({ devDefault: 'postgres' }),
  DB_PASSWORD: str({ devDefault: 'postgres' }),
})

export default env
