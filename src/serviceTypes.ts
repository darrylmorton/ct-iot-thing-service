/* eslint-disable no-unused-vars */
import { SimpleThing, ThingPayload } from './types'

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
  postThingType(requestBody: SimpleThing): Promise<ServiceResponse>
  getThings(): Promise<ServiceResponse>
  postThing(requestBody: SimpleThing): Promise<ServiceResponse>
  postThingPayload(requestBody: ThingPayload): Promise<ServiceResponse>
  getThingPayloadsByThingId(thingId: string): Promise<ServiceResponse>
}
