import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingsResponseValidator = new OpenAPIResponseValidator({
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/ThingsResponse',
        },
      },
    },
  },
  definitions: {
    ThingsResponse: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
      required: ['id', 'name'],
    },
  },
})

module.exports = {
  thingsResponseValidator,
}
