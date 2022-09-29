import knex from 'knex'

import env from './env'
import { SimpleThing, ThingPayload, Thing, ThingType } from './types'
import { DatabaseInterface } from './dbTypes'

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

  async findThingTypeByName(thingType: ThingType): Promise<Array<ThingType>> {
    return this.client('thing_types').select(['name']).where({ name: thingType.name })
  },

  async findThingTypes(): Promise<Array<ThingType>> {
    return this.client('thing_types').select(['name'])
  },

  async addThingType(thingType: ThingType): Promise<Array<ThingType>> {
    return this.client('thing_types').insert(thingType).returning(['name'])
  },

  async addThing(thing: SimpleThing): Promise<Array<Thing>> {
    return this.client('things')
      .insert({ name: thing.name, thing_type: thing.thingType.name })
      .returning(['id', 'name', 'thing_type AS thingType'])
  },

  async findThingById(id: string): Promise<Array<Thing>> {
    return this.client('things').select(['id']).where({ id })
  },

  async findThingByName(thing: SimpleThing): Promise<Array<Thing>> {
    return this.client('things').select(['id', 'name', 'thing_type AS thingType']).where({ name: thing.name })
  },

  async findThings(): Promise<Array<Thing>> {
    return this.client('things').select(['id', 'name', 'thing_type AS thingType']).orderBy('id').orderBy('name')
  },

  async addThingPayload(thingPayload: ThingPayload): Promise<Array<ThingPayload>> {
    return this.client('thing_payloads').insert(thingPayload).returning(['id', 'thing', 'timestamp', 'payload'])
  },

  async findThingPayloadsByThingId(thingId: string): Promise<Array<ThingPayload>> {
    return this.client('thing_payloads')
      .select(['id', 'thing', 'timestamp', 'payload'])
      .where({ thing: thingId })
      .orderBy('timestamp')
  },
}

export default db
