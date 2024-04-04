import { expect } from 'chai'

import db from '../../../src/db'
import {
  assertThingTypes,
  createThingType,
  createThingTypes,
  SORT_THING_TYPES_BY_NAME,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import { cleanup, seed } from '../../../seeds/things'

describe.only('Thing Types', () => {
  before(async () => {
    await seed()
  })

  describe('finders', () => {
    it('all', async () => {
      const expectedResult = createThingTypes(SORT_THING_TYPES_BY_NAME)

      const actualResult = await db.findThingTypes()

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('types by name', async () => {
      const thingTypeName = THING_TYPE_NAMES[1]
      const expectedResult = createThingTypes(SORT_THING_TYPES_BY_NAME).filter((item) => item.name === thingTypeName)

      const actualResult = await db.findThingTypeByName(thingTypeName)

      expect(actualResult).to.deep.equal(expectedResult)
    })
  })

  describe('add', () => {
    before(async () => {
      await cleanup()
    })

    it('single', async () => {
      const expectedResult = [createThingType(THING_TYPE_NAMES[0])]

      const actualResult = await db.addThingType(expectedResult[0])

      assertThingTypes(actualResult, expectedResult)
    })
  })
})
