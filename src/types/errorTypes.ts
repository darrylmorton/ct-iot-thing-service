const enum ERROR_TYPES {
  SERVICE = 'ServiceError',
  THING = 'ThingError',
  THING_GROUP = 'ThingGroupError',
  THING_GROUP_DEVICE = 'ThingGroupError',
  THING_TYPE = 'ThingGroupError',
}

export class ServiceError extends Error {
  name: string
  type: string
  message: string

  public constructor(name: string, message: string) {
    super()
    this.name = name
    this.type = ERROR_TYPES.SERVICE
    this.message = message
  }
}

export class ThingError extends ServiceError {
  public constructor(name: string, message: string) {
    super(name, message)
    this.type = ERROR_TYPES.THING
  }
}

export class ThingGroupError extends ServiceError {
  public constructor(name: string, message: string) {
    super(name, message)
    this.type = ERROR_TYPES.THING_GROUP
  }
}

export class ThingGroupDeviceError extends ServiceError {
  public constructor(name: string, message: string) {
    super(name, message)
    this.type = ERROR_TYPES.THING_GROUP_DEVICE
  }
}

export class ThingTypeError extends ServiceError {
  public constructor(name: string, message: string) {
    super(name, message)
    this.type = ERROR_TYPES.THING_TYPE
  }
}
