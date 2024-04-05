import { getUnixTime, parseISO } from 'date-fns'

import db from '../../db'
import { Thing, ThingPayload, ThingType, SimpleThingPayload, ThingGroup, ThingGroupDevice } from '../../types/types'
import {
  ThingServiceInterface,
  ServiceThingsResponse,
  ServiceThingResponse,
  ServiceThingPayloadsResponse,
  ServiceThingPayloadResponse,
  ServiceThingTypesResponse,
  ServiceThingTypeResponse,
  ServiceThingGroupsResponse,
  ServiceThingGroupResponse,
  ServiceThingGroupDeviceResponse,
  ServiceThingGroupDevicesResponse,
} from '../../types/serviceTypes'
import logger from '../../logger'

const thingService: ThingServiceInterface = {
  async getThingTypes(): Promise<ServiceThingTypesResponse> {
    const result: ThingType[] = await db.findThingTypes()
    logger.debug('ThingService getThingTypes: result', result)

    return { statusCode: 200, result }
  },

  async getThingTypeByName(name: string): Promise<ServiceThingTypeResponse> {
    const getThingTypeByNameResult: ThingType[] = await db.findThingTypeByName(name)
    logger.debug('ThingService getThingTypeByName: getThingTypeByNameResult', getThingTypeByNameResult)

    const result: ThingType | Record<string, unknown> =
      getThingTypeByNameResult.length === 1 ? getThingTypeByNameResult[0] : {}
    logger.debug('ThingService getThingTypeByName: result', result)

    if (getThingTypeByNameResult.length === 1) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 404, result }
    }
  },

  async getThingGroups(): Promise<ServiceThingGroupsResponse> {
    const result: ThingType[] = await db.findThingGroups()
    logger.debug('ThingService getThingGroups: result', result)

    return { statusCode: 200, result }
  },

  async getThingGroupByName(name: string): Promise<ServiceThingGroupResponse> {
    const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(name)
    logger.debug('ThingService getThingGroupByName: getThingGroupByNameResult', getThingGroupByNameResult)

    const result: ThingGroup | Record<string, unknown> =
      getThingGroupByNameResult.length === 1 ? getThingGroupByNameResult[0] : {}
    logger.debug('ThingService getThingGroupByName: result', result)

    if (getThingGroupByNameResult.length === 1) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 404, result }
    }
  },

  async getThingGroupDevices(): Promise<ServiceThingGroupDevicesResponse> {
    const result: ThingGroupDevice[] = await db.findThingGroupDevices()
    logger.debug('ThingService getThingGroupDevices: result', result)

    return { statusCode: 200, result }
  },

  async getThingGroupDevicesByName(name: string): Promise<ServiceThingGroupDevicesResponse> {
    const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(name)
    logger.debug('ThingService getThingGroupDevicesByName: getThingGroupByNameResult', getThingGroupByNameResult)

    if (getThingGroupByNameResult.length === 0) {
      return { statusCode: 404, result: [] }
    }

    const result: ThingGroupDevice[] = await db.findThingGroupDevicesByName(name)
    logger.debug('ThingService getThingGroupDevicesByName: result', result)

    return { statusCode: 200, result }
  },

  async getThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<ServiceThingGroupDeviceResponse> {
    const findThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(name)
    logger.debug(
      'ThingService getThingGroupDeviceByNameAndDeviceId: findThingGroupByNameResult',
      findThingGroupByNameResult
    )

    const findThingByDeviceIdResult: Thing[] = await db.findThingByDeviceId(deviceId)
    logger.debug(
      'ThingService getThingGroupDeviceByNameAndDeviceId: findThingByDeviceIdResult',
      findThingByDeviceIdResult
    )

    if (findThingGroupByNameResult.length === 0 || findThingByDeviceIdResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const findThingGroupDeviceByNameAndDeviceIdResult: ThingGroupDevice[] =
      await db.findThingGroupDeviceByNameAndDeviceId(name, deviceId)
    logger.debug(
      'ThingService getThingGroupDeviceByNameAndDeviceId: findThingGroupDeviceByNameAndDeviceIdResult',
      findThingGroupDeviceByNameAndDeviceIdResult
    )

    const result: ThingGroupDevice | Record<string, unknown> =
      findThingGroupDeviceByNameAndDeviceIdResult.length === 1 ? findThingGroupDeviceByNameAndDeviceIdResult[0] : {}
    logger.debug('ThingService getThingGroupDeviceByNameAndDeviceId result', result)

    if (result) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 400, result }
    }
  },

  async postThingGroupDevice(thingGroupDevice: ThingGroupDevice): Promise<ServiceThingGroupDeviceResponse> {
    const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(thingGroupDevice.thingGroup)
    logger.debug('ThingService postThingGroupDevice: getThingGroupByNameResult', getThingGroupByNameResult)

    const getThingByDeviceIdResult: Thing[] = await db.findThingByDeviceId(thingGroupDevice.deviceId)
    logger.debug('ThingService postThingGroupDevice: getThingByDeviceIdResult', getThingByDeviceIdResult)

    const thingGroupDeviceResult = await db.findThingGroupDeviceByNameAndDeviceId(
      thingGroupDevice.thingGroup,
      thingGroupDevice.deviceId
    )
    logger.debug('ThingService postThingGroupDevice: thingGroupDeviceResult', thingGroupDeviceResult)

    if (
      getThingGroupByNameResult.length === 1 &&
      getThingByDeviceIdResult.length === 1 &&
      thingGroupDeviceResult.length === 0
    ) {
      const addThingGroupDeviceResult: ThingGroupDevice[] = await db.addThingGroupDevice(thingGroupDevice)
      logger.debug('ThingService postThingGroupDevice: addThingGroupDeviceResult', addThingGroupDeviceResult)

      const result: ThingGroupDevice | Record<string, unknown> =
        addThingGroupDeviceResult.length === 1 ? addThingGroupDeviceResult[0] : {}
      logger.debug('ThingService postThingGroupDevice result', result)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async postThingGroup(thingGroup: ThingGroup): Promise<ServiceThingGroupResponse> {
    const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(thingGroup.name)
    logger.debug('ThingService postThingGroup: getThingGroupByNameResult', getThingGroupByNameResult)

    if (getThingGroupByNameResult.length === 0) {
      const addThingGroupResult: ThingGroup[] = await db.addThingGroup(thingGroup)
      logger.debug('ThingService postThingGroup: addThingGroupResult', addThingGroupResult)

      const result: ThingGroup | Record<string, unknown> =
        addThingGroupResult.length === 1 ? addThingGroupResult[0] : {}
      logger.debug('ThingService postThingGroup result', result)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async postThingType(thingType: ThingType): Promise<ServiceThingTypeResponse> {
    const getThingByNameResult: ThingType[] = await db.findThingTypeByName(thingType.name)
    logger.debug('ThingService postThingType: getThingByNameResult', getThingByNameResult)

    if (getThingByNameResult.length === 0) {
      const addThingTypeResult: ThingType[] = await db.addThingType(thingType)
      logger.debug('ThingService postThingType: addThingTypeResult', addThingTypeResult)

      const result: ThingType | Record<string, unknown> = addThingTypeResult.length === 1 ? addThingTypeResult[0] : {}
      logger.debug('ThingService postThingType result', result)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async getThingByName(name: string): Promise<ServiceThingResponse> {
    const getThingByNameResult: Thing[] = await db.findThingByName(name)
    logger.debug('ThingService getThingByName: getThingByNameResult', getThingByNameResult)

    const result: Thing | Record<string, unknown> = getThingByNameResult.length === 1 ? getThingByNameResult[0] : {}
    logger.debug('ThingService getThingByNameResult: result', result)

    if (getThingByNameResult.length === 1) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 404, result }
    }
  },

  async getThings(): Promise<ServiceThingsResponse> {
    const result: Thing[] = await db.findThings()
    logger.debug('ThingService getThings: result', result)

    return { statusCode: 200, result }
  },

  async postThing(thing: Thing): Promise<ServiceThingResponse> {
    const getThingTypeByNameResult: ThingType[] = await db.findThingTypeByName(thing.thingType)
    logger.debug('ThingService postThing: getThingTypeByNameResult', getThingTypeByNameResult)

    if (getThingTypeByNameResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const getThingByDeviceIdResult: ThingType[] = await db.findThingByDeviceId(thing.deviceId)
    logger.debug('ThingService postThing: getThingByDeviceIdResult', getThingByDeviceIdResult)

    const getThingByNameResult: Thing[] = await db.findThingByName(thing.name)
    logger.debug('ThingService postThing: getThingByNameResult', getThingByNameResult)

    if (getThingByDeviceIdResult.length === 0 && getThingByNameResult.length === 0) {
      const addThingResult: Thing[] = await db.addThing(thing)
      logger.debug('ThingService postThing: addThingResult', addThingResult)

      const result: Thing | Record<string, unknown> = addThingResult.length === 1 ? addThingResult[0] : {}
      logger.debug('ThingService postThing: result', result)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async getThingPayloadsByQueryParams(queryParams: Record<string, string>): Promise<ServiceThingPayloadsResponse> {
    const startTimestamp = getUnixTime(parseISO(queryParams.startTimestamp))
    const endTimestamp = getUnixTime(parseISO(queryParams.endTimestamp))

    const deviceId = queryParams.deviceId
    if (deviceId) {
      const result: ThingPayload[] = await db.findThingPayloadsByDeviceIdAndTimestamps(
        deviceId,
        startTimestamp,
        endTimestamp
      )

      return { statusCode: 200, result }
    }

    const thingType = queryParams.thingType
    if (thingType) {
      const result: ThingPayload[] = await db.findThingPayloadsByThingTypeAndTimestamps(
        thingType,
        startTimestamp,
        endTimestamp
      )

      return { statusCode: 200, result }
    }

    const thingGroup = queryParams.thingGroup
    if (thingGroup) {
      const result: ThingPayload[] = await db.findThingPayloadsByThingGroupAndTimestamps(
        thingGroup,
        startTimestamp,
        endTimestamp
      )

      return { statusCode: 200, result }
    }

    const result: ThingPayload[] = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)

    return { statusCode: 200, result }
  },

  async postThingPayload(thingPayload: SimpleThingPayload): Promise<ServiceThingPayloadResponse> {
    const findThingByDeviceIdResult: Thing[] = await db.findThingByDeviceId(thingPayload.deviceId)
    logger.debug('ThingService postThingPayload: findThingByDeviceIdResult', findThingByDeviceIdResult)

    if (findThingByDeviceIdResult.length === 0) {
      return { statusCode: 404, result: [] }
    }

    const addThingPayloadResult: ThingPayload[] = await db.addThingPayload(thingPayload)
    logger.debug('ThingService postThingPayload: addThingPayloadResult', addThingPayloadResult)

    const result: ThingPayload | Record<string, unknown> =
      addThingPayloadResult.length === 1 ? addThingPayloadResult[0] : {}
    logger.debug('ThingService postThingPayload: result', result)

    if (result) {
      return { statusCode: 201, result }
    } else {
      return { statusCode: 400, result }
    }
  },
}

export default thingService
