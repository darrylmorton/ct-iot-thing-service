/* eslint-disable no-unused-vars */
import { SimpleThing, ThingPayload, ThingPayloads, Things, ThingType, ThingTypes } from './types'
import { Knex } from 'knex'

export interface DatabaseInterface {
  client: Knex
  findThingTypeByName(requestBody: ThingType): Promise<ThingTypes>
  findThingTypes(): Promise<ThingTypes>
  addThingType(requestBody: ThingType): Promise<ThingTypes>
  addThing(requestBody: SimpleThing): Promise<Things>
  findThingByName(requestBody: SimpleThing): Promise<Things>
  findThings(): Promise<Things>
  addThingPayload(requestBody: ThingPayload): Promise<ThingPayloads>
  findThingPayloadsByThingId(thingId: string): Promise<ThingPayloads>
}
