import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingDefinitions = {
  definitions: {
    Thing: {
      type: 'object',
      properties: {
        name: {
          description: 'name of the thing',
          type: 'string',
          nullable: false,
        },
        description: {
          description: 'description of the thing',
          type: 'string',
          nullable: false,
        },
        deviceId: {
          description: 'device id of the thing',
          type: 'string',
          nullable: false,
        },
        thingType: {
          description: 'type of the thing',
          type: 'string',
          nullable: false,
        },
      },
      required: ['name', 'description', 'deviceId', 'thingType'],
      additionalProperties: false,
    },
  },
}

export const postThingValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingDefinitions.definitions,
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: '#/definitions/Thing',
      },
    },
  },
})

export const getThingValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'object',
        $ref: '#/definitions/Thing',
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

export const getThingsValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/Thing',
        },
      },
    },
  },
})
