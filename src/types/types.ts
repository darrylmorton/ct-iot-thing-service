export interface ThingType {
  name: string
  description: string
}

export interface ThingGroup {
  name: string
  description: string
}

export interface SimpleThingGroupDevice {
  thingGroup: string
  deviceId: string
}

export interface ThingGroupDevice extends SimpleThingGroupDevice {
  id: string
}

export interface Thing {
  name: string
  deviceId: string
  description: string
  thingType: string
}
