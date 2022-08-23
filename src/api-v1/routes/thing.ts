import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'

import { ServiceResponse } from '../../types'
import { getThingsValidator, postThingValidator } from '../validators/thingResponseValidators'

export default function (thingService: any) {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceResponse = await thingService.getThings()

        const validationErrors = getThingsValidator.validateResponse(200, result)

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

  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceResponse = await thingService.postThing(req.body)

        const validationErrors = postThingValidator.validateResponse(201, result)

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
    summary: 'Get things',
    responses: {
      200: {
        description: 'Return things',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                properties: {
                  id: {
                    description: 'id of the thing',
                    type: 'string',
                    format: 'uuid',
                    nullable: false,
                  },
                  name: {
                    description: 'name of the thing',
                    type: 'string',
                    nullable: false,
                  },
                },
                required: ['id', 'name'],
                additionalProperties: false,
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
    tags: ['thing'],
  }

  POST.apiDoc = {
    summary: 'Post thing',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                nullable: false,
                minLength: 2,
                maxLength: 25,
              },
            },
            required: ['name'],
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Create thing',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  description: 'id of the thing',
                  type: 'string',
                  format: 'uuid',
                  nullable: false,
                },
                name: {
                  description: 'name of the thing',
                  type: 'string',
                  nullable: false,
                },
                thingType: {
                  type: 'object',
                  properties: {
                    name: {
                      description: 'thing type of the thing',
                      type: 'string',
                      nullable: false,
                    },
                  },
                },
              },
              required: ['id', 'name', 'thingType'],
              additionalProperties: false,
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
    tags: ['thing'],
  }

  const doc = {
    GET,
    POST,
  }

  return doc
}
