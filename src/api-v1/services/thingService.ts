import db from '../../db'
import { Thing, Things, SimpleThing, ThingTypes, ThingPayloads, ThingPayload, ThingType } from '../../types'
import { ThingServiceInterface, ServiceResponse } from '../../serviceTypes'
import logger from '../../logger'

const thingService: ThingServiceInterface = {
  async getThingTypes(): Promise<ServiceResponse> {
    const result: ThingTypes = await db.findThingTypes()
    logger.trace(`ThingService getThingTypes: result: ${result}`)

    return { statusCode: 200, result }
  },

  async postThingType(thingType: ThingType): Promise<ServiceResponse> {
    const getThingByNameResult: ThingTypes = await db.findThingTypeByName(thingType)
    logger.trace(`ThingService postThingType: getThingByNameResult: ${getThingByNameResult}`)

    if (getThingByNameResult.length === 0) {
      const addThingTypeResult: ThingTypes = await db.addThingType(thingType)
      logger.trace(`ThingService postThingType: addThingTypeResult: ${addThingTypeResult}`)

      const result: ThingType | {} = addThingTypeResult.length === 1 ? addThingTypeResult[0] : {}
      logger.trace(`ThingService postThingType result: ${result}`)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async getThings(): Promise<ServiceResponse> {
    const result: Things = await db.findThings()
    logger.trace(`ThingService getThings: result: ${result}`)

    return { statusCode: 200, result }
  },

  async postThing(thing: SimpleThing): Promise<ServiceResponse> {
    const getThingTypeByNameResult: ThingTypes = await db.findThingTypeByName(thing.thingType)
    logger.trace(`ThingService postThing: getThingTypeByNameResult: ${getThingTypeByNameResult}`)

    if (getThingTypeByNameResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const getThingByNameResult: Things = await db.findThingByName(thing)
    logger.trace(`ThingService postThing: getThingByNameResult: ${getThingByNameResult}`)

    if (getThingByNameResult.length === 0) {
      const addThingResult: Things = await db.addThing(thing)
      logger.trace(`ThingService postThing: addThingResult: ${addThingResult}`)

      const result: Thing | {} = addThingResult.length === 1 ? addThingResult[0] : {}
      logger.trace(`ThingService postThing: result: ${result}`)

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async postThingPayload(thingPayload: ThingPayload): Promise<ServiceResponse> {
    const addThingPayloadResult: ThingPayloads = await db.addThingPayload(thingPayload)
    logger.trace(`ThingService postThingPayload: addThingPayloadResult: ${addThingPayloadResult}`)

    const result: ThingPayload | {} = addThingPayloadResult.length === 1 ? addThingPayloadResult[0] : {}
    logger.trace(`ThingService postThingPayload: result: ${result}`)

    if (result) {
      return { statusCode: 201, result }
    } else {
      return { statusCode: 400, result }
    }
  },

  async getThingPayloadsByThingId(thingId: string): Promise<ServiceResponse> {
    const result: ThingPayloads = await db.findThingPayloadsByThingId(thingId)
    logger.trace(`ThingService getThingPayloadsByThingId: result: ${result}`)

    return { statusCode: 200, result }
  },
}

export default thingService
