import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingTypeDefinitions: any = {
  definitions: {
    ThingType: {
      type: 'object',
      properties: {
        description: 'name of the thing type',
        type: 'string',
        nullable: false,
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
}

export const postThingTypeValidator = new OpenAPIResponseValidator({
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: thingTypeDefinitions.ThingType,
      },
    },
  },
  definitions: thingTypeDefinitions,
})

export const getThingTypesValidator = new OpenAPIResponseValidator({
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: thingTypeDefinitions.ThingType,
        },
      },
    },
  },
  definitions: thingTypeDefinitions,
})
