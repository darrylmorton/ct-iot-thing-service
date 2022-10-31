import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'
import { startOfToday, endOfToday, getUnixTime, parseISO, addHours, subHours } from 'date-fns'

import {
  getThingPayloadsRoute,
  postThingPayloadRoute,
  postThingPayloadsRoute,
  postThingPayloadsWithQueryParamsRoute,
  postThingRoute,
  postThingTypeRoute,
} from '../helper/thingRouteHelper'
import { createHttpServer } from '../../src/server'
import { SimpleThing, Thing, ThingPayload, ThingType } from '../../src/types'
import { cleanup, seed } from '../../seeds/things'
import { assertThingPayload, createThing, createThingPayload, createThingType } from '../helper/thingHelper'
import db from '../../src/db'

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
    const { body: responseBody } = await postThingRoute(app, thing)
    thingOneId = responseBody.id
  })

  it('POST Thing Payload that is invalid', async function () {
    const thingPayload: ThingPayload = createThingPayload(thingZeroId)

    const actualResult = await postThingPayloadRoute(app, thingPayload)

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing Payload', async function () {
    const thingPayload: ThingPayload = createThingPayload(thingOneId)

    const actualResult = await postThingPayloadRoute(app, thingPayload)

    expect(actualResult.status).to.equal(201)
    assertThingPayload(actualResult.body, thingPayload)
  })

  it('GET Thing Payloads invalid', async function () {
    const actualResult = await getThingPayloadsRoute(app, thingZeroId)

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('GET Thing Payloads invalid', async function () {
    const thingId = '00000000-0000-0000-0000-000000000001'

    const actualResult = await getThingPayloadsRoute(app, thingId)

    expect(actualResult.status).to.equal(404)
    expect(actualResult.body).to.deep.equal([])
  })

  it('GET Thing Payloads', async function () {
    const thingPayload: ThingPayload = createThingPayload(thingOneId)
    const { body: responseBody } = await postThingPayloadRoute(app, thingPayload)

    const actualResult = await getThingPayloadsRoute(app, thingOneId)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.have.length(2)
    assertThingPayload(actualResult.body[1], responseBody)
  })

  describe.only('Thing Payload routes with query params', function () {
    let thingIdsResult: string[]

    before(async function () {
      await seed()

      const things = await db.findThings()

      thingIdsResult = things.reduce((acc: string[], item: Thing) => {
        acc.push(item.id)

        return acc
      }, [])
    })

    it.only('GET all Thing Payloads by default dates and thingIds', async function () {
      const actualResult = await postThingPayloadsRoute(app, { thingIds: [] })

      expect(actualResult.status).to.equal(200)
      // expect(actualResult.body).to.deep.equal({})
    })

    // TODO thingIds and filtered scenarios...
    // it('GET all Thing Payloads by default dates and thingIds', async function () {
    //   const actualResult = await postThingPayloadsRoute(app, { thingIds: [] })
    //
    //   expect(actualResult.status).to.equal(200)
    //   // expect(actualResult.body).to.deep.equal({})
    // })

    it('GET all Thing Payloads by invalid dates and thingIds', async function () {
      const startTimestamp = ''
      const endTimestamp = ''

      const actualResult = await postThingPayloadsWithQueryParamsRoute(app, startTimestamp, endTimestamp, {
        thingIds: [],
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('GET all Thing Payloads by dates and invalid thingIds', async function () {
      const startTimestamp = startOfToday().toISOString()
      const endTimestamp = endOfToday().toISOString()

      const actualResult = await postThingPayloadsWithQueryParamsRoute(app, startTimestamp, endTimestamp, {
        thingIds: [thingZeroId],
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('GET all Thing Payloads by dates and invalid thingIds', async function () {
      const startTimestamp = startOfToday().toISOString()
      const endTimestamp = endOfToday().toISOString()

      const actualResult = await postThingPayloadsWithQueryParamsRoute(app, startTimestamp, endTimestamp, {
        thingIds: ['00000000-0000-0000-0000-000000000001'],
      })

      expect(actualResult.status).to.equal(404)
      expect(actualResult.body).to.deep.equal([])
    })

    it('GET all Thing Payloads by date', async function () {
      const startTimestamp = startOfToday().toISOString()
      const endTimestamp = endOfToday().toISOString()
      const expectedResult: ThingPayload[] = await db.findThingPayloads(
        getUnixTime(parseISO(startTimestamp)),
        getUnixTime(parseISO(endTimestamp)),
        []
      )

      const actualResult = await postThingPayloadsWithQueryParamsRoute(app, startTimestamp, endTimestamp, {
        thingIds: [],
      })

      expect(actualResult.status).to.equal(200)
      expect(actualResult.body).to.have.length(expectedResult.length)
      expect(actualResult.body).to.deep.equal(expectedResult)
    })

    it('GET all Thing Payloads by date', async function () {
      const startTimestamp = addHours(startOfToday(), 6).toISOString()
      const endTimestamp = subHours(endOfToday(), 6).toISOString()

      const expectedResult: ThingPayload[] = await db.findThingPayloads(
        getUnixTime(parseISO(startTimestamp)),
        getUnixTime(parseISO(endTimestamp)),
        []
      )

      const actualResult = await postThingPayloadsWithQueryParamsRoute(app, startTimestamp, endTimestamp, {
        thingIds: [],
      })

      expect(actualResult.status).to.equal(200)
      expect(actualResult.body).to.have.length(expectedResult.length)
      expect(actualResult.body).to.deep.equal(expectedResult)
    })

    it('GET all Thing Payloads by date and filtered thingIds', async function () {
      const startTimestamp = startOfToday().toISOString()
      const endTimestamp = endOfToday().toISOString()
      const thingIds = thingIdsResult.filter((item, index) => index > 1 && index < 4)

      const expectedResult: ThingPayload[] = await db.findThingPayloads(
        getUnixTime(parseISO(startTimestamp)),
        getUnixTime(parseISO(endTimestamp)),
        thingIds
      )

      const actualResult = await postThingPayloadsWithQueryParamsRoute(app, startTimestamp, endTimestamp, { thingIds })

      expect(actualResult.status).to.equal(200)
      expect(actualResult.body).to.have.length(expectedResult.length)
      expect(actualResult.body).to.deep.equal(expectedResult)
    })

    it('GET all Thing Payloads by date and filtered thingIds', async function () {
      const startTimestamp = addHours(startOfToday(), 6).toISOString()
      const endTimestamp = subHours(endOfToday(), 6).toISOString()
      const thingIds = thingIdsResult.filter((item, index) => index > 1 && index < 4)

      const expectedResult: ThingPayload[] = await db.findThingPayloads(
        getUnixTime(parseISO(startTimestamp)),
        getUnixTime(parseISO(endTimestamp)),
        thingIds
      )

      const actualResult = await postThingPayloadsWithQueryParamsRoute(app, startTimestamp, endTimestamp, { thingIds })

      expect(actualResult.status).to.equal(200)
      expect(actualResult.body).to.have.length(expectedResult.length)
      expect(actualResult.body).to.deep.equal(expectedResult)
    })
  })
})
