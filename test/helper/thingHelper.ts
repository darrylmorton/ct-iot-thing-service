import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'
import { addMinutes, getUnixTime, startOfYesterday, subDays } from 'date-fns'

import { Thing, ThingGroup, ThingGroupDevice, ThingPayload, ThingType } from '../../src/types'

export const createTimestamp = (incrementValue?: number): number => {
  const yesterday: Date = startOfYesterday()
  const incrementDate = incrementValue ? addMinutes(yesterday, incrementValue * 30) : yesterday

  return getUnixTime(incrementDate)
}

export const getStartTimestamp = (today: Date) => {
  return subDays(today, 1).toISOString()
}

export const getEndTimestamp = (today: Date) => {
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

export const createThing = (name: string, deviceId: string, thingTypeName: string) => {
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

export const createThingPayload = ({ deviceId, increment }: { deviceId?: unknown; increment?: number }) => {
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

export const assertThing = (actualResult: Thing, expectedResult: Thing): void => {
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
  expect(actualResult.description).to.equal(expectedResult.description)
  expect(actualResult.thingType).to.equal(expectedResult.thingType)
}

export const assertThingPayload = (actualResult: ThingPayload, expectedResult: Record<string, unknown>): void => {
  expect(isValidUuid(actualResult.id)).to.be.true
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
  expect(actualResult.payloadTimestamp).to.equal(expectedResult.payloadTimestamp)
  expect(actualResult.payload).to.deep.equal(expectedResult.payload)
}

export const assertThingGroupDevice = (
  actualResult: ThingGroupDevice,
  expectedResult: Record<string, unknown>
): void => {
  expect(isValidUuid(actualResult.id)).to.be.true
  expect(actualResult.thingGroup).to.equal(expectedResult.thingGroup)
  expect(actualResult.deviceId).to.equal(expectedResult.deviceId)
}

export const assertThingGroupDevices = (
  actualResult: ThingGroupDevice[],
  expectedResult: Record<string, unknown>[]
): void => {
  expect(actualResult).to.have.length(expectedResult.length)

  for (let counter = 0; counter < actualResult.length; counter++) {
    assertThingGroupDevice(actualResult[counter], expectedResult[counter])
  }
}
