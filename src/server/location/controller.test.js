import { locationController } from '~/src/server/location/controller'
import { errorMessages } from '~/src/server/common/validations/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'
import { optionsData } from '~/src/server/common/data/optionsData.js'

// Mock the optionsData object
jest.mock('~/src/server/common/data/optionsData.js', () => ({
  optionsData: {
    locations: [
      { value: '1', text: 'Location 1' },
      { value: '2', text: 'Location 2' }
    ]
  }
}))

describe('locationController', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      method: 'get',
      yar: {
        get: jest.fn(),
        set: jest.fn()
      },
      payload: {},
      query: {}
    }
    mockH = {
      view: jest.fn(),
      redirect: jest.fn()
    }
  })

  it('should return the location view with correct parameters for GET request', () => {
    mockRequest.method = 'get'

    locationController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('location/index', {
      pageTitle: 'Location - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      locations: optionsData.locations, // Now it will access the mocked data
      error: '',
      locationOption: undefined,
      backUrl: '/',
      breadcrumbs: [{ text: 'Back', href: '/' }, { text: 'Home' }]
    })
  })

  it('should redirect to animalSelection for valid POST request', () => {
    mockRequest.method = 'post'
    mockRequest.payload.locationOption = '1' // Example valid option

    locationController.handler(mockRequest, mockH)

    expect(mockRequest.yar.set).toHaveBeenCalledWith(
      cacheKeys.locationOption,
      '1'
    )
    expect(mockH.redirect).toHaveBeenCalledWith('/animalSelection')
  })

  it('should return the location view with error for invalid POST request', () => {
    mockRequest.method = 'post'
    mockRequest.payload.locationOption = '' // Invalid option

    locationController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('location/index', {
      pageTitle: 'Location - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      locations: optionsData.locations, // Now it will access the mocked data
      error: errorMessages.siteSelectionRequired,
      locationOption: undefined,
      backUrl: '/',
      breadcrumbs: [{ text: 'Back', href: '/' }, { text: 'Home' }]
    })
  })
})
