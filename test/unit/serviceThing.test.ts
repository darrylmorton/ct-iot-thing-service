import { expect } from 'chai'
import sinon from 'sinon'

import db from '../../src/db'
import { THING_NAMES, THING_TYPE_NAMES } from '../helper/thingHelper'
import thingService from '../../src/api-v1/services/thingService'

describe('Thing', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe.skip('GET', () => {
    it('thing group device by name and device id - failed to return thing group device', async () => {
      //   sinon.stub(db, 'findThingGroupByName').returns(
      //     Promise.resolve([
      //       {
      //         name: THING_NAMES[0],
      //         description: THING_NAMES[0],
      //       },
      //     ])
      //   )
      //   sinon.stub(db, 'findThingByDeviceId').returns(
      //     Promise.resolve([
      //       {
      //         name: THING_NAMES[0],
      //         thingType: THING_TYPE_NAMES[0],
      //         description: THING_TYPE_NAMES[0],
      //         deviceId: DEVICE_IDS[0],
      //       },
      //     ])
      //   )
      //   sinon.stub(db, 'findThingGroupDeviceByNameAndDeviceId').returns(Promise.resolve([]))
      //
      //   const actualResult = await thingService.getThingGroupDeviceByNameAndDeviceId(THING_TYPE_NAMES[0], DEVICE_IDS[0])
      //
      //   expect(actualResult.statusCode).to.equal(500)
      //   expect(actualResult.result).to.deep.equal({})
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
