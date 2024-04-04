import { expect } from 'chai'

import db from '../../../src/db'
import {
  assertThings,
  createThing,
  createThings,
  DEVICE_IDS,
  SORT_THINGS_BY_NAME_AND_DEVICE_ID,
  SORT_THINGS_BY_NAME_AND_THING_TYPE,
  THING_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import { cleanup, seed } from '../../../seeds/things'
import { Thing } from '../../../src/types'

describe.only('Things', () => {
  before(async () => {
    await seed()
  })

  describe('finders', () => {
    it('all', async () => {
      const expectedResult = createThings(SORT_THINGS_BY_NAME_AND_DEVICE_ID)

      const actualResult = await db.findThings()

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('things by thing type', async () => {
      const thingType = THING_TYPE_NAMES[2]
      const expectedResult = createThings(SORT_THINGS_BY_NAME_AND_THING_TYPE).filter(
        (item: Thing) => item.thingType === thingType
      )

      const actualResult = await db.findThingsByThingType(thingType)

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('thing by type', async () => {
      const thingType = THING_TYPE_NAMES[2]
      const expectedResult = createThings().filter((item: Thing) => item.thingType === thingType)

      const actualResult = await db.findThingByType(thingType)

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('thing by device id', async () => {
      const deviceId = DEVICE_IDS[3]
      const expectedResult = createThings().filter((item: Thing) => item.deviceId === deviceId)

      const actualResult = await db.findThingByDeviceId(deviceId)

      expect(actualResult).to.deep.equal(expectedResult)
    })
  })

  describe('add', () => {
    before(async () => {
      await cleanup()
    })

    it('single', async () => {
      await db.addThingType({ name: THING_TYPE_NAMES[0], description: THING_TYPE_NAMES[0] })
      const expectedResult = [createThing(THING_NAMES[0], THING_NAMES[0], THING_TYPE_NAMES[0])]

      const actualResult = await db.addThing(expectedResult[0])

      assertThings(actualResult, expectedResult)
    })
  })
})
