/* eslint-disable no-unused-vars */
import { SimpleThing, Thing, ThingPayload, ThingType } from './types'

export interface HealthCheckResponse {
  status: string
  version: string
}

export interface ServiceResponse {
  statusCode: number
}

export interface ServiceThingResponse extends ServiceResponse {
  result: Thing | unknown
}

export interface ServiceThingsResponse extends ServiceResponse {
  result: Array<Thing> | []
}

export interface ServiceThingTypeResponse extends ServiceResponse {
  result: ThingType | unknown
}

export interface ServiceThingTypesResponse extends ServiceResponse {
  result: Array<ThingType> | []
}

export interface ServiceThingPayloadResponse extends ServiceResponse {
  result: ThingPayload | unknown
}

export interface ServiceThingPayloadsResponse extends ServiceResponse {
  result: Array<ThingPayload> | []
}

export interface ThingServiceInterface {
  getThingTypes(): Promise<ServiceThingTypesResponse>
  postThingType(thingType: ThingType): Promise<ServiceThingTypeResponse>
  getThingById(id: string): Promise<ServiceThingResponse>
  getThings(): Promise<ServiceThingsResponse>
  postThing(thing: SimpleThing): Promise<ServiceThingResponse>
  postThingPayload(thingPayload: ThingPayload): Promise<ServiceThingPayloadResponse>
  getThingPayloadsByThingId(thingId: string): Promise<ServiceThingPayloadsResponse>
}
