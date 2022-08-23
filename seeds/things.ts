import { client } from '../src/db'

const READINGS_TOTAL = 1000

const generateReading = (): number => {
  return Math.random() * 30 - 0
}
export const seed = async (): Promise<void> => {
  const [{ id: thingId }] = await client('things').insert({ name: 'thingOne' }).returning(['id'])

  for (let readingsCounter = 0; readingsCounter < READINGS_TOTAL; readingsCounter++) {
    const reading: number = generateReading()
    await client('readings').insert({ thingId, reading })
  }
}

export const cleanup = async (): Promise<void> => {
  await client('thing_types').del()
  await client('things').del()
  await client('payloads').del()
}

module.exports = {
  cleanup,
}
