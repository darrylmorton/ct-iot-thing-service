import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'

import { ServiceResponse } from '../../../serviceTypes'
import { getThingPayloadsValidator } from '../../validators/thingPayloadResponseValidators'
import logger from '../../../logger'

export default function (thingService: any) {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceResponse = await thingService.getThingPayloadsByThingId(req.params.thingId)
        logger.trace(`GET thingPayloadByThingId: statusCode, result: ${statusCode}, ${result}`)

        const validationErrors = getThingPayloadsValidator.validateResponse(200, result)
        logger.trace(`GET thingPayloadByThingId: validationErrors: ${validationErrors}`)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error(`getThingPayloadByThingIdError ${error}`)

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing payloads',
    parameters: [
      {
        description: 'thingId of the payload',
        in: 'path',
        required: true,
        name: 'thingId',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    responses: {
      200: {
        description: 'Return thing payloads',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ThingPayload',
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
    tags: ['thing payload'],
  }

  const doc = {
    GET,
  }

  return doc
}
