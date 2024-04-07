import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingTypeResponse, ServiceThingTypesResponse, ThingServiceInterface } from '../../types/serviceTypes'
import { getThingTypesValidator, postThingTypeValidator } from '../validators/thingTypeResponseValidators'
import logger from '../../logger'
import { ThingType } from '../../types/types'

export default function (thingService: ThingServiceInterface): {
  GET: OperationHandlerArray
  POST: OperationHandlerArray
} {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingTypesResponse = await thingService.getThingTypes()
        logger.debug({ message: 'GET thingType', statusCode, messageObject: result })

        const validationErrors = getThingTypesValidator.validateResponse(200, result)
        logger.debug({ message: 'GET thingType', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error({ message: 'getThingTypeError', messageObject: error })

        return next(error)
      }
    },
  ]

  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingTypeResponse = await thingService.postThingType(req.body as ThingType)
        logger.debug({ message: 'POST thingType', statusCode, messageObject: result })

        const validationErrors = postThingTypeValidator.validateResponse(201, result)
        logger.debug({ message: 'POST thingType', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error({ message: 'postThingTypeError', messageObject: error })

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing types',
    responses: {
      200: {
        description: 'Return thing types',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ThingType',
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
    tags: ['thing type'],
  }

  POST.apiDoc = {
    summary: 'Post thing type',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                description: 'name of the thing type',
                type: 'string',
                nullable: false,
                minLength: 2,
                maxLength: 25,
              },
              description: {
                description: 'description of the thing type',
                type: 'string',
                nullable: false,
                minLength: 2,
                maxLength: 100,
              },
            },
            required: ['name', 'description'],
            additionalProperties: false,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Create thing type',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ThingType',
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
    tags: ['thing type'],
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
