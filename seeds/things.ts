// eslint-disable no-unused-var
import db from '../src/db'
import { ThingPayload } from '../src/types'
import { createThingPayload } from '../test/helper/thingHelper'

const PAYLOADS_TOTAL = 1440 // day in minutes
const thingNames: Array<string> = ['thingOne', 'thingTwo', 'thingThree', 'thingFour', 'thingFive', 'thingSix']
const thingTypeNames: Array<string> = ['thingTypeOne', 'thingTypeTwo', 'thingTypeThree']

const insertThingPayload = async (thingId: string, index: number): Promise<void> => {
  const thingOnePayload: ThingPayload = createThingPayload(thingId, index)

  await db.client('thing_payloads').insert(thingOnePayload)
}

export const seed = async (): Promise<void> => {
  await cleanup()

  await db
    .client('thing_types')
    .insert([{ name: thingTypeNames[0] }, { name: thingTypeNames[1] }, { name: thingTypeNames[2] }])
    .returning(['name'])

  const [
    { id: thingOneId },
    { id: thingTwoId },
    { id: thingThreeId },
    { id: thingFourId },
    { id: thingFiveId },
    { id: thingSixId },
  ] = await db
    .client('things')
    .insert([
      { name: thingNames[0], thing_type: thingTypeNames[0] },
      { name: thingNames[1], thing_type: thingTypeNames[0] },
      { name: thingNames[2], thing_type: thingTypeNames[1] },
      { name: thingNames[3], thing_type: thingTypeNames[1] },
      { name: thingNames[4], thing_type: thingTypeNames[2] },
      { name: thingNames[5], thing_type: thingTypeNames[2] },
    ])
    .returning(['id'])

  const thingPayloadInserts = []

  for (let payloadsCounter = 0; payloadsCounter < PAYLOADS_TOTAL; payloadsCounter++) {
    thingPayloadInserts.push(await insertThingPayload(thingOneId, payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(thingTwoId, payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(thingThreeId, payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(thingFourId, payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(thingFiveId, payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(thingSixId, payloadsCounter))
  }

  const thingPayloadPromises = Promise.all(thingPayloadInserts)
  await thingPayloadPromises
}

export const cleanup = async (): Promise<void> => {
  await db.client('thing_types').del()
  await db.client('things').del()
  await db.client('thing_payloads').del()
}
