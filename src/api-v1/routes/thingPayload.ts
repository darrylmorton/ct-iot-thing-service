import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'

import { ServiceThingPayloadResponse, ThingServiceInterface } from '../../serviceTypes'
import { postThingPayloadValidator } from '../validators/thingPayloadResponseValidators'
import logger from '../../logger'

export default function (thingService: ThingServiceInterface) {
  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingPayloadResponse = await thingService.postThingPayload(req.body)
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
                description: 'thing of the payload',
                type: 'string',
                format: 'uuid',
                nullable: false,
              },
              timestamp: {
                description: 'timestamp of the payload',
                type: 'integer',
                nullable: false,
              },
              payload: {
                description: 'payload',
                type: 'object',
                properties: {
                  cadence: {
                    properties: {
                      value: {
                        description: 'value of the cadence',
                        type: 'integer',
                        nullable: false,
                      },
                      unit: {
                        description: 'unit of the cadence',
                        type: 'string',
                        nullable: false,
                      },
                    },
                    required: ['value', 'unit'],
                    additionalProperties: false,
                  },
                  battery: {
                    properties: {
                      value: {
                        description: 'value of the battery',
                        type: 'integer',
                        nullable: false,
                      },
                      unit: {
                        description: 'unit of the battery',
                        type: 'string',
                        nullable: false,
                      },
                    },
                    required: ['value', 'unit'],
                    additionalProperties: false,
                  },
                  temperature: {
                    properties: {
                      value: {
                        description: 'value of the temperature',
                        type: 'number',
                        format: 'float',
                        nullable: false,
                      },
                      unit: {
                        description: 'unit of the temperature',
                        type: 'string',
                        nullable: false,
                      },
                      connection: {
                        description: 'connection of the temperature',
                        type: 'string',
                        nullable: false,
                      },
                    },
                    required: ['value', 'unit', 'connection'],
                    additionalProperties: false,
                  },
                  humidity: {
                    properties: {
                      value: {
                        description: 'value of the humidity',
                        type: 'number',
                        format: 'float',
                        nullable: false,
                      },
                      unit: {
                        description: 'unit of the humidity',
                        type: 'string',
                        nullable: false,
                      },
                      connection: {
                        description: 'connection of the humidity',
                        type: 'string',
                        nullable: false,
                      },
                      precipitation: {
                        description: 'precipitation of the humidity',
                        type: 'boolean',
                        nullable: false,
                      },
                    },
                    required: ['value', 'unit', 'connection', 'precipitation'],
                    additionalProperties: false,
                  },
                },
                required: ['cadence', 'battery', 'temperature', 'humidity'],
                additionalProperties: false,
              },
            },
            required: ['thing', 'timestamp', 'payload'],
            additionalProperties: false,
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
