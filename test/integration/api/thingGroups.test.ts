import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { Express } from 'express'

import { getThingGroupByNameRoute, getThingGroupsRoute, postThingGroupRoute } from '../../helper/thingRouteHelper'
import { createHttpServer } from '../../../src/server'
import { seed } from '../../../seeds/things'
import { assertThingGroup, createThingGroup, THING_GROUP_NAMES } from '../../helper/thingHelper'
import db from '../../../src/db'
import { ThingGroup } from '../../../src/types/types'

describe('API - Thing Group Routes', () => {
  let app: Express

  before(async () => {
    await seed()

    app = await createHttpServer()
  })

  describe('POST', () => {
    it('invalid thing group', async () => {
      const actualResult = await postThingGroupRoute(app, {})

      expect(actualResult.status).to.equal(400)
      expect(actualResult.body).to.deep.equal({})
    })

    it('POST Thing Group exists', async () => {
      const actualResult = await postThingGroupRoute(app, {
        name: THING_GROUP_NAMES[0],
        description: THING_GROUP_NAMES[0],
      })

      expect(actualResult.status).to.equal(409)
    })

    it('POST Thing Group', async () => {
      const expectedResult: ThingGroup = createThingGroup('thingGroupZero')

      const actualResult = await postThingGroupRoute(app, expectedResult)

      expect(actualResult.status).to.equal(201)
      expect(actualResult.body).to.deep.equal(expectedResult)
    })
  })

  describe('GET', () => {
    it('all', async () => {
      const expectedResult = await db.findThingGroups()

      const actualResult = await getThingGroupsRoute(app)

      expect(actualResult.status).to.equal(200)
      expect(actualResult.body).to.deep.equal(expectedResult)
    })

    it('by name - missing', async () => {
      const actualResult = await getThingGroupByNameRoute(app, 'thing')

      expect(actualResult.status).to.equal(404)
    })

    it('by name', async () => {
      const expectedResult = createThingGroup(THING_GROUP_NAMES[0])

      const actualResult = await getThingGroupByNameRoute(app, THING_GROUP_NAMES[0])

      expect(actualResult.status).to.equal(200)
      assertThingGroup(actualResult.body, expectedResult)
    })
  })
})
