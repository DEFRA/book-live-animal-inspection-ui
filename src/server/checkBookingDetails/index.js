import { checkBookingDetailsController } from '~/src/server/checkBookingDetails/controller'

const checkBookingDetails = {
  plugin: {
    name: 'checkBookingDetails',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/checkBookingDetails',
          ...checkBookingDetailsController
        }
      ])
    }
  }
}

export { checkBookingDetails }
