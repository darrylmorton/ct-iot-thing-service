import request from 'supertest'

import { Express } from 'express'

export async function healthCheckRoute(app: Express) {
  return request(app)
    .get('/health')
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
