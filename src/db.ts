import knex from 'knex'

import env from './env'
import { SimpleThing, ThingPayload, ThingPayloads, Things, ThingType, ThingTypes } from './types'
import { DatabaseInterface } from './dbTypes'

const db: DatabaseInterface = {
  client: knex({
    client: 'pg',
    migrations: {
      tableName: 'migrations',
    },
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
  }),

  async findThingTypeByName(requestBody: ThingType): Promise<ThingTypes> {
    return this.client('thing_types').select(['name']).where({ name: requestBody.name })
  },

  async findThingTypes(): Promise<ThingTypes> {
    return this.client('thing_types').select(['name'])
  },

  async addThingType(requestBody: ThingType): Promise<ThingTypes> {
    return this.client('thing_types').insert(requestBody).returning(['name'])
  },

  async addThing(requestBody: SimpleThing): Promise<Things> {
    return this.client('things')
      .insert({ name: requestBody.name, thing_type: requestBody.thingType.name })
      .returning(['id', 'name', 'thing_type AS thingType'])
  },

  async findThingByName(requestBody: SimpleThing): Promise<Things> {
    return this.client('things').select(['id', 'name', 'thing_type AS thingType']).where({ name: requestBody.name })
  },

  async findThings(): Promise<Things> {
    return this.client('things').select(['id', 'name', 'thing_type AS thingType']).orderBy('id').orderBy('name')
  },

  async addThingPayload(requestBody: ThingPayload): Promise<ThingPayloads> {
    return this.client('thing_payloads').insert(requestBody).returning(['id', 'thing', 'timestamp', 'payload'])
  },

  async findThingPayloadsByThingId(thingId: string): Promise<ThingPayloads> {
    return this.client('thing_payloads')
      .select(['id', 'thing', 'timestamp', 'payload'])
      .where({ thing: thingId })
      .orderBy('timestamp')
  },
}

export default db
