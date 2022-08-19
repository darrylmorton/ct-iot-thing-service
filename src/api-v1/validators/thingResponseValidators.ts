import OpenAPIResponseValidator from 'openapi-response-validator'

export const postThingValidator = new OpenAPIResponseValidator({
  responses: {
    201: {
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
        required: ['name'],
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
    },
  },
})

module.exports = {
  getThingsValidator,
  postThingValidator,
}
