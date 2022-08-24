import {
  addThing,
  addThingPayload,
  addThingType,
  findThingByName,
  findThingPayloadsByThingId,
  findThings,
  findThingTypeByName,
  findThingTypes,
} from '../../db'
import {
  Thing,
  Things,
  ServiceResponse,
  SimpleThing,
  ThingTypes,
  ThingPayloads,
  ThingPayload,
  ThingType,
} from '../../types'

const thingService = {
  async getThingTypes(): Promise<ServiceResponse> {
    const result: ThingTypes = await findThingTypes()

    return { statusCode: 200, result }
  },

  async postThingType(requestBody: SimpleThing): Promise<ServiceResponse> {
    const getThingByNameResult: ThingTypes = await findThingTypeByName(requestBody)

    if (getThingByNameResult.length === 0) {
      const addThingTypeResult: ThingTypes = await addThingType(requestBody)
      const result: ThingType | {} = addThingTypeResult.length === 1 ? addThingTypeResult[0] : {}

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async getThings(): Promise<ServiceResponse> {
    const result: Things = await findThings()

    return { statusCode: 200, result }
  },

  async postThing(requestBody: SimpleThing): Promise<ServiceResponse> {
    const getThingTypeByNameResult: ThingTypes = await findThingTypeByName(requestBody.thingType)

    if (getThingTypeByNameResult.length === 0) {
      return { statusCode: 404, result: {} }
    }

    const getThingByNameResult: Things = await findThingByName(requestBody)

    if (getThingByNameResult.length === 0) {
      const addThingResult: Things = await addThing(requestBody)
      const result: Thing | {} = addThingResult.length === 1 ? addThingResult[0] : {}

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    }

    return { statusCode: 409, result: {} }
  },

  async postThingPayload(requestBody: ThingPayload): Promise<ServiceResponse> {
    const addThingPayloadResult: ThingPayloads = await addThingPayload(requestBody)

    const result: ThingPayload | {} = addThingPayloadResult.length === 1 ? addThingPayloadResult[0] : {}

    if (result) {
      return { statusCode: 201, result }
    } else {
      return { statusCode: 400, result }
    }
  },

  async getThingPayloadsByThingId(thingId: string): Promise<ServiceResponse> {
    console.log('getThingPayloadsByThingId thingId', thingId)
    const result: ThingPayloads | [] = await findThingPayloadsByThingId(thingId)
    console.log('getThingPayloadsByThingId result', result)

    return { statusCode: 200, result }
  },
}

export default thingService
