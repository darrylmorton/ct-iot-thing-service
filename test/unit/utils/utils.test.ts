import { parseISO, subDays } from 'date-fns'
import { expect } from 'chai'

import { getStartIsoTimestamp } from '../../../src/util/AppUtil'
import {
  assertThing,
  createThing,
  createThingGroup,
  createThingGroupDevice,
  createThingType,
  DEVICE_IDS,
  THING_GROUP_NAMES,
  THING_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import ServiceUtil from '../../../src/util/ServiceUtil'
import { Thing, ThingGroup, ThingGroupDevice, ThingType } from '../../../src/types/types'

describe('Utils', () => {
  describe('App', () => {
    it('getStartIsoTimestamp', async () => {
      const date = parseISO('2024-04-04T19:30:30Z')
      const expectedResult = subDays(date, 2).toISOString()

      const actualResult = getStartIsoTimestamp(date, 2)

      expect(actualResult).to.equal(expectedResult)
    })
  })

  describe('Service', () => {
    it('getFirstThingArrayElement', async () => {
      const expectedResult: Thing = createThing(THING_NAMES[0], THING_NAMES[0], THING_TYPE_NAMES[0])

      const actualResult = ServiceUtil.getFirstThingArrayElement([expectedResult])

      assertThing(actualResult, expectedResult)
    })

    it('getFirstThingArrayElement - null', async () => {
      const expectedResult: Thing[] = []

      const actualResult = ServiceUtil.getFirstThingArrayElement(expectedResult)

      expect(actualResult).to.equal(null)
    })

    it('getFirstThingGroupArrayElement', async () => {
      const expectedResult: ThingGroup = createThingGroup(THING_GROUP_NAMES[0])

      const actualResult = ServiceUtil.getFirstThingGroupArrayElement([expectedResult])

      assertThing(actualResult, expectedResult)
    })

    it('getFirstThingGroupArrayElement - null', async () => {
      const expectedResult: ThingGroup[] = []

      const actualResult = ServiceUtil.getFirstThingGroupArrayElement(expectedResult)

      expect(actualResult).to.equal(null)
    })

    it('getFirstThingGroupDeviceArrayElement', async () => {
      const expectedResult: ThingGroupDevice = createThingGroupDevice(THING_GROUP_NAMES[0], DEVICE_IDS[0])

      const actualResult = ServiceUtil.getFirstThingGroupDeviceArrayElement([expectedResult])

      assertThing(actualResult, expectedResult)
    })

    it('getFirstThingGroupDeviceArrayElement - null', async () => {
      const expectedResult: ThingGroupDevice[] = []

      const actualResult = ServiceUtil.getFirstThingGroupDeviceArrayElement(expectedResult)

      expect(actualResult).to.equal(null)
    })

    it('getFirstThingTypeArrayElement', async () => {
      const expectedResult: ThingType = createThingType(THING_TYPE_NAMES[0])

      const actualResult = ServiceUtil.getFirstThingTypeArrayElement([expectedResult])

      assertThing(actualResult, expectedResult)
    })

    it('getFirstThingTypeArrayElement - null', async () => {
      const expectedResult: ThingType[] = []

      const actualResult = ServiceUtil.getFirstThingTypeArrayElement(expectedResult)

      expect(actualResult).to.equal(null)
    })
  })
})
