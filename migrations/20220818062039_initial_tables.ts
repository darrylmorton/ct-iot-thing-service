import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // check extension is not installed
  const [extInstalled] = await knex('pg_extension').select('*').where({ extname: 'uuid-ossp' })

  if (!extInstalled) {
    await knex.raw('CREATE EXTENSION "uuid-ossp"')
  }

  const uuidGenerateV4 = () => knex.raw('uuid_generate_v4()')
  const now = () => knex.fn.now()

  await knex.schema.createTable('things', (def) => {
    def.uuid('id').primary().defaultTo(uuidGenerateV4())
    def.string('name', 50).notNullable().unique()
    def.datetime('created_at').notNullable().defaultTo(now())
    def.datetime('updated_at').notNullable().defaultTo(now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('things')
  await knex.raw('DROP EXTENSION "uuid-ossp"')
}
