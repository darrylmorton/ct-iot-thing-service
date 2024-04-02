import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingResponse, ThingServiceInterface } from '../../../serviceTypes'
import { getThingValidator } from '../../validators/thingResponseValidators'
import logger from '../../../logger'

export default function (thingService: ThingServiceInterface): Operation {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingResponse = await thingService.getThingByName(req.params.name)
        logger.debug(`GET thingByName: statusCode, result: ${statusCode}, ${result}`)

        const validationErrors = getThingValidator.validateResponse(statusCode, result)
        logger.debug(`GET thingById: validationErrors: ${validationErrors}`)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error(`getThingByNameError ${error}`)

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing',
    parameters: [
      {
        description: 'name of the thing',
        in: 'path',
        required: true,
        name: 'name',
        schema: {
          type: 'string',
          minLength: 2,
          maxLength: 25,
        },
      },
    ],
    responses: {
      200: {
        description: 'Return thing',
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
