import { expect } from 'chai'
import sinon from 'sinon'
import { Express } from 'express'

import db from '../../src/db'
import {
  assertThingGroupDevice,
  assertThingGroupDevices,
  createThingGroupDevice,
  DEVICE_IDS,
  THING_GROUP_NAMES,
} from '../helper/thingHelper'
import thingService from '../../src/api-v1/services/thingService'
import { getThingGroupDevicesByNameRoute } from '../helper/thingRouteHelper'
import { seed } from '../../seeds/things'
import { createHttpServer } from '../../src/server'
import AppUtil from '../../src/util/AppUtil'
import { ThingGroupDevice } from '../../src/types/types'

describe('Thing Group Device', () => {
  let app: Express

  before(async () => {
    await seed()

    app = await createHttpServer()
  })

  beforeEach(() => {
    sinon.restore()
  })

  describe('GET', () => {
    it('all by name - thing group device does not exist', async () => {
      sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([]))

      const actualResult = await thingService.getThingGroupDevicesByName('zzz-000000')

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal([])
    })

    it('thing group device by name and device id - thing group does not exist', async () => {
      sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([]))

      const actualResult = await thingService.getThingGroupDeviceByNameAndDeviceId(THING_GROUP_NAMES[0], DEVICE_IDS[0])

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('thing group device by name and device id - device id does not exist', async () => {
      sinon.stub(db, 'findThingByDeviceId').returns(Promise.resolve([]))

      const actualResult = await thingService.getThingGroupDeviceByNameAndDeviceId(THING_GROUP_NAMES[0], DEVICE_IDS[0])

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('thing group device by name and device id - thing group device does not exist', async () => {
      sinon.stub(db, 'findThingGroupDeviceByNameAndDeviceId').returns(Promise.resolve([]))

      const actualResult = await thingService.getThingGroupDeviceByNameAndDeviceId(THING_GROUP_NAMES[0], DEVICE_IDS[0])

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('all by name', async () => {
      const expectedResult = await getThingGroupDevicesByNameRoute(app, THING_GROUP_NAMES[0])

      const actualResult = await thingService.getThingGroupDevicesByName(THING_GROUP_NAMES[0])

      expect(actualResult.statusCode).to.equal(200)
      assertThingGroupDevices(actualResult.result, expectedResult.body)
    })

    it('thing group device by name and device id - first thing group device was not returned', async () => {
      sinon.stub(AppUtil, 'getFirstArrayElement').returns(null)

      const actualResult = await thingService.getThingGroupDeviceByNameAndDeviceId(THING_GROUP_NAMES[0], DEVICE_IDS[0])

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })

  describe('POST', () => {
    it('thing group does not exist', async () => {
      const actualResult = await thingService.postThingGroupDevice({
        thingGroup: 'zero-thing-group',
        deviceId: DEVICE_IDS[0],
      })

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('device id does not exist', async () => {
      const actualResult = await thingService.postThingGroupDevice({
        thingGroup: THING_GROUP_NAMES[0],
        deviceId: 'zzz-yyyyyy',
      })

      expect(actualResult.statusCode).to.equal(404)
      expect(actualResult.result).to.deep.equal({})
    })

    it('exists', async () => {
      const actualResult = await thingService.postThingGroupDevice({
        thingGroup: THING_GROUP_NAMES[0],
        deviceId: DEVICE_IDS[0],
      })

      expect(actualResult.statusCode).to.equal(409)
      expect(actualResult.result).to.deep.equal({})
    })

    it('create', async () => {
      const expectedResult: ThingGroupDevice = createThingGroupDevice(THING_GROUP_NAMES[1], DEVICE_IDS[3])

      const actualResult = await thingService.postThingGroupDevice(expectedResult)

      expect(actualResult.statusCode).to.equal(201)
      assertThingGroupDevice(actualResult.result, expectedResult)
    })

    it('failed to return created thing group device', async () => {
      sinon.stub(AppUtil, 'getFirstArrayElement').returns(null)

      const actualResult = await thingService.postThingGroupDevice({
        thingGroup: THING_GROUP_NAMES[1],
        deviceId: DEVICE_IDS[5],
      })

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })
})
