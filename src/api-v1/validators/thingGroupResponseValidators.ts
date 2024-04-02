import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingGroupDefinitions = {
  definitions: {
    ThingGroup: {
      type: 'object',
      properties: {
        name: {
          description: 'name of the thing group',
          type: 'string',
          nullable: false,
        },
        description: {
          description: 'description of the thing group',
          type: 'string',
          nullable: false,
        },
      },
      required: ['name', 'description'],
      additionalProperties: false,
    },
  },
}

export const postThingGroupValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingGroupDefinitions.definitions,
  responses: {
    201: {
      schema: {
        type: 'object',
        $ref: '#/definitions/ThingGroup',
      },
    },
  },
})

export const getThingGroupValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingGroupDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'object',
        $ref: '#/definitions/ThingGroup',
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

export const getThingGroupsValidator: OpenAPIResponseValidator = new OpenAPIResponseValidator({
  definitions: thingGroupDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/ThingGroup',
        },
      },
    },
  },
})
