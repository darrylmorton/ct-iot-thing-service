import sinon from 'sinon'
import { expect } from 'chai'

import { ThingGroup } from '../../../src/types/types'
import thingService from '../../../src/api-v1/services/thingService'
import { ServiceThingGroupResponse, ServiceThingGroupsResponse } from '../../../src/types/serviceTypes'
import db from '../../../src/db'

describe('Service - thing groups', () => {
  beforeEach(() => {
    sinon.restore()
  })

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
