import env from '../env'
import { API_URI_PREFIX } from '../util/AppUtil'
import { OpenAPIV3 } from 'openapi-types'

const apiDoc: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'ThingService',
    version: env.API_VERSION,
  },
  servers: [
    {
      url: `http://${API_URI_PREFIX}/${env.API_MAJOR_VERSION}`,
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
      Thing: {
        type: 'object',
        properties: {
          id: {
            description: 'id of the thing',
            type: 'string',
            format: 'uuid',
            nullable: false,
          },
          name: {
            description: 'name of the thing',
            type: 'string',
            nullable: false,
          },
          thingType: {
            description: 'type of the thing',
            type: 'string',
            nullable: false,
            properties: {
              name: {
                type: 'string',
                nullable: false,
              },
            },
            required: ['name'],
            additionalProperties: false,
          },
        },
        required: ['id', 'name', 'thingType'],
        // additionalProperties: false,
      },
      ThingType: {
        type: 'object',
        properties: {
          name: {
            description: 'name of the thing type',
            type: 'string',
            nullable: false,
          },
        },
        required: ['name'],
        additionalProperties: false,
      },
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
            format: 'int64',
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
                required: ['value', 'unit'],
                additionalProperties: false,
              },
              battery: {
                properties: {
                  value: {
                    description: 'value of the battery',
                    type: 'integer',
                    nullable: false,
                  },
                  unit: {
                    description: 'unit of the battery',
                    type: 'string',
                    nullable: false,
                  },
                },
                required: ['value', 'unit'],
                additionalProperties: false,
              },
              temperature: {
                properties: {
                  value: {
                    description: 'value of the temperature',
                    type: 'number',
                    format: 'float',
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
                required: ['value', 'unit', 'connection'],
                additionalProperties: false,
              },
              humidity: {
                properties: {
                  value: {
                    description: 'value of the humidity',
                    type: 'number',
                    format: 'float',
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
                required: ['value', 'unit', 'connection', 'precipitation'],
                additionalProperties: false,
              },
            },
            required: ['cadence', 'battery', 'temperature', 'humidity'],
            additionalProperties: false,
          },
        },
        required: ['id', 'thing', 'timestamp', 'payload'],
        additionalProperties: false,
      },
    },
  },
  paths: {},
}

export default apiDoc
