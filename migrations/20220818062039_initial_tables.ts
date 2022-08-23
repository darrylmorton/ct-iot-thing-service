import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // check extension is not installed
  const [extInstalled] = await knex('pg_extension').select('*').where({ extname: 'uuid-ossp' })

  if (!extInstalled) {
    await knex.raw('CREATE EXTENSION "uuid-ossp"')
  }

  const uuidGenerateV4 = () => knex.raw('uuid_generate_v4()')
  const now = () => knex.fn.now()

  await knex.schema.createTable('thing_types', (def) => {
    def.string('name', 25).notNullable().unique()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())

    def.primary(['name'])

    def.index(['name'])
  })

  await knex.schema.createTable('things', (def) => {
    def.uuid('id').primary().defaultTo(uuidGenerateV4())
    def.string('name', 25).notNullable()
    def.string('thing_type').notNullable()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())

    def.primary(['id'])
    def.foreign('thing_type').references('thing_types.name').onDelete('CASCADE').onUpdate('CASCADE')

    def.index(['name'])
    def.index(['thing_type'])
  })

  await knex.schema.createTable('thing_payloads', (def) => {
    def.uuid('id').defaultTo(uuidGenerateV4())
    def.uuid('thing').notNullable()
    def.integer('timestamp').notNullable()
    def.jsonb('payload').notNullable()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())

    def.primary(['id'])
    def.foreign('thing').references('things.id').onDelete('CASCADE').onUpdate('CASCADE')

    def.index(['timestamp'])
    def.index(['thing'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('thing_payloads')
  await knex.schema.dropTable('things')
  await knex.schema.dropTable('thing_types')

  await knex.raw('DROP EXTENSION "uuid-ossp"')
}
