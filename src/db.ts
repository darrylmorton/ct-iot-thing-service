import knex from 'knex'

import env from './env'
import { ThingPayload, Thing, ThingType, ThingGroup, SimpleThingPayload, ThingGroupDevice } from './types/types'
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

  async addThingPayload(thingPayload: SimpleThingPayload): Promise<ThingPayload[]> {
    return this.client('thing_payloads')
      .insert({
        device_id: thingPayload.deviceId,
        payload_timestamp: thingPayload.payloadTimestamp,
        payload: thingPayload.payload,
      })
      .returning(['id', 'device_id AS deviceId', 'payload_timestamp AS payloadTimestamp', 'payload'])
  },

  // TODO pagination to compliment limits...
  async findThingPayloadsByTimestamps(startTimestamp: number, endTimestamp: number): Promise<ThingPayload[]> {
    return this.client('thing_payloads AS tp')
      .select(['tp.id', 'tp.device_id AS deviceId', 'tp.payload_timestamp AS payloadTimestamp', 'tp.payload'])
      .whereBetween('tp.payload_timestamp', [startTimestamp, endTimestamp])
      .orderBy('tp.payload_timestamp', 'ASC')
      .orderBy('tp.device_id', 'ASC')
      .limit(300)
  },

  async findThingPayloadsByDeviceIdAndTimestamps(
    deviceId: string,
    startTimestamp: number,
    endTimestamp: number
  ): Promise<ThingPayload[]> {
    return this.client('thing_payloads AS tp')
      .select(['tp.id', 'tp.device_id AS deviceId', 'tp.payload_timestamp AS payloadTimestamp', 'tp.payload'])
      .whereBetween('tp.payload_timestamp', [startTimestamp, endTimestamp])
      .andWhere('tp.device_id', deviceId)
      .orderBy('tp.payload_timestamp', 'ASC')
      .orderBy('tp.device_id', 'ASC')
      .limit(300)
  },

  async findThingPayloadsByThingGroupAndTimestamps(
    thingGroup: string,
    startTimestamp: number,
    endTimestamp: number
  ): Promise<ThingPayload[]> {
    return this.client('thing_payloads AS tp')
      .select(['tp.id', 'tp.device_id AS deviceId', 'tp.payload_timestamp AS payloadTimestamp', 'tp.payload'])
      .join('thing_group_devices AS tgd', 'tgd.device_id', '=', 'tp.device_id')
      .join('thing_groups AS tg', 'tg.name', '=', 'tgd.thing_group')
      .whereBetween('tp.payload_timestamp', [startTimestamp, endTimestamp])
      .andWhere('tg.name', thingGroup)
      .orderBy('tp.payload_timestamp', 'ASC')
      .orderBy('tp.device_id', 'ASC')
      .limit(300)
  },

  async findThingPayloadsByThingTypeAndTimestamps(
    thingType: string,
    startTimestamp: number,
    endTimestamp: number
  ): Promise<ThingPayload[]> {
    return this.client('thing_payloads AS tp')
      .select(['tp.id', 'tp.device_id AS deviceId', 'tp.payload_timestamp AS payloadTimestamp', 'tp.payload'])
      .join('things AS t', 't.device_id', '=', 'tp.device_id')
      .join('thing_types AS tt', 'tt.name', '=', 't.thing_type')
      .whereBetween('tp.payload_timestamp', [startTimestamp, endTimestamp])
      .andWhere('tt.name', thingType)
      .orderBy('tp.payload_timestamp', 'ASC')
      .orderBy('tp.device_id', 'ASC')
      .limit(300)
  },
}

export default db
