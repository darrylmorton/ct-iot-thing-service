import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import {
  getThingGroupByNameRoute,
  getThingGroupDeviceByNameAndDeviceIdRoute,
  getThingGroupDevicesByNameRoute,
  getThingGroupsRoute,
  postThingGroupRoute,
} from '../helper/thingRouteHelper'
import { createHttpServer } from '../../src/server'
import { DEVICE_IDS, seed, THING_GROUP_NAMES } from '../../seeds/things'
import { assertThingGroupDevices, createThingGroup } from '../helper/thingHelper'
import db from '../../src/db'
import { postThingGroupDeviceRoute } from '../helper/thingRouteHelper'

describe('Thing Group routes', function () {
  let app: Express

  before(async function () {
    await seed()

    app = await createHttpServer()
  })

  it('POST Thing Group that is invalid', async function () {
    const actualResult = await postThingGroupRoute(app, {})

    expect(actualResult.status).to.equal(400)
    expect(actualResult.body).to.deep.equal({})
  })

  it('POST Thing Group exists', async function () {
    const actualResult = await postThingGroupRoute(app, {
      name: THING_GROUP_NAMES[0],
      description: THING_GROUP_NAMES[0],
    })

    expect(actualResult.status).to.equal(409)
  })

  it('POST Thing Group', async function () {
    const expectedResult = createThingGroup('thingGroupZero')

    const actualResult = await postThingGroupRoute(app, expectedResult)

    expect(actualResult.status).to.equal(201)
    expect(actualResult.body).to.deep.equal(expectedResult)
  })

  it('GET Thing Groups', async function () {
    const expectedResult = await db.findThingGroups()

    const actualResult = await getThingGroupsRoute(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.deep.equal(expectedResult)
  })

  it('GET Thing Group by name - missing', async function () {
    const actualResult = await getThingGroupByNameRoute(app, 'thing')

    expect(actualResult.status).to.equal(404)
  })

  describe('Thing Group Devices', function () {
    it('GET Thing Group Device by name missing thing group', async function () {
      const actualResult = await getThingGroupDevicesByNameRoute(app, 'thingGroup')

      expect(actualResult.status).to.equal(404)
    })

    it('GET Thing Group Device by name', async function () {
      const expectedResult = [
        { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[3] },
        { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[4] },
        { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[5] },
      ]

      const actualResult = await getThingGroupDevicesByNameRoute(app, THING_GROUP_NAMES[2])

      expect(actualResult.status).to.equal(200)
      assertThingGroupDevices(actualResult.body, expectedResult)
    })

    it('GET Thing Group Device missing thing group', async function () {
      const actualResult = await getThingGroupDeviceByNameAndDeviceIdRoute(app, {
        thingGroup: 'thingGroup',
        deviceId: DEVICE_IDS[0],
      })

      expect(actualResult.status).to.equal(404)
    })

    it('GET Thing Group Device missing device id', async function () {
      const actualResult = await getThingGroupDeviceByNameAndDeviceIdRoute(app, {
        thingGroup: THING_GROUP_NAMES[0],
        deviceId: 'deviceId',
      })

      expect(actualResult.status).to.equal(404)
    })

    it('GET Thing Group by name - missing', async function () {
      const actualResult = await getThingGroupByNameRoute(app, 'thingGroup')

      expect(actualResult.status).to.equal(404)
      expect(actualResult.body).to.deep.equal({})
    })

    it('GET Thing Group by name', async function () {
      const expectedResult = await db.findThingGroupByName(THING_GROUP_NAMES[0])

      const actualResult = await getThingGroupByNameRoute(app, THING_GROUP_NAMES[0])

      expect(actualResult.status).to.equal(200)
      expect(actualResult.body).to.deep.equal(expectedResult[0])
    })

    it('POST Thing Group Device exists', async function () {
      const actualResult = await postThingGroupDeviceRoute(app, {
        thingGroup: THING_GROUP_NAMES[0],
        deviceId: DEVICE_IDS[0],
      })

      expect(actualResult.status).to.equal(409)
    })

    it('POST Thing Group Device', async function () {
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
