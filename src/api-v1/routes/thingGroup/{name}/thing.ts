import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import {
  ServiceThingGroupResponse,
  ServiceThingGroupDevicesResponse,
  ThingServiceInterface,
} from '../../../../types/serviceTypes'
import logger from '../../../../logger'
import {
  getThingGroupDevicesValidator,
  postThingGroupDeviceValidator,
} from '../../../validators/thingGroupDeviceResponseValidators'

export default function (thingService: ThingServiceInterface): {
  GET: OperationHandlerArray
  POST: OperationHandlerArray
} {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingGroupDevicesResponse = await thingService.getThingGroupDevicesByName(
          req.params.name
        )
        logger.debug({ message: 'GET thingGroupDevicesByName', statusCode, messageObject: result })

        const validationErrors = getThingGroupDevicesValidator.validateResponse(200, result)
        logger.debug({ message: 'GET thingGroupDevicesByName', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error({ message: 'getThingGroupDeviceByNameError', messageObject: error })

        return next(error)
      }
    },
  ]

  const POST: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingGroupResponse = await thingService.postThingGroupDevice({
          thingGroup: req.params.name,
          deviceId: req.body.deviceId,
        })
        logger.debug({ message: 'POST thingGroupDevice', statusCode, messageObject: result })

        const validationErrors = postThingGroupDeviceValidator.validateResponse(201, result)
        logger.debug({ message: 'POST thingGroupDevice', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error({ message: 'postThingGroupDeviceError', messageObject: error })

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing groups',
    parameters: [
      {
        description: 'name of the group',
        in: 'path',
        required: true,
        name: 'name',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Return thing groups',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ThingGroupDevice',
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
    tags: ['thing group device'],
  }

  POST.apiDoc = {
    summary: 'Post thing group',
    parameters: [
      {
        description: 'name of the group',
        in: 'path',
        required: true,
        name: 'name',
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              deviceId: {
                description: 'device id of the thing',
                type: 'string',
                nullable: false,
                minLength: 2,
                maxLength: 25,
              },
            },
            required: ['deviceId'],
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
              $ref: '#/components/schemas/ThingGroupDevice',
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
    tags: ['thing group device'],
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
