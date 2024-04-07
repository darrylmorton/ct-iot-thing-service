import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingTypeResponse, ThingServiceInterface } from '../../../types/serviceTypes'
import { getThingTypeValidator } from '../../validators/thingTypeResponseValidators'
import logger from '../../../logger'

export default function (thingService: ThingServiceInterface): { GET: OperationHandlerArray } {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingTypeResponse = await thingService.getThingTypeByName(req.params.name)
        logger.debug({ message: 'GET thingTypeByName', statusCode, messageObject: result })

        const validationErrors = getThingTypeValidator.validateResponse(statusCode, result)
        logger.debug({ message: 'GET thingTypeByName', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error({ message: 'getThingTypeByNameError', messageObject: error })

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing type',
    parameters: [
      {
        description: 'name of the thing',
        in: 'path',
        required: true,
        name: 'name',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Return thing type',
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

  const doc: { GET: OperationHandlerArray } = {
    GET,
  }

  return doc
}
