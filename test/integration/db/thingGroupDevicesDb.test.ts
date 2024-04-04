import db from '../../../src/db'
import {
  assertThingGroupDevices,
  createThingGroupDevices,
  DEVICE_IDS,
  SORT_THING_GROUP_DEVICES_BY_THING_GROUP,
  SORT_THING_GROUP_DEVICES_BY_THING_GROUP_AND_DEVICE_ID,
  THING_GROUP_NAMES,
} from '../../helper/thingHelper'
import { seed } from '../../../seeds/things'

describe.only('Thing Group Devices', () => {
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
})
