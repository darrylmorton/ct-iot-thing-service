import { expect } from 'chai'
import { subDays } from 'date-fns'

import db from '../../src/db'
import {
  assertThingPayloads,
  createThingGroups,
  createThingPayloads,
  createThings,
  createThingTypes,
  DEVICE_IDS,
  SORT_THING_GROUPS_BY_NAME,
  SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID,
  SORT_THING_TYPES_BY_NAME,
  SORT_THINGS_BY_NAME_AND_DEVICE_ID,
  SORT_THINGS_BY_NAME_AND_THING_TYPE,
  THING_TYPE_NAMES,
} from '../helper/thingHelper'
import { seed, thingPayloadSeed } from '../../seeds/things'
import { Thing, ThingPayload } from '../../src/types'
import { getUnixEndTimestamp, getUnixStartTimestamp } from '../../src/util/AppUtil'

describe.only('Database', () => {
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

  describe('Things', () => {
    it('find things', async () => {
      const expectedResult = createThings(SORT_THINGS_BY_NAME_AND_DEVICE_ID)

      const actualResult = await db.findThings()

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('find things by thing type', async () => {
      const thingType = THING_TYPE_NAMES[2]
      const expectedResult = createThings(SORT_THINGS_BY_NAME_AND_THING_TYPE).filter(
        (item: Thing) => item.thingType === thingType
      )

      const actualResult = await db.findThingsByThingType(thingType)

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('find thing types', async () => {
      const expectedResult = createThingTypes(SORT_THING_TYPES_BY_NAME)

      const actualResult = await db.findThingTypes()

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('find thing groups', async () => {
      const expectedResult = createThingGroups(SORT_THING_GROUPS_BY_NAME)

      const actualResult = await db.findThingGroups()

      expect(actualResult).to.deep.equal(expectedResult)
    })

    describe('Thing Payloads', () => {
      describe('sorted by device id and timestamps', () => {
        it('find thing payloads by timestamps', async () => {
          const expectedResult = thingPayloads

          const actualResult = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)

          assertThingPayloads(actualResult, expectedResult)
        })

        it('find thing payloads by device id and timestamps', async () => {
          const deviceId = 'ddd-444444'
          const expectedResult = thingPayloads.filter((item) => item.deviceId === deviceId)

          const actualResult = await db.findThingPayloadsByDeviceIdAndTimestamps(deviceId, startTimestamp, endTimestamp)

          assertThingPayloads(actualResult, expectedResult)
        })
      })

      it('find thing payloads by thing group and timestamps', async () => {
        const thingGroupName = 'test-two-env'
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
    })
  })
})
