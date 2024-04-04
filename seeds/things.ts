// eslint-disable no-unused-var
import db from '../src/db'
import {
  createThingGroupDevices,
  createThingGroups,
  createThingPayloads,
  createThings,
  createThingTypes,
} from '../test/helper/thingHelper'
import { ThingPayload } from '../src/types'

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

const createThingPayloadsData = (payloadsTotal: number, startDate: Date, sortBy?: string): any[] => {
  return createThingPayloads(payloadsTotal, startDate, sortBy).reduce((acc: any, item: any) => {
    delete Object.assign(item, { device_id: item.deviceId }).deviceId
    delete Object.assign(item, { payload_timestamp: item.payloadTimestamp }).payloadTimestamp

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

const insertThingPayload = async (thingPayload: any): Promise<any> => {
  // console.log('insertThingPayload', thingPayload)

  await db.client('thing_payloads').insert({
    device_id: thingPayload.deviceId,
    payload_timestamp: thingPayload.payloadTimestamp,
    payload: thingPayload.payload,
  })
}

export const thingPayloadSeed = async (thingPayloads: ThingPayload[]): Promise<any> => {
  // console.log('thingPayloadSeed thingPayloads', thingPayloads[1].deviceId)

  const thingPayloadInserts = thingPayloads.reduce((acc: any[], item: any): any => {
    // delete Object.assign(item, { device_id: item.deviceId }).deviceId
    // delete Object.assign(item, { payload_timestamp: item.payloadTimestamp }).payloadTimestamp

    // console.log('thingPayloadSeed item', item)

    acc.push(insertThingPayload(item))

    return acc
  }, [])

  // console.log('thingPayloadInserts', thingPayloadInserts)

  await Promise.all(thingPayloadInserts)
}

export const cleanup = async (): Promise<void> => {
  await db.client('thing_group_devices').del()
  await db.client('thing_groups').del()
  await db.client('thing_types').del()
  await db.client('things').del()
  await db.client('thing_payloads').del()
}
