import { expect } from 'chai'
import { Express } from 'express'

import {
  assertThingGroupDevice,
  assertThings,
  createThingGroupDevice,
  DEVICE_IDS,
  THING_GROUP_NAMES,
} from '../../helper/thingHelper'
import { seed } from '../../../seeds/things'
import { getThingGroupDevicesByNameRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import thingService from '../../../src/api-v1/services/thingService'
import { ThingGroupDevice } from '../../../src/types/types'

describe.skip('Thing Group Devices', () => {
  let app: Express

  before(async () => {
    await seed()

    app = await createHttpServer()
  })

  describe('GET', () => {
    it('all by name', async () => {
      const expectedResult = await getThingGroupDevicesByNameRoute(app, THING_GROUP_NAMES[0])

      const actualResult = await thingService.getThingGroupDevicesByName(THING_GROUP_NAMES[0])

      expect(actualResult.statusCode).to.equal(200)
      assertThings(actualResult.result, expectedResult.body)
    })

    it('all by name - missing', async () => {
      const actualResult = await thingService.getThingGroupDevicesByName('zzz-000000')

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal([])
    })
  })

  describe('POST', () => {
    it('thing group does not exist', async () => {
      const thingGroupDevice: ThingGroupDevice = createThingGroupDevice('zero-thing-group', DEVICE_IDS[0])

      const actualResult = await thingService.postThingGroupDevice(thingGroupDevice)

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('device id does not exist', async () => {
      const thingGroupDevice: ThingGroupDevice = createThingGroupDevice(THING_GROUP_NAMES[0], 'zero-device-id')

      const actualResult = await thingService.postThingGroupDevice(thingGroupDevice)

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('create', async () => {
      const expectedResult: ThingGroupDevice = createThingGroupDevice(THING_GROUP_NAMES[1], DEVICE_IDS[3])

      const actualResult = await thingService.postThingGroupDevice(expectedResult)

      expect(actualResult.statusCode).to.equal(201)
      assertThingGroupDevice(actualResult.result, expectedResult)
    })

    it('exists', async () => {
      const thingGroupDevice: ThingGroupDevice = createThingGroupDevice(THING_GROUP_NAMES[1], DEVICE_IDS[3])

      const actualResult = await thingService.postThingGroupDevice(thingGroupDevice)

      expect(actualResult.statusCode).to.equal(409)
      expect(actualResult.result).to.deep.equal({})
    })
  })
})
