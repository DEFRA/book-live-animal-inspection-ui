import { bookingsController } from '~/src/server/bookings/controller.js'
import { testData } from '~/src/server/common/data/testData.js'

jest.mock('~/src/server/common/data/testData.js')

describe('bookingsController', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {}
    mockH = {
      view: jest.fn()
    }
  })

  it('should return the bookings view with correct data', () => {
    // Mock the data that will be returned by testData
    const mockUpcomingBookingRows = [
      { id: 1, animal: 'Horse', date: '2024-05-01' },
      { id: 2, animal: 'Goat', date: '2024-06-01' }
    ]
    testData.UpcomingBookingRows = mockUpcomingBookingRows

    bookingsController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('bookings/index', {
      pageTitle: 'Upcoming bookings - Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'upcomingBookings',
      data: mockUpcomingBookingRows,
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
  })
})
