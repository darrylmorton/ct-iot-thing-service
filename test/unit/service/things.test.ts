import sinon from 'sinon'
import { expect } from 'chai'

import { Thing } from '../../../src/types/types'
import thingService from '../../../src/api-v1/services/thingService'
import { ServiceThingResponse, ServiceThingTypeResponse } from '../../../src/types/serviceTypes'
import db from '../../../src/db'

describe('Service - things', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('post', async () => {
    const spy: sinon.SinonSpy<[thing: Thing], Promise<ServiceThingResponse>> = sinon.spy(thingService, 'postThing')

    const actualResult = await spy({
      name: 'thingType',
      deviceId: 'abc-123456',
      description: 'thingType',
      thingType: 'thingType',
    })

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - missing thing type', async () => {
    const spy: sinon.SinonSpy<[thing: Thing], Promise<ServiceThingResponse>> = sinon.spy(thingService, 'postThing')

    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([]))

    const actualResult = await spy({
      name: 'thingType',
      deviceId: 'abc-123456',
      description: 'thingType',
      thingType: 'thingType',
    })

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - deviceId exists', async () => {
    const spy: sinon.SinonSpy<[thing: Thing], Promise<ServiceThingResponse>> = sinon.spy(thingService, 'postThing')

    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([{ name: 'thingType', description: 'thingType' }]))
    sinon
      .stub(db, 'findThingByDeviceId')
      .returns(
        Promise.resolve([{ deviceId: 'abc-123456', name: 'thing', description: 'thingType', thingType: 'thingType' }])
      )

    const actualResult = await spy({
      name: 'thingType',
      deviceId: 'abc-123456',
      description: 'thingType',
      thingType: 'thingType',
    })

    expect(actualResult.statusCode).to.equal(409)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - name exists', async () => {
    const spy: sinon.SinonSpy<[thing: Thing], Promise<ServiceThingResponse>> = sinon.spy(thingService, 'postThing')

    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([{ name: 'thingType', description: 'thingType' }]))
    sinon.stub(db, 'findThingByDeviceId').returns(Promise.resolve([]))
    sinon
      .stub(db, 'findThingByName')
      .returns(
        Promise.resolve([{ deviceId: 'abc-123456', name: 'thing', description: 'thingType', thingType: 'thingType' }])
      )

    const actualResult = await spy({
      name: 'thingType',
      deviceId: 'abc-123456',
      description: 'thingType',
      thingType: 'thingType',
    })

    expect(actualResult.statusCode).to.equal(409)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - success', async () => {
    const expectedResult = { deviceId: 'abc-123456', name: 'thing', description: 'thingType', thingType: 'thingType' }

    const spy: sinon.SinonSpy<[thing: Thing], Promise<ServiceThingResponse>> = sinon.spy(thingService, 'postThing')

    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([{ name: 'thingType', description: 'thingType' }]))
    sinon.stub(db, 'findThingByDeviceId').returns(Promise.resolve([]))
    sinon.stub(db, 'findThingByName').returns(Promise.resolve([]))
    sinon.stub(db, 'addThing').returns(Promise.resolve([expectedResult]))

    const actualResult = await spy(expectedResult)

    expect(actualResult.statusCode).to.equal(201)
    expect(actualResult.result).to.deep.equal(expectedResult)
  })

  it('get by name', async () => {
    const spy: sinon.SinonSpy<[thing: string], Promise<ServiceThingResponse>> = sinon.spy(
      thingService,
      'getThingByName'
    )

    const actualResult = await spy('thing')

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name - missing', async () => {
    sinon.stub(db, 'findThingByName').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[thing: string], Promise<ServiceThingResponse>> = sinon.spy(
      thingService,
      'getThingByName'
    )

    const actualResult = await spy('thing')

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name - success', async () => {
    const expectedResult = {
      deviceId: 'abc-123456',
      name: 'thingType',
      description: 'thingType',
      thingType: 'thingType',
    }

    sinon.stub(db, 'findThingByName').returns(Promise.resolve([expectedResult]))

    const spy: sinon.SinonSpy<[thing: string], Promise<ServiceThingResponse>> = sinon.spy(
      thingService,
      'getThingByName'
    )

    const actualResult = await spy('thing')

    expect(actualResult.statusCode).to.equal(200)
    expect(actualResult.result).to.deep.equal(expectedResult)
  })

  it('get all', async () => {
    const spy: sinon.SinonSpy<[], Promise<ServiceThingTypeResponse>> = sinon.spy(thingService, 'getThings')

    const actualResult = await spy()

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal([])
  })

  it('get all - success', async () => {
    const expectedResult = {
      deviceId: 'abc-123456',
      name: 'thingType',
      description: 'thingType',
      thingType: 'thingType',
    }

    sinon.stub(db, 'findThings').returns(Promise.resolve([expectedResult]))

    const spy: sinon.SinonSpy<[], Promise<ServiceThingTypeResponse>> = sinon.spy(thingService, 'getThings')

    const actualResult = await spy()

    expect(actualResult.statusCode).to.equal(200)
    expect(actualResult.result).to.deep.equal([expectedResult])
  })
})
