import sinon from 'sinon'
import { expect } from 'chai'

import { SimpleThingGroupDevice } from '../../../src/types/types'
import thingService from '../../../src/api-v1/services/thingService'
import {
  ServiceThingGroupDeviceResponse,
  ServiceThingGroupDevicesResponse,
  ServiceThingTypeResponse,
} from '../../../src/types/serviceTypes'
import db from '../../../src/db'

describe('Service - thing group devices', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('get by name', async () => {
    const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingGroupDevicesResponse>> = sinon.spy(
      thingService,
      'getThingGroupDevicesByName'
    )

    const actualResult = await spy('thingGroupDevice')

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal([])
  })

  it('get by name - missing', async () => {
    sinon.stub(db, 'findThingGroupDevicesByName').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingGroupDevicesResponse>> = sinon.spy(
      thingService,
      'getThingGroupDevicesByName'
    )

    const actualResult = await spy('thingGroupDevice')

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal([])
  })

  it('get by name - success', async () => {
    const expectedResult = { id: '0', thingGroup: 'thingGroup', deviceId: 'thingGroup' }

    sinon.stub(db, 'findThingGroupDevicesByName').returns(Promise.resolve([expectedResult]))

    const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingGroupDevicesResponse>> = sinon.spy(
      thingService,
      'getThingGroupDevicesByName'
    )

    const actualResult = await spy('thingGroupDevice')

    expect(actualResult.statusCode).to.equal(200)
    expect(actualResult.result).to.deep.equal([expectedResult])
  })

  it('get by name and deviceId', async () => {
    sinon.stub(db, 'findThingGroupDevicesByName').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[name: string, deviceId: string], Promise<ServiceThingGroupDeviceResponse>> = sinon.spy(
      thingService,
      'getThingGroupDeviceByNameAndDeviceId'
    )

    const actualResult = await spy('thingGroupDevice', 'abc-123456')

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name and deviceId - missing thing group', async () => {
    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[name: string, deviceId: string], Promise<ServiceThingGroupDeviceResponse>> = sinon.spy(
      thingService,
      'getThingGroupDeviceByNameAndDeviceId'
    )

    const actualResult = await spy('thingGroupDevice', 'abc-123456')

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name and deviceId - missing thing', async () => {
    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
    sinon.stub(db, 'findThingByDeviceId').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[name: string, deviceId: string], Promise<ServiceThingGroupDeviceResponse>> = sinon.spy(
      thingService,
      'getThingGroupDeviceByNameAndDeviceId'
    )

    const actualResult = await spy('thingGroupDevice', 'abc-123456')

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name and deviceId - missing thing group device', async () => {
    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
    sinon
      .stub(db, 'findThingByDeviceId')
      .returns(
        Promise.resolve([
          { name: 'thingGroup', deviceId: 'abc-123456', description: 'thingGroup', thingType: 'thingType' },
        ])
      )
    sinon.stub(db, 'findThingGroupDeviceByNameAndDeviceId').returns(Promise.resolve([]))

    const spy: sinon.SinonSpy<[name: string, deviceId: string], Promise<ServiceThingGroupDeviceResponse>> = sinon.spy(
      thingService,
      'getThingGroupDeviceByNameAndDeviceId'
    )

    const actualResult = await spy('thingGroupDevice', 'abc-123456')

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('get by name and deviceId - success', async () => {
    const expectedResult = { id: '0', thingGroup: 'thingGroup', deviceId: 'abc-123456' }

    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
    sinon
      .stub(db, 'findThingByDeviceId')
      .returns(
        Promise.resolve([
          { name: 'thingGroup', deviceId: 'abc-123456', description: 'thingGroup', thingType: 'thingType' },
        ])
      )
    sinon.stub(db, 'findThingGroupDeviceByNameAndDeviceId').returns(Promise.resolve([expectedResult]))

    const spy: sinon.SinonSpy<[name: string, deviceId: string], Promise<ServiceThingGroupDeviceResponse>> = sinon.spy(
      thingService,
      'getThingGroupDeviceByNameAndDeviceId'
    )

    const actualResult = await spy('thingGroupDevice', 'abc-123456')

    expect(actualResult.statusCode).to.equal(200)
    expect(actualResult.result).to.deep.equal(expectedResult)
  })

  it('post', async () => {
    /* eslint-disable @typescript-eslint/indent */
    const spy: sinon.SinonSpy<
      [thingGroupDevice: SimpleThingGroupDevice],
      Promise<ServiceThingTypeResponse>
    > = sinon.spy(thingService, 'postThingGroupDevice')

    const actualResult = await spy({ deviceId: 'abc-123456', thingGroup: 'thingGroup' })

    expect(actualResult.statusCode).to.equal(500)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - missing thing group', async () => {
    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([]))

    /* eslint-disable @typescript-eslint/indent */
    const spy: sinon.SinonSpy<
      [thingGroupDevice: SimpleThingGroupDevice],
      Promise<ServiceThingTypeResponse>
    > = sinon.spy(thingService, 'postThingGroupDevice')

    const actualResult = await spy({ deviceId: 'abc-123456', thingGroup: 'thingGroup' })

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - missing thing', async () => {
    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
    sinon.stub(db, 'findThingByDeviceId').returns(Promise.resolve([]))

    /* eslint-disable @typescript-eslint/indent */
    const spy: sinon.SinonSpy<
      [thingGroupDevice: SimpleThingGroupDevice],
      Promise<ServiceThingTypeResponse>
    > = sinon.spy(thingService, 'postThingGroupDevice')

    const actualResult = await spy({ deviceId: 'abc-123456', thingGroup: 'thingGroup' })

    expect(actualResult.statusCode).to.equal(404)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - exists', async () => {
    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
    sinon
      .stub(db, 'findThingByDeviceId')
      .returns(
        Promise.resolve([
          { deviceId: 'abc-123456', name: 'thingGroup', description: 'thingGroup', thingType: 'thingType' },
        ])
      )
    sinon.stub(db, 'findThingGroupDeviceByNameAndDeviceId').returns(
      Promise.resolve([
        {
          deviceId: 'abc-123456',
          thingGroup: 'thingGroup',
          id: '0',
        },
      ])
    )

    /* eslint-disable @typescript-eslint/indent */
    const spy: sinon.SinonSpy<
      [thingGroupDevice: SimpleThingGroupDevice],
      Promise<ServiceThingTypeResponse>
    > = sinon.spy(thingService, 'postThingGroupDevice')

    const actualResult = await spy({ deviceId: 'abc-123456', thingGroup: 'thingGroup' })

    expect(actualResult.statusCode).to.equal(409)
    expect(actualResult.result).to.deep.equal({})
  })

  it('post - exists', async () => {
    const expectedResult = { id: '0', deviceId: 'abc-123456', thingGroup: 'thingGroup' }

    sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
    sinon
      .stub(db, 'findThingByDeviceId')
      .returns(
        Promise.resolve([
          { deviceId: 'abc-123456', name: 'thingGroup', description: 'thingGroup', thingType: 'thingType' },
        ])
      )
    sinon.stub(db, 'findThingGroupDeviceByNameAndDeviceId').returns(Promise.resolve([]))
    sinon.stub(db, 'addThingGroupDevice').returns(Promise.resolve([expectedResult]))

    /* eslint-disable @typescript-eslint/indent */
    const spy: sinon.SinonSpy<
      [thingGroupDevice: SimpleThingGroupDevice],
      Promise<ServiceThingTypeResponse>
    > = sinon.spy(thingService, 'postThingGroupDevice')

    const actualResult = await spy({ deviceId: 'abc-123456', thingGroup: 'thingGroup' })

    expect(actualResult.statusCode).to.equal(201)
    expect(actualResult.result).to.deep.equal(expectedResult)
  })
})
