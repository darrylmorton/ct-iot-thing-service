import OpenAPIResponseValidator from 'openapi-response-validator'

const definitions: any = {
  definitions: {
    ThingTypesResponse: {
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
        $ref: definitions.ThingTypesResponse,
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
          $ref: definitions.ThingTypesResponse,
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
