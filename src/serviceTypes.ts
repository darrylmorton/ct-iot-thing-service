/* eslint-disable no-unused-vars */
import { SimpleThing, ThingPayload, ThingType } from './types'

export interface HealthCheckResponse {
  status: string
  version: string
}

export interface ServiceResponse {
  statusCode: number
  result: any
}

export interface ThingServiceInterface {
  getThingTypes(): Promise<ServiceResponse>
  postThingType(thingType: ThingType): Promise<ServiceResponse>
  getThings(): Promise<ServiceResponse>
  postThing(thing: SimpleThing): Promise<ServiceResponse>
  postThingPayload(thingType: ThingPayload): Promise<ServiceResponse>
  getThingPayloadsByThingId(thingId: string): Promise<ServiceResponse>
}
