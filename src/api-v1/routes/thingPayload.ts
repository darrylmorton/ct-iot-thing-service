import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'

import { ServiceResponse } from '../../serviceTypes'
import { postThingPayloadValidator } from '../validators/thingPayloadResponseValidators'
import logger from '../../logger'

export default function (thingService: any) {
  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceResponse = await thingService.postThingPayload(req.body)
        logger.trace(`POST thingPayload: statusCode, result: ${statusCode}, ${result}`)

        const validationErrors = postThingPayloadValidator.validateResponse(201, result)
        logger.trace(`POST thingPayload: validationErrors: ${validationErrors}`)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error(`postThingPayloadError ${error}`)

        return next(error)
      }
    },
  ]

  POST.apiDoc = {
    summary: 'Post thing payload',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              thing: {
                type: 'string',
                format: 'uuid',
                nullable: false,
              },
              timestamp: {
                type: 'integer',
                nullable: false,
              },
              payload: {
                type: 'object',
                nullable: false,
              },
            },
            required: ['thing', 'timestamp', 'payload'],
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Create thing payload',
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
    tags: ['thing payload'],
  }

  const doc = {
    POST,
  }

  return doc
}
