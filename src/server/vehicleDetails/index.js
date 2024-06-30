import {
  vehicleDetailsController,
  vehicleUnloadTypeController
} from '~/src/server/vehicleDetails/controller'
const vehicleDetails = {
  plugin: {
    name: 'vehicleDetails',
    register: async (server) => {
      server.route([
        {
          method: ['GET', 'POST'],
          path: '/vehicleDetails',
          ...vehicleDetailsController
        },
        {
          method: ['GET', 'POST'],
          path: '/vehicleUnloadType',
          ...vehicleUnloadTypeController
        }
      ])
    }
  }
}

export { vehicleDetails }
