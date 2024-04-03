import db from '../../src/db'
import { createThings } from '../helper/thingHelper'
import { seed } from '../../seeds/things'
import { expect } from 'chai'

describe.only('Database', () => {
  before(async () => {
    // await db.client('things').del()
    await seed()
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
      const expectedResult = createThings()

      const actualResult = await db.findThings()

      // assertThing(actualResult, [])
      expect(actualResult).to.deep.equal(expectedResult)
    })
  })
})
