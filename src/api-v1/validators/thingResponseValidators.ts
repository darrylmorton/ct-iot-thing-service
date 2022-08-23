import OpenAPIResponseValidator from 'openapi-response-validator'

const definitions: any = {
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
}

export const postThingValidator = new OpenAPIResponseValidator({
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: definitions.ThingsResponse,
      },
    },
  },
  definitions,
})

export const getThingsValidator = new OpenAPIResponseValidator({
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: definitions.ThingsResponse,
        },
      },
    },
  },
  definitions,
})

module.exports = {
  getThingsValidator,
  postThingValidator,
}
