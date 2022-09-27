/* eslint-disable no-unused-vars */
import { SimpleThing, Thing, ThingPayload, ThingType } from './types'
import { Knex } from 'knex'

export interface DatabaseInterface {
  client: Knex
  findThingTypeByName(thingType: ThingType): Promise<Array<ThingType>>
  findThingTypes(): Promise<Array<ThingType>>
  addThingType(thingType: ThingType): Promise<Array<ThingType>>
  addThing(thing: SimpleThing): Promise<Array<Thing>>
  findThingByName(thing: SimpleThing): Promise<Array<Thing>>
  findThings(): Promise<Array<Thing>>
  addThingPayload(thingPayload: ThingPayload): Promise<Array<ThingPayload>>
  findThingPayloadsByThingId(thingId: string): Promise<Array<ThingPayload>>
}
