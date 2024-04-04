import { getUnixTime, subDays } from 'date-fns'

import db from '../../../src/db'
import {
  assertThingPayloads,
  createThingPayload,
  createThingPayloads,
  DEVICE_IDS,
  SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID,
  THING_GROUP_NAMES,
  THING_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import { cleanup, seed, thingPayloadSeed } from '../../../seeds/things'
import { ThingPayload } from '../../../src/types'
import { getUnixEndTimestamp, getUnixStartTimestamp } from '../../../src/util/AppUtil'

describe.only('Thing Payloads', () => {
  let startDate: Date
  let startTimestamp: number
  let endTimestamp: number
  let thingPayloads: ThingPayload[]

  before(async () => {
    const today = new Date()
    startDate = subDays(today, 2)
    const endDate = subDays(today, 1)

    startTimestamp = getUnixStartTimestamp(startDate)
    endTimestamp = getUnixEndTimestamp(endDate)

    thingPayloads = createThingPayloads(48, startDate, SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID)

    await seed()
    await thingPayloadSeed(thingPayloads)
  })

  describe('finders', () => {
    it('payloads by timestamps', async () => {
      const expectedResult = thingPayloads

      const actualResult = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)

      assertThingPayloads(actualResult, expectedResult)
    })

    it('payloads by device id and timestamps', async () => {
      const deviceId = DEVICE_IDS[3]
      const expectedResult = thingPayloads.filter((item) => item.deviceId === deviceId)

      const actualResult = await db.findThingPayloadsByDeviceIdAndTimestamps(deviceId, startTimestamp, endTimestamp)

      assertThingPayloads(actualResult, expectedResult)
    })

    it('payloads by thing group and timestamps', async () => {
      const thingGroupName = THING_GROUP_NAMES[1]
      // seeded data for thing group devices has the following device ids within this group
      const expectedResult = thingPayloads.filter(
        (item) => item.deviceId === DEVICE_IDS[1] || item.deviceId === DEVICE_IDS[2]
      )

      const actualResult = await db.findThingPayloadsByThingGroupAndTimestamps(
        thingGroupName,
        startTimestamp,
        endTimestamp
      )

      assertThingPayloads(actualResult, expectedResult)
    })

    it('payloads by thing type and timestamps', async () => {
      const thingTypeName = THING_TYPE_NAMES[1]
      // seeded data for thing types has the following device ids for this type
      const expectedResult = thingPayloads.filter(
        (item) => item.deviceId === DEVICE_IDS[2] || item.deviceId === DEVICE_IDS[3]
      )

      const actualResult = await db.findThingPayloadsByThingTypeAndTimestamps(
        thingTypeName,
        startTimestamp,
        endTimestamp
      )

      assertThingPayloads(actualResult, expectedResult)
    })
  })

  describe('add', () => {
    before(async () => {
      await cleanup()
    })

    it('single', async () => {
      await db.addThingType({ name: THING_TYPE_NAMES[0], description: THING_TYPE_NAMES[0] })
      await db.addThing({
        name: THING_NAMES[0],
        description: THING_NAMES[0],
        deviceId: DEVICE_IDS[0],
        thingType: THING_TYPE_NAMES[0],
      })
      const expectedResult = createThingPayload({
        deviceId: DEVICE_IDS[0],
        payloadTimestamp: getUnixTime(startDate),
      })

      const actualResult = await db.addThingPayload(expectedResult)

      assertThingPayloads(actualResult, [expectedResult])
    })
  })
})
