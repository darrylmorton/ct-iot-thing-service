import { Knex } from 'knex'
import CreateTableBuilder = Knex.CreateTableBuilder

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('thing_payloads')
}

export const down = async (knex: Knex): Promise<void> => {
  const uuidGenerateV4 = (): Knex.Raw => knex.raw('uuid_generate_v4()')
  const now = (): Knex.Raw => knex.fn.now()

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
