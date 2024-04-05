import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingGroupDeviceResponse, ThingServiceInterface } from '../../../../../types/serviceTypes'
import logger from '../../../../../logger'
import { getThingGroupDeviceValidator } from '../../../../validators/thingGroupDeviceResponseValidators'

export default function (thingService: ThingServiceInterface): Operation {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingGroupDeviceResponse =
          await thingService.getThingGroupDeviceByNameAndDeviceId(req.params.name, req.params.deviceId)
        logger.debug('GET thingGroupDevicesByNameAndDeviceId: statusCode, result', statusCode, result)

        const validationErrors = getThingGroupDeviceValidator.validateResponse(200, result)
        logger.debug('GET thingGroupDevicesByNameAndDeviceId: validationErrors %j', validationErrors)

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('getThingGroupDeviceByNameAndDeviceIdError %s', error)

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing groups',
    parameters: [
      {
        description: 'name of the group device',
        in: 'path',
        required: true,
        name: 'name',
        schema: {
          type: 'string',
        },
      },
      {
        description: 'device id of the thing device',
        in: 'path',
        required: true,
        name: 'deviceId',
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Return thing group devices',
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

  const doc: { GET: OperationHandlerArray } = {
    GET,
  }

  return doc
}
