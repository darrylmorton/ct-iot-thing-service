import db from '../../db'
import { Thing, SimpleThing, ThingPayload, ThingType } from '../../types'
import {
  ThingServiceInterface,
  ServiceThingsResponse,
  ServiceThingResponse,
  ServiceThingPayloadsResponse,
  ServiceThingPayloadResponse,
  ServiceThingTypesResponse,
  ServiceThingTypeResponse,
} from '../../serviceTypes'
import logger from '../../logger'

const thingService: ThingServiceInterface = {
  async getThingTypes(): Promise<ServiceThingTypesResponse> {
    const result: Array<ThingType> = await db.findThingTypes()
    logger.trace(`ThingService getThingTypes: result: ${result}`)

    return { statusCode: 200, result }
  },

  async postThingType(thingType: ThingType): Promise<ServiceThingTypeResponse> {
    const getThingByNameResult: Array<ThingType> = await db.findThingTypeByName(thingType)
    logger.trace(`ThingService postThingType: getThingByNameResult: ${getThingByNameResult}`)

    if (getThingByNameResult.length === 0) {
      const addThingTypeResult: Array<ThingType> = await db.addThingType(thingType)
      logger.trace(`ThingService postThingType: addThingTypeResult: ${addThingTypeResult}`)

      const result: ThingType | Record<string, unknown> = addThingTypeResult.length === 1 ? addThingTypeResult[0] : {}
      logger.trace(`ThingService postThingType result: ${result}`)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async getThingById(id: string): Promise<ServiceThingResponse> {
    const getThingByIdResult: Array<Thing> = await db.findThingById(id)
    logger.trace(`ThingService getThingById: getThingByIdResult: ${getThingByIdResult}`)

    const result: Thing | Record<string, unknown> = getThingByIdResult.length === 1 ? getThingByIdResult[0] : {}
    logger.trace(`ThingService getThingById: result: ${result}`)

    if (getThingByIdResult.length === 1) {
      return { statusCode: 200, result }
    } else {
      return { statusCode: 404, result }
    }
  },

  async getThings(): Promise<ServiceThingsResponse> {
    const result: Array<Thing> = await db.findThings()
    logger.trace(`ThingService getThings: result: ${result}`)

    return { statusCode: 200, result }
  },

  async postThing(thing: SimpleThing): Promise<ServiceThingResponse> {
    const getThingTypeByNameResult: Array<ThingType> = await db.findThingTypeByName(thing.thingType)
    logger.trace(`ThingService postThing: getThingTypeByNameResult: ${getThingTypeByNameResult}`)

    if (getThingTypeByNameResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const getThingByNameResult: Array<Thing> = await db.findThingByName(thing)
    logger.trace(`ThingService postThing: getThingByNameResult: ${getThingByNameResult}`)

    if (getThingByNameResult.length === 0) {
      const addThingResult: Array<Thing> = await db.addThing(thing)
      logger.trace(`ThingService postThing: addThingResult: ${addThingResult}`)

      const result: Thing | Record<string, unknown> = addThingResult.length === 1 ? addThingResult[0] : {}
      logger.trace(`ThingService postThing: result: ${result}`)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async postThingPayload(thingPayload: ThingPayload): Promise<ServiceThingPayloadResponse> {
    const findThingByIdResult: Array<Thing> = await db.findThingById(thingPayload.thing)
    logger.trace(`ThingService postThingPayload: findThingByIdResult: ${findThingByIdResult}`)

    if (findThingByIdResult.length === 0) {
      return { statusCode: 404, result: [] }
    }

    const addThingPayloadResult: Array<ThingPayload> = await db.addThingPayload(thingPayload)
    logger.trace(`ThingService postThingPayload: addThingPayloadResult: ${addThingPayloadResult}`)

    const result: ThingPayload | Record<string, unknown> =
      addThingPayloadResult.length === 1 ? addThingPayloadResult[0] : {}
    logger.trace(`ThingService postThingPayload: result: ${result}`)

    if (result) {
      return { statusCode: 201, result }
    } else {
      return { statusCode: 400, result }
    }
  },

  async postThingPayloads(
    startTimestamp: number,
    endTimestamp: number,
    thingIds: string[]
  ): Promise<ServiceThingPayloadsResponse> {
    if (thingIds.length) {
      const result: ThingPayload[] = await db.findThingPayloads(startTimestamp, endTimestamp, thingIds)
      logger.trace(`ThingService postThingPayloads: result: ${result}`)

      if (result.length === 0) {
        return { statusCode: 404, result: [] }
      } else {
        return { statusCode: 200, result }
      }
    } else {
      const result: ThingPayload[] = await db.findThingPayloads(startTimestamp, endTimestamp, thingIds)
      logger.trace(`ThingService postThingPayloads: result: ${result}`)

      return { statusCode: 200, result }
    }
  },

  async getThingPayloadsByThingId(thingId: string): Promise<ServiceThingPayloadsResponse> {
    const getThingByIdResult: Array<Thing> = await db.findThingById(thingId)
    logger.trace(`ThingService getThingPayloadsByThingId: getThingByIdResult: ${getThingByIdResult}`)

    if (getThingByIdResult.length === 0) {
      return { statusCode: 404, result: [] }
    }

    const result: Array<ThingPayload> = await db.findThingPayloadsByThingId(thingId)
    logger.trace(`ThingService getThingPayloadsByThingId: result: ${result}`)

    return { statusCode: 200, result }
  },
}

export default thingService
