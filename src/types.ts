export interface ThingType {
  name: string
}

export interface SimpleThing {
  name: string
  thingType: ThingType
}

export interface Thing extends SimpleThing {
  id: string
}

export interface ThingPayload {
  thing: string
  timestamp: number
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
