import sinon from 'sinon'
import { expect } from 'chai'

import { SimpleThingGroupDevice, Thing, ThingGroup, ThingType } from '../../../src/types/types'
import thingService from '../../../src/api-v1/services/thingService'
import {
  ServiceThingGroupDeviceResponse,
  ServiceThingGroupDevicesResponse,
  ServiceThingGroupResponse,
  ServiceThingGroupsResponse,
  ServiceThingResponse,
  ServiceThingTypeResponse,
} from '../../../src/types/serviceTypes'

describe('Service', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('thing group', () => {
    it('get by name', async () => {
      const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingGroupResponse>> = sinon.spy(
        thingService,
        'getThingGroupByName'
      )

      const actualResult = await spy('thingGroup')

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })

    it('get all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ServiceThingGroupsResponse>> = sinon.spy(thingService, 'getThingGroups')

      const actualResult = await spy()

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal([])
    })

    it('post', async () => {
      const spy: sinon.SinonSpy<[thingGroup: ThingGroup], Promise<ServiceThingGroupResponse>> = sinon.spy(
        thingService,
        'postThingGroup'
      )

      const actualResult = await spy({ name: 'thingGroup', description: 'thingGroup' })

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })
  })

  describe('thing group device', () => {
    it('get by name', async () => {
      const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingGroupDevicesResponse>> = sinon.spy(
        thingService,
        'getThingGroupDevicesByName'
      )

      const actualResult = await spy('thingGroupDevice')

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal([])
    })

    it('get by name and deviceId', async () => {
      const spy: sinon.SinonSpy<[name: string, deviceId: string], Promise<ServiceThingGroupDeviceResponse>> = sinon.spy(
        thingService,
        'getThingGroupDeviceByNameAndDeviceId'
      )

      const actualResult = await spy('thingGroupDevice', 'abc-123456')

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
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
  })

  describe('thing type', () => {
    it('get by name', async () => {
      const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingTypeResponse>> = sinon.spy(
        thingService,
        'getThingTypeByName'
      )

      const actualResult = await spy('thingType')

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })

    it('get all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ServiceThingTypeResponse>> = sinon.spy(thingService, 'getThingTypes')

      const actualResult = await spy()

      expect(actualResult.statusCode).to.equal(500)
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
  })

  describe('thing', () => {
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

    it('get by name', async () => {
      const spy: sinon.SinonSpy<[thing: string], Promise<ServiceThingResponse>> = sinon.spy(
        thingService,
        'getThingByName'
      )

      const actualResult = await spy('thing')

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal({})
    })

    it('get all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ServiceThingTypeResponse>> = sinon.spy(thingService, 'getThings')

      const actualResult = await spy()

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal([])
    })
  })
})
