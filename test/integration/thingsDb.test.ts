import { expect } from 'chai'
import { subDays } from 'date-fns'

import db from '../../src/db'
import {
  assertThingPayloads,
  createThingGroups,
  createThingPayloads,
  createThings,
  createThingTypes,
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
  let thingPayloads: ThingPayload[]
  let startTimestamp: number
  let endTimestamp: number

  before(async () => {
    const today = new Date()
    const startDate = subDays(today, 2)
    const endDate = subDays(today, 1)

    startTimestamp = getUnixStartTimestamp(startDate)
    endTimestamp = getUnixEndTimestamp(endDate)

    thingPayloads = createThingPayloads(48, startDate, SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID)

    await seed()
    await thingPayloadSeed(thingPayloads)
  })

  describe('Things', () => {
    // it('things', async () => {
    //   const expectedResult = createThing('thingOne', 'thingOne', 'thingTypeOne')
    //
    //   const actualResult = await db.addThing({
    //     name: THING_NAMES[0],
    //     description: THING_NAMES[0],
    //     deviceId: 'zzz-000000',
    //     thingType: THING_TYPE_NAMES[0],
    //   })
    //
    //   assertThing(actualResult, expectedResult)
    // })

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

    it('find thing payloads', async () => {
      const expectedResult = thingPayloads // createThingPayloads(48, startDate, SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID)

      const actualResult = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)

      assertThingPayloads(actualResult, expectedResult)
    })
  })
})
