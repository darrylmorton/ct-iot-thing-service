import { expect } from 'chai'
import sinon from 'sinon'

import {
  assertThingPayload,
  assertThingPayloads,
  createThingPayload,
  createThingPayloads,
  DEVICE_IDS,
  SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID,
} from '../../helper/thingHelper'
import thingService from '../../../src/api-v1/services/thingService'
import ServiceUtil from '../../../src/util/ServiceUtil'
import { seed, thingPayloadSeed } from '../../../seeds/things'
import { fromUnixTime, subDays } from 'date-fns'
import { getUnixEndTimestamp, getUnixStartTimestamp } from '../../helper/appHelper'
import { ThingPayload } from '../../../src/types/types'

describe('Service - Thing Payload', () => {
  let startDate: Date
  let thingPayloads: ThingPayload[]
  let startTimestamp: number
  let startTimestampParam: string
  let endTimestamp: number
  let endTimestampParam: string

  before(async () => {
    startDate = subDays(new Date(), 1)
    thingPayloads = createThingPayloads(8, startDate, SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID)

    startTimestamp = getUnixStartTimestamp(startDate, 0)
    startTimestampParam = fromUnixTime(startTimestamp).toISOString()
    endTimestamp = getUnixEndTimestamp(startDate, 1)
    endTimestampParam = fromUnixTime(endTimestamp).toISOString()

    await seed()
    await thingPayloadSeed(thingPayloads)
  })

  beforeEach(() => {
    sinon.restore()
  })

  describe('GET', () => {
    it('by timestamps', async () => {
      const expectedResult = thingPayloads

      const actualResult = await thingService.getThingPayloadsByQueryParams({
        startTimestamp: startTimestampParam,
        endTimestamp: endTimestampParam,
      })

      expect(actualResult.statusCode).to.equal(200)
      assertThingPayloads(actualResult.result, expectedResult)
    })

    it('by timestamps and device id', async () => {
      const expectedResult = thingPayloads.filter((item) => item.deviceId === DEVICE_IDS[0])

      const actualResult = await thingService.getThingPayloadsByQueryParams({
        startTimestamp: startTimestampParam,
        endTimestamp: endTimestampParam,
        deviceId: DEVICE_IDS[0],
      })

      expect(actualResult.statusCode).to.equal(200)
      assertThingPayloads(actualResult.result, expectedResult)
    })

    it.skip('by timestamps and thing type', async () => {})

    it.skip('by timestamps and thing group', async () => {})
  })

  describe('POST', () => {
    it('device id does not exist', async () => {
      const thingPayload: ThingPayload = createThingPayload({
        deviceId: 'zzz-xxxyyy',
        payloadTimestamp: startTimestamp,
      })

      const actualResult = await thingService.postThingPayload(thingPayload)

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal([])
    })

    it('failed to return created thing payload', async () => {
      const thingPayload: ThingPayload = createThingPayload({
        deviceId: DEVICE_IDS[0],
        payloadTimestamp: startTimestamp,
      })

      sinon.stub(ServiceUtil, 'getFirstThingPayloadArrayElement').returns(null)

      const actualResult = await thingService.postThingPayload(thingPayload)

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })

    it('create', async () => {
      const expectedResult: ThingPayload = createThingPayload({
        deviceId: DEVICE_IDS[0],
        payloadTimestamp: startTimestamp,
      })

      const actualResult = await thingService.postThingPayload(expectedResult)

      expect(actualResult.statusCode).to.equal(201)
      assertThingPayload(actualResult.result, expectedResult)
    })
  })
})
