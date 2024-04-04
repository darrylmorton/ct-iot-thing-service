import { expect } from 'chai'

import db from '../../../src/db'
import { createThingGroups, SORT_THING_GROUPS_BY_NAME, THING_GROUP_NAMES } from '../../helper/thingHelper'
import { seed } from '../../../seeds/things'

describe.only('Thing Groups', () => {
  before(async () => {
    await seed()
  })

  describe('finders', () => {
    it('all', async () => {
      const expectedResult = createThingGroups(SORT_THING_GROUPS_BY_NAME)

      const actualResult = await db.findThingGroups()

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('groups by name', async () => {
      const expectedResult = createThingGroups(SORT_THING_GROUPS_BY_NAME)

      const actualResult = await db.findThingGroups()

      expect(actualResult).to.deep.equal(expectedResult)
    })

    it('group by name', async () => {
      const groupName = THING_GROUP_NAMES[2]
      const expectedResult = createThingGroups().filter((item) => item.name === groupName)

      const actualResult = await db.findThingGroupByName(groupName)

      expect(actualResult).to.deep.equal(expectedResult)
    })
  })
})
