import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import { getThingByNameRoute, getThingsRoute, postThingRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import { seed } from '../../../seeds/things'
import {
  assertThing,
  assertThings,
  createThing,
  DEVICE_IDS,
  THING_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import db from '../../../src/db'
import { Thing } from '../../../src/types/types'

describe('Thing routes', () => {
  let app: Express

  before(async () => {
    await seed()

    app = await createHttpServer()
  })

  describe('POST', () => {
    it('invalid thing', async () => {
      const actualResult = await postThingRoute(app, {})

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('invalid thing', async () => {
      const actualResult = await postThingRoute(app, {
        name: '',
        description: '',
        deviceId: '',
        thingType: '',
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('invalid name', async () => {
      const actualResult = await postThingRoute(app, {
        name: '',
        description: THING_NAMES[0],
        deviceId: DEVICE_IDS[0],
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('invalid description', async () => {
      const actualResult = await postThingRoute(app, {
        name: THING_NAMES[0],
        description: '',
        deviceId: DEVICE_IDS[0],
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('invalid device id', async () => {
      const actualResult = await postThingRoute(app, {
        name: THING_NAMES[0],
        description: THING_NAMES[0],
        deviceId: '',
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('invalid thing type', async () => {
      const actualResult = await postThingRoute(app, {
        name: THING_NAMES[0],
        description: THING_NAMES[0],
        deviceId: DEVICE_IDS[0],
        thingType: '',
      })

      expect(actualResult.status).to.equal(404)
    })

    it('name exists', async () => {
      const actualResult = await postThingRoute(app, {
        name: THING_NAMES[0],
        description: THING_NAMES[0],
        deviceId: 'zzz-000000',
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.status).to.equal(409)
    })

    it('device id exists', async () => {
      const actualResult = await postThingRoute(app, {
        name: 'thingZero',
        description: THING_NAMES[0],
        deviceId: DEVICE_IDS[0],
        thingType: THING_TYPE_NAMES[0],
      })

      expect(actualResult.status).to.equal(409)
    })

    it('create', async () => {
      const expectedResult: Thing = createThing('thingZero', 'zzz-000000', THING_TYPE_NAMES[0])

      const actualResult = await postThingRoute(app, expectedResult)

      expect(actualResult.status).to.equal(201)
      assertThing(actualResult.body, expectedResult)
    })
  })

  describe('GET', () => {
    it('all', async () => {
      const expectedResult = await db.findThings()

      const actualResult = await getThingsRoute(app)

      expect(actualResult.status).to.equal(200)
      assertThings(actualResult.body, expectedResult)
    })

    it('by name - does not exist', async () => {
      const actualResult = await getThingByNameRoute(app, 'thingSubZero')

      expect(actualResult.status).to.equal(404)
    })

    it('by name', async () => {
      const expectedResult = createThing(THING_NAMES[0], DEVICE_IDS[0], THING_TYPE_NAMES[0])

      const actualResult = await getThingByNameRoute(app, THING_NAMES[0])

      expect(actualResult.status).to.equal(200)
      assertThing(actualResult.body, expectedResult)
    })
  })
})
