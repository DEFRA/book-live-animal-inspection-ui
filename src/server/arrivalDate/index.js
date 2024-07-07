import { arrivalDateController } from '~/src/server/arrivalDate/controller'
const arrivalDate = {
  plugin: {
    name: 'arrivalDate',
    register: async (server) => {
      server.route([
        {
          method: ['GET', 'POST'],
          path: '/arrivalDate',
          ...arrivalDateController
        }
        // ,
        // {
        //   method: ['GET', 'POST'],
        //   path: '/vehicleUnloadType',
        //   ...vehicleUnloadTypeController
        // }
      ])
    }
  }
}

export { arrivalDate }
