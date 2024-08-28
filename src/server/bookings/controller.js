import { testData } from '~/src/server/common/data/testData.js'

const bookingsController = {
  handler: (request, h) => {
    return h.view('bookings/index', {
      pageTitle: 'Upcoming bookings - Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'upcomingBookings',
      data: testData.UpcomingBookingRows,
      backUrl: '/',
      breadcrumbs: [
        {
          text: 'Back',
          href: '/'
        },
        {
          text: 'Example'
        }
      ]
    })
  }
}

export { bookingsController }
