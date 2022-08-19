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

export async function createHttpServer() {
  const app: Express = express()
  const requestLogger = pinoHttp({ logger })

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path !== '/health') requestLogger(req, res)
    next()
  })

  app.get('/health', async (req: Request, res: Response) => {
    res.status(200).send({ status: 'ok', version: env.API_VERSION })
  })

  app.use(cors())
  app.use(bodyParser.json())

  initialize({
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
          url: `http://localhost:${env.PORT}/${env.API_MAJOR_VERSION}/api-docs`,
          name: 'ThingService',
        },
      ],
    },
  }

  app.use(`/${env.API_MAJOR_VERSION}/swagger`, swaggerUi.serve, swaggerUi.setup(undefined, options))

  // Sorry - app.use checks arity
  // eslint-disable-next-line no-unused-vars
  // app.use((err: Errback, req: Request, res:Response, next: NextFunction) => {
  //   if (err.status) {
  //     res.status(err.status).send({ error: err.status === 401 ? 'Unauthorised' : err.message })
  //   } else {
  //     logger.error('Fallback Error %j', err.stack)
  //     res.status(500).send('Fatal error!')
  //   }
  // })

  return app
}

export async function startServer(): Promise<void> {
  const app = await createHttpServer()

  // const setupGracefulExit = (sigName: string, server: any, exitCode: number) => {
  //   process.on(sigName, async () => {
  //     server.close(() => {
  //       process.exit(exitCode)
  //     })
  //   })
  // }

  try {
    app.listen(env.PORT, () => {
      logger.info(`Listening on port ${env.PORT} `)
    })

    // setupGracefulExit('SIGINT', server, 0)
    // setupGracefulExit('SIGTERM', server, 143)
  } catch (err) {
    logger.error(`Binding failed: ${err}`)
  }
}
