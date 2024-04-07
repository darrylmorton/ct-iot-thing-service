import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingResponse, ServiceThingsResponse, ThingServiceInterface } from '../../types/serviceTypes'
import { getThingsValidator, postThingValidator } from '../validators/thingResponseValidators'
import logger from '../../logger'
import { Thing } from '../../types/types'

export default function (thingService: ThingServiceInterface): {
  GET: OperationHandlerArray
  POST: OperationHandlerArray
} {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingsResponse = await thingService.getThings()
        logger.debug({ message: 'GET thing', statusCode, messageObject: result })

        const validationErrors = getThingsValidator.validateResponse(200, result)
        logger.debug({ message: 'GET thing', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error({ message: 'getThingError', messageObject: error })

        return next(error)
      }
    },
  ]

  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingResponse = await thingService.postThing(req.body as Thing)
        logger.debug({ message: 'POST thing', statusCode, messageObject: result })

        const validationErrors = postThingValidator.validateResponse(201, result)
        logger.debug({ message: 'POST thing', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error({ message: 'postThingError', messageObject: error })

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get things',
    responses: {
      200: {
        description: 'Return things',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Thing',
              },
            },
          },
        },
      },
      400: {
        description: 'Invalid request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/BadRequestError',
            },
          },
        },
      },
      default: {
        description: 'An error occurred',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/Error',
            },
          },
        },
      },
    },
    tags: ['thing'],
  }

  POST.apiDoc = {
    summary: 'Post thing',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            nullable: false,
            properties: {
              name: {
                description: 'name of the thing',
                type: 'string',
                nullable: false,
                minLength: 2,
                maxLength: 25,
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
                minLength: 2,
                maxLength: 25,
              },
              thingType: {
                description: 'thing type of the thing',
                type: 'string',
                nullable: false,
              },
            },
            required: ['name', 'description', 'deviceId', 'thingType'],
            additionalProperties: false,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Create thing',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Thing',
            },
          },
        },
      },
      400: {
        description: 'Invalid request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/BadRequestError',
            },
          },
        },
      },
      404: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/NotFoundError',
            },
          },
        },
      },
      409: {
        description: 'Conflict error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/ConflictError',
            },
          },
        },
      },
      default: {
        description: 'An error occurred',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/Error',
            },
          },
        },
      },
    },
    tags: ['thing'],
  }

  const doc: {
    GET: OperationHandlerArray
    POST: OperationHandlerArray
  } = {
    GET,
    POST,
  }

  return doc
}
