import knex from 'knex'

import env from './env'
import { SimpleThing, Things, ThingType, ThingTypes } from './types'

export const client = knex({
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
})

export const findThingTypeByName = async (requestBody: ThingType): Promise<ThingTypes> => {
  return client('thing_types').select(['name']).where({ name: requestBody.name })
}

export const findThingTypes = async (): Promise<ThingTypes> => {
  return client('thing_types').select(['name'])
}

export const addThingType = async (requestBody: ThingType): Promise<ThingTypes> => {
  return client('thing_types').insert(requestBody).returning(['name'])
}

export const addThing = async (requestBody: SimpleThing): Promise<Things> => {
  return client('things')
    .insert({ name: requestBody.name, thing_type: requestBody.thingType.name })
    .returning(['id', 'name', 'thing_type AS thingType'])
}

export const findThingByName = async (requestBody: SimpleThing): Promise<Things> => {
  return client('things').select(['id', 'name', 'thing_type AS thingType']).where({ name: requestBody.name })
}

export const findThings = async (): Promise<Things> => {
  return client('things').select(['id', 'name', 'thing_type AS thingType']).orderBy('id').orderBy('name')
}

module.exports = {
  client,
  addThingType,
  findThingTypeByName,
  addThing,
  findThingByName,
  findThings,
}
