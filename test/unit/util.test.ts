import { parseISO, subDays } from 'date-fns'
import { expect } from 'chai'

import { getStartIsoTimestamp } from '../../src/util/AppUtil'

describe('Utils', () => {
  it('getStartIsoTimestamp', async () => {
    const date = parseISO('2024-04-04T19:30:30Z')
    const expectedResult = subDays(date, 2).toISOString()

    const actualResult = getStartIsoTimestamp(date, 2)

    expect(actualResult).to.equal(expectedResult)
  })
})
