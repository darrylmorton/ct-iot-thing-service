import { expect } from 'chai'
import sinon from 'sinon'

import db from '../../src/db'
import { assertThing, createThings, THING_NAMES, THING_TYPE_NAMES } from '../helper/thingHelper'
import thingService from '../../src/api-v1/services/thingService'
import AppUtil from '../../src/util/AppUtil'

describe('Thing', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('GET', () => {
    it('all by name - thing does not exist', async () => {
      const actualResult = await thingService.getThingByName('zero-thing')

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('by name', async () => {
      const expectedResult = createThings().find((item) => item.name === THING_NAMES[0])

      const actualResult = await thingService.getThingByName(THING_NAMES[0])

      expect(actualResult.statusCode).to.equal(200)
      assertThing(actualResult.result, expectedResult)
    })

    it('by name - failed to return thing', async () => {
      sinon.stub(AppUtil, 'getFirstThingArrayElement').returns(null)

      const actualResult = await thingService.getThingByName(THING_NAMES[0])

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })

  describe.skip('POST', () => {
    it('failed to return created thing', async () => {
      sinon.stub(db, 'findThingTypeByName').returns(
        Promise.resolve([
          {
            name: THING_NAMES[0],
            description: THING_NAMES[0],
          },
        ])
      )
      sinon.stub(db, 'findThingByDeviceId').returns(Promise.resolve([]))
      sinon.stub(db, 'findThingByName').returns(Promise.resolve([]))
      sinon.stub(db, 'addThing').returns(Promise.resolve([]))

      const actualResult = await thingService.postThing({
        name: 'zero-thing',
        description: 'zero-thing',
        deviceId: 'aaa-zzzzzz',
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })
})
