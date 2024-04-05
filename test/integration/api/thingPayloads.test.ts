import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'
import { fromUnixTime, getUnixTime, subDays } from 'date-fns'

import { getThingPayloadsWithQueryParamsRoute, postThingPayloadRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import { ThingPayload } from '../../../src/types/types'
import { seed, thingPayloadSeed } from '../../../seeds/things'
import {
  assertThingPayload,
  assertThingPayloads,
  createThingPayload,
  createThingPayloads,
  DEVICE_IDS,
  SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID,
  THING_GROUP_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import db from '../../../src/db'
import { getUnixEndTimestamp, getUnixStartTimestamp } from '../../helper/appHelper'

// TODO validation scenarios would need openapi request validation min/max length implemented
//  currently null or missing parameters can only be tested against
describe('Thing Payload routes', function () {
  let app: Express
  let startDate: Date
  let thingPayloads: ThingPayload[]
  let startTimestamp: number
  let startTimestampParam: string
  let endTimestamp: number
  let endTimestampParam: string

  before(async () => {
    await seed()

    app = await createHttpServer()

    startDate = subDays(new Date(), 1)
    thingPayloads = createThingPayloads(8, startDate, SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID)

    startTimestamp = getUnixStartTimestamp(startDate, 0)
    startTimestampParam = fromUnixTime(startTimestamp).toISOString()
    endTimestamp = getUnixEndTimestamp(startDate, 1)
    endTimestampParam = fromUnixTime(endTimestamp).toISOString()
  })

  describe('GET', async () => {
    before(async () => {
      await thingPayloadSeed(thingPayloads)
    })

    it('by default timestamps', async () => {
      const expectedResult: ThingPayload[] = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {})

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })

    it('by invalid timestamps', async () => {
      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        startTimestamp: '0',
        endTimestamp: '0',
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('by invalid timestamps - startTimestamp must be before endTimestamp', async () => {
      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        startTimestamp: endTimestampParam,
        endTimestamp: startTimestampParam,
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('by timestamps', async () => {
      const expectedResult: ThingPayload[] = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        startTimestamp: startTimestampParam,
        endTimestamp: endTimestampParam,
      })

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })

    it('by default dates and deviceId', async () => {
      const deviceId = DEVICE_IDS[2]

      const expectedResult: ThingPayload[] = await db.findThingPayloadsByDeviceIdAndTimestamps(
        deviceId,
        startTimestamp,
        endTimestamp
      )

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        deviceId,
      })

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })

    it('by timestamps and deviceId', async () => {
      const deviceId = DEVICE_IDS[2]

      const expectedResult: ThingPayload[] = await db.findThingPayloadsByDeviceIdAndTimestamps(
        deviceId,
        startTimestamp,
        endTimestamp
      )

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        startTimestamp: startTimestampParam,
        endTimestamp: endTimestampParam,
        deviceId,
      })

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })

    it('by default dates and thing group name', async () => {
      const thingGroup = THING_GROUP_NAMES[2]

      const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingGroupAndTimestamps(
        thingGroup,
        startTimestamp,
        endTimestamp
      )

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        thingGroup,
      })

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })

    it('by timestamps and thing group name', async () => {
      const thingGroup = THING_GROUP_NAMES[2]

      const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingGroupAndTimestamps(
        thingGroup,
        startTimestamp,
        endTimestamp
      )

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        startTimestamp: startTimestampParam,
        endTimestamp: endTimestampParam,
        thingGroup,
      })

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })

    it('by default dates and thing type name', async () => {
      const thingType = THING_TYPE_NAMES[2]

      const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingTypeAndTimestamps(
        thingType,
        startTimestamp,
        endTimestamp
      )

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        thingType,
      })

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })

    it('by timestamps and thing type name', async () => {
      const thingType = THING_TYPE_NAMES[2]

      const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingTypeAndTimestamps(
        thingType,
        startTimestamp,
        endTimestamp
      )

      const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
        startTimestamp: startTimestampParam,
        endTimestamp: endTimestampParam,
        thingType,
      })

      expect(actualResult.status).to.equal(200)
      assertThingPayloads(actualResult.body, expectedResult)
    })
  })

  describe('POST', async () => {
    it('invalid payload', async () => {
      const expectedResult: ThingPayload = createThingPayload({})

      const actualResult = await postThingPayloadRoute(app, expectedResult)

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('invalid deviceId', async () => {
      const expectedResult: ThingPayload = createThingPayload({
        deviceId: null,
      })

      const actualResult = await postThingPayloadRoute(app, expectedResult)

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('add', async () => {
      const expectedResult = createThingPayload({
        deviceId: DEVICE_IDS[0],
        payloadTimestamp: getUnixTime(startDate),
      })

      const actualResult = await postThingPayloadRoute(app, expectedResult)

      expect(actualResult.status).to.equal(201)
      assertThingPayload(actualResult.body, expectedResult)
    })
  })
})
