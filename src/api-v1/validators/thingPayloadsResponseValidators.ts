import OpenAPIResponseValidator from 'openapi-response-validator'

export const thingPayloadsDefinitions = {
  definitions: {
    ThingPayload: {
      type: 'object',
      properties: {
        id: {
          description: 'id of the payload',
          type: 'string',
          format: 'uuid',
          nullable: false,
        },
        thing: {
          description: 'thing of the payload',
          type: 'string',
          format: 'uuid',
          nullable: false,
        },
        timestamp: {
          description: 'timestamp of the payload',
          type: 'integer',
          nullable: false,
        },
        payload: {
          description: 'payload',
          type: 'object',
          properties: {
            cadence: {
              properties: {
                value: {
                  description: 'value of the cadence',
                  type: 'integer',
                  nullable: false,
                },
                unit: {
                  description: 'unit of the cadence',
                  type: 'string',
                  nullable: false,
                },
              },
            },
            battery: {
              properties: {
                value: {
                  description: 'value of the battery',
                  type: 'integer',
                  nullable: false,
                },
                unit: {
                  description: 'unit of the batteru',
                  type: 'string',
                  nullable: false,
                },
              },
            },
            temperature: {
              properties: {
                value: {
                  description: 'value of the temperature',
                  type: 'number',
                  nullable: false,
                },
                unit: {
                  description: 'unit of the temperature',
                  type: 'string',
                  nullable: false,
                },
                connection: {
                  description: 'connection of the temperature',
                  type: 'string',
                  nullable: false,
                },
              },
            },
            humidity: {
              properties: {
                value: {
                  description: 'value of the humidity',
                  type: 'number',
                  nullable: false,
                },
                unit: {
                  description: 'unit of the humidity',
                  type: 'string',
                  nullable: false,
                },
                connection: {
                  description: 'connection of the humidity',
                  type: 'string',
                  nullable: false,
                },
                precipitation: {
                  description: 'precipitation of the humidity',
                  type: 'boolean',
                  nullable: false,
                },
              },
            },
          },
        },
      },
      required: ['id', 'thing', 'timestamp', 'payload'],
      additionalProperties: false,
    },
  },
}

export const postThingPayloadsValidator = new OpenAPIResponseValidator({
  definitions: thingPayloadsDefinitions.definitions,
  responses: {
    200: {
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/ThingPayload',
        },
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

// export const getThingPayloadsValidator = new OpenAPIResponseValidator({
//   definitions: thingPayloadDefinitions.definitions,
//   responses: {
//     200: {
//       schema: {
//         type: 'array',
//         items: {
//           $ref: '#/definitions/ThingPayload',
//         },
//       },
//     },
//     404: {
//       schema: {
//         NotFoundError: {
//           description: 'This resource cannot be found',
//         },
//       },
//     },
//   },
// })
