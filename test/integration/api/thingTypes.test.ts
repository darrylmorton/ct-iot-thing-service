import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import { getThingTypeByNameRoute, getThingTypesRoute, postThingTypeRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import { seed } from '../../../seeds/things'
import { createThingType, THING_TYPE_NAMES } from '../../helper/thingHelper'
import db from '../../../src/db'

describe('Thing Type routes', function () {
  let app: Express

  before(async function () {
    await seed()

    app = await createHttpServer()
  })

  it('POST Thing Type that is invalid', async function () {
    const actualResult = await postThingTypeRoute(app, {
      name: '',
      description: THING_TYPE_NAMES[0],
    })

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing Type exists', async function () {
    const actualResult = await postThingTypeRoute(app, {
      name: THING_TYPE_NAMES[0],
      description: THING_TYPE_NAMES[0],
    })

    expect(actualResult.status).to.equal(409)
  })

  it('POST Thing Type', async function () {
    const expectedResult = createThingType('thingTypeZero')

    const actualResult = await postThingTypeRoute(app, expectedResult)

    expect(actualResult.status).to.equal(201)
    expect(actualResult.body).to.deep.equal(expectedResult)
  })

  it('GET Thing Types', async function () {
    const expectedResult = await db.findThingTypes()

    const actualResult = await getThingTypesRoute(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.deep.equal(expectedResult)
  })

  it('GET Thing Type by name', async function () {
    const expectedResult = await db.findThingTypeByName(THING_TYPE_NAMES[0])

    const actualResult = await getThingTypeByNameRoute(app, THING_TYPE_NAMES[0])

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.deep.equal(expectedResult[0])
  })
})
