import { expect } from 'chai'
import sinon from 'sinon'

import {
  assertThing,
  assertThings,
  createThings,
  DEVICE_IDS,
  THING_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import thingService from '../../../src/api-v1/services/thingService'
import ServiceUtil from '../../../src/util/ServiceUtil'
import { seed } from '../../../seeds/things'

describe('Service - Thing', () => {
  before(async () => {
    await seed()
  })

  beforeEach(() => {
    sinon.restore()
  })

  describe('GET', () => {
    it('all', async () => {
      const expectedResult = createThings()

      const actualResult = await thingService.getThings()

      expect(actualResult.statusCode).to.equal(200)
      assertThings(actualResult.result, expectedResult)
    })

    it('by name - thing does not exist', async () => {
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
      sinon.stub(ServiceUtil, 'getFirstThingArrayElement').returns(null)

      const actualResult = await thingService.getThingByName(THING_NAMES[0])

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })

  describe('POST', () => {
    it('thing type does not exist', async () => {
      const actualResult = await thingService.postThing({
        name: THING_NAMES[0],
        description: THING_NAMES[0],
        deviceId: DEVICE_IDS[0],
        thingType: 'zero-thing-type',
      })

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('device id exists', async () => {
      const actualResult = await thingService.postThing({
        name: 'zero-thing',
        description: THING_NAMES[0],
        deviceId: DEVICE_IDS[0],
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.statusCode).to.equal(409)
      expect(actualResult.result).to.deep.equal({})
    })

    it('name exists', async () => {
      const actualResult = await thingService.postThing({
        name: THING_NAMES[0],
        description: THING_NAMES[0],
        deviceId: 'ggg-000000',
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.statusCode).to.equal(409)
      expect(actualResult.result).to.deep.equal({})
    })

    it('failed to return created thing', async () => {
      sinon.stub(ServiceUtil, 'getFirstThingArrayElement').returns(null)

      const actualResult = await thingService.postThing({
        name: 'zero-thing',
        description: 'zero-thing',
        deviceId: 'zzz-xxxxxx',
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })
})
