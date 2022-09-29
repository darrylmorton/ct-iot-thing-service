import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'

import { SimpleThing, Thing, ThingPayload, ThingType } from '../../src/types'

export const createTimestamp = (incrementValue?: number): number => {
  // 24 hours in seconds subtracted for more realistic seed data
  const currentTimeYesterdayInSeconds: number = Date.now() / 1000 - 86400
  const increment = incrementValue ? incrementValue * 300 : 0

  return Math.floor(currentTimeYesterdayInSeconds + increment)
}

const generateReadingValue = (max: number, min: number): number => {
  return Math.random() * (max - min) + min
}

export const createThingType = (thingTypeName: string): ThingType => {
  const thingType: ThingType = {
    name: thingTypeName,
  }

  return thingType
}

export const createThing = (thingName: string, thingTypeName: string): SimpleThing => {
  const thing: SimpleThing = {
    name: thingName,
    thingType: createThingType(thingTypeName),
  }

  return thing
}

export const createThingPayload = (thingId: string, increment?: number): ThingPayload => {
  const payload: ThingPayload = {
    thing: thingId,
    timestamp: createTimestamp(increment),
    payload: {
      cadence: {
        value: 300,
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

  return payload
}

interface TestThingPayload extends ThingPayload {
  id: string
}

export const assertThing = (actualResult: Thing, expectedResult: SimpleThing): void => {
  expect(isValidUuid(actualResult.id)).to.be.true
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.thingType).to.deep.equal(expectedResult.thingType.name)
}

export const assertThingPayload = (actualResult: TestThingPayload, expectedResult: ThingPayload): void => {
  expect(isValidUuid(actualResult.id)).to.be.true
  expect(isValidUuid(actualResult.thing)).to.be.true
  expect(actualResult.timestamp).to.equal(expectedResult.timestamp)
  expect(actualResult.payload).to.deep.equal(expectedResult.payload)
}
