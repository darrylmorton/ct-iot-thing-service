import sinon from 'sinon'
import { expect } from 'chai'

import db from '../../../src/db'
import { Thing, ThingGroup, ThingGroupDevice, ThingType } from '../../../src/types/types'

describe('Database', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('thing group', () => {
    it('find by name', async () => {
      const spy: sinon.SinonSpy<[name: string], Promise<ThingGroup[]>> = sinon.spy(db, 'findThingGroupByName')

      try {
        await spy('thingGroup')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupByName: result'))
      }
    })

    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ThingGroup[]>> = sinon.spy(db, 'findThingGroups')

      try {
        await spy()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroups: result'))
      }
    })

    it('add', async () => {
      const spy: sinon.SinonSpy<[thingGroup: ThingGroup], Promise<ThingGroup[]>> = sinon.spy(db, 'addThingGroup')

      try {
        await spy({ name: 'thingGroup', description: 'thingGroup' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThingGroup: result'))
      }
    })
  })

  describe('thing group device', () => {
    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ThingGroupDevice[]>> = sinon.spy(db, 'findThingGroupDevices')

      try {
        await spy()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupDevices: result'))
      }
    })

    it('find by name', async () => {
      const spy: sinon.SinonSpy<[name: string], Promise<ThingGroupDevice[]>> = sinon.spy(
        db,
        'findThingGroupDevicesByName'
      )

      try {
        await spy('thingGroupDevice')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupDevicesByName: result'))
      }
    })

    it('find by name and deviceId', async () => {
      const spy: sinon.SinonSpy<[name: string, deviceId: string], Promise<ThingGroupDevice[]>> = sinon.spy(
        db,
        'findThingGroupDeviceByNameAndDeviceId'
      )

      try {
        await spy('thingGroupDevice', 'abc-123456')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupDeviceByNameAndDeviceId: result'))
      }
    })

    it('add', async () => {
      const spy: sinon.SinonSpy<[thingGroupDevice: ThingGroupDevice], Promise<ThingGroupDevice[]>> = sinon.spy(
        db,
        'addThingGroupDevice'
      )

      try {
        await spy({ id: '123', deviceId: 'abc-123456', thingGroup: 'thingGroup' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThingGroupDevice: result'))
      }
    })
  })

  describe('thing type', () => {
    it('find by name', async () => {
      const spy: sinon.SinonSpy<[name: string], Promise<ThingType[]>> = sinon.spy(db, 'findThingTypeByName')

      try {
        await spy('thingType')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingTypeByName: result'))
      }
    })

    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ThingType[]>> = sinon.spy(db, 'findThingTypes')

      try {
        await spy()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingTypes: result'))
      }
    })

    it('add', async () => {
      const spy: sinon.SinonSpy<[thingType: ThingType], Promise<ThingType[]>> = sinon.spy(db, 'addThingType')

      try {
        await spy({ name: 'thingType', description: 'thingType' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThingType: result'))
      }
    })
  })

  describe('thing', () => {
    it('add', async () => {
      const spy: sinon.SinonSpy<[thing: Thing], Promise<Thing[]>> = sinon.spy(db, 'addThing')

      try {
        await spy({ name: 'thingType', deviceId: 'abc-123456', description: 'thingType', thingType: 'thingType' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThing: result'))
      }
    })

    it('find by name', async () => {
      const spy: sinon.SinonSpy<[thing: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByName')

      try {
        await spy('thing')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingByName: result'))
      }
    })

    it('find by deviceId', async () => {
      const spy: sinon.SinonSpy<[deviceId: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByDeviceId')

      try {
        await spy('abc-123456')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingByDeviceId: result'))
      }
    })

    it('find by type', async () => {
      const spy: sinon.SinonSpy<[type: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByType')

      try {
        await spy('thingType')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingByType: result'))
      }
    })

    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<Thing[]>> = sinon.spy(db, 'findThings')

      try {
        await spy()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThings: result'))
      }
    })

    it('find by thing type', async () => {
      const spy: sinon.SinonSpy<[type: string], Promise<Thing[]>> = sinon.spy(db, 'findThingsByThingType')

      try {
        await spy('thingType')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingsByThingType: result'))
      }
    })
  })
})
