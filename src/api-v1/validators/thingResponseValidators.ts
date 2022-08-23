import OpenAPIResponseValidator from 'openapi-response-validator'

const definitions: any = {
  definitions: {
    ThingResponse: {
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
        $ref: definitions.ThingResponse,
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
          $ref: definitions.ThingResponse,
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
