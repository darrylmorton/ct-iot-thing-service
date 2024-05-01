import { OpenAPIV3 } from 'openapi-types'

import env from '../env'
import { API_URI_PREFIX } from '../util/AppUtil'

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
          name: {
            description: 'name of the thing',
            type: 'string',
            nullable: false,
          },
          description: {
            description: 'description of the thing',
            type: 'string',
            nullable: false,
            minLength: 2,
            maxLength: 100,
          },
          deviceId: {
            description: 'device id of the thing',
            type: 'string',
            nullable: false,
          },
          thingType: {
            description: 'type of the thing',
            type: 'string',
            nullable: false,
          },
        },
        required: ['id', 'description', 'name', 'deviceId', 'thingType'],
        additionalProperties: false,
      },
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
      ThingGroupDevice: {
        type: 'object',
        properties: {
          id: {
            description: 'id of the thing device group',
            type: 'string',
            format: 'uuid',
            nullable: false,
          },
          thingGroup: {
            description: 'name of the thing group',
            type: 'string',
            nullable: false,
          },
          deviceId: {
            description: 'device id of the thing',
            type: 'string',
            nullable: false,
          },
        },
        required: ['id', 'thingGroup', 'deviceId'],
        additionalProperties: false,
      },
      ThingType: {
        type: 'object',
        properties: {
          name: {
            description: 'name of the thing type',
            type: 'string',
            nullable: false,
          },
          description: {
            description: 'description of the thing type',
            type: 'string',
            nullable: false,
          },
        },
        required: ['name', 'description'],
        additionalProperties: false,
      },
    },
  },
  paths: {},
}

export default apiDoc
