import {
  arrivalDateController,
  inspectionDateController,
  inspectionTimeController
} from '~/src/server/arrivalDate/controller'
import { validators } from '~/src/server/common/validations/validations'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'
import { clearCacheKeys } from '~/src/server/common/helpers/cache-management'

jest.mock('~/src/server/common/validations/validations')
jest.mock('~/src/server/common/validations/errorMessages')
jest.mock('~/src/server/common/helpers/cache-management')

describe('Arrival Date Controllers', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    // Mock the request object
    mockRequest = {
      method: 'get',
      query: {},
      payload: {},
      yar: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue('')
      }
    }

    // Mock the h toolkit with a spy on the view and redirect functions
    mockH = {
      view: jest.fn(),
      redirect: jest.fn()
    }
  })

  describe('arrivalDateController', () => {
    it('should render view with error for GET request', () => {
      arrivalDateController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('arrivalDate/index', {
        pageTitle: 'Arrival time - Book a live animal inspection',
        heading: 'Book a live animal inspection',
        arrivalDate: { day: '', month: '', year: '' },
        error: '',
        errorClass: '',
        backUrl: '/vehicleDetails',
        route: undefined
      })
    })

    it('should redirect for valid POST request', () => {
      mockRequest.method = 'post'
      mockRequest.payload = {
        day: '28',
        month: '5',
        year: '2024',
        route: 'checkBookingDetails'
      }
      validators.validateDate.mockReturnValue(null) // No validation error

      arrivalDateController.handler(mockRequest, mockH)

      expect(clearCacheKeys).toHaveBeenCalledWith(mockRequest, [
        cacheKeys.inspectionDateOption,
        cacheKeys.inspectionTimeOption,
        cacheKeys.inspectionDateTextOption,
        cacheKeys.inspectionTimeTextOption
      ])
      expect(mockRequest.yar.set).toHaveBeenCalledWith(
        cacheKeys.arrivalDay,
        '28'
      )
      expect(mockRequest.yar.set).toHaveBeenCalledWith(
        cacheKeys.arrivalMonth,
        '5'
      )
      expect(mockRequest.yar.set).toHaveBeenCalledWith(
        cacheKeys.arrivalYear,
        '2024'
      )
      expect(mockH.redirect).toHaveBeenCalledWith('/inspectionDate')
    })
  })

  describe('inspectionDateController', () => {
    it('should render view with error for GET request', () => {
      inspectionDateController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('arrivalDate/inspectionDate', {
        pageTitle: 'Inspection date - Book a live animal inspection',
        heading: 'Book a live animal inspection',
        inspectionDateOptions: expect.any(Array), // Verify options exist
        inspectionDateOption: '',
        error: '',
        backUrl: '/arrivalDate'
      })
    })

    it('should redirect for valid POST request', () => {
      mockRequest.method = 'post'
      mockRequest.payload = { inspectionDateOption: '1' }
      mockRequest.yar.get.mockReturnValue('') // Assuming it gets the current selection

      inspectionDateController.handler(mockRequest, mockH)

      expect(mockRequest.yar.set).toHaveBeenCalledWith(
        cacheKeys.inspectionDateOption,
        '1'
      )
      expect(mockH.redirect).toHaveBeenCalledWith('/inspectionTime')
    })
  })

  describe('inspectionTimeController', () => {
    it('should render view with error for GET request', () => {
      inspectionTimeController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('arrivalDate/inspectionTime', {
        pageTitle: 'Inspection Time - Book a live animal inspection',
        heading: 'Book a live animal inspection',
        inspectionTimeOptions: expect.any(Array),
        inspectionTimeOption: '',
        error: '',
        backUrl: '/inspectionDate',
        breadcrumbs: [{ text: 'Back', href: '/' }, { text: 'Home' }]
      })
    })

    it('should redirect for valid POST request', () => {
      mockRequest.method = 'post'
      mockRequest.payload = { inspectionTimeOption: '1' }

      inspectionTimeController.handler(mockRequest, mockH)

      expect(mockRequest.yar.set).toHaveBeenCalledWith(
        cacheKeys.inspectionTimeOption,
        '1'
      )
      expect(mockH.redirect).toHaveBeenCalledWith('/checkBookingDetails')
    })
  })
})
