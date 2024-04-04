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

export const SORT_THINGS_BY_NAME_AND_DEVICE_ID = 'SORT_THINGS_BY_NAME_AND_DEVICE_ID'
export const SORT_THINGS_BY_NAME_AND_THING_TYPE = 'SORT_THINGS_BY_NAME_AND_THING_TYPE'
export const SORT_THING_TYPES_BY_NAME = 'SORT_THING_TYPES_BY_NAME'
export const SORT_THING_GROUPS_BY_NAME = 'SORT_THING_GROUPS_BY_NAME'
export const SORT_THING_GROUP_DEVICES_BY_THING_GROUP_AND_DEVICE_ID =
  'SORT_THING_GROUP_DEVICES_BY_THING_GROUP_AND_DEVICE_ID'
// export const SORT_THING_PAYLOADS_BY_TIMESTAMP = 'SORT_THING_PAYLOADS_BY_TIMESTAMP'
export const SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID = 'SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID'
export const SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_THING_GROUP = 'SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_THING_GROUP'

export const createTimestamp = (incrementValue?: number): number => {
  const yesterday: Date = startOfYesterday()
  const incrementDate: Date = incrementValue ? addMinutes(yesterday, incrementValue * 30) : yesterday

  return getUnixTime(incrementDate)
}

export const createTimestampByDateAndIncrement = (startDate: Date, incrementValue?: number): number => {
  const incrementDate: Date = incrementValue ? addMinutes(startDate, incrementValue * 30) : startDate

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

const sortThingTypesByName = (a: ThingType, b: ThingType): number => {
  if (a.name > b.name) {
    return 1
  } else if (a.name < b.name) {
    return -1
  }

  return 0
}

export const createThingTypes = (sortBy?: string): ThingType[] => {
  const result = [
    { name: THING_TYPE_NAMES[0], description: THING_NAMES[0] },
    { name: THING_TYPE_NAMES[1], description: THING_NAMES[1] },
    { name: THING_TYPE_NAMES[2], description: THING_NAMES[2] },
  ]

  switch (sortBy) {
    case SORT_THING_TYPES_BY_NAME:
      return result.sort(sortThingTypesByName)
    default:
      return result
  }
}

export const createThing = (name: string, deviceId: string, thingTypeName: string): Thing => {
  return {
    name,
    description: name,
    deviceId,
    thingType: thingTypeName,
  }
}

const sortThingsByNameAndDeviceId = (a: Thing, b: Thing): number => {
  if (a.name > b.name || a.deviceId > b.name) {
    return 1
  } else if (a.name < b.name || a.deviceId < b.name) {
    return -1
  }

  return 0
}

const sortThingsByNameAndThingType = (a: Thing, b: Thing): number => {
  if (a.name > b.name || a.thingType > b.name) {
    return 1
  } else if (a.name < b.name || a.thingType < b.name) {
    return -1
  }

  return 0
}

export const createThings = (sortBy?: string): Thing[] => {
  const result = [
    { name: THING_NAMES[0], description: THING_NAMES[0], deviceId: DEVICE_IDS[0], thingType: THING_TYPE_NAMES[0] },
    { name: THING_NAMES[1], description: THING_NAMES[1], deviceId: DEVICE_IDS[1], thingType: THING_TYPE_NAMES[0] },
    { name: THING_NAMES[2], description: THING_NAMES[2], deviceId: DEVICE_IDS[2], thingType: THING_TYPE_NAMES[1] },
    { name: THING_NAMES[3], description: THING_NAMES[3], deviceId: DEVICE_IDS[3], thingType: THING_TYPE_NAMES[1] },
    { name: THING_NAMES[4], description: THING_NAMES[4], deviceId: DEVICE_IDS[4], thingType: THING_TYPE_NAMES[2] },
    { name: THING_NAMES[5], description: THING_NAMES[5], deviceId: DEVICE_IDS[5], thingType: THING_TYPE_NAMES[2] },
  ]

  switch (sortBy) {
    case SORT_THINGS_BY_NAME_AND_DEVICE_ID:
      return result.sort(sortThingsByNameAndDeviceId)
    case SORT_THINGS_BY_NAME_AND_THING_TYPE:
      return result.sort(sortThingsByNameAndThingType)
    default:
      return result
  }
}

export const createThingGroup = (name: string): ThingGroup => {
  return {
    name,
    description: name,
  }
}

const sortThingGroupsByName = (a: ThingGroup, b: ThingGroup): number => {
  if (a.name > b.name) {
    return 1
  } else if (a.name < b.name) {
    return -1
  }

  return 0
}

export const createThingGroups = (sortBy?: string): ThingGroup[] => {
  const result = [
    { name: THING_GROUP_NAMES[0], description: THING_GROUP_NAMES[0] },
    { name: THING_GROUP_NAMES[1], description: THING_GROUP_NAMES[1] },
    { name: THING_GROUP_NAMES[2], description: THING_GROUP_NAMES[2] },
    { name: THING_GROUP_NAMES[3], description: THING_GROUP_NAMES[3] },
    { name: THING_GROUP_NAMES[4], description: THING_GROUP_NAMES[4] },
    { name: THING_GROUP_NAMES[5], description: THING_GROUP_NAMES[5] },
  ]

  switch (sortBy) {
    case SORT_THING_GROUPS_BY_NAME:
      return result.sort(sortThingGroupsByName)
    default:
      return result
  }
}

const sortThingGroupDevicesByThingGroupAndDeviceId = (a: ThingGroupDevice, b: ThingGroupDevice): number => {
  if (a.thingGroup > b.thingGroup || a.deviceId > b.thingGroup) {
    return 1
  } else if (a.thingGroup < b.thingGroup || a.deviceId < b.thingGroup) {
    return -1
  }

  return 0
}

export const createThingGroupDevices = (sortBy?: string): ThingGroupDevice[] => {
  const result = [
    { thingGroup: THING_GROUP_NAMES[0], deviceId: DEVICE_IDS[0] },
    { thingGroup: THING_GROUP_NAMES[1], deviceId: DEVICE_IDS[1] },
    { thingGroup: THING_GROUP_NAMES[1], deviceId: DEVICE_IDS[2] },
    { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[3] },
    { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[4] },
    { thingGroup: THING_GROUP_NAMES[2], deviceId: DEVICE_IDS[5] },
  ]

  switch (sortBy) {
    case SORT_THING_GROUP_DEVICES_BY_THING_GROUP_AND_DEVICE_ID:
      return result.sort(sortThingGroupDevicesByThingGroupAndDeviceId)
    default:
      return result
  }
}

// prettier-ignore
export const createThingPayload = ({ deviceId, payloadTimestamp }: { deviceId: string, payloadTimestamp: number }): ThingPayload => {
  return {
    deviceId,
    payloadTimestamp,
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

const sortThingPayloadsByTimestamp = (a: ThingPayload, b: ThingPayload): number => {
  if (a.payloadTimestamp > b.payloadTimestamp) {
    return 1
  } else if (a.payloadTimestamp < b.payloadTimestamp) {
    return -1
  }

  return 0
}

const sortThingPayloadsByTimestampAndDeviceId = (a: ThingPayload, b: ThingPayload): number => {
  if (a.payloadTimestamp > b.payloadTimestamp || a.deviceId > b.payloadTimestamp) {
    return 1
  } else if (a.payloadTimestamp < b.payloadTimestamp || a.deviceId < b.payloadTimestamp) {
    return -1
  }

  return 0
}

export const createThingPayloads = (payloadsTotal: number, startDate: Date, sortBy?: string): ThingPayload[] => {
  const result: ThingPayload[] = []

  for (let payloadsCounter = 0; payloadsCounter < payloadsTotal; payloadsCounter++) {
    const payloadTimestamp = createTimestampByDateAndIncrement(startDate, payloadsCounter)

    result.push(createThingPayload({ deviceId: DEVICE_IDS[0], payloadTimestamp }))
    result.push(createThingPayload({ deviceId: DEVICE_IDS[1], payloadTimestamp }))
    result.push(createThingPayload({ deviceId: DEVICE_IDS[2], payloadTimestamp }))
    result.push(createThingPayload({ deviceId: DEVICE_IDS[3], payloadTimestamp }))
    result.push(createThingPayload({ deviceId: DEVICE_IDS[4], payloadTimestamp }))
    result.push(createThingPayload({ deviceId: DEVICE_IDS[5], payloadTimestamp }))
  }

  switch (sortBy) {
    case SORT_THING_PAYLOADS_BY_TIMESTAMP_AND_DEVICE_ID:
      return result.sort(sortThingPayloadsByTimestampAndDeviceId)
    default:
      return result.sort(sortThingPayloadsByTimestamp)
  }
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

export const assertThingPayloads = (actualResult: any, expectedResult: any): void => {
  expect(actualResult).to.have.length(expectedResult.length as number)

  for (let counter = 0; counter < actualResult.length; counter++) {
    assertThingPayload(actualResult[counter], expectedResult[counter])
  }
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
