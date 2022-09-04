import { startServer } from './server'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import logger from './logger'

const setSsmEnvs = async () => {
  if (process.env.NODE_ENV === 'production') {
    logger.info(`**** setSsmEnvs ${setSsmEnvs}`)

    const secretsManagerClient = new SecretsManagerClient({
      region: process.env.AWS_REGION,
    })
    const secretsManagerCommand = new GetSecretValueCommand({
      SecretId: process.env.THINGS_SECRETS_NAME,
    })

    try {
      const secretsManagerResult = await secretsManagerClient.send(secretsManagerCommand)
      const dbSecrets: any = JSON.parse(<string>secretsManagerResult.SecretString)
      logger.info(`**** dbSecrets ${dbSecrets}`)

      process.env.DB_USERNAME = dbSecrets.username
      process.env.DB_PASSWORD = dbSecrets.password
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`StartServerSSMError`, err)
    }
  }
}

setSsmEnvs()
startServer()
