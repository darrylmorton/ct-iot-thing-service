import knex from 'knex'

import env from './env'
import { Thing, ThingType, ThingGroup, ThingGroupDevice } from './types/types'
import { DatabaseInterface } from './types/dbTypes'

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
    return this.client('thing_groups').select(['name', 'description']).where({ name })
  },

  async findThingGroups(): Promise<ThingGroup[]> {
    return this.client('thing_groups').select(['name', 'description']).orderBy('name', 'ASC')
  },

  async addThingGroup(thingGroup: ThingGroup): Promise<ThingGroup[]> {
    return this.client('thing_groups').insert(thingGroup).returning(['name', 'description'])
  },

  async findThingGroupDevices(): Promise<ThingGroupDevice[]> {
    return this.client('thing_group_devices')
      .select(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
      .orderBy('thing_group', 'ASC')
      .orderBy('device_id', 'ASC')
  },

  async findThingGroupDevicesByName(name: string): Promise<ThingGroupDevice[]> {
    return this.client('thing_group_devices')
      .select(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
      .where({ thing_group: name })
      .orderBy('thing_group', 'ASC')
      .orderBy('device_id', 'ASC')
  },

  async findThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<ThingGroupDevice[]> {
    return this.client('thing_group_devices')
      .select(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
      .where({ thing_group: name })
      .andWhere({ device_id: deviceId })
      .orderBy('thing_group', 'ASC')
      .orderBy('device_id', 'ASC')
  },

  async addThingGroupDevice(thingGroupDevice: ThingGroupDevice): Promise<ThingGroupDevice[]> {
    return this.client('thing_group_devices')
      .insert({ device_id: thingGroupDevice.deviceId, thing_group: thingGroupDevice.thingGroup })
      .returning(['id', 'thing_group AS thingGroup', 'device_id AS deviceId'])
  },

  async findThingTypeByName(name: string): Promise<ThingType[]> {
    return this.client('thing_types').select(['name', 'description']).where({ name })
  },

  async findThingTypes(): Promise<ThingType[]> {
    return this.client('thing_types').select(['name', 'description']).orderBy('name', 'ASC')
  },

  async addThingType(thingType: ThingType): Promise<ThingType[]> {
    return this.client('thing_types').insert(thingType).returning(['name', 'description'])
  },

  async addThing(thing: Thing): Promise<Thing[]> {
    return this.client('things')
      .insert({
        name: thing.name,
        description: thing.description,
        device_id: thing.deviceId,
        thing_type: thing.thingType,
      })
      .returning(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
  },

  async findThingByName(name: string): Promise<Thing[]> {
    return this.client('things')
      .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
      .where({ name })
  },

  async findThingByDeviceId(deviceId: string): Promise<Thing[]> {
    return this.client('things')
      .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
      .where({ device_id: deviceId })
  },

  async findThingByType(name: string): Promise<Thing[]> {
    return this.client('things')
      .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
      .where({ thing_type: name })
  },

  async findThings(): Promise<Thing[]> {
    return this.client('things')
      .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
      .orderBy('name', 'ASC')
      .orderBy('device_id', 'ASC')
  },

  async findThingsByThingType(thingType: string): Promise<Thing[]> {
    return this.client('things')
      .select(['name', 'device_id AS deviceId', 'description', 'thing_type AS thingType'])
      .where({ thing_type: thingType })
      .orderBy('name', 'ASC')
      .orderBy('thing_type', 'ASC')
  },
}

export default db
