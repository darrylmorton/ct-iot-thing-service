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

export type SimpleThingPayload = {
  deviceId: string
  payloadTimestamp: number
  payload: {
    cadence: {
      value: number
      unit: string
    }
    battery: {
      value: number
      unit: string
    }
    temperature: {
      value: number
      unit: string
      connection: string
    }
    humidity: {
      value: number
      unit: string
      connection: string
      precipitation: boolean
    }
  }
}

export interface ThingPayload extends SimpleThingPayload {
  id: string
}
