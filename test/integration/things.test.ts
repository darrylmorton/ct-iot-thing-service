import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import { getThingByIdRoute, getThingsRoute, postThingRoute, postThingTypeRoute } from '../helper/thingRouteHelper'
import { createHttpServer } from '../../src/server'
import { SimpleThing, ThingType } from '../../src/types'
import { cleanup } from '../../seeds/things'
import { assertThing, createThing, createThingType } from '../helper/thingHelper'

describe('Thing routes', function () {
  let app: Express
  let thingTypeOneName: string
  let thingOneName: string
  let thingZeroId: string

  before(async function () {
    await cleanup()

    app = await createHttpServer()

    thingTypeOneName = 'thingTypeOne'
    thingOneName = 'thingOne'
    thingZeroId = '00000000-0000-0000-0000-00000000000'

    const thingType: ThingType = createThingType(thingTypeOneName)
    await postThingTypeRoute(app, thingType)
  })

  it('POST Thing that is invalid', async function () {
    const thing: SimpleThing = createThing('', '')

    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(400)
  })

  it('POST Thing that is invalid', async function () {
    const thing: SimpleThing = createThing('', thingTypeOneName)

    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(400)
  })

  it('POST Thing that is invalid', async function () {
    const thing: SimpleThing = createThing(thingOneName, '')

    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(404)
  })

  it('POST Thing', async function () {
    const thing: SimpleThing = createThing(thingOneName, thingTypeOneName)

    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(201)
    assertThing(actualResult.body, thing)
  })

  it('POST Thing that already exists', async function () {
    const thing: SimpleThing = createThing(thingOneName, thingTypeOneName)

    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(409)
  })

  it('GET Things', async function () {
    const thing: SimpleThing = createThing(thingOneName, thingTypeOneName)

    const actualResult = await getThingsRoute(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.have.length(1)
    assertThing(actualResult.body[0], thing)
  })

  it('GET Thing by id that is invalid', async function () {
    const actualResult = await getThingByIdRoute(app, thingZeroId)

    expect(actualResult.status).to.equal(400)
  })

  it('GET Thing by id that is invalid', async function () {
    const thingId = '00000000-0000-0000-0000-000000000001'

    const actualResult = await getThingByIdRoute(app, thingId)

    expect(actualResult.status).to.equal(404)
  })

  it('GET Thing by id', async function () {
    const thing: SimpleThing = createThing('thingTwo', thingTypeOneName)

    const { body } = await postThingRoute(app, thing)

    const actualResult = await getThingByIdRoute(app, body.id)

    expect(actualResult.status).to.equal(200)
    assertThing(actualResult.body, thing)
  })
})
