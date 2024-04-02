import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingGroupResponse, ServiceThingTypesResponse, ThingServiceInterface } from '../../serviceTypes'
import logger from '../../logger'
import { getThingGroupsValidator, postThingGroupValidator } from '../validators/thingGroupResponseValidators'
import { ThingGroup } from '../../types'

export default function (thingService: ThingServiceInterface): {
  GET: OperationHandlerArray
  POST: OperationHandlerArray
} {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingTypesResponse = await thingService.getThingGroups()
        logger.debug('GET thingGroup: statusCode, result %d %j', statusCode, result)

        const validationErrors = getThingGroupsValidator.validateResponse(200, result)
        logger.debug('GET thingGroup: validationErrors %j', validationErrors)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('getThingGroupError %s', error)

        return next(error)
      }
    },
  ]

  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingGroupResponse = await thingService.postThingGroup(
          req.body as ThingGroup
        )
        logger.debug('POST thingGroup: statusCode, result %d %j', statusCode, result)

        const validationErrors = postThingGroupValidator.validateResponse(201, result)
        logger.debug('POST thingGroup: validationErrors %j', validationErrors)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('postThingGroupError %s', error)

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing groups',
    responses: {
      200: {
        description: 'Return thing groups',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ThingGroup',
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
    tags: ['thing group'],
  }

  POST.apiDoc = {
    summary: 'Post thing group',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                description: 'name of the thing group',
                type: 'string',
                nullable: false,
                minLength: 2,
                maxLength: 25,
              },
              description: {
                description: 'description of the thing group',
                type: 'string',
                nullable: false,
                minLength: 2,
                maxLength: 100,
              },
            },
            required: ['name', 'description'],
            additionalProperties: false,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Create thing group',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ThingGroup',
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
    tags: ['thing group'],
  }

  const doc: {
    GET: OperationHandlerArray
    POST: OperationHandlerArray
  } = {
    GET,
    POST,
  }

  return doc
}
