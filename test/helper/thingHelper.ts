import { expect } from 'chai'
import { validate as isValidUuid } from 'uuid'

import { Payload, SimpleThing, ThingType } from '../../src/types'

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

export const createPayload = (thingId: string): Payload => {
  const payload: Payload = {
    thing: thingId,
    timestamp: Date.now(),
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
