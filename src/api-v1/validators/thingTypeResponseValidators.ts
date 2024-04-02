import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingTypeDefinitions = {
  definitions: {
    ThingType: {
      type: 'object',
      properties: {
        name: {
          description: 'name of the thing type',
          type: 'string',
          nullable: false,
        },
        description: {
          description: 'description of the thing type',
          type: 'string',
          nullable: false,
        },
      },
      required: ['name', 'description'],
      additionalProperties: false,
    },
  },
}

export const postThingTypeValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingTypeDefinitions.definitions,
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: '#/definitions/ThingType',
      },
    },
  },
})

export const getThingTypeValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingTypeDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'object',
        $ref: '#/definitions/ThingType',
      },
    },
  },
})

export const getThingTypesValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingTypeDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/ThingType',
        },
      },
    },
  },
})
