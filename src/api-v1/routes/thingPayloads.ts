import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'
import { endOfToday, getUnixTime, parseISO, startOfToday } from 'date-fns'

import { ServiceThingPayloadResponse, ThingServiceInterface } from '../../serviceTypes'
import logger from '../../logger'
import { postThingPayloadsValidator } from '../validators/thingPayloadsResponseValidators'

export default function (thingService: ThingServiceInterface) {
  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      const startTimestampQueryParam = String(req.query.startTimestamp)
      const startTimestamp: number = startTimestampQueryParam
        ? getUnixTime(parseISO(startTimestampQueryParam))
        : getUnixTime(startOfToday())

      const endTimestampQueryParam = String(req.query.endTimestamp)
      const endTimestamp = endTimestampQueryParam
        ? getUnixTime(new Date(endTimestampQueryParam))
        : getUnixTime(endOfToday())

      const thingIds = req.body.thingIds

      console.log('startTimestampQueryParam', startTimestampQueryParam)
      console.log('endTimestampQueryParam', endTimestampQueryParam)

      try {
        const { statusCode, result }: ServiceThingPayloadResponse = await thingService.postThingPayloads(
          startTimestamp,
          endTimestamp,
          thingIds
        )
        logger.trace(`POST thingPayloads: statusCode, result: ${statusCode}, ${result}`)

        const validationErrors = postThingPayloadsValidator.validateResponse(200, result)
        logger.trace(`POST thingPayloads: validationErrors: ${validationErrors}`)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error(`postThingPayloadsError ${error}`)

        return next(error)
      }
    },
  ]

  POST.apiDoc = {
    summary: 'Return thing payloads',
    parameters: [
      {
        description: 'startTimestamp of the payload',
        in: 'query',
        required: false,
        name: 'startTimestamp',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
      {
        description: 'endTimestamp of the payload',
        in: 'query',
        required: false,
        name: 'endTimestamp',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              thingIds: {
                description: 'thing ids of the payloads',
                type: 'array',
                items: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            },
            required: ['thingIds'],
            additionalProperties: false,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Return thing payloads',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ThingPayload',
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
    tags: ['thing payload'],
  }

  const doc = {
    POST,
  }

  return doc
}
