// eslint-disable no-unused-var
import db from '../src/db'
import { createThingPayload } from '../test/helper/thingHelper'

export const DEVICE_IDS: string[] = [
  'aaa-111111',
  'bbb-222222',
  'ccc-333333',
  'ddd-444444',
  'eee-555555',
  'fff-666666',
]
export const THING_NAMES: string[] = ['thingOne', 'thingTwo', 'thingThree', 'thingFour', 'thingFive', 'thingSix']
export const THING_TYPE_NAMES: string[] = ['thingTypeOne', 'thingTypeTwo', 'thingTypeThree']
export const THING_GROUP_NAMES: string[] = [
  'test-one-env',
  'test-two-env',
  'test-three-env',
  'test-four-env',
  'test-five-env',
  'test-six-env',
]

const insertThingPayload = async (deviceId: string, index: number): Promise<void> => {
  const thingPayload = createThingPayload({
    deviceId,
    increment: index,
  })

  await db.client('thing_payloads').insert({
    device_id: thingPayload.deviceId,
    payload_timestamp: thingPayload.payloadTimestamp,
    payload: thingPayload.payload,
  })
}

export const seed = async (): Promise<void> => {
  await cleanup()

  await db.client('thing_groups').insert([
    { name: THING_GROUP_NAMES[0], description: THING_GROUP_NAMES[0] },
    { name: THING_GROUP_NAMES[1], description: THING_GROUP_NAMES[1] },
    { name: THING_GROUP_NAMES[2], description: THING_GROUP_NAMES[2] },
    { name: THING_GROUP_NAMES[3], description: THING_GROUP_NAMES[3] },
    { name: THING_GROUP_NAMES[4], description: THING_GROUP_NAMES[4] },
    { name: THING_GROUP_NAMES[5], description: THING_GROUP_NAMES[5] },
  ])

  await db.client('thing_types').insert([
    { name: THING_TYPE_NAMES[0], description: THING_NAMES[0] },
    { name: THING_TYPE_NAMES[1], description: THING_NAMES[1] },
    { name: THING_TYPE_NAMES[2], description: THING_NAMES[2] },
  ])

  await db.client('things').insert([
    { name: THING_NAMES[0], description: THING_NAMES[0], device_id: DEVICE_IDS[0], thing_type: THING_TYPE_NAMES[0] },
    { name: THING_NAMES[1], description: THING_NAMES[1], device_id: DEVICE_IDS[1], thing_type: THING_TYPE_NAMES[0] },
    { name: THING_NAMES[2], description: THING_NAMES[2], device_id: DEVICE_IDS[2], thing_type: THING_TYPE_NAMES[1] },
    { name: THING_NAMES[3], description: THING_NAMES[3], device_id: DEVICE_IDS[3], thing_type: THING_TYPE_NAMES[1] },
    { name: THING_NAMES[4], description: THING_NAMES[4], device_id: DEVICE_IDS[4], thing_type: THING_TYPE_NAMES[2] },
    { name: THING_NAMES[5], description: THING_NAMES[5], device_id: DEVICE_IDS[5], thing_type: THING_TYPE_NAMES[2] },
  ])

  await db.client('thing_group_devices').insert([
    { thing_group: THING_GROUP_NAMES[0], device_id: DEVICE_IDS[0] },
    { thing_group: THING_GROUP_NAMES[1], device_id: DEVICE_IDS[1] },
    { thing_group: THING_GROUP_NAMES[1], device_id: DEVICE_IDS[2] },
    { thing_group: THING_GROUP_NAMES[2], device_id: DEVICE_IDS[3] },
    { thing_group: THING_GROUP_NAMES[2], device_id: DEVICE_IDS[4] },
    { thing_group: THING_GROUP_NAMES[2], device_id: DEVICE_IDS[5] },
  ])
}

export const thingPayloadSeed = async (payloadsTotal: number): Promise<void> => {
  const thingPayloadInserts = []

  for (let payloadsCounter = 0; payloadsCounter < payloadsTotal; payloadsCounter++) {
    thingPayloadInserts.push(await insertThingPayload(DEVICE_IDS[0], payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(DEVICE_IDS[1], payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(DEVICE_IDS[2], payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(DEVICE_IDS[3], payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(DEVICE_IDS[4], payloadsCounter))
    thingPayloadInserts.push(await insertThingPayload(DEVICE_IDS[5], payloadsCounter))
  }

  await Promise.all(thingPayloadInserts)
}

export const cleanup = async (): Promise<void> => {
  await db.client('thing_group_devices').del()
  await db.client('thing_groups').del()
  await db.client('thing_types').del()
  await db.client('things').del()
  await db.client('thing_payloads').del()
}
