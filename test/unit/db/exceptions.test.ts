import sinon from 'sinon'
import { expect } from 'chai'

import db from '../../../src/db'
import { Thing, ThingGroup, ThingGroupDevice, ThingType } from '../../../src/types/types'
import { ThingError, ThingGroupDeviceError, ThingGroupError, ThingTypeError } from '../../../src/types/errorTypes'
import { DB_ERROR_MESSAGE } from '../../helper/thingHelper'

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
        expect(error).to.be.an.instanceof(ThingGroupError)
        expect(error).to.deep.equal(new ThingGroupError('findThingGroupByName', DB_ERROR_MESSAGE))
      }
    })

    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ThingGroup[]>> = sinon.spy(db, 'findThingGroups')

      try {
        await spy()
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingGroupError)
        expect(error).to.deep.equal(new ThingGroupError('findThingGroups', DB_ERROR_MESSAGE))
      }
    })

    it('add', async () => {
      const spy: sinon.SinonSpy<[thingGroup: ThingGroup], Promise<ThingGroup[]>> = sinon.spy(db, 'addThingGroup')

      try {
        await spy({ name: 'thingGroup', description: 'thingGroup' })
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingGroupError)
        expect(error).to.deep.equal(new ThingGroupError('addThingGroup', DB_ERROR_MESSAGE))
      }
    })
  })

  describe('thing group device', () => {
    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ThingGroupDevice[]>> = sinon.spy(db, 'findThingGroupDevices')

      try {
        await spy()
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingGroupDeviceError)
        expect(error).to.deep.equal(new ThingGroupDeviceError('findThingGroupDevices', DB_ERROR_MESSAGE))
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
        expect(error).to.be.an.instanceof(ThingGroupDeviceError)
        expect(error).to.deep.equal(new ThingGroupDeviceError('findThingGroupDevicesByName', DB_ERROR_MESSAGE))
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
        expect(error).to.be.an.instanceof(ThingGroupDeviceError)
        expect(error).to.deep.equal(
          new ThingGroupDeviceError('findThingGroupDeviceByNameAndDeviceId', DB_ERROR_MESSAGE)
        )
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
        expect(error).to.be.an.instanceof(ThingGroupDeviceError)
        expect(error).to.deep.equal(new ThingGroupDeviceError('addThingGroupDevice', DB_ERROR_MESSAGE))
      }
    })
  })

  describe('thing type', () => {
    it('find by name', async () => {
      const spy: sinon.SinonSpy<[name: string], Promise<ThingType[]>> = sinon.spy(db, 'findThingTypeByName')

      try {
        await spy('thingType')
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingTypeError)
        expect(error).to.deep.equal(new ThingTypeError('findThingTypeByName', DB_ERROR_MESSAGE))
      }
    })

    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<ThingType[]>> = sinon.spy(db, 'findThingTypes')

      try {
        await spy()
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingTypeError)
        expect(error).to.deep.equal(new ThingTypeError('findThingTypes', DB_ERROR_MESSAGE))
      }
    })

    it('add', async () => {
      const spy: sinon.SinonSpy<[thingType: ThingType], Promise<ThingType[]>> = sinon.spy(db, 'addThingType')

      try {
        await spy({ name: 'thingType', description: 'thingType' })
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingTypeError)
        expect(error).to.deep.equal(new ThingTypeError('addThingType', DB_ERROR_MESSAGE))
      }
    })
  })

  describe('thing', () => {
    it('add', async () => {
      const spy: sinon.SinonSpy<[thing: Thing], Promise<Thing[]>> = sinon.spy(db, 'addThing')

      try {
        await spy({ name: 'thingType', deviceId: 'abc-123456', description: 'thingType', thingType: 'thingType' })
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingError)
        expect(error).to.deep.equal(new ThingError('addThing', DB_ERROR_MESSAGE))
      }
    })

    it('find by name', async () => {
      const spy: sinon.SinonSpy<[thing: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByName')

      try {
        await spy('thing')
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingError)
        expect(error).to.deep.equal(new ThingError('findThingByName', DB_ERROR_MESSAGE))
      }
    })

    it('find by deviceId', async () => {
      const spy: sinon.SinonSpy<[deviceId: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByDeviceId')

      try {
        await spy('abc-123456')
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingError)
        expect(error).to.deep.equal(new ThingError('findThingByDeviceId', DB_ERROR_MESSAGE))
      }
    })

    it('find by type', async () => {
      const spy: sinon.SinonSpy<[type: string], Promise<Thing[]>> = sinon.spy(db, 'findThingByType')

      try {
        await spy('thingType')
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingError)
        expect(error).to.deep.equal(new ThingError('findThingByType', DB_ERROR_MESSAGE))
      }
    })

    it('find all', async () => {
      const spy: sinon.SinonSpy<[], Promise<Thing[]>> = sinon.spy(db, 'findThings')

      try {
        await spy()
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingError)
        expect(error).to.deep.equal(new ThingError('findThings', DB_ERROR_MESSAGE))
      }
    })

    it('find by thing type', async () => {
      const spy: sinon.SinonSpy<[type: string], Promise<Thing[]>> = sinon.spy(db, 'findThingsByThingType')

      try {
        await spy('thingType')
      } catch (error) {
        expect(error).to.be.an.instanceof(ThingError)
        expect(error).to.deep.equal(new ThingError('findThingsByThingType', DB_ERROR_MESSAGE))
      }
    })
  })
})
