import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingTypeResponse, ServiceThingTypesResponse, ThingServiceInterface } from '../../serviceTypes'
import { getThingTypesValidator, postThingTypeValidator } from '../validators/thingTypeResponseValidators'
import logger from '../../logger'

export default function (thingService: ThingServiceInterface) {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingTypesResponse = await thingService.getThingTypes()
        logger.trace('GET thingType: statusCode, result %d %j', statusCode, result)

        const validationErrors = getThingTypesValidator.validateResponse(200, result)
        logger.trace('GET thingType: validationErrors %j', validationErrors)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('getThingTypeError %s', error)

        return next(error)
      }
    },
  ]

  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingTypeResponse = await thingService.postThingType(req.body)
        logger.trace('POST thingType: statusCode, result %d %j', statusCode, result)

        const validationErrors = postThingTypeValidator.validateResponse(201, result)
        logger.trace('POST thingType: validationErrors %j', validationErrors)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('postThingTypeError %s', error)

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

  const doc: { GET: OperationHandlerArray; POST: OperationHandlerArray } = {
    GET,
    POST,
  }

  return doc
}
