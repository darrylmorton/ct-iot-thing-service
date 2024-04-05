import { describe, before, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import env from '../../../src/env'
import { createHttpServer } from '../../../src/server'
import { healthCheckRoute } from '../../helper/healthCheckHelper'
import { HealthCheckResponse } from '../../../src/types/serviceTypes'

describe('Health route', () => {
  let app: Express

  before(async function () {
    app = await createHttpServer()
  })

  it('GET health check', async () => {
    const expectedResult: HealthCheckResponse = { status: 'ok', version: env.API_VERSION }

    const actualResult = await healthCheckRoute(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.deep.equal(expectedResult)
  })
})
