import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import { getThingTypesRoute, postThingTypeRoute } from '../helper/thingRouteHelper'
import { createHttpServer } from '../../src/server'
import { ThingType } from '../../src/types'
import { cleanup } from '../../seeds/things'
import { createThingType } from '../helper/thingHelper'

describe('Thing Type routes', function () {
  let app: Express
  let thingTypeOneName: string

  before(async function () {
    await cleanup()

    app = await createHttpServer()

    thingTypeOneName = 'thingTypeOne'
  })

  it('POST Thing Type that is invalid', async function () {
    const thingType: ThingType = createThingType('')

    const actualResult = await postThingTypeRoute(app, thingType)

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing Type', async function () {
    const thingType: ThingType = createThingType(thingTypeOneName)

    const actualResult = await postThingTypeRoute(app, thingType)

    expect(actualResult.status).to.equal(201)
    expect(actualResult.body).to.deep.equal(thingType)
  })

  it('GET Thing Types', async function () {
    const thingType: ThingType = createThingType(thingTypeOneName)

    const actualResult = await getThingTypesRoute(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.have.length(1)
    expect(actualResult.body[0]).to.deep.equal(thingType)
  })
})
