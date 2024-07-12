import knex from 'knex'

import env from './env'
import { Thing, ThingType, ThingGroup, ThingGroupDevice } from './types/types'
import { DatabaseInterface } from './types/dbTypes'
import logger from './logger'

const db: DatabaseInterface = {
  client: knex({
    client: 'pg',
    connection: {
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      port: env.DB_PORT,
    },
  }),

  async findThingGroupByName(name: string): Promise<ThingGroup[]> {
    try {
      return this.client('thing_groups').select(['name', 'description']).where({ name })
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingGroupByName: result',
        error,
      })

      throw new Error('findThingGroupByName: result')
    }
  },

  async findThingGroups(): Promise<ThingGroup[]> {
    try {
      return this.client('thing_groups').select(['name', 'description']).orderBy('name', 'ASC')
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingGroups: result',
        error,
      })

      throw new Error('findThingGroups: result')
    }
  },

  async addThingGroup(thingGroup: ThingGroup): Promise<ThingGroup[]> {
    try {
      return this.client('thing_groups').insert(thingGroup).returning(['name', 'description'])
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'addThingGroup: result',
        error,
      })

      throw new Error('addThingGroup: result')
    }
  },

  async findThingGroupDevices(): Promise<ThingGroupDevice[]> {
    try {
      return this.client('thing_group_devices')
        .select(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
        .orderBy('thing_group', 'ASC')
        .orderBy('device_id', 'ASC')
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingGroupDevices: result',
        error,
      })

      throw new Error('findThingGroupDevices: result')
    }
  },

  async findThingGroupDevicesByName(name: string): Promise<ThingGroupDevice[]> {
    try {
      return this.client('thing_group_devices')
        .select(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
        .where({ thing_group: name })
        .orderBy('thing_group', 'ASC')
        .orderBy('device_id', 'ASC')
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingGroupDevicesByName: result',
        error,
      })

      throw new Error('findThingGroupDevicesByName: result')
    }
  },

  async findThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<ThingGroupDevice[]> {
    try {
      return this.client('thing_group_devices')
        .select(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
        .where({ thing_group: name })
        .andWhere({ device_id: deviceId })
        .orderBy('thing_group', 'ASC')
        .orderBy('device_id', 'ASC')
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingGroupDeviceByNameAndDeviceId: result',
        error,
      })

      throw new Error('findThingGroupDeviceByNameAndDeviceId: result')
    }
  },

  async addThingGroupDevice(thingGroupDevice: ThingGroupDevice): Promise<ThingGroupDevice[]> {
    try {
      return this.client('thing_group_devices')
        .insert({ device_id: thingGroupDevice.deviceId, thing_group: thingGroupDevice.thingGroup })
        .returning(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'addThingGroupDevice: result',
        error,
      })

      throw new Error('addThingGroupDevice: result')
    }
  },

  async findThingTypeByName(name: string): Promise<ThingType[]> {
    try {
      return this.client('thing_types').select(['name', 'description']).where({ name })
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingTypeByName: result',
        error,
      })

      throw new Error('findThingTypeByName: result')
    }
  },

  async findThingTypes(): Promise<ThingType[]> {
    try {
      return this.client('thing_types').select(['name', 'description']).orderBy('name', 'ASC')
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingTypes: result',
        error,
      })

      throw new Error('findThingTypes: result')
    }
  },

  async addThingType(thingType: ThingType): Promise<ThingType[]> {
    try {
      return this.client('thing_types').insert(thingType).returning(['name', 'description'])
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'addThingType: result',
        error,
      })

      throw new Error('addThingType: result')
    }
  },

  async addThing(thing: Thing): Promise<Thing[]> {
    try {
      return this.client('things')
        .insert({
          name: thing.name,
          description: thing.description,
          device_id: thing.deviceId,
          thing_type: thing.thingType,
        })
        .returning(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'addThing: result',
        error,
      })

      throw new Error('addThing: result')
    }
  },

  async findThingByName(name: string): Promise<Thing[]> {
    try {
      return this.client('things')
        .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
        .where({ name })
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingByName: result',
        error,
      })

      throw new Error('findThingByName: result')
    }
  },

  async findThingByDeviceId(deviceId: string): Promise<Thing[]> {
    try {
      return this.client('things')
        .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
        .where({ device_id: deviceId })
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingByDeviceId: result',
        error,
      })

      throw new Error('findThingByDeviceId: result')
    }
  },

  async findThingByType(name: string): Promise<Thing[]> {
    try {
      return this.client('things')
        .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
        .where({ thing_type: name })
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingByType: result',
        error,
      })

      throw new Error('findThingByType: result')
    }
  },

  async findThings(): Promise<Thing[]> {
    try {
      return this.client('things')
        .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
        .orderBy('name', 'ASC')
        .orderBy('device_id', 'ASC')
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThings: result',
        error,
      })

      throw new Error('findThings: result')
    }
  },

  async findThingsByThingType(thingType: string): Promise<Thing[]> {
    try {
      return this.client('things')
        .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
        .where({ thing_type: thingType })
        .orderBy('name', 'ASC')
        .orderBy('thing_type', 'ASC')
    } catch (error) {
      logger.error({
        label: 'db',
        message: 'findThingsByThingType: result',
        error,
      })

      throw new Error('findThingsByThingType: result')
    }
  },
}

export default db
