import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'

import { SimpleThing, ThingPayload, ThingType } from '../../src/types'

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

export const createThingPayload = (thingId: string): ThingPayload => {
  const payload: ThingPayload = {
    thing: thingId,
    timestamp: Math.floor(Date.now() / 1000),
    payload: {
      cadence: {
        value: 20,
        unit: 'seconds',
      },
      battery: {
        value: 40,
        unit: '%',
      },
      temperature: {
        value: 50,
        unit: 'C',
        connection: 'pin:4',
      },
      humidity: {
        value: 60,
        unit: '%',
        connection: 'pin:6',
        precipitation: false,
      },
    },
  }

  return payload
}

export const assertThing = (actualResult: any, expectedResult: SimpleThing): void => {
  expect(isValidUuid(actualResult.id)).to.be.true
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.thingType).to.deep.equal(expectedResult.thingType.name)
}

export const assertThingPayload = (actualResult: any, expectedResult: ThingPayload): void => {
  expect(isValidUuid(actualResult.id)).to.be.true
  expect(isValidUuid(actualResult.thing)).to.be.true
  expect(actualResult.timestamp).to.equal(expectedResult.timestamp)
  expect(actualResult.payload).to.deep.equal(expectedResult.payload)
}
