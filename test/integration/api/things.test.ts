import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import { getThingByNameRoute, getThingsRoute, postThingRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import { seed } from '../../../seeds/things'
import { assertThing, createThing, DEVICE_IDS, THING_NAMES, THING_TYPE_NAMES } from '../../helper/thingHelper'
import db from '../../../src/db'

describe('Thing routes', function () {
  let app: Express

  before(async function () {
    await seed()

    app = await createHttpServer()
  })

  it('POST Thing invalid', async function () {
    const actualResult = await postThingRoute(app, {})

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing invalid', async function () {
    const actualResult = await postThingRoute(app, {
      name: '',
      description: '',
      deviceId: '',
      thingType: '',
    })

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing with invalid name', async function () {
    const actualResult = await postThingRoute(app, {
      name: '',
      description: THING_NAMES[0],
      deviceId: DEVICE_IDS[0],
      thingType: THING_TYPE_NAMES[0],
    })

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing with invalid description', async function () {
    const actualResult = await postThingRoute(app, {
      name: THING_NAMES[0],
      description: '',
      deviceId: DEVICE_IDS[0],
      thingType: THING_TYPE_NAMES[0],
    })

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing with invalid deviceId', async function () {
    const actualResult = await postThingRoute(app, {
      name: THING_NAMES[0],
      description: THING_NAMES[0],
      deviceId: '',
      thingType: THING_TYPE_NAMES[0],
    })

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing with invalid thing type', async function () {
    const actualResult = await postThingRoute(app, {
      name: THING_NAMES[0],
      description: THING_NAMES[0],
      deviceId: DEVICE_IDS[0],
      thingType: '',
    })

    expect(actualResult.status).to.equal(404)
  })

  it('POST Thing that already exists - name', async function () {
    const actualResult = await postThingRoute(app, {
      name: THING_NAMES[0],
      description: THING_NAMES[0],
      deviceId: 'zzz-000000',
      thingType: THING_TYPE_NAMES[0],
    })

    expect(actualResult.status).to.equal(409)
  })

  it('POST Thing that already exists - device id', async function () {
    const actualResult = await postThingRoute(app, {
      name: 'thingZero',
      description: THING_NAMES[0],
      deviceId: DEVICE_IDS[0],
      thingType: THING_TYPE_NAMES[0],
    })

    expect(actualResult.status).to.equal(409)
  })

  it('POST Thing', async function () {
    const expectedResult = createThing('thingZero', 'zzz-000000', THING_TYPE_NAMES[0])

    const actualResult = await postThingRoute(app, expectedResult)

    expect(actualResult.status).to.equal(201)
    assertThing(actualResult.body, expectedResult)
  })

  it('GET Things', async function () {
    const expectedResult = await db.findThings()

    const actualResult = await getThingsRoute(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.deep.equal(expectedResult)
  })

  it('GET Thing by name that is missing', async function () {
    const actualResult = await getThingByNameRoute(app, 'thingSubZero')

    expect(actualResult.status).to.equal(404)
  })

  it('GET Thing by name', async function () {
    const actualResult = await getThingByNameRoute(app, THING_NAMES[0])

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body.name).to.deep.equal(THING_NAMES[0])
  })
})
