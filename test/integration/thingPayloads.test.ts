import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import {
  getThingPayloadsRoute,
  postThingPayloadRoute,
  postThingRoute,
  postThingTypeRoute,
} from '../helper/thingRouteHelper'
import { createHttpServer } from '../../src/server'
import { SimpleThing, ThingType } from '../../src/types'
import { cleanup } from '../../seeds/things'
import { assertThingPayload, createThing, createThingPayload, createThingType } from '../helper/thingHelper'

describe('Thing Payload routes', function () {
  let app: Express
  let thingTypeOneName: string
  let thingOneName: string
  let thingZeroId: string
  let thingOneId: string

  before(async function () {
    await cleanup()

    app = await createHttpServer()

    thingZeroId = '00000000-0000-0000-0000-00000000000'
    thingTypeOneName = 'thingTypeOne'
    thingOneName = 'thingOne'

    const thingType: ThingType = createThingType(thingTypeOneName)
    await postThingTypeRoute(app, thingType)

    const thing: SimpleThing = createThing(thingOneName, thingTypeOneName)
    const { body: thingRequestBody } = await postThingRoute(app, thing)
    thingOneId = thingRequestBody.id
  })

  it('POST Thing Payload that is invalid', async function () {
    const thingPayload = createThingPayload(thingZeroId)

    const actualResult = await postThingPayloadRoute(app, thingPayload)

    expect(actualResult.status).to.equal(400)
  })

  it('POST Thing Payload', async function () {
    const thingPayload = createThingPayload(thingOneId)

    const actualResult = await postThingPayloadRoute(app, thingPayload)

    expect(actualResult.status).to.equal(201)
    assertThingPayload(actualResult.body, thingPayload)
  })

  it('GET Thing Payloads', async function () {
    const thingPayload = createThingPayload(thingOneId)
    const { body: thingPayloadRequestBody } = await postThingPayloadRoute(app, thingPayload)

    const actualResult = await getThingPayloadsRoute(app, thingOneId)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.have.length(2)
    assertThingPayload(actualResult.body[1], thingPayloadRequestBody)
  })

  it('GET Thing Payloads', async function () {
    const thingId = '00000000-0000-0000-0000-000000000000'
    const actualResult = await getThingPayloadsRoute(app, thingId)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.deep.equal([])
  })
})
