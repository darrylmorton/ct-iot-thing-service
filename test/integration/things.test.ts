import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import { getThingsRoute, postThingRoute, postThingTypeRoute } from '../helper/thingRouteHelper'
import { createHttpServer } from '../../src/server'
import { SimpleThing, ThingType } from '../../src/types'
import { cleanup } from '../../seeds/things'
import { assertThing, createThing, createThingType } from '../helper/thingHelper'

describe('Thing routes', function () {
  let app: Express
  let thingTypeOneName: string
  let thingOneName: string

  before(async function () {
    app = await createHttpServer()

    thingTypeOneName = 'thingTypeOne'
    thingOneName = 'thingOne'

    await cleanup()
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
})
