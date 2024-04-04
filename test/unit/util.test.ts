import db from '../../src/db'
import { assertThing, createThing } from '../helper/thingHelper'

describe('Database', () => {
  before(async () => {
    await db.client('things').del()
  })

  describe.only('Things', () => {
    it('things', async () => {
      const expectedResult = createThing('thingOne', 'thingOne', 'thingTypeOne')

      const actualResult = await db.addThing(expectedResult)

      assertThing(actualResult, expectedResult)
    })
  })
})
