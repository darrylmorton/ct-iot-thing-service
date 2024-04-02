import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingGroupDeviceDefinitions = {
  definitions: {
    ThingGroupDevice: {
      type: 'object',
      properties: {
        id: {
          description: 'name of the thing group',
          type: 'string',
          format: 'uuid',
          nullable: false,
        },
        thingGroup: {
          description: 'name of the thing group',
          type: 'string',
          nullable: false,
        },
        deviceId: {
          description: 'device id of the thing',
          type: 'string',
          nullable: false,
        },
      },
      required: ['id', 'thingGroup', 'deviceId'],
      additionalProperties: false,
    },
  },
}

export const postThingGroupDeviceValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingGroupDeviceDefinitions.definitions,
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: '#/definitions/ThingGroupDevice',
      },
    },
    404: {
      schema: {
        NotFoundError: {
          description: 'This resource cannot be found',
        },
      },
    },
    409: {
      schema: {
        ConflictError: {
          description: 'This resource already exists',
        },
      },
    },
  },
})

export const getThingGroupDeviceValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingGroupDeviceDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'object',
        $ref: '#/definitions/ThingGroupDevice',
      },
    },
    404: {
      schema: {
        NotFoundError: {
          description: 'This resource cannot be found',
        },
      },
    },
  },
})

export const getThingGroupDevicesValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingGroupDeviceDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/ThingGroupDevice',
        },
      },
    },
    404: {
      schema: {
        NotFoundError: {
          description: 'This resource cannot be found',
        },
      },
    },
  },
})
