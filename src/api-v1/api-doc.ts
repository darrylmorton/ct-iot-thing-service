import env from '../env'

const apiDoc = {
  openapi: '3.0.3',
  info: {
    title: 'ThingService',
    version: env.API_VERSION,
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}/${env.API_MAJOR_VERSION}`,
    },
  ],
  components: {
    responses: {
      NotFoundError: {
        description: 'This resource cannot be found',
      },
      BadRequestError: {
        description: 'The request is invalid',
      },
      ConflictError: {
        description: 'This resource already exists',
      },
      UnauthorizedError: {
        description: 'Access token is missing or invalid',
      },
      Error: {
        description: 'Something went wrong',
      },
    },
  },

  paths: {},
}

export default apiDoc
