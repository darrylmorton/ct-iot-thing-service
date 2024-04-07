import express, { Express, Request, Response } from 'express'
import { initialize } from 'express-openapi'
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'
import cors from 'cors'

import env from './env'
import logger from './logger'
import v1ApiDoc from './api-v1/api-doc'
import v1ThingService from './api-v1/services/thingService'
import { HealthCheckResponse } from './types/serviceTypes'
import { API_URI_PREFIX } from './util/AppUtil'

export const createHttpServer = async (): Promise<Express> => {
  const app: Express = express()

  app.use(cors())
  app.use(bodyParser.json())

  app.get('/healthz', async (req: Request, res: Response): Promise<Response> => {
    const result: HealthCheckResponse = { status: 'ok', version: env.API_VERSION }

    return res.status(200).json(result)
  })

  await initialize({
    app,
    apiDoc: v1ApiDoc,
    dependencies: {
      thingService: v1ThingService,
    },
    paths: './src/api-v1/routes',
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
    errorMiddleware: (err, req, res, next) => {
      logger.debug({ message: 'errorMiddleware', messageObject: err })

      return next(err)
    },
  })

  const options = {
    swaggerOptions: {
      urls: [
        {
          url: `http://${API_URI_PREFIX}/${env.API_MAJOR_VERSION}/api-docs`,
          name: env.SERVICE_NAME,
        },
      ],
    },
  }

  app.use(`/${env.API_MAJOR_VERSION}/swagger`, swaggerUi.serve, swaggerUi.setup(undefined, options))

  return app
}

export const startServer = async (): Promise<void> => {
  const app: Express = await createHttpServer()

  try {
    app.listen(env.PORT, () => {
      logger.info(`Listening on port ${env.PORT} `)
    })
  } catch (err) {
    logger.error(`Binding failed: ${err}`)
  }
}
