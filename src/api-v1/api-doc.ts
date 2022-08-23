import env from '../env'

const apiDoc: any = {
  openapi: '3.0.3',
  info: {
    title: 'ThingService',
    version: env.API_VERSION,
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}/${env.API_MAJOR_VERSION}`,
    },
  ],
  components: {
    responses: {
      NotFoundError: {
        description: 'This resource cannot be found',
      },
      BadRequestError: {
        description: 'The request is invalid',
      },
      ConflictError: {
        description: 'This resource already exists',
      },
      UnauthorizedError: {
        description: 'Access token is missing or invalid',
      },
      Error: {
        description: 'Something went wrong',
      },
    },
    schemas: {
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
            type: 'string',
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
                    type: 'integer',
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
                    type: 'string',
                    nullable: false,
                  },
                },
                required: ['id', 'thing', 'timestamp', 'payload'],
                additionalProperties: false,
              },
            },
          },
        },
      },
    },
  },
  paths: {},
}

export default apiDoc
