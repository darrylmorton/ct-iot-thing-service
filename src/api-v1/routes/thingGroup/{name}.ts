import { Request, Response, NextFunction } from 'express'
import { Operation, OperationHandlerArray } from 'express-openapi'

import { ServiceThingGroupResponse, ThingServiceInterface } from '../../../types/serviceTypes'
import logger from '../../../logger'
import { getThingGroupValidator } from '../../validators/thingGroupResponseValidators'

export default function (thingService: ThingServiceInterface): Operation {
  const GET: Operation = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { statusCode, result }: ServiceThingGroupResponse = await thingService.getThingGroupByName(
          req.params.name
        )
        logger.debug({ message: 'GET thingGroupByName', statusCode, messageObject: result })

        const validationErrors = getThingGroupValidator.validateResponse(statusCode, result)
        logger.debug({ message: 'GET thingGroupByName', validationErrors })

        if (validationErrors) {
          return res.status(statusCode).json(validationErrors)
        } else {
          return res.status(statusCode).json(result)
        }
      } catch (error) {
        logger.error('getThingGroupByNameError %s', error)

        return next(error)
      }
    },
  ]

  GET.apiDoc = {
    summary: 'Get thing group',
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
        description: 'Return thing group',
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
    tags: ['thing group'],
  }

  const doc: { GET: OperationHandlerArray } = {
    GET,
  }

  return doc
}
