import { declarationController } from '~/src/server/declaration/controller.js'
import { optionsData } from '~/src/server/common/data/optionsData.js'
import { errorMessages } from '~/src/server/common/validations/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

jest.mock('~/src/server/common/data/optionsData.js', () => ({
  optionsData: {
    declarationOptions: [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' }
    ]
  }
}))

describe('declarationController', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      method: 'post',
      payload: {},
      yar: {
        set: jest.fn(),
        get: jest.fn()
      }
    }
    mockH = {
      view: jest.fn(),
      redirect: jest.fn()
    }
  })

  it('should redirect to /location if declarationOption is "1"', () => {
    mockRequest.payload.declarationOption = '1'

    declarationController.handler(mockRequest, mockH)

    expect(mockRequest.yar.set).toHaveBeenCalledWith(
      cacheKeys.declarationOption,
      '1'
    )
    expect(mockH.redirect).toHaveBeenCalledWith('/location')
  })

  it('should redirect to /upcomingBookings if declarationOption is not "1"', () => {
    mockRequest.payload.declarationOption = '2'

    declarationController.handler(mockRequest, mockH)

    expect(mockRequest.yar.set).toHaveBeenCalledWith(
      cacheKeys.declarationOption,
      '2'
    )
    expect(mockH.redirect).toHaveBeenCalledWith('/upcomingBookings')
  })

  it('should return view with error if declarationOption is missing', () => {
    mockRequest.method = 'post'
    mockRequest.payload.declarationOption = ''

    declarationController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('declaration/index', {
      pageTitle: 'Declaration - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      declarationOptions: optionsData.declarationOptions,
      error: errorMessages.declarationOptionRequired,
      declarationOption: undefined,
      backUrl: '/upcomingBookings'
    })
  })

  it('should return view with the current declarationOption from yar', () => {
    mockRequest.method = 'get'
    mockRequest.yar.get.mockReturnValue('2')

    declarationController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('declaration/index', {
      pageTitle: 'Declaration - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      declarationOptions: optionsData.declarationOptions,
      error: '',
      declarationOption: '2',
      backUrl: '/upcomingBookings'
    })
  })
})
