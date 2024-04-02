import request from 'supertest'

import { Express } from 'express'

export const healthCheckRoute = async (app: Express): Promise<Response> => {
  return request(app)
    .get('/healthz')
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`healthCheckErr ${err}`)
      return err
    })
}
