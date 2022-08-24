import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingDefinitions: any = {
  definitions: {
    Thing: {
      type: 'object',
      properties: {
        id: {
          description: 'id of the thing',
          type: 'string',
          format: 'uuid',
          nullable: false,
        },
        name: {
          description: 'name of the thing',
          type: 'string',
          nullable: false,
        },
        thingType: {
          description: 'type of the thing',
          type: 'object',
          nullable: false,
          properties: {
            name: {
              type: 'string',
              nullable: false,
            },
          },
          required: ['name'],
          additionalProperties: false,
        },
        required: ['id', 'name', 'thingType'],
        additionalProperties: false,
      },
    },
  },
}

export const postThingValidator = new OpenAPIResponseValidator({
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: thingDefinitions.Thing,
      },
    },
  },
})

export const getThingsValidator = new OpenAPIResponseValidator({
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: thingDefinitions.Thing,
        },
      },
    },
  },
})
