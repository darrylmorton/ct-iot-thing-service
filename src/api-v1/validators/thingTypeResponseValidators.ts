import OpenAPIResponseValidator from 'openapi-response-validator'

const definitions: any = {
  definitions: {
    ThingTypeResponse: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
      required: ['name'],
    },
  },
}

export const postThingTypeValidator = new OpenAPIResponseValidator({
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: definitions.ThingTypeResponse,
      },
    },
  },
  definitions,
})

export const getThingTypesValidator = new OpenAPIResponseValidator({
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: definitions.ThingTypeResponse,
        },
      },
    },
  },
  definitions,
})

module.exports = {
  getThingTypesValidator,
  postThingTypeValidator,
}
