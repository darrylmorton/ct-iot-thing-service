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
import db from '../../../src/db'

describe.only('Service', () => {
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

    it('get by name - success', async () => {
      const expectedResult = { name: 'thingGroup', description: 'thingGroup' }

      sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([expectedResult]))

      const spy: sinon.SinonSpy<[name: string], Promise<ServiceThingGroupResponse>> = sinon.spy(
        thingService,
        'getThingGroupByName'
      )

      const actualResult = await spy('thingGroup')

      expect(actualResult.statusCode).to.equal(200)
      expect(actualResult.result).to.deep.equal(expectedResult)
    })

    it('get all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ServiceThingGroupsResponse>> = sinon.spy(thingService, 'getThingGroups')

      const actualResult = await spy()

      expect(actualResult.statusCode).to.equal(500)
      expect(actualResult.result).to.deep.equal([])
    })

    it('get all - success', async () => {
      const expectedResult = { name: 'thingGroup', description: 'thingGroup' }

      sinon.stub(db, 'findThingGroups').returns(Promise.resolve([expectedResult]))

      const spy: sinon.SinonSpy<[], Promise<ServiceThingGroupsResponse>> = sinon.spy(thingService, 'getThingGroups')

      const actualResult = await spy()

      expect(actualResult.statusCode).to.equal(200)
      expect(actualResult.result).to.deep.equal([expectedResult])
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

    it('post - success', async () => {
      const expectedResult = { name: 'thingGroup', description: 'thingGroup' }

      sinon.stub(db, 'findThingGroupByName').returns(Promise.resolve([]))
      sinon.stub(db, 'addThingGroup').returns(Promise.resolve([expectedResult]))

      const spy: sinon.SinonSpy<[thingGroup: ThingGroup], Promise<ServiceThingGroupResponse>> = sinon.spy(
        thingService,
        'postThingGroup'
      )

      const actualResult = await spy({ name: 'thingGroup', description: 'thingGroup' })

      expect(actualResult.statusCode).to.equal(201)
      expect(actualResult.result).to.deep.equal(expectedResult)
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
      sinon
        .stub(db, 'findThingGroupByName')
        .returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
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
      sinon
        .stub(db, 'findThingGroupByName')
        .returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
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

      sinon
        .stub(db, 'findThingGroupByName')
        .returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
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
      sinon
        .stub(db, 'findThingGroupByName')
        .returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
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
      sinon
        .stub(db, 'findThingGroupByName')
        .returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
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

      sinon
        .stub(db, 'findThingGroupByName')
        .returns(Promise.resolve([{ name: 'thingGroup', description: 'thingGroup' }]))
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
})