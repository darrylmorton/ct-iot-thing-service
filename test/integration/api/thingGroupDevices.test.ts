import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import {
  getThingGroupByNameRoute,
  getThingGroupDeviceByNameAndDeviceIdRoute,
  getThingGroupDevicesByNameRoute,
  postThingGroupDeviceRoute,
} from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import { seed } from '../../../seeds/things'
import { assertThingGroupDevices, DEVICE_IDS, THING_GROUP_NAMES } from '../../helper/thingHelper'
import db from '../../../src/db'

describe('Thing Group Device Routes', () => {
  let app: Express

  before(async () => {
    await seed()

    app = await createHttpServer()
  })

  describe('GET', () => {
    it('all by name - thing group does not exist', async () => {
      const actualResult = await getThingGroupDevicesByNameRoute(app, 'thingGroup')

      expect(actualResult.status).to.equal(404)
    })

    it('all by name', async () => {
      const expectedResult = [
        { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[3] },
        { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[4] },
        { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[5] },
      ]

      const actualResult = await getThingGroupDevicesByNameRoute(app, THING_GROUP_NAMES[2])

      expect(actualResult.status).to.equal(200)
      assertThingGroupDevices(actualResult.body, expectedResult)
    })

    it('all by name and device id - thing group does not exist', async () => {
      const actualResult = await getThingGroupDeviceByNameAndDeviceIdRoute(app, {
        thingGroup: 'thingGroup',
        deviceId: DEVICE_IDS[0],
      })

      expect(actualResult.status).to.equal(404)
    })

    it('all by name and device id - device id does not exist', async () => {
      const actualResult = await getThingGroupDeviceByNameAndDeviceIdRoute(app, {
        thingGroup: THING_GROUP_NAMES[0],
        deviceId: 'deviceId',
      })

      expect(actualResult.status).to.equal(404)
    })

    it('all by name - name does not exist', async () => {
      const actualResult = await getThingGroupByNameRoute(app, 'thingGroup')

      expect(actualResult.status).to.equal(404)
      expect(actualResult.body).to.deep.equal({})
    })

    it('all by name', async () => {
      const expectedResult = await db.findThingGroupByName(THING_GROUP_NAMES[0])

      const actualResult = await getThingGroupByNameRoute(app, THING_GROUP_NAMES[0])

      expect(actualResult.status).to.equal(200)
      expect(actualResult.body).to.deep.equal(expectedResult[0])
    })

    describe('POST', () => {
      it('exists', async () => {
        const actualResult = await postThingGroupDeviceRoute(app, {
          thingGroup: THING_GROUP_NAMES[0],
          deviceId: DEVICE_IDS[0],
        })

        expect(actualResult.status).to.equal(409)
      })

      it('thing group does not exist', async () => {
        const actualResult = await postThingGroupDeviceRoute(app, {
          thingGroup: 'zero-group-device',
          deviceId: DEVICE_IDS[0],
        })

        expect(actualResult.status).to.equal(404)
      })

      it('device id does not exist', async () => {
        const actualResult = await postThingGroupDeviceRoute(app, {
          thingGroup: THING_GROUP_NAMES[0],
          deviceId: 'zero-device',
        })

        expect(actualResult.status).to.equal(404)
      })

      it('create', async () => {
        const expectedResult = { thingGroup: THING_GROUP_NAMES[3], deviceId: DEVICE_IDS[0] }

        const actualResult = await postThingGroupDeviceRoute(app, {
          thingGroup: THING_GROUP_NAMES[3],
          deviceId: DEVICE_IDS[0],
        })

        expect(actualResult.status).to.equal(201)
        expect(actualResult.body.thingGroup).to.deep.equal(expectedResult.thingGroup)
        expect(actualResult.body.deviceId).to.deep.equal(expectedResult.deviceId)
      })
    })
  })
})
