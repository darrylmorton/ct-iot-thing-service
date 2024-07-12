import sinon from 'sinon'
import { expect } from 'chai'

import { ThingType } from '../../../src/types/types'
import thingService from '../../../src/api-v1/services/thingService'
import { ServiceThingTypeResponse } from '../../../src/types/serviceTypes'
import db from '../../../src/db'

describe('Service - thing types', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('get by name', async () => {
    const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingTypeResponse>> = sinon.spy(
      thingService,
      'getThingTypeByName'
    )

    const actualResult = await spy('thingType')

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name - missing', async () => {
    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingTypeResponse>> = sinon.spy(
      thingService,
      'getThingTypeByName'
    )

    const actualResult = await spy('thingType')

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name - success', async () => {
    const expectedResult = { name: 'thingType', description: 'thingType' }

    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([expectedResult]))

    const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingTypeResponse>> = sinon.spy(
      thingService,
      'getThingTypeByName'
    )

    const actualResult = await spy('thingType')

    expect(actualResult.statusCode).to.equal(200)
    expect(actualResult.result).to.deep.equal(expectedResult)
  })

  it('get all', async () => {
    const spy: sinon.SinonSpy<[], Promise<ServiceThingTypeResponse>> = sinon.spy(thingService, 'getThingTypes')

    const actualResult = await spy()

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal([])
  })

  it('get all success', async () => {
    sinon.stub(db, 'findThingTypes').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[], Promise<ServiceThingTypeResponse>> = sinon.spy(thingService, 'getThingTypes')

    const actualResult = await spy()

    expect(actualResult.statusCode).to.equal(200)
    expect(actualResult.result).to.deep.equal([])
  })

  it('post', async () => {
    const spy: sinon.SinonSpy<[thingType: ThingType], Promise<ServiceThingTypeResponse>> = sinon.spy(
      thingService,
      'postThingType'
    )

    const actualResult = await spy({ name: 'thingType', description: 'thingType' })

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - exists', async () => {
    const expectedResult = { name: 'thingType', description: 'thingType' }

    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([expectedResult]))

    const spy: sinon.SinonSpy<[thingType: ThingType], Promise<ServiceThingTypeResponse>> = sinon.spy(
      thingService,
      'postThingType'
    )

    const actualResult = await spy({ name: 'thingType', description: 'thingType' })

    expect(actualResult.statusCode).to.equal(409)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - success', async () => {
    const expectedResult = { name: 'thingType', description: 'thingType' }

    sinon.stub(db, 'findThingTypeByName').returns(Promise.resolve([]))
    sinon.stub(db, 'addThingType').returns(Promise.resolve([expectedResult]))

    const spy: sinon.SinonSpy<[thingType: ThingType], Promise<ServiceThingTypeResponse>> = sinon.spy(
      thingService,
      'postThingType'
    )

    const actualResult = await spy({ name: 'thingType', description: 'thingType' })

    expect(actualResult.statusCode).to.equal(201)
    expect(actualResult.result).to.deep.equal(expectedResult)
  })
})
