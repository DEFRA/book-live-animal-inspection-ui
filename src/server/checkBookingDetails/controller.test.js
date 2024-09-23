import { checkBookingDetailsController } from '~/src/server/checkBookingDetails/controller.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

// Mock the optionsData module
jest.mock('~/src/server/common/data/optionsData.js', () => ({
  optionsData: {
    locations: [
      { value: 1, text: 'Location A' },
      { value: 2, text: 'Location B' }
    ],
    vehicleTypes: [
      { value: 1, text: 'Truck' },
      { value: 2, text: 'Van' }
    ],
    vehicleUnloadTypes: [
      { value: 1, text: 'Unload Type A' },
      { value: 2, text: 'Unload Type B' }
    ]
  }
}))

describe('checkBookingDetailsController', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      yar: {
        get: jest.fn()
      }
    }
    mockH = {
      view: jest.fn()
    }
  })

  it('should return the booking details view with correct parameters', () => {
    // Mock the values returned from the yar store
    mockRequest.yar.get.mockImplementation((key) => {
      switch (key) {
        case cacheKeys.locationOption:
          return 1 // Location A
        case cacheKeys.animalSelection:
          return 'Horse'
        case cacheKeys.animalCount:
          return '3'
        case cacheKeys.vehicleTypeOption:
          return 1 // Truck
        case cacheKeys.unloadTypeOption:
          return 2 // Unload Type B
        case cacheKeys.inspectionDateTextOption:
          return '2024-05-01'
        case cacheKeys.inspectionTimeTextOption:
          return '9am to 11am'
        default:
          return null
      }
    })

    checkBookingDetailsController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('checkBookingDetails/index', {
      pageTitle:
        'Check booking details - Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'checkBookingDetails',
      bookingSelectedParameters: {
        location: 'Location A',
        animalSpecies: 'Horse',
        animalCount: '3',
        vehicleTypeOption: 'Truck',
        unloadTypeOption: 'Unload Type B',
        arrivalDate: '2024-05-01 9am to 11am'
      },
      backUrl: '/'
    })
  })
})
