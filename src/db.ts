import knex from 'knex'

import env from './env'
import { SimpleThing, Things } from './types'

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

export const findThings = async (): Promise<Things> => {
  return client('things').select(['id', 'name']).orderBy('id')
}

export const findThingByName = async (reqBody: SimpleThing): Promise<Things> => {
  return client('things').select(['id', 'name']).where({ name: reqBody.name }).orderBy('id')
}

export const addThing = async (reqBody: SimpleThing): Promise<Things> => {
  return client('things').insert({ name: reqBody.name }).returning(['id', 'name'])
}

module.exports = {
  client,
  findThingByName,
  findThings,
  addThing,
}
