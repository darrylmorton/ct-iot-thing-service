import request from 'supertest'
import { Express } from 'express'

import env from '../../src/env'
import { Thing, ThingGroup, ThingPayload, ThingType } from '../../src/types/types'

export const getThingTypesRoute = async (app: Express): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingType`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingTypesRouteErr ${err}`)
      return err
    })
}

export const getThingTypeByNameRoute = async (app: Express, name: string): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingType/${name}`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingTypeByNameRouteErr ${err}`)
      return err
    })
}

export const getThingGroupsRoute = async (app: Express): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingGroup`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingGroupsRouteErr ${err}`)
      return err
    })
}

export const getThingGroupByNameRoute = async (app: Express, name?: unknown): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingGroup/${name}`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingGroupByNameRouteErr ${err}`)
      return err
    })
}

export const getThingGroupDeviceByNameAndDeviceIdRoute = async (
  app: Express,
  thingGroupDevice?: Record<string, unknown>
): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingGroup/${thingGroupDevice?.thingGroup}/thing/${thingGroupDevice?.deviceId}`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingGroupDeviceRouteErr ${err}`)
      return err
    })
}

export const getThingGroupDevicesByNameRoute = async (app: Express, name: unknown): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingGroup/${name}/thing`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingGroupDeviceRouteErr ${err}`)
      return err
    })
}

export const postThingGroupDeviceRoute = async (
  app: Express,
  thingGroupDevice?: Record<string, unknown>
): Promise<any> => {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingGroup/${thingGroupDevice?.thingGroup}/thing`)
    .set('content-type', 'application/json')
    .send({ deviceId: thingGroupDevice?.deviceId })
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingGroupDeviceRouteErr ${err}`)
      return err
    })
}

export const postThingGroupRoute = async (app: Express, thingGroup?: unknown): Promise<any> => {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingGroup`)
    .set('content-type', 'application/json')
    .send(thingGroup as ThingGroup)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingGroupRouteErr ${err}`)
      return err
    })
}

export const postThingTypeRoute = async (app: Express, thingType?: unknown): Promise<any> => {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingType`)
    .set('content-type', 'application/json')
    .send(thingType as ThingType)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingTypeRouteErr ${err}`)
      return err
    })
}

export const getThingByNameRoute = async (app: Express, name: unknown): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thing/${name}`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingByNameRouteErr ${err}`)
      return err
    })
}

export const getThingsRoute = async (app: Express): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thing`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingsRouteErr ${err}`)
      return err
    })
}

export const postThingRoute = async (app: Express, thing?: unknown): Promise<any> => {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thing`)
    .set('content-type', 'application/json')
    .send(thing as Thing)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingRouteErr ${err}`)
      return err
    })
}

export const postThingPayloadRoute = async (app: Express, thingPayload: unknown): Promise<any> => {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingPayload`)
    .set('content-type', 'application/json')
    .send(thingPayload as ThingPayload)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingPayloadRouteErr ${err}`)
      return err
    })
}

export const getThingPayloadsWithQueryParamsRoute = async (
  app: Express,
  queryParams: Record<string, string>
): Promise<any> => {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingPayload`)
    .set('content-type', 'application/json')
    .query({ ...queryParams })
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingPayloadsWithQueryParamsRouteErr ${err}`)
      return err
    })
}
