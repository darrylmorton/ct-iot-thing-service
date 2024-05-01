// eslint-disable no-unused-var
import db from '../src/db'
import { createThingGroupDevices, createThingGroups, createThings, createThingTypes } from '../test/helper/thingHelper'

const createThingTypesData = (): any[] => {
  return createThingTypes()
}

const createThingsData = (): any[] => {
  return createThings().reduce((acc: any, item: any) => {
    delete Object.assign(item, { device_id: item.deviceId }).deviceId
    delete Object.assign(item, { thing_type: item.thingType }).thingType

    acc.push(item)

    return acc
  }, [])
}

const createThingGroupsData = (): any[] => {
  return createThingGroups()
}

const createThingGroupDevicesData = (): any[] => {
  return createThingGroupDevices().reduce((acc: any, item: any) => {
    delete Object.assign(item, { thing_group: item.thingGroup }).thingGroup
    delete Object.assign(item, { device_id: item.deviceId }).deviceId

    acc.push(item)

    return acc
  }, [])
}

export const seed = async (): Promise<void> => {
  await cleanup()

  await db.client('thing_groups').insert(createThingGroupsData())

  await db.client('thing_types').insert(createThingTypesData())

  await db.client('things').insert(createThingsData())

  await db.client('thing_group_devices').insert(createThingGroupDevicesData())
}

export const cleanup = async (): Promise<void> => {
  await db.client('thing_group_devices').del()
  await db.client('thing_groups').del()
  await db.client('thing_types').del()
  await db.client('things').del()
}
