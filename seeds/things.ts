import { client } from '../src/db'
import { ThingPayload } from '../src/types'
import { createThingPayload } from '../test/helper/thingHelper'

const PAYLOADS_TOTAL: number = 1000
const thingNames: Array<string> = ['thingOne', 'thingTwo', 'thingThree', 'thingFour', 'thingFive', 'thingSix']
const thingTypeNames: Array<string> = ['thingTypeOne', 'thingTypeTwo', 'thingTypeThree']

export const seed = async (): Promise<void> => {
  await cleanup()

  await client('thing_types')
    .insert([{ name: thingTypeNames[0] }, { name: thingTypeNames[1] }, { name: thingTypeNames[2] }])
    .returning(['name'])

  const [
    { id: thingOneId },
    { id: thingTwoId },
    { id: thingThreeId },
    { id: thingFourId },
    { id: thingFiveId },
    { id: thingSixId },
  ] = await client('things')
    .insert([
      { name: thingNames[0], thing_type: thingTypeNames[0] },
      { name: thingNames[1], thing_type: thingTypeNames[0] },
      { name: thingNames[2], thing_type: thingTypeNames[1] },
      { name: thingNames[3], thing_type: thingTypeNames[1] },
      { name: thingNames[4], thing_type: thingTypeNames[2] },
      { name: thingNames[5], thing_type: thingTypeNames[2] },
    ])
    .returning(['id'])

  for (let payloadsCounter = 0; payloadsCounter < PAYLOADS_TOTAL; payloadsCounter++) {
    const thingOnePayload: ThingPayload = createThingPayload(thingOneId, payloadsCounter)
    await client('thing_payloads').insert(thingOnePayload)
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
