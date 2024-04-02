// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'
import { addMinutes, getUnixTime, startOfYesterday, subDays } from 'date-fns'

import { Thing, ThingGroup, ThingType } from '../../src/types'

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

export const createThing = (name: string, deviceId: string, thingTypeName: string): Thing => {
  return {
    name,
    description: name,
    deviceId,
    thingType: thingTypeName,
  }
}

export const createThingGroup = (name: string): ThingGroup => {
  return {
    name,
    description: name,
  }
}

// prettier-ignore
export const createThingPayload = ({ deviceId, increment }: { deviceId?: any, increment?: number }): any => {
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

export const assertThing = (actualResult: any, expectedResult: any): void => {
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
  expect(actualResult.description).to.equal(expectedResult.description)
  expect(actualResult.thingType).to.equal(expectedResult.thingType)
}

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
