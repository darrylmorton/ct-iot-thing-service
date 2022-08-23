import { Request, Response, NextFunction } from 'express'
import { Operation } from 'express-openapi'

import { ServiceResponse } from '../../types'
import { getThingTypesValidator, postThingTypeValidator } from '../validators/thingTypeResponseValidators'

export default function (thingService: any) {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceResponse = await thingService.getThingTypes()

        const validationErrors = getThingTypesValidator.validateResponse(200, result)

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
        const { statusCode, result }: ServiceResponse = await thingService.postThingType(req.body)

        const validationErrors = postThingTypeValidator.validateResponse(201, result)

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
    summary: 'Get thing types',
    responses: {
      200: {
        description: 'Return thing types',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                properties: {
                  name: {
                    description: 'name of the thing type',
                    type: 'string',
                    nullable: false,
                  },
                },
                required: ['name'],
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
    tags: ['thing types'],
  }

  POST.apiDoc = {
    summary: 'Post thing type',
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
        description: 'Create thing type',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  description: 'name of the thing type',
                  type: 'string',
                  nullable: false,
                },
              },
              required: ['name'],
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
    tags: ['thing types'],
  }

  const doc = {
    GET,
    POST,
  }

  return doc
}
