/* eslint-disable no-unused-vars */
import { SimpleThing, ThingPayload, ThingPayloads, Things, ThingType, ThingTypes } from './types'
import { Knex } from 'knex'

export interface DatabaseInterface {
  client: Knex
  findThingTypeByName(thingType: ThingType): Promise<ThingTypes>
  findThingTypes(): Promise<ThingTypes>
  addThingType(thingType: ThingType): Promise<ThingTypes>
  addThing(thing: SimpleThing): Promise<Things>
  findThingByName(thing: SimpleThing): Promise<Things>
  findThings(): Promise<Things>
  addThingPayload(thingPayload: ThingPayload): Promise<ThingPayloads>
  findThingPayloadsByThingId(thingId: string): Promise<ThingPayloads>
}
