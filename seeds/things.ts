import { client } from '../src/db'

const READINGS_TOTAL = 1000

const generateReadingValue = (max: number, min: number): number => {
  return Math.random() * (max - min) + min
}

export const seed = async (): Promise<void> => {
  const [{ id: thingId }] = await client('things').insert({ name: 'thingOne' }).returning(['id'])

  for (let readingsCounter = 0; readingsCounter < READINGS_TOTAL; readingsCounter++) {
    const readingValue: number = generateReadingValue(20, 28)
    await client('thing_payloads').insert({ thingId, readingValue })
  }
}

export const cleanup = async (): Promise<void> => {
  await client('thing_types').del()
  await client('things').del()
  await client('thing_payloads').del()
}

module.exports = {
  cleanup,
}
