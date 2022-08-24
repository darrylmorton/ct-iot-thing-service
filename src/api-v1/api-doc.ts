import env from '../env'
import { thingDefinitions } from './validators/thingResponseValidators'
import { thingTypeDefinitions } from './validators/thingTypeResponseValidators'
import { thingPayloadDefinitions } from './validators/thingPayloadResponseValidators'

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
      Thing: {
        $ref: thingDefinitions.Thing,
      },
      ThingType: {
        $ref: thingTypeDefinitions.ThingType,
      },
      ThingPayload: {
        $ref: thingPayloadDefinitions.ThingPayload,
      },
    },
  },
  paths: {},
}

export default apiDoc
