export interface ThingType {
  name: string
  description: string
}

export type ThingGroup = {
  name: string
  description: string
}

export type SimpleThingGroupDevice = {
  thingGroup: string
  deviceId: string
}

export interface ThingGroupDevice extends SimpleThingGroupDevice {
  id: string
}

export type Thing = {
  name: string
  deviceId: string
  description: string
  thingType: string
}
