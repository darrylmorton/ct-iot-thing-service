import { expect } from 'chai'
import sinon from 'sinon'

import {
  assertThingType,
  assertThingTypes,
  createThingType,
  createThingTypes,
  SORT_THING_TYPES_BY_NAME,
  THING_TYPE_NAMES,
} from '../helper/thingHelper'
import thingService from '../../src/api-v1/services/thingService'
import ServiceUtil from '../../src/util/ServiceUtil'
import { ThingType } from '../../src/types/types'
import { seed } from '../../seeds/things'

describe('Thing Type', () => {
  before(async () => {
    await seed()
  })

  beforeEach(() => {
    sinon.restore()
  })

  describe('GET', () => {
    it('all', async () => {
      const expectedResult = createThingTypes(SORT_THING_TYPES_BY_NAME)

      const actualResult = await thingService.getThingTypes()

      expect(actualResult.statusCode).to.equal(200)
      assertThingTypes(actualResult.result, expectedResult)
    })

    it('all by name - thing type does not exist', async () => {
      const actualResult = await thingService.getThingTypeByName('zero-thing-type')

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('by name', async () => {
      const expectedResult = createThingTypes().find((item) => item.name === THING_TYPE_NAMES[0])

      const actualResult = await thingService.getThingTypeByName(THING_TYPE_NAMES[0])

      expect(actualResult.statusCode).to.equal(200)
      assertThingType(actualResult.result, expectedResult)
    })

    it('by name - failed to return thing type', async () => {
      sinon.stub(ServiceUtil, 'getFirstThingTypeArrayElement').returns(null)

      const actualResult = await thingService.getThingTypeByName(THING_TYPE_NAMES[0])

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })

  describe('POST', () => {
    it('thing type exists', async () => {
      const actualResult = await thingService.postThingType({
        name: THING_TYPE_NAMES[0],
        description: THING_TYPE_NAMES[0],
      })

      expect(actualResult.statusCode).to.equal(409)
      expect(actualResult.result).to.deep.equal({})
    })

    it('failed to return created thing type', async () => {
      sinon.stub(ServiceUtil, 'getFirstThingTypeArrayElement').returns(null)

      const actualResult = await thingService.postThingType({
        name: 'thing-type',
        description: 'zero-thing-type',
      })

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })

    it('create', async () => {
      const expectedResult: ThingType = createThingType('zero-thing-type')

      const actualResult = await thingService.postThingType(expectedResult)

      expect(actualResult.statusCode).to.equal(201)
      assertThingType(actualResult.result, expectedResult)
    })
  })
})
