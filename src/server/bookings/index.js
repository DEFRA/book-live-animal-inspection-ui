import { bookingsController } from '~/src/server/bookings/controller'

const bookings = {
  plugin: {
    name: 'bookings',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/upcomingBookings',
          ...bookingsController
        }
      ])
    }
  }
}

export { bookings }
