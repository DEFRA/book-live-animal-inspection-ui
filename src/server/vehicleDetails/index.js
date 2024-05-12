import { vehicleDetailsController } from '~/src/server/vehicleDetails/controller'

const vehicleDetails = {
  plugin: {
    name: 'vehicleDetails',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/vehicleDetails',
          ...vehicleDetailsController
        }
      ])
    }
  }
}

export { vehicleDetails }
