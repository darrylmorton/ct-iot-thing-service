import request from 'supertest'

import env from '../../src/env'
import { Express } from 'express'
import { ThingType } from '../../src/types'

export async function getThingTypesRoute(app: Express) {
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

export async function getThingTypeByNameRoute(app: Express, name: string) {
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

export async function getThingGroupsRoute(app: Express) {
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

export async function getThingGroupByNameRoute(app: Express, name?: unknown) {
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

export async function getThingGroupDeviceByNameAndDeviceIdRoute(
  app: Express,
  thingGroupDevice?: Record<string, unknown>
) {
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

export async function getThingGroupDevicesByNameRoute(app: Express, name?: string | unknown) {
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

export async function postThingGroupDeviceRoute(app: Express, thingGroupDevice?: Record<string, unknown>) {
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

export async function postThingGroupRoute(app: Express, thingGroup?: Record<string, unknown>) {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingGroup`)
    .set('content-type', 'application/json')
    .send(thingGroup)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingGroupRouteErr ${err}`)
      return err
    })
}

export async function postThingTypeRoute(app: Express, thingType: ThingType) {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingType`)
    .set('content-type', 'application/json')
    .send(thingType)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingTypeRouteErr ${err}`)
      return err
    })
}

export async function getThingByNameRoute(app: Express, name: unknown) {
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

export async function getThingsRoute(app: Express) {
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

export async function postThingRoute(app: Express, thing?: Record<string, unknown>) {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thing`)
    .set('content-type', 'application/json')
    .send(thing)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingRouteErr ${err}`)
      return err
    })
}

export async function postThingPayloadRoute(app: Express, thingPayload: Record<string, unknown>) {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingPayload`)
    .set('content-type', 'application/json')
    .send(thingPayload)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingPayloadRouteErr ${err}`)
      return err
    })
}

export async function getThingPayloadsWithQueryParamsRoute(app: Express, queryParams: Record<string, string>) {
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
