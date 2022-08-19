import { client } from '../src/db'

export const cleanup = async (): Promise<void> => {
  await client('things').del()
}

module.exports = {
  cleanup,
}
