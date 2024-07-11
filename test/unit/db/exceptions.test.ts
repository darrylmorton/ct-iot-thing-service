import sinon from 'sinon'
import { expect } from 'chai'

import db from '../../../src/db'
import { Thing, ThingGroup, ThingGroupDevice, ThingType } from '../../../src/types/types'

describe('Database', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('GET', () => {
    it('thing group by name', async () => {
      const stub: sinon.SinonSpy<[name: string], Promise<ThingGroup[]>> = sinon.spy(db, 'findThingGroupByName')

      try {
        await stub('foo')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupByName: result'))
      }
    })

    it('thing groups', async () => {
      const stub: sinon.SinonSpy<[], Promise<ThingGroup[]>> = sinon.spy(db, 'findThingGroups')

      try {
        await stub()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroups: result'))
      }
    })

    it('add thing group', async () => {
      const stub: sinon.SinonSpy<[thingGroup: ThingGroup], Promise<ThingGroup[]>> = sinon.spy(db, 'addThingGroup')

      try {
        await stub({ name: 'thingGroup', description: 'thingGroup' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThingGroup: result'))
      }
    })

    it('find thing group devices', async () => {
      const stub: sinon.SinonSpy<[], Promise<ThingGroupDevice[]>> = sinon.spy(db, 'findThingGroupDevices')

      try {
        await stub()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupDevices: result'))
      }
    })

    it('find thing group devices by name', async () => {
      const stub: sinon.SinonSpy<[name: string], Promise<ThingGroupDevice[]>> = sinon.spy(
        db,
        'findThingGroupDevicesByName'
      )

      try {
        await stub('thingGroupDevice')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupDevicesByName: result'))
      }
    })

    it('find thing group device by name and deviceId', async () => {
      const stub: sinon.SinonSpy<[name: string, deviceId: string], Promise<ThingGroupDevice[]>> = sinon.spy(
        db,
        'findThingGroupDeviceByNameAndDeviceId'
      )

      try {
        await stub('thingGroupDevice', 'abc-123456')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupDeviceByNameAndDeviceId: result'))
      }
    })

    it('find thing group device by name and deviceId', async () => {
      const stub: sinon.SinonSpy<[name: string, deviceId: string], Promise<ThingGroupDevice[]>> = sinon.spy(
        db,
        'findThingGroupDeviceByNameAndDeviceId'
      )

      try {
        await stub('thingGroupDevice', 'abc-123456')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingGroupDeviceByNameAndDeviceId: result'))
      }
    })

    it('add thing group device', async () => {
      const stub: sinon.SinonSpy<[thingGroupDevice: ThingGroupDevice], Promise<ThingGroupDevice[]>> = sinon.spy(
        db,
        'addThingGroupDevice'
      )

      try {
        await stub({ id: '123', deviceId: 'abc-123456', thingGroup: 'thingGroup' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThingGroupDevice: result'))
      }
    })

    it('find thing type by name', async () => {
      const stub: sinon.SinonSpy<[name: string], Promise<ThingType[]>> = sinon.spy(db, 'findThingTypeByName')

      try {
        await stub('thingType')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingTypeByName: result'))
      }
    })

    it('thing types', async () => {
      const stub: sinon.SinonSpy<[], Promise<ThingType[]>> = sinon.spy(db, 'findThingTypes')

      try {
        await stub()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingTypes: result'))
      }
    })

    it('add thing type', async () => {
      const stub: sinon.SinonSpy<[thingType: ThingType], Promise<ThingType[]>> = sinon.spy(db, 'addThingType')

      try {
        await stub({ name: 'thingType', description: 'thingType' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThingType: result'))
      }
    })

    it('add thing', async () => {
      const stub: sinon.SinonSpy<[thing: Thing], Promise<Thing[]>> = sinon.spy(db, 'addThing')

      try {
        await stub({ name: 'thingType', deviceId: 'abc-123456', description: 'thingType', thingType: 'thingType' })
      } catch (error) {
        expect(error).to.deep.equal(Error('addThing: result'))
      }
    })

    it('find thing by name', async () => {
      const stub: sinon.SinonSpy<[thing: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByName')

      try {
        await stub('thing')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingByName: result'))
      }
    })

    it('find thing by deviceId', async () => {
      const stub: sinon.SinonSpy<[deviceId: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByDeviceId')

      try {
        await stub('abc-123456')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingByDeviceId: result'))
      }
    })

    it('find thing by type', async () => {
      const stub: sinon.SinonSpy<[type: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByType')

      try {
        await stub('thingType')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingByType: result'))
      }
    })

    it('find things', async () => {
      const stub: sinon.SinonSpy<[], Promise<Thing[]>> = sinon.spy(db, 'findThings')

      try {
        await stub()
      } catch (error) {
        expect(error).to.deep.equal(Error('findThings: result'))
      }
    })

    it('find things by thing type', async () => {
      const stub: sinon.SinonSpy<[type: string], Promise<Thing[]>> = sinon.spy(db, 'findThingsByThingType')

      try {
        await stub('thingType')
      } catch (error) {
        expect(error).to.deep.equal(Error('findThingsByThingType: result'))
      }
    })
  })
})
