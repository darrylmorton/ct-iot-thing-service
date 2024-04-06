import { expect } from 'chai'
import { Express } from 'express'

import {
  assertThing,
  assertThings,
  createThing,
  DEVICE_IDS,
  THING_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import { seed } from '../../../seeds/things'
import { getThingByNameRoute, getThingsRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import thingService from '../../../src/api-v1/services/thingService'
import { Thing } from '../../../src/types/types'

describe.skip('Things', () => {
  let app: Express

  before(async () => {
    await seed()

    app = await createHttpServer()
  })

  describe('GET', () => {
    it('all', async () => {
      const expectedResult = await getThingsRoute(app)

      const actualResult = await thingService.getThings()

      expect(actualResult.statusCode).to.equal(200)
      assertThings(actualResult.result, expectedResult.body)
    })

    it('by name', async () => {
      const expectedResult = await getThingByNameRoute(app, THING_NAMES[0])

      const actualResult = await thingService.getThingByName(THING_NAMES[0])

      expect(actualResult.statusCode).to.equal(200)
      assertThing(actualResult.result, expectedResult.body)
    })

    it('by name - missing', async () => {
      const actualResult = await thingService.getThingByName('thingSubZero')

      expect(actualResult.statusCode).to.equal(404)
      assertThing(actualResult.result, {})
    })
  })

  describe('POST', () => {
    it('type does not exist', async () => {
      const expectedResult: Thing = createThing('thingZero', 'zzz-000000', '')

      const actualResult = await thingService.postThing(expectedResult)

      expect(actualResult.statusCode).to.equal(404)
      assertThing(actualResult.result, {})
    })

    it('name exists', async () => {
      const expectedResult: Thing = createThing(THING_NAMES[0], 'zzz-000000', THING_TYPE_NAMES[0])

      const actualResult = await thingService.postThing(expectedResult)

      expect(actualResult.statusCode).to.equal(409)
      assertThing(actualResult.result, {})
    })

    it('device id exists', async () => {
      const expectedResult: Thing = createThing('thingZero', DEVICE_IDS[0], THING_TYPE_NAMES[0])

      const actualResult = await thingService.postThing(expectedResult)

      expect(actualResult.statusCode).to.equal(409)
      assertThing(actualResult.result, {})
    })

    it('create', async () => {
      const expectedResult: Thing = createThing('thingZero', 'aaa-zzzzzz', THING_TYPE_NAMES[0])

      const actualResult = await thingService.postThing(expectedResult)

      expect(actualResult.statusCode).to.equal(201)
      assertThing(actualResult.result, expectedResult)
    })
  })
})
