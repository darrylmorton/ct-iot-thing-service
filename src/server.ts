import express, { Express, Request, Response, NextFunction } from 'express'
import pinoHttp from 'pino-http'
import { initialize } from 'express-openapi'
import swaggerUi from 'swagger-ui-express'
import * as bodyParser from 'body-parser'
import cors from 'cors'

import env from './env'
import logger from './logger'
import v1ApiDoc from './api-v1/api-doc'
import v1ThingService from './api-v1/services/thingService'
import { HealthCheckResponse } from './serviceTypes'
import { API_URI_PREFIX } from './util/AppUtil'

export async function createHttpServer() {
  const app: Express = express()
  const requestLogger = pinoHttp({ logger })

  app.use(cors())
  app.use(bodyParser.json())

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path !== '/health') requestLogger(req, res)
    next()
  })

  app.get('/health', async (req: Request, res: Response) => {
    const result: HealthCheckResponse = { status: 'ok', version: env.API_VERSION }

    return res.status(200).json(result)
  })

  await initialize({
    app,
    apiDoc: v1ApiDoc,
    dependencies: {
      thingService: v1ThingService,
    },
    paths: './dist/src/api-v1/routes',
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
  })

  const options = {
    swaggerOptions: {
      urls: [
        {
          url: `http://${API_URI_PREFIX}/${env.API_MAJOR_VERSION}/api-docs`,
          name: 'ThingService',
        },
      ],
    },
  }

  app.use(`/${env.API_MAJOR_VERSION}/swagger`, swaggerUi.serve, swaggerUi.setup(undefined, options))

  return app
}

export async function startServer(): Promise<void> {
  const app: Express = await createHttpServer()

  try {
    app.listen(env.PORT, () => {
      logger.info(`Listening on port ${env.PORT} `)
    })
  } catch (err) {
    logger.error(`Binding failed: ${err}`)
  }
}
