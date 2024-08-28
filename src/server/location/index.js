import { locationController } from '~/src/server/location/controller'

const location = {
  plugin: {
    name: 'location',
    register: async (server) => {
      server.route([
        {
          method: ['GET', 'POST'],
          path: '/location',
          ...locationController
        }
      ])
    }
  }
}

export { location }
