import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'

import { ServiceThingResponse, ThingServiceInterface } from '../../../serviceTypes'
import { getThingValidator } from '../../validators/thingResponseValidators'
import logger from '../../../logger'

export default function (thingService: ThingServiceInterface) {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingResponse = await thingService.getThingById(req.params.id)
        logger.trace(`GET thingById: statusCode, result: ${statusCode}, ${result}`)

        const validationErrors = getThingValidator.validateResponse(statusCode, result)
        logger.trace(`GET thingById: validationErrors: ${validationErrors}`)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error(`getThingByIdError ${error}`)

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing',
    parameters: [
      {
        description: 'id of the thing',
        in: 'path',
        required: true,
        name: 'id',
        schema: {
          type: 'string',
          format: 'uuid',
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

  const doc = {
    GET,
  }

  return doc
}
