import { expect } from 'chai'
import sinon from 'sinon'

import db from '../../../src/db'
import {
  assertThingGroup,
  assertThingGroups,
  createThingGroup,
  createThingGroups,
  SORT_THING_GROUPS_BY_NAME,
  THING_GROUP_NAMES,
} from '../../helper/thingHelper'
import thingService from '../../../src/api-v1/services/thingService'
import { seed } from '../../../seeds/things'
import ServiceUtil from '../../../src/util/ServiceUtil'
import { ThingGroup } from '../../../src/types/types'

describe('Service - Thing Group', () => {
  before(async () => {
    await seed()
  })

  beforeEach(() => {
    sinon.restore()
  })

  describe('GET', () => {
    it('all', async () => {
      const expectedResult = createThingGroups(SORT_THING_GROUPS_BY_NAME)

      const actualResult = await thingService.getThingGroups()

      expect(actualResult.statusCode).to.equal(200)
      assertThingGroups(actualResult.result, expectedResult)
    })

    it('thing group by name - thing group does not exist', async () => {
      sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([]))

      const actualResult = await thingService.getThingGroupByName('zero-thing-group')

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('thing group by name - first thing group was not returned', async () => {
      sinon.stub(ServiceUtil, 'getFirstThingGroupArrayElement').returns(null)

      const actualResult = await thingService.getThingGroupByName(THING_GROUP_NAMES[0])

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })

  describe('POST', () => {
    it('exists', async () => {
      const actualResult = await thingService.postThingGroup({
        name: THING_GROUP_NAMES[0],
        description: THING_GROUP_NAMES[0],
      })

      expect(actualResult.statusCode).to.equal(409)
    })

    it('create', async () => {
      const expectedResult: ThingGroup = createThingGroup('zero-thing-group')

      const actualResult = await thingService.postThingGroup(expectedResult)

      expect(actualResult.statusCode).to.equal(201)
      assertThingGroup(actualResult.result, expectedResult)
    })

    it('failed to return created thing group', async () => {
      sinon.stub(ServiceUtil, 'getFirstThingGroupArrayElement').returns(null)

      const actualResult = await thingService.postThingGroup({
        name: 'thing-group',
        description: 'thing-group',
      })

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })
})
