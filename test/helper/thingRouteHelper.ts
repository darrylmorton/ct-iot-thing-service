import request from 'supertest'

import env from '../../src/env'
import { Express } from 'express'
import { SimpleThing, ThingPayload, ThingType } from '../../src/types'

export async function getThingTypesRoute(app: Express) {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingType`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingRouteErr ${err}`)
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

export async function getThingByIdRoute(app: Express, id: string) {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thing/${id}`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingByIdRouteErr ${err}`)
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
      console.error(`getThingRouteErr ${err}`)
      return err
    })
}

export async function postThingRoute(app: Express, thing: SimpleThing) {
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

export async function getThingPayloadsRoute(app: Express, thingId: string) {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingPayload/${thingId}`)
    .set('content-type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingPayloadsRouteErr ${err}`)
      return err
    })
}

export async function postThingPayloadRoute(app: Express, thingPayload: ThingPayload) {
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

export async function postThingPayloadsWithQueryParamsRoute(
  app: Express,
  startTimestamp: string,
  endTimestamp: string,
  thingIds: Record<string, unknown>
) {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingPayloads`)
    .set('content-type', 'application/json')
    .query({ startTimestamp, endTimestamp })
    .send(thingIds)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingPayloadsWithQueryParamsRouteErr ${err}`)
      return err
    })
}

export async function postThingPayloadsRoute(app: Express, thingIds: Record<string, unknown>) {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingPayloads`)
    .set('content-type', 'application/json')
    .send(thingIds)
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`postThingPayloadRouteErr ${err}`)
      return err
    })
}
