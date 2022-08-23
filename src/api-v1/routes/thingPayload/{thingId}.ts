import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'

import { ServiceResponse } from '../../../types'
import { getThingPayloadsValidator } from '../../validators/thingPayloadResponseValidators'

export default function (thingService: any) {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceResponse = await thingService.getThingPayloadsByThingId(req.params.thingId)

        const validationErrors = getThingPayloadsValidator.validateResponse(200, result)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing payloads',
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
