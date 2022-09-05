import env from '../env'

export const API_URI_PREFIX = process.env.HOST ? process.env.HOST : env.HOST + `:${env.PORT}`
