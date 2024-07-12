import db from '../../db'
import { Thing, ThingType, ThingGroup, ThingGroupDevice } from '../../types/types'
import {
  ThingServiceInterface,
  ServiceThingsResponse,
  ServiceThingResponse,
  ServiceThingTypesResponse,
  ServiceThingTypeResponse,
  ServiceThingGroupsResponse,
  ServiceThingGroupResponse,
  ServiceThingGroupDeviceResponse,
  ServiceThingGroupDevicesResponse,
} from '../../types/serviceTypes'
import logger from '../../logger'
import ServiceUtil from '../../util/ServiceUtil'

const thingService: ThingServiceInterface = {
  async getThingTypes(): Promise<ServiceThingTypesResponse> {
    try {
      const result: ThingType[] = await db.findThingTypes()
      logger.debug({
        label: 'thingService',
        message: 'getThingTypes: result',
        messageObject: result,
      })

      return { statusCode: 200, result }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThingTypes: result',
        error,
      })

      return { statusCode: 500, result: [] }
    }
  },

  async getThingTypeByName(name: string): Promise<ServiceThingTypeResponse> {
    try {
      const getThingTypeByNameResult: ThingType[] = await db.findThingTypeByName(name)
      logger.debug({
        label: 'thingService',
        message: 'getThingTypeByName: getThingTypeByNameResult',
        messageObject: getThingTypeByNameResult,
      })

      if (getThingTypeByNameResult.length === 0) {
        return { statusCode: 404, result: {} }
      }

      const result: ThingType | null = ServiceUtil.getFirstThingTypeArrayElement(getThingTypeByNameResult)
      logger.debug({
        label: 'thingService',
        message: 'getThingTypeByName: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 200, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThingTypeByName: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },

  async postThingType(thingType: ThingType): Promise<ServiceThingTypeResponse> {
    try {
      const getThingByNameResult: ThingType[] = await db.findThingTypeByName(thingType.name)
      logger.debug({
        label: 'thingService',
        message: 'postThingType: getThingByNameResult',
        messageObject: getThingByNameResult,
      })

      if (getThingByNameResult.length > 0) {
        return { statusCode: 409, result: {} }
      }

      const addThingTypeResult: ThingType[] = await db.addThingType(thingType)
      logger.debug({
        label: 'thingService',
        message: 'postThingType: addThingTypeResult',
        messageObject: addThingTypeResult,
      })

      const result: ThingType | null = ServiceUtil.getFirstThingTypeArrayElement(addThingTypeResult)
      logger.debug({
        label: 'thingService',
        message: 'postThingType: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 201, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'postThingType: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },

  async getThingGroups(): Promise<ServiceThingGroupsResponse> {
    try {
      const result: ThingType[] = await db.findThingGroups()
      logger.debug({
        label: 'thingService',
        message: 'getThingGroups: result',
        messageObject: result,
      })

      return { statusCode: 200, result }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThingGroups: result',
        error,
      })

      return { statusCode: 500, result: [] }
    }
  },

  async getThingGroupByName(name: string): Promise<ServiceThingGroupResponse> {
    try {
      const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(name)
      logger.debug({
        label: 'thingService',
        message: 'getThingGroupByName: getThingGroupByNameResult',
        messageObject: getThingGroupByNameResult,
      })

      if (getThingGroupByNameResult.length === 0) {
        return { statusCode: 404, result: {} }
      }

      const result: ThingGroup | null = ServiceUtil.getFirstThingGroupArrayElement(getThingGroupByNameResult)
      logger.debug({
        label: 'thingService',
        message: 'getThingGroupByName: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 200, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThingGroupByName: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },

  async postThingGroup(thingGroup: ThingGroup): Promise<ServiceThingGroupResponse> {
    try {
      const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(thingGroup.name)
      logger.debug({
        label: 'thingService',
        message: 'postThingGroup: getThingGroupByNameResult',
        messageObject: getThingGroupByNameResult,
      })

      if (getThingGroupByNameResult.length > 0) {
        return { statusCode: 409, result: {} }
      }

      const addThingGroupResult: ThingGroup[] = await db.addThingGroup(thingGroup)
      logger.debug({
        label: 'thingService',
        message: 'postThingGroup: addThingGroupResult',
        messageObject: addThingGroupResult,
      })

      const result: ThingGroup | null = ServiceUtil.getFirstThingGroupArrayElement(addThingGroupResult)
      logger.debug({
        label: 'thingService',
        message: 'postThingGroup: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 201, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'postThingGroup: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },

  async getThingGroupDevicesByName(name: string): Promise<ServiceThingGroupDevicesResponse> {
    try {
      const result: ThingGroupDevice[] = await db.findThingGroupDevicesByName(name)
      logger.debug({
        label: 'thingService',
        message: 'getThingGroupDevicesByName: result',
        messageObject: result,
      })

      if (result.length === 0) {
        return { statusCode: 404, result }
      }

      return { statusCode: 200, result }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThingGroupDevicesByName: result',
        error,
      })

      return { statusCode: 500, result: [] }
    }
  },

  async getThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<ServiceThingGroupDeviceResponse> {
    try {
      const findThingGroupByNameResult = await db.findThingGroupByName(name)
      logger.debug({
        label: 'thingService',
        message: 'getThingGroupDeviceByNameAndDeviceId: findThingGroupByNameResult',
        messageObject: findThingGroupByNameResult,
      })

      if (findThingGroupByNameResult.length === 0) {
        return { statusCode: 404, result: {} }
      }

      const findThingByDeviceIdResult = await db.findThingByDeviceId(deviceId)
      logger.debug({
        label: 'thingService',
        message: 'getThingGroupDeviceByNameAndDeviceId: findThingByDeviceIdResult',
        messageObject: findThingByDeviceIdResult,
      })

      if (findThingByDeviceIdResult.length === 0) {
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

      const result: ThingGroupDevice | null = ServiceUtil.getFirstThingGroupDeviceArrayElement(
        findThingGroupDeviceByNameAndDeviceIdResult
      )
      logger.debug({
        label: 'thingService',
        message: 'getThingGroupDeviceByNameAndDeviceId: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 200, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThingGroupDeviceByNameAndDeviceId: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },

  async postThingGroupDevice(thingGroupDevice: ThingGroupDevice): Promise<ServiceThingGroupDeviceResponse> {
    try {
      const getThingGroupByNameResult: ThingGroup[] = await db.findThingGroupByName(thingGroupDevice.thingGroup)
      logger.debug({
        label: 'thingService',
        message: 'postThingGroupDevice: getThingGroupByNameResult',
        messageObject: getThingGroupByNameResult,
      })

      if (getThingGroupByNameResult.length === 0) {
        return { statusCode: 404, result: {} }
      }

      const getThingByDeviceIdResult: Thing[] = await db.findThingByDeviceId(thingGroupDevice.deviceId)
      logger.debug({
        label: 'thingService',
        message: 'postThingGroupDevice: getThingByDeviceIdResult',
        messageObject: getThingByDeviceIdResult,
      })

      if (getThingByDeviceIdResult.length === 0) {
        return { statusCode: 404, result: {} }
      }

      const thingGroupDeviceResult = await db.findThingGroupDeviceByNameAndDeviceId(
        thingGroupDevice.thingGroup,
        thingGroupDevice.deviceId
      )
      logger.debug({
        label: 'thingService',
        message: 'postThingGroupDevice: thingGroupDeviceResult',
        messageObject: thingGroupDeviceResult,
      })

      if (thingGroupDeviceResult.length > 0) {
        return { statusCode: 409, result: {} }
      }

      const addThingGroupDeviceResult: ThingGroupDevice[] = await db.addThingGroupDevice(thingGroupDevice)
      logger.debug({
        label: 'thingService',
        message: 'postThingGroupDevice: addThingGroupDeviceResult',
        messageObject: addThingGroupDeviceResult,
      })

      const result: ThingGroupDevice | null =
        ServiceUtil.getFirstThingGroupDeviceArrayElement(addThingGroupDeviceResult)
      logger.debug({
        label: 'thingService',
        message: 'postThingGroupDevice: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 201, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'postThingGroupDevice: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },

  async getThingByName(name: string): Promise<ServiceThingResponse> {
    try {
      const getThingByNameResult: Thing[] = await db.findThingByName(name)
      logger.debug({
        label: 'thingService',
        message: 'getThingByName: getThingByNameResult',
        messageObject: getThingByNameResult,
      })

      if (getThingByNameResult.length === 0) {
        return { statusCode: 404, result: {} }
      }

      const result: Thing | null = ServiceUtil.getFirstThingArrayElement(getThingByNameResult)
      logger.debug({
        label: 'thingService',
        message: 'getThingByName: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 200, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThingByName: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },

  async getThings(): Promise<ServiceThingsResponse> {
    try {
      const result: Thing[] = await db.findThings()
      logger.debug({
        label: 'thingService',
        message: 'getThings',
        messageObject: result,
      })

      return { statusCode: 200, result }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'getThings: result',
        error,
      })

      return { statusCode: 500, result: [] }
    }
  },

  async postThing(thing: Thing): Promise<ServiceThingResponse> {
    try {
      const getThingTypeByNameResult: ThingType[] = await db.findThingTypeByName(thing.thingType)
      logger.debug({
        label: 'thingService',
        message: 'postThing: getThingTypeByNameResult',
        messageObject: getThingTypeByNameResult,
      })

      if (getThingTypeByNameResult.length === 0) {
        return { statusCode: 404, result: {} }
      }

      const getThingByDeviceIdResult: Thing[] = await db.findThingByDeviceId(thing.deviceId)
      logger.debug({
        label: 'thingService',
        message: 'postThing: getThingByDeviceIdResult',
        messageObject: getThingByDeviceIdResult,
      })

      if (getThingByDeviceIdResult.length > 0) {
        return { statusCode: 409, result: {} }
      }

      const getThingByNameResult: Thing[] = await db.findThingByName(thing.name)
      logger.debug({
        label: 'thingService',
        message: 'postThing: getThingByNameResult',
        messageObject: getThingByNameResult,
      })

      if (getThingByNameResult.length > 0) {
        return { statusCode: 409, result: {} }
      }

      const addThingResult: Thing[] = await db.addThing(thing)
      logger.debug({
        label: 'thingService',
        message: 'postThing: addThingResult',
        messageObject: addThingResult,
      })

      const result: Thing | null = ServiceUtil.getFirstThingArrayElement(addThingResult)
      logger.debug({
        label: 'thingService',
        message: 'postThing: result',
        messageObject: result,
      })

      if (result) {
        return { statusCode: 201, result }
      }
    } catch (error) {
      logger.error({
        label: 'thingService',
        message: 'postThing: result',
        error,
      })

      return { statusCode: 500, result: {} }
    }

    return { statusCode: 500, result: {} }
  },
}

export default thingService
