import request from 'supertest'

import env from '../../src/env'
import { Express } from 'express'
import { SimpleThing, ThingPayload, ThingType } from '../../src/types'

export async function getThingTypesRoute(app: Express): Promise<any> {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingType`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingRouteErr ${err}`)
      return err
    })
}

export async function postThingTypeRoute(app: Express, thingType: ThingType): Promise<any> {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingType`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
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

export async function getThingsRoute(app: Express): Promise<any> {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thing`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingRouteErr ${err}`)
      return err
    })
}

export async function postThingRoute(app: Express, thing: SimpleThing): Promise<any> {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thing`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
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

export async function getThingPayloadsRoute(app: Express, thingId: string): Promise<any> {
  return request(app)
    .get(`/${env.API_MAJOR_VERSION}/thingPayload/${thingId}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`getThingPayloadsRouteErr ${err}`)
      return err
    })
}

export async function postThingPayloadRoute(app: Express, thingPayload: ThingPayload): Promise<any> {
  return request(app)
    .post(`/${env.API_MAJOR_VERSION}/thingPayload`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
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
