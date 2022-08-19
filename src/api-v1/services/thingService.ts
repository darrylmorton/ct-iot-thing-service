import { addThing, findThingByName, findThings } from '../../db'
import { Thing, Things, ServiceResponse, SimpleThing } from '../../types'

const thingService = {
  async getThings(): Promise<ServiceResponse> {
    const result: Things = await findThings()

    return { statusCode: 200, result }
  },

  async postThing(reqBody: SimpleThing): Promise<ServiceResponse> {
    const getThingByNameResult: Things = await findThingByName(reqBody)

    if (getThingByNameResult.length === 0) {
      const addThingResult: Things = await addThing(reqBody)
      const result: Thing | {} = addThingResult.length === 1 ? addThingResult[0] : {}

      if (result) {
        return { statusCode: 201, result }
      } else {
        return { statusCode: 400, result }
      }
    } else {
      return { statusCode: 409, result: {} }
    }
  },
}

export default thingService
