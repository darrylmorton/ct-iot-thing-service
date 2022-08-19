import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'
import { Express } from 'express'

import { getThingsRoute, postThingRoute } from '../helper/thingRouteHelper'
import { createHttpServer } from '../../src/server'
import { SimpleThing } from '../../src/types'
import { cleanup } from '../../seeds/things'

describe('Thing routes', function () {
  let app: Express

  before(async function () {
    app = await createHttpServer()

    await cleanup()
  })

  it('POST Thing that is invalid', async function () {
    const thing: SimpleThing = { name: '' }
    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(400)
  })

  it('POST Thing', async function () {
    const thing: SimpleThing = { name: 'thingOne' }
    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(201)
    expect(isValidUuid(actualResult.body.id)).to.be.true
    expect(actualResult.body.name).to.deep.equal(thing.name)
  })

  it('POST Thing that already exists', async function () {
    const thing: SimpleThing = { name: 'thingOne' }
    const actualResult = await postThingRoute(app, thing)

    expect(actualResult.status).to.equal(409)
  })

  it('GET Things', async function () {
    const thing: SimpleThing = { name: 'thingOne' }

    const actualResult = await getThingsRoute(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.have.length(1)
    expect(isValidUuid(actualResult.body[0].id)).to.be.true
    expect(actualResult.body[0].name).to.equal(thing.name)
  })
})
