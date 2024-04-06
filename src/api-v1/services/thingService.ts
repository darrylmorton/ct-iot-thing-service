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
import AppUtil from '../../util/AppUtil'

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

  async postThingType(thingType: ThingType): Promise<ServiceThingTypeResponse> {
    const getThingByNameResult: ThingType[] = await db.findThingTypeByName(thingType.name)
    logger.debug('ThingService postThingType: getThingByNameResult', getThingByNameResult)

    if (getThingByNameResult.length === 0) {
      const addThingTypeResult: ThingType[] = await db.addThingType(thingType)
      logger.debug('ThingService postThingType: addThingTypeResult', addThingTypeResult)

      const result: ThingType | null = addThingTypeResult.length === 1 ? addThingTypeResult[0] : null
      logger.debug('ThingService postThingType result', result)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 500, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async getThingGroups(): Promise<ServiceThingGroupsResponse> {
    const result: ThingType[] = await db.findThingGroups()
    logger.debug('ThingService getThingGroups: result', result)

    return { statusCode: 200, result }
  },

  async getThingGroupByName(name: string): Promise<ServiceThingGroupResponse> {
    const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(name)
    logger.debug('ThingService getThingGroupByName: getThingGroupByNameResult', getThingGroupByNameResult)

    const result: ThingGroup | null = getThingGroupByNameResult.length === 1 ? getThingGroupByNameResult[0] : null
    logger.debug('ThingService getThingGroupByName: result', result)

    if (result) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 404, result: {} }
    }
  },

  async postThingGroup(thingGroup: ThingGroup): Promise<ServiceThingGroupResponse> {
    const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(thingGroup.name)
    logger.debug('ThingService postThingGroup: getThingGroupByNameResult', getThingGroupByNameResult)

    if (getThingGroupByNameResult.length === 0) {
      const addThingGroupResult: ThingGroup[] = await db.addThingGroup(thingGroup)
      logger.debug('ThingService postThingGroup: addThingGroupResult', addThingGroupResult)

      const result: ThingGroup | null = addThingGroupResult.length === 1 ? addThingGroupResult[0] : null
      logger.debug('ThingService postThingGroup result', result)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 500, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  // TODO missing tests
  async getThingGroupDevices(): Promise<ServiceThingGroupDevicesResponse> {
    const result: ThingGroupDevice[] = await db.findThingGroupDevices()
    logger.debug('ThingService getThingGroupDevices: result', result)

    return { statusCode: 200, result }
  },

  async getThingGroupDevicesByName(name: string): Promise<ServiceThingGroupDevicesResponse> {
    const result: ThingGroupDevice[] = await db.findThingGroupDevicesByName(name)
    logger.debug('ThingService getThingGroupDevicesByName: result', result)

    if (result.length === 0) {
      return { statusCode: 404, result }
    }

    return { statusCode: 200, result }
  },

  async getThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<ServiceThingGroupDeviceResponse> {
    let lookupResult: ThingGroup[] | Thing[] = []

    lookupResult = await db.findThingGroupByName(name)
    logger.debug({
      label: 'thingService',
      message: 'getThingGroupDeviceByNameAndDeviceId: findThingGroupByNameResult',
      messageObject: lookupResult,
    })

    if (lookupResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    lookupResult = await db.findThingByDeviceId(deviceId)
    logger.debug({
      label: 'thingService',
      message: 'getThingGroupDeviceByNameAndDeviceId: findThingByDeviceIdResult',
      messageObject: lookupResult,
    })

    if (lookupResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const findThingGroupDeviceByNameAndDeviceIdResult: ThingGroupDevice[] =
      await db.findThingGroupDeviceByNameAndDeviceId(name, deviceId)
    logger.debug({
      label: 'thingService',
      message: 'getThingGroupDeviceByNameAndDeviceId: findThingGroupDeviceByNameAndDeviceIdResult',
      messageObject: findThingGroupDeviceByNameAndDeviceIdResult,
    })

    if (findThingGroupDeviceByNameAndDeviceIdResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const result: ThingGroupDevice | null = AppUtil.getFirstThingGroupDeviceArrayElement(
      findThingGroupDeviceByNameAndDeviceIdResult
    )
    logger.debug({
      label: 'thingService',
      message: 'getThingGroupDeviceByNameAndDeviceId: result',
      messageObject: result,
    })

    if (result) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 500, result: {} }
    }
  },

  async postThingGroupDevice(thingGroupDevice: ThingGroupDevice): Promise<ServiceThingGroupDeviceResponse> {
    const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(thingGroupDevice.thingGroup)
    logger.debug('ThingService postThingGroupDevice: getThingGroupByNameResult', getThingGroupByNameResult)

    const getThingByDeviceIdResult: Thing[] = await db.findThingByDeviceId(thingGroupDevice.deviceId)
    logger.debug('ThingService postThingGroupDevice: getThingByDeviceIdResult', getThingByDeviceIdResult)

    if (getThingGroupByNameResult.length === 0 || getThingByDeviceIdResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const thingGroupDeviceResult = await db.findThingGroupDeviceByNameAndDeviceId(
      thingGroupDevice.thingGroup,
      thingGroupDevice.deviceId
    )
    logger.debug('ThingService postThingGroupDevice: thingGroupDeviceResult', thingGroupDeviceResult)

    if (thingGroupDeviceResult.length === 0) {
      const addThingGroupDeviceResult: ThingGroupDevice[] = await db.addThingGroupDevice(thingGroupDevice)
      logger.debug('ThingService postThingGroupDevice: addThingGroupDeviceResult', addThingGroupDeviceResult)

      const result: ThingGroupDevice | null = AppUtil.getFirstThingGroupDeviceArrayElement(addThingGroupDeviceResult)
      logger.debug('ThingService postThingGroupDevice result', result)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 500, result: {} }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async getThingByName(name: string): Promise<ServiceThingResponse> {
    const getThingByNameResult: Thing[] = await db.findThingByName(name)
    logger.debug('ThingService getThingByName: getThingByNameResult', getThingByNameResult)

    const result: Thing | null = AppUtil.getFirstThingArrayElement(getThingByNameResult)
    logger.debug('ThingService getThingByNameResult: result', result)

    if (result) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 404, result: {} }
    }
  },

  async getThings(): Promise<ServiceThingsResponse> {
    const result: Thing[] = await db.findThings()
    logger.debug({
      label: 'thingService',
      message: 'getThings',
      messageObject: result,
    })

    return { statusCode: 200, result }
  },

  // TODO cleanup
  async postThing(thing: Thing): Promise<ServiceThingResponse> {
    const getThingTypeByNameResult: ThingType[] = await db.findThingTypeByName(thing.thingType)
    logger.debug({
      label: 'thingService',
      message: 'postThing: getThingTypeByNameResult',
      messageObject: getThingTypeByNameResult,
    })

    if (getThingTypeByNameResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const getThingByDeviceIdResult: ThingType[] = await db.findThingByDeviceId(thing.deviceId)
    logger.debug({
      label: 'thingService',
      message: 'postThing: getThingByDeviceIdResult',
      messageObject: getThingByDeviceIdResult,
    })

    const getThingByNameResult: Thing[] = await db.findThingByName(thing.name)
    logger.debug({
      label: 'thingService',
      message: 'postThing: getThingByNameResult',
      messageObject: getThingByNameResult,
    })

    if (getThingByDeviceIdResult.length === 0 && getThingByNameResult.length === 0) {
      const addThingResult: Thing[] = await db.addThing(thing)
      logger.debug({
        label: 'thingService',
        message: 'postThing: addThingResult',
        messageObject: addThingResult,
      })

      const result: Thing | null = addThingResult.length === 1 ? addThingResult[0] : null
      logger.debug({
        label: 'thingService',
        message: 'postThing: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 500, result: {} }
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

    const result: ThingPayload | null = addThingPayloadResult.length === 1 ? addThingPayloadResult[0] : null
    logger.debug('ThingService postThingPayload: result', result)

    if (result) {
      return { statusCode: 201, result }
    } else {
      return { statusCode: 500, result }
    }
  },
}

export default thingService
