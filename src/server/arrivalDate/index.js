import {
  arrivalDateController,
  inspectionDateController,
  inspectionTimeController
} from '~/src/server/arrivalDate/controller'
const arrivalDate = {
  plugin: {
    name: 'arrivalDate',
    register: async (server) => {
      server.route([
        {
          method: ['GET', 'POST'],
          path: '/arrivalDate',
          ...arrivalDateController
        },
        {
          method: ['GET', 'POST'],
          path: '/inspectionDate',
          ...inspectionDateController
        },
        {
          method: ['GET', 'POST'],
          path: '/inspectionTime',
          ...inspectionTimeController
        }
      ])
    }
  }
}

export { arrivalDate }
