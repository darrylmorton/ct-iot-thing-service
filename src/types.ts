export interface Thing {
  id: string
  name: string
}

export interface Things extends Array<Thing> {}

export interface SimpleThing {
  name: string
}

export interface ServiceResponse {
  statusCode: number
  result: any
}
