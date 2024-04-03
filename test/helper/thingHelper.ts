// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'
import { addMinutes, getUnixTime, startOfYesterday, subDays } from 'date-fns'

import { Thing, ThingGroup, ThingGroupDevice, ThingPayload, ThingType } from '../../src/types'

export const DEVICE_IDS: string[] = ['aaa-111111', 'bbb-222222', 'ccc-333333', 'ddd-444444', 'eee-555555', 'fff-666666']
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

export const createTimestamp = (incrementValue?: number): number => {
  const yesterday: Date = startOfYesterday()
  const incrementDate: Date = incrementValue ? addMinutes(yesterday, incrementValue * 30) : yesterday

  return getUnixTime(incrementDate)
}

export const getStartTimestamp = (today: Date): string => {
  return subDays(today, 1).toISOString()
}

export const getEndTimestamp = (today: Date): string => {
  return today.toISOString()
}

const generateReadingValue = (max: number, min: number): number => {
  return Math.random() * (max - min) + min
}

export const createThingType = (name: string): ThingType => {
  return {
    name,
    description: name,
  }
}

export const createThingTypes = (): ThingType[] => {
  return [
    { name: THING_TYPE_NAMES[0], description: THING_NAMES[0] },
    { name: THING_TYPE_NAMES[1], description: THING_NAMES[1] },
    { name: THING_TYPE_NAMES[2], description: THING_NAMES[2] },
  ]
}

export const createThing = (name: string, deviceId: string, thingTypeName: string): Thing => {
  return {
    name,
    description: name,
    deviceId,
    thingType: thingTypeName,
  }
}

export const createThings = (): Thing[] => {
  return [
    { name: THING_NAMES[0], description: THING_NAMES[0], deviceId: DEVICE_IDS[0], thingType: THING_TYPE_NAMES[0] },
    { name: THING_NAMES[1], description: THING_NAMES[1], deviceId: DEVICE_IDS[1], thingType: THING_TYPE_NAMES[0] },
    { name: THING_NAMES[2], description: THING_NAMES[2], deviceId: DEVICE_IDS[2], thingType: THING_TYPE_NAMES[1] },
    { name: THING_NAMES[3], description: THING_NAMES[3], deviceId: DEVICE_IDS[3], thingType: THING_TYPE_NAMES[1] },
    { name: THING_NAMES[4], description: THING_NAMES[4], deviceId: DEVICE_IDS[4], thingType: THING_TYPE_NAMES[2] },
    { name: THING_NAMES[5], description: THING_NAMES[5], deviceId: DEVICE_IDS[5], thingType: THING_TYPE_NAMES[2] },
  ]
}

export const createThingGroup = (name: string): ThingGroup => {
  return {
    name,
    description: name,
  }
}

export const createThingGroups = (): ThingGroup[] => {
  return [
    { name: THING_GROUP_NAMES[0], description: THING_GROUP_NAMES[0] },
    { name: THING_GROUP_NAMES[1], description: THING_GROUP_NAMES[1] },
    { name: THING_GROUP_NAMES[2], description: THING_GROUP_NAMES[2] },
    { name: THING_GROUP_NAMES[3], description: THING_GROUP_NAMES[3] },
    { name: THING_GROUP_NAMES[4], description: THING_GROUP_NAMES[4] },
    { name: THING_GROUP_NAMES[5], description: THING_GROUP_NAMES[5] },
  ]
}

export const createThingGroupDevices = (): ThingGroupDevice[] => {
  return [
    { thingGroup: THING_GROUP_NAMES[0], deviceId: DEVICE_IDS[0] },
    { thingGroup: THING_GROUP_NAMES[1], deviceId: DEVICE_IDS[1] },
    { thingGroup: THING_GROUP_NAMES[1], deviceId: DEVICE_IDS[2] },
    { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[3] },
    { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[4] },
    { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[5] },
  ]
}

// prettier-ignore
export const createThingPayload = ({ deviceId, increment }: { deviceId?: any, increment?: number }): ThingPayload => {
  return {
    deviceId,
    payloadTimestamp: createTimestamp(increment),
    payload: {
      cadence: {
        value: 1800,
        unit: 'seconds',
      },
      battery: {
        value: 50,
        unit: '%',
      },
      temperature: {
        value: generateReadingValue(16, 38),
        unit: 'C',
        connection: 'pin:4',
      },
      humidity: {
        value: generateReadingValue(32, 81),
        unit: '%',
        connection: 'pin:6',
        precipitation: false,
      },
    },
  }
}
export const createThingPayloads = (payloadsTotal: number): ThingPayload[] => {
  const thingPayloads: ThingPayload[] = []

  for (let payloadsCounter = 0; payloadsCounter < payloadsTotal; payloadsCounter++) {
    thingPayloads.push(createThingPayload(DEVICE_IDS[0], payloadsCounter))
    thingPayloads.push(createThingPayload(DEVICE_IDS[1], payloadsCounter))
    thingPayloads.push(createThingPayload(DEVICE_IDS[2], payloadsCounter))
    thingPayloads.push(createThingPayload(DEVICE_IDS[3], payloadsCounter))
    thingPayloads.push(createThingPayload(DEVICE_IDS[4], payloadsCounter))
    thingPayloads.push(createThingPayload(DEVICE_IDS[5], payloadsCounter))
  }

  return thingPayloads
}

export const assertThing = (actualResult: any, expectedResult: any): void => {
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
  expect(actualResult.description).to.equal(expectedResult.description)
  expect(actualResult.thingType).to.equal(expectedResult.thingType)
}

// export const assertThings = (actualResult: any, expectedResult: any): void => {
//   expect(actualResult.name).to.equal(expectedResult.name)
//   expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
//   expect(actualResult.description).to.equal(expectedResult.description)
//   expect(actualResult.thingType).to.equal(expectedResult.thingType)
// }

export const assertThingPayload = (actualResult: any, expectedResult: any): void => {
  expect(isValidUuid(actualResult.id as string)).to.equal(true)
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
  expect(actualResult.payloadTimestamp).to.equal(expectedResult.payloadTimestamp)
  expect(actualResult.payload).to.deep.equal(expectedResult.payload)
}

export const assertThingGroupDevice = (actualResult: any, expectedResult: any): void => {
  expect(isValidUuid(actualResult.id as string)).to.equal(true)
  expect(actualResult.thingGroup).to.equal(expectedResult.thingGroup)
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
}

export const assertThingGroupDevices = (actualResult: any, expectedResult: any): void => {
  expect(actualResult).to.have.length(expectedResult.length as number)

  for (let counter = 0; counter < actualResult.length; counter++) {
    assertThingGroupDevice(actualResult[counter], expectedResult[counter])
  }
}
