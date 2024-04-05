import { expect } from 'chai'
import { Express } from 'express'

import { assertThingGroup, assertThings, createThingGroup, THING_GROUP_NAMES } from '../../helper/thingHelper'
import { seed } from '../../../seeds/things'
import { getThingGroupsRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import thingService from '../../../src/api-v1/services/thingService'
import { ThingGroup } from '../../../src/types/types'

describe('Thing Groups', () => {
  let app: Express

  before(async () => {
    await seed()

    app = await createHttpServer()
  })

  describe('GET', () => {
    it('all', async () => {
      const expectedResult = await getThingGroupsRoute(app)

      const actualResult = await thingService.getThingGroups()

      expect(actualResult.statusCode).to.equal(200)
      assertThings(actualResult.result, expectedResult.body)
    })

    it('by name - group does not exist', async () => {
      const actualResult = await thingService.getThingGroupByName('zzz-000000')

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('by name', async () => {
      const expectedResult = createThingGroup(THING_GROUP_NAMES[0])

      const actualResult = await thingService.getThingGroupByName(THING_GROUP_NAMES[0])

      expect(actualResult.statusCode).to.equal(200)
      assertThingGroup(actualResult.result, expectedResult)
    })
  })

  describe('POST', () => {
    it('create', async () => {
      const expectedResult: ThingGroup = createThingGroup('zero-group')

      const actualResult = await thingService.postThingGroup(expectedResult)

      expect(actualResult.statusCode).to.equal(201)
      assertThingGroup(actualResult.result, expectedResult)
    })

    it('exists', async () => {
      const expectedResult: ThingGroup = createThingGroup('zero-group')

      const actualResult = await thingService.postThingGroup(expectedResult)

      expect(actualResult.statusCode).to.equal(409)
      expect(actualResult.result).to.deep.equal({})
    })
  })
})
