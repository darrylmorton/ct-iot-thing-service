import { Knex } from 'knex'

import { SimpleThingPayload, Thing, ThingGroup, ThingGroupDevice, ThingPayload, ThingType } from './types'

export interface DatabaseInterface {
  client: Knex
  findThingGroupByName(name: string): Promise<ThingGroup[]>
  findThingGroups(): Promise<ThingGroup[]>
  addThingGroup(thingGroup: ThingGroup): Promise<ThingGroup[]>
  findThingGroupDevices(): Promise<ThingGroupDevice[]>
  findThingGroupDevicesByName(name: string): Promise<ThingGroupDevice[]>
  findThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<ThingGroupDevice[]>
  addThingGroupDevice(thingGroupDevice: ThingGroupDevice): Promise<ThingGroupDevice[]>
  findThingTypeByName(name: string): Promise<ThingType[]>
  findThingTypes(): Promise<ThingType[]>
  addThingType(thingType: ThingType): Promise<ThingType[]>
  addThing(thing: Thing): Promise<Thing[]>
  findThingByDeviceId(deviceId: string): Promise<Thing[]>
  findThingByName(name: string): Promise<Thing[]>
  findThingByType(name: string): Promise<Thing[]>
  findThings(): Promise<Thing[]>
  findThingsByThingType(name: string): Promise<Thing[]>
  addThingPayload(thingPayload: SimpleThingPayload): Promise<ThingPayload[]>
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
