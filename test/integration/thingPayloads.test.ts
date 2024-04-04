// import { before, describe, it } from 'mocha'
// import { expect } from 'chai'
// import { Express } from 'express'
// import { fromUnixTime } from 'date-fns'
//
// import { getThingPayloadsWithQueryParamsRoute, postThingPayloadRoute } from '../helper/thingRouteHelper'
// import { createHttpServer } from '../../src/server'
// import { ThingPayload } from '../../src/types'
// import { seed, thingPayloadSeed } from '../../seeds/things'
// import { assertThingPayload, createThingPayload, DEVICE_IDS } from '../helper/thingHelper'
// import db from '../../src/db'
// import { getUnixEndTimestamp, getUnixStartTimestamp } from '../../src/util/AppUtil'
//
// // TODO validation scenarios would need openapi request validation min/max length implemented
// //  currently null or missing parameters can only be tested against
// describe('Thing Payload routes', function () {
//   let app: Express
//
//   before(async function () {
//     await seed()
//
//     app = await createHttpServer()
//   })
//
//   it('POST Thing Payload that is invalid', async function () {
//     const expectedResult = createThingPayload({})
//
//     const actualResult = await postThingPayloadRoute(app, expectedResult)
//
//     expect(actualResult.status).to.equal(400)
//     expect(actualResult.body).to.deep.equal({})
//   })
//
//   it('POST Thing Payload that is invalid - deviceId', async function () {
//     const expectedResult = createThingPayload({
//       deviceId: null,
//     })
//
//     const actualResult = await postThingPayloadRoute(app, expectedResult)
//
//     expect(actualResult.status).to.equal(400)
//     expect(actualResult.body).to.deep.equal({})
//   })
//
//   it('POST Thing Payload', async function () {
//     const expectedResult = createThingPayload({
//       deviceId: DEVICE_IDS[0],
//     })
//
//     const actualResult = await postThingPayloadRoute(app, expectedResult)
//
//     expect(actualResult.status).to.equal(201)
//     assertThingPayload(actualResult.body, expectedResult)
//   })
//
//   describe('Thing Payload routes with query params', function () {
//     let payloadsTotal: number
//     let today: Date
//     let startTimestamp: number
//     let startTimestampParam: string
//     let endTimestamp: number
//     let endTimestampParam: string
//
//     before(async function () {
//       payloadsTotal = 60 // minutes // 1440 // day in minutes
//       await thingPayloadSeed(payloadsTotal)
//
//       today = new Date()
//       startTimestamp = getUnixStartTimestamp(today)
//       startTimestampParam = fromUnixTime(startTimestamp).toISOString()
//       endTimestamp = getUnixEndTimestamp(today)
//       endTimestampParam = fromUnixTime(endTimestamp).toISOString()
//     })
//
//     it('GET all Thing Payloads by default dates', async function () {
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {})
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//
//     it('GET all Thing Payloads by invalid dates', async function () {
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         startTimestamp: '0',
//         endTimestamp: '0',
//       })
//
//       expect(actualResult.status).to.equal(400)
//       expect(actualResult.body).to.deep.equal({})
//     })
//
//     it('GET all Thing Payloads by invalid dates - startTimestamp must be before endTimestamp', async function () {
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         startTimestamp: endTimestampParam,
//         endTimestamp: startTimestampParam,
//       })
//
//       expect(actualResult.status).to.equal(400)
//       expect(actualResult.body).to.deep.equal({})
//     })
//
//     it('GET all Thing Payloads by timestamps', async function () {
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByTimestamps(startTimestamp, endTimestamp)
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         startTimestamp: startTimestampParam,
//         endTimestamp: endTimestampParam,
//       })
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//
//     it('GET all Thing Payloads by default dates and deviceId', async function () {
//       const deviceId = DEVICE_IDS[2]
//
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByDeviceIdAndTimestamps(
//         deviceId,
//         startTimestamp,
//         endTimestamp
//       )
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         deviceId,
//       })
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//
//     it('GET all Thing Payloads by timestamps and deviceId', async function () {
//       const deviceId = DEVICE_IDS[2]
//
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByDeviceIdAndTimestamps(
//         deviceId,
//         startTimestamp,
//         endTimestamp
//       )
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         startTimestamp: startTimestampParam,
//         endTimestamp: endTimestampParam,
//         deviceId,
//       })
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//
//     it('GET all Thing Payloads by default dates and thing group name', async function () {
//       const thingGroup = THING_GROUP_NAMES[2]
//
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingGroupAndTimestamps(
//         thingGroup,
//         startTimestamp,
//         endTimestamp
//       )
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         thingGroup,
//       })
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//
//     it('GET all Thing Payloads by timestamps and thing group name', async function () {
//       const thingGroup = THING_GROUP_NAMES[2]
//
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingGroupAndTimestamps(
//         thingGroup,
//         startTimestamp,
//         endTimestamp
//       )
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         startTimestamp: startTimestampParam,
//         endTimestamp: endTimestampParam,
//         thingGroup,
//       })
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//
//     it('GET all Thing Payloads by default dates and thing type name', async function () {
//       const thingType = THING_TYPE_NAMES[2]
//
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingTypeAndTimestamps(
//         thingType,
//         startTimestamp,
//         endTimestamp
//       )
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         thingType,
//       })
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//
//     it('GET all Thing Payloads by timestamps and thing type name', async function () {
//       const thingType = THING_TYPE_NAMES[2]
//
//       const expectedResult: ThingPayload[] = await db.findThingPayloadsByThingTypeAndTimestamps(
//         thingType,
//         startTimestamp,
//         endTimestamp
//       )
//
//       const actualResult = await getThingPayloadsWithQueryParamsRoute(app, {
//         startTimestamp: startTimestampParam,
//         endTimestamp: endTimestampParam,
//         thingType,
//       })
//
//       expect(actualResult.status).to.equal(200)
//       expect(actualResult.body).to.deep.equal(expectedResult)
//     })
//   })
// })
