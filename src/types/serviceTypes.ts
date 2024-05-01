/* eslint-disable no-unused-vars */
import { SimpleThingGroupDevice, Thing, ThingGroup, ThingGroupDevice, ThingType } from './types'

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
  result: Thing[] | []
}

export interface ServiceThingTypeResponse extends ServiceResponse {
  result: ThingType | unknown
}

export interface ServiceThingTypesResponse extends ServiceResponse {
  result: ThingType[] | []
}

export interface ServiceThingGroupResponse extends ServiceResponse {
  result: ThingGroup | unknown
}

export interface ServiceThingGroupsResponse extends ServiceResponse {
  result: ThingGroup[] | []
}

export interface ServiceThingGroupDeviceResponse extends ServiceResponse {
  result: ThingGroupDevice | unknown
}

export interface ServiceThingGroupDevicesResponse extends ServiceResponse {
  result: ThingGroupDevice[] | []
}

export interface ThingServiceInterface {
  getThingTypes(): Promise<ServiceThingTypesResponse>
  getThingTypeByName(name: string): Promise<ServiceThingTypeResponse>
  postThingType(thingType: ThingType): Promise<ServiceThingTypeResponse>
  getThingGroups(): Promise<ServiceThingGroupsResponse>
  getThingGroupByName(name: string): Promise<ServiceThingGroupResponse>
  postThingGroup(thingGroup: ThingGroup): Promise<ServiceThingGroupResponse>
  // getThingGroupDevices(): Promise<ServiceThingGroupDevicesResponse>
  getThingGroupDevicesByName(name: string): Promise<ServiceThingGroupDevicesResponse>
  getThingGroupDeviceByNameAndDeviceId(name: string, deviceId: string): Promise<ServiceThingGroupDeviceResponse>
  postThingGroupDevice(thingGroupDevice: SimpleThingGroupDevice): Promise<ServiceThingGroupDeviceResponse>
  getThingByName(name: string): Promise<ServiceThingResponse>
  getThings(): Promise<ServiceThingsResponse>
  postThing(thing: Thing): Promise<ServiceThingResponse>
}
