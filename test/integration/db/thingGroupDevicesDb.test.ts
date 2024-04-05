import db from '../../../src/db'
import {
  assertThingGroupDevices,
  createThingGroupDevice,
  createThingGroupDevices,
  DEVICE_IDS,
  SORT_THING_GROUP_DEVICES_BY_THING_GROUP,
  SORT_THING_GROUP_DEVICES_BY_THING_GROUP_AND_DEVICE_ID,
  THING_GROUP_NAMES,
  THING_NAMES,
  THING_TYPE_NAMES,
} from '../../helper/thingHelper'
import { cleanup, seed } from '../../../seeds/things'
import { ThingGroupDevice } from '../../../src/types/types'

describe('Thing Group Devices', () => {
  before(async () => {
    await seed()
  })

  describe('finders', () => {
    it('all', async () => {
      const expectedResult = createThingGroupDevices(SORT_THING_GROUP_DEVICES_BY_THING_GROUP_AND_DEVICE_ID)

      const actualResult = await db.findThingGroupDevices()

      assertThingGroupDevices(actualResult, expectedResult)
    })

    it('by name', async () => {
      const thingGroupName = THING_GROUP_NAMES[2]
      const expectedResult = createThingGroupDevices(SORT_THING_GROUP_DEVICES_BY_THING_GROUP).filter(
        (item) => item.thingGroup === thingGroupName
      )

      const actualResult = await db.findThingGroupDevicesByName(thingGroupName)

      assertThingGroupDevices(actualResult, expectedResult)
    })

    it('by name and device id', async () => {
      const thingGroupName = THING_GROUP_NAMES[2]
      const deviceId = DEVICE_IDS[3]

      const expectedResult = createThingGroupDevices(SORT_THING_GROUP_DEVICES_BY_THING_GROUP_AND_DEVICE_ID).filter(
        (item) => item.thingGroup === thingGroupName && item.deviceId === deviceId
      )

      const actualResult = await db.findThingGroupDeviceByNameAndDeviceId(thingGroupName, deviceId)

      assertThingGroupDevices(actualResult, expectedResult)
    })
  })

  describe('add', () => {
    before(async () => {
      await cleanup()
    })

    it('single', async () => {
      await db.addThingType({ name: THING_TYPE_NAMES[0], description: THING_TYPE_NAMES[0] })
      await db.addThingGroup({ name: THING_GROUP_NAMES[0], description: THING_GROUP_NAMES[0] })
      await db.addThing({
        name: THING_NAMES[0],
        description: THING_NAMES[0],
        deviceId: DEVICE_IDS[0],
        thingType: THING_TYPE_NAMES[0],
      })
      const expectedResult: ThingGroupDevice[] = [createThingGroupDevice(THING_GROUP_NAMES[0], DEVICE_IDS[0])]

      const actualResult = await db.addThingGroupDevice(expectedResult[0])

      assertThingGroupDevices(actualResult, expectedResult)
    })
  })
})
