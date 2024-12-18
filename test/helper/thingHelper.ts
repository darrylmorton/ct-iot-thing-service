// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'
import { addMinutes, getUnixTime, startOfYesterday, subDays } from 'date-fns'

import { Thing, ThingGroup, ThingGroupDevice, ThingType } from '../../src/types'

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
export const SORT_THING_GROUP_DEVICES_BY_THING_GROUP = 'SORT_THING_GROUP_DEVICES_BY_THING_GROUP'

export const DB_ERROR_MESSAGE = "Cannot read properties of undefined (reading 'client')"

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

export const createThingType = (name: string): ThingType => {
  return {
    name,
    description: name,
  }
}

export const createThingTypes = (sortBy?: string): ThingType[] => {
  const result = [
    { name: THING_TYPE_NAMES[0], description: THING_NAMES[0] },
    { name: THING_TYPE_NAMES[1], description: THING_NAMES[1] },
    { name: THING_TYPE_NAMES[2], description: THING_NAMES[2] },
  ]

  switch (sortBy) {
    case SORT_THING_TYPES_BY_NAME:
      return result.sort((a, b) => a.name.localeCompare(b.name))
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
      return result.sort((a, b) => a.name.localeCompare(b.name) || a.deviceId - b.deviceId)
    case SORT_THINGS_BY_NAME_AND_THING_TYPE:
      return result.sort((a, b) => a.name.localeCompare(b.name) || a.thingType - b.thingType)
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
      return result.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return result
  }
}

export const createThingGroupDevice = (thingGroup: string, deviceId: string): ThingGroupDevice => {
  return { thingGroup, deviceId }
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
      return result.sort((a, b) => a.thingGroup.localeCompare(b.thingGroup) || a.deviceId - b.deviceId)
    default:
      return result
  }
}

export const assertThing = (actualResult: any, expectedResult: any): void => {
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
  expect(actualResult.description).to.equal(expectedResult.description)
  expect(actualResult.thingType).to.equal(expectedResult.thingType)
}

export const assertThings = (actualResult: any, expectedResult: any): void => {
  expect(actualResult).to.have.length(expectedResult.length as number)

  for (let counter = 0; counter < actualResult.length; counter++) {
    assertThing(actualResult[counter], expectedResult[counter])
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

export const assertThingGroup = (actualResult: any, expectedResult: any): void => {
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.description).to.equal(expectedResult.description)
}

export const assertThingGroups = (actualResult: any, expectedResult: any): void => {
  expect(actualResult).to.have.length(expectedResult.length as number)

  for (let counter = 0; counter < actualResult.length; counter++) {
    assertThingGroup(actualResult[counter], expectedResult[counter])
  }
}

export const assertThingType = (actualResult: any, expectedResult: any): void => {
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.description).to.equal(expectedResult.description)
}

export const assertThingTypes = (actualResult: any, expectedResult: any): void => {
  expect(actualResult).to.have.length(expectedResult.length as number)

  for (let counter = 0; counter < actualResult.length; counter++) {
    assertThingType(actualResult[counter], expectedResult[counter])
  }
}
