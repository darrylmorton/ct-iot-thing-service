import { Knex } from 'knex'
import CreateTableBuilder = Knex.CreateTableBuilder

export const up = async (knex: Knex): Promise<void> => {
  // check extension is not installed
  const [extInstalled] = await knex('pg_extension').select('*').where({ extname: 'uuid-ossp' })

  if (!extInstalled) {
    await knex.raw('CREATE EXTENSION "uuid-ossp"')
  }

  const uuidGenerateV4 = (): Knex.Raw => knex.raw('uuid_generate_v4()')
  const now = (): Knex.Raw => knex.fn.now()

  // thing_groups
  await knex.schema.createTable('thing_groups', (def: CreateTableBuilder) => {
    def.string('name', 25).notNullable().unique()
    def.string('description', 100).notNullable()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())

    def.primary(['name'])
  })
  // thing_types
  await knex.schema.createTable('thing_types', (def: CreateTableBuilder) => {
    def.string('name', 25).notNullable().unique()
    def.string('description', 100).notNullable()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())

    def.primary(['name'])
  })
  // things
  await knex.schema.createTable('things', (def: CreateTableBuilder) => {
    def.string('name', 25).notNullable().unique()
    def.string('description', 100).notNullable()
    def.string('device_id', 25).notNullable().unique()
    def.string('thing_type').notNullable()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())

    def.primary(['name'])
    def.foreign('thing_type').references('thing_types.name').onDelete('CASCADE').onUpdate('CASCADE')

    def.index(['device_id'])
    def.index(['thing_type'])
  })
  // thing_group_devices
  await knex.schema.createTable('thing_group_devices', (def: CreateTableBuilder) => {
    def.uuid('id').defaultTo(uuidGenerateV4())
    def.string('thing_group').notNullable()
    def.string('device_id').notNullable()
    def.datetime('created_at').notNullable().defaultTo(now())

    def.primary(['id'])
    def.foreign('thing_group').references('thing_groups.name').onDelete('CASCADE').onUpdate('CASCADE')
    def.foreign('device_id').references('things.device_id').onDelete('CASCADE').onUpdate('CASCADE')
  })
  // thing_payloads
  await knex.schema.createTable('thing_payloads', (def: CreateTableBuilder) => {
    def.uuid('id').defaultTo(uuidGenerateV4())
    def.string('device_id').notNullable()
    def.integer('payload_timestamp').notNullable()
    def.jsonb('payload').notNullable()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())

    def.primary(['id'])
    def.foreign('device_id').references('things.device_id').onDelete('CASCADE').onUpdate('CASCADE')

    def.index(['payload_timestamp'])
    def.index(['device_id'])
  })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('thing_group_devices')
  await knex.schema.dropTable('thing_groups')
  await knex.schema.dropTable('thing_payloads')
  await knex.schema.dropTable('things')
  await knex.schema.dropTable('thing_types')

  await knex.raw('DROP EXTENSION "uuid-ossp"')
}
