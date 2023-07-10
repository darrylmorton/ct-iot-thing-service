import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'
import { isAfter, parseISO } from 'date-fns'

import { ServiceThingPayloadResponse, ThingServiceInterface } from '../../serviceTypes'
import { postThingPayloadValidator } from '../validators/thingPayloadResponseValidators'
import logger from '../../logger'
import { getStartIsoTimestamp } from '../../util/AppUtil'

export default function (thingService: ThingServiceInterface) {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      const queryParams = <Record<string, string>>req.query

      if (
        queryParams.startTimestamp &&
        queryParams.endTimestamp &&
        isAfter(parseISO(queryParams.startTimestamp), parseISO(queryParams.endTimestamp))
      ) {
        return res.status(400).json({})
      } else if (!queryParams.startTimestamp || !queryParams.endTimestamp) {
        const today = new Date()

        queryParams.startTimestamp = getStartIsoTimestamp(today)
        queryParams.endTimestamp = today.toISOString()
      }

      try {
        const { statusCode, result }: ServiceThingPayloadResponse = await thingService.getThingPayloadsByQueryParams(
          queryParams
        )
        logger.trace('GET thingPayload: statusCode, result %d %j', statusCode, result)

        const validationErrors = postThingPayloadValidator.validateResponse(200, result)
        logger.trace('GET thingPayload: validationErrors %j', validationErrors)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('getThingPayloadError %s', error)

        return next(error)
      }
    },
  ]

  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingPayloadResponse = await thingService.postThingPayload(req.body)
        logger.trace('POST thingPayload: statusCode, result %d %j', statusCode, result)

        const validationErrors = postThingPayloadValidator.validateResponse(201, result)
        logger.trace('POST thingPayload: validationErrors %j', validationErrors)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('postThingPayloadError %s', error)

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
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
      {
        description: 'device id of the payload',
        in: 'query',
        required: false,
        name: 'deviceId',
        schema: {
          type: 'string',
        },
      },
      {
        description: 'thing type of the thing',
        in: 'query',
        required: false,
        name: 'thingType',
        schema: {
          type: 'string',
        },
      },
      {
        description: 'thing group of the thing',
        in: 'query',
        required: false,
        name: 'thingGroup',
        schema: {
          type: 'string',
        },
      },
    ],
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

  POST.apiDoc = {
    summary: 'Post thing payload',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              deviceId: {
                description: 'device id of the payload',
                type: 'string',
                nullable: false,
              },
              payloadTimestamp: {
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
            required: ['deviceId', 'payloadTimestamp', 'payload'],
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

  const doc: { GET: OperationHandlerArray; POST: OperationHandlerArray } = {
    GET,
    POST,
  }

  return doc
}
