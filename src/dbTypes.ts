import { Knex } from 'knex'

import { SimpleThing, Thing, ThingPayload, ThingType } from './types'

export interface DatabaseInterface {
  client: Knex
  findThingTypeByName(thingType: ThingType): Promise<Array<ThingType>>
  findThingTypes(): Promise<Array<ThingType>>
  addThingType(thingType: ThingType): Promise<Array<ThingType>>
  addThing(thing: SimpleThing): Promise<Array<Thing>>
  findThingById(id: string): Promise<Array<Thing>>
  findThingByName(thing: SimpleThing): Promise<Array<Thing>>
  findThings(): Promise<Array<Thing>>
  addThingPayload(thingPayload: ThingPayload): Promise<Array<ThingPayload>>
  findThingPayloadsByThingId(thingId: string): Promise<Array<ThingPayload>>
  findThingPayloads(startTimestamp: number, endTimestamp: number, thingIds: string[]): Promise<ThingPayload[]>
}
