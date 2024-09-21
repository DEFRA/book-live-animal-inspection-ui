import { animalCountController } from '~/src/server/animalCount/controller.js'
import { validators } from '~/src/server/common/validations/validations.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

jest.mock('~/src/server/common/validations/validations.js', () => ({
  validators: {
    validateAnimalCount: jest.fn()
  }
}))

describe('animalCountController', () => {
  const mockH = {
    redirect: jest.fn(),
    view: jest.fn()
  }

  const mockYar = {
    set: jest.fn(),
    get: jest.fn()
  }

  const mockRequest = {
    method: 'post',
    payload: {
      animalCount: 5,
      route: 'checkBookingDetails'
    },
    query: {},
    yar: mockYar
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should redirect to checkBookingDetails if animalCount is valid', () => {
    validators.validateAnimalCount.mockReturnValue(null) // Valid input

    animalCountController.handler(mockRequest, mockH)

    expect(mockYar.set).toHaveBeenCalledWith(cacheKeys.animalCount, 5)
    expect(mockH.redirect).toHaveBeenCalledWith('/checkBookingDetails')
  })

  it('should redirect to vehicleDetails if animalCount is valid and route is not checkBookingDetails', () => {
    mockRequest.payload.route = 'someOtherRoute'

    animalCountController.handler(mockRequest, mockH)
    expect(mockYar.set).toHaveBeenCalledWith(cacheKeys.animalCount, 5)
    expect(mockH.redirect).toHaveBeenCalledWith('/vehicleDetails')
  })

  it('should return view with error if animalCount is invalid', () => {
    const errorMessage = 'Invalid count'
    validators.validateAnimalCount.mockReturnValue(errorMessage) // Invalid input

    animalCountController.handler(mockRequest, mockH)

    expect(mockYar.set).not.toHaveBeenCalled()
    expect(mockH.view).toHaveBeenCalledWith(
      'animalCount/index',
      expect.objectContaining({
        error: errorMessage,
        animalCount: undefined,
        backUrl: 'someOtherRoute',
        route: 'someOtherRoute',
        errorClass: '',
        heading: 'Book a live animal inspection',
        page: 'animalCount',
        pageTitle:
          'Animal species count - Book a live animal inspection - GOV.UK'
      })
    )
  })

  it('should return view with previous animal count from cache', () => {
    mockYar.get.mockReturnValue(3) // Cached animal count

    animalCountController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith(
      'animalCount/index',
      expect.objectContaining({
        animalCount: 3
      })
    )
  })
})
