import { Knex } from 'knex'

import { SimpleThingPayload, Thing, ThingGroup, ThingGroupDevice, ThingPayload, ThingType } from './types'

export interface DatabaseInterface {
  client: Knex
  findThingGroupByName(name: string): Promise<Array<ThingGroup>>
  findThingGroups(): Promise<Array<ThingGroup>>
  addThingGroup(thingGroup: ThingGroup): Promise<Array<ThingGroup>>
  findThingGroupDevices(): Promise<Array<ThingGroupDevice>>
  findThingGroupDevicesByName(name: string): Promise<Array<ThingGroupDevice>>
  findThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<Array<ThingGroupDevice>>
  addThingGroupDevice(thingGroupDevice: ThingGroupDevice): Promise<Array<ThingGroupDevice>>
  findThingTypeByName(name: string): Promise<Array<ThingType>>
  findThingTypes(): Promise<Array<ThingType>>
  addThingType(thingType: ThingType): Promise<Array<ThingType>>
  addThing(thing: Thing): Promise<Array<Thing>>
  findThingByDeviceId(deviceId: string): Promise<Array<Thing>>
  findThingByName(name: string): Promise<Array<Thing>>
  findThingByType(name: string): Promise<Array<Thing>>
  findThings(): Promise<Array<Thing>>
  findThingsByThingType(name: string): Promise<Array<Thing>>
  addThingPayload(thingPayload: SimpleThingPayload): Promise<Array<ThingPayload>>
  findThingPayloadsByTimestamps(startTimestamp: number, endTimestamp: number): Promise<ThingPayload[]>
  findThingPayloadsByDeviceIdAndTimestamps(
    deviceId: string,
    startTimestamp: number,
    endTimestamp: number
  ): Promise<ThingPayload[]>
  findThingPayloadsByThingGroupAndTimestamps(
    thingGroup: string,
    startTimestamp: number,
    endTimestamp: number
  ): Promise<ThingPayload[]>
  findThingPayloadsByThingTypeAndTimestamps(
    thingType: string,
    startTimestamp: number,
    endTimestamp: number
  ): Promise<ThingPayload[]>
}
