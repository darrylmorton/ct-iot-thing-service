import { client } from '../src/db'
import { ThingPayload } from '../src/types'
import { createThingPayload } from '../test/helper/thingHelper'

const PAYLOADS_TOTAL = 1000

export const seed = async (): Promise<void> => {
  await cleanup()

  const [{ name: thingTypeName }] = await client('thing_types').insert({ name: 'thingTypeOne' }).returning(['name'])

  const [{ id: thingId }] = await client('things')
    .insert({ name: 'thingOne', thing_type: thingTypeName })
    .returning(['id'])

  for (let payloadsCounter = 0; payloadsCounter < PAYLOADS_TOTAL; payloadsCounter++) {
    const thingPayload: ThingPayload = createThingPayload(thingId, payloadsCounter)

    await client('thing_payloads').insert(thingPayload)
  }
}

export const cleanup = async (): Promise<void> => {
  await client('thing_types').del()
  await client('things').del()
  await client('thing_payloads').del()
}

module.exports = {
  cleanup,
  seed,
}
