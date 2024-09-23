import {
  vehicleDetailsController,
  vehicleUnloadTypeController
} from '~/src/server/vehicleDetails/controller'
import { optionsData } from '~/src/server/common/data/optionsData.js'
import { errorMessages } from '~/src/server/common/validations/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'
import { clearCacheKeys } from '~/src/server/common/helpers/cache-management'

// Mocking dependencies
jest.mock('~/src/server/common/data/optionsData.js', () => ({
  optionsData: {
    vehicleTypes: [
      { value: '1', text: 'Car' },
      { value: '2', text: 'Truck' },
      { value: '3', text: 'Special Vehicle' }
    ],
    vehicleUnloadTypes: [
      { value: '1', text: 'Type A' },
      { value: '2', text: 'Type B' }
    ]
  }
}))

// jest.mock('~/src/server/common/validations/errorMessages.js', () => ({
//   vehicleSelectionRequired: 'Vehicle selection is required',
//   vehicleUnloadSelectionRequired: 'Unload type selection is required'
// }));

jest.mock('~/src/server/common/helpers/cache-management', () => ({
  clearCacheKeys: jest.fn()
}))

describe('Vehicle Details Controller', () => {
  let mockRequest, mockH

  beforeEach(() => {
    mockRequest = {
      method: 'get',
      payload: {},
      yar: {
        set: jest.fn(),
        get: jest.fn()
      },
      query: {}
    }
    mockH = {
      view: jest.fn(),
      redirect: jest.fn()
    }
  })

  describe('vehicleDetailsController', () => {
    it('should render vehicle details view for GET request', () => {
      mockRequest.yar.get.mockReturnValueOnce('')

      vehicleDetailsController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('vehicleDetails/index', {
        pageTitle: 'VehicleDetails - Book a live animal inspection',
        heading: 'Book a live animal inspection',
        vehicleTypes: optionsData.vehicleTypes,
        vehicleTypeOption: '',
        error: '',
        backUrl: '/animalCount',
        route: undefined,
        breadcrumbs: [{ text: 'Back', href: '/' }, { text: 'Home' }]
      })
    })

    it('should handle POST request with no vehicle type selected', () => {
      mockRequest.method = 'post'
      mockRequest.payload = { vehicleTypeOption: '', route: '' }

      vehicleDetailsController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith(
        'vehicleDetails/index',
        expect.objectContaining({
          error: errorMessages.vehicleSelectionRequired
        })
      )
    })

    it('should handle POST request with valid vehicle type and redirect', () => {
      mockRequest.method = 'post'
      mockRequest.payload = { vehicleTypeOption: '1', route: '' }

      vehicleDetailsController.handler(mockRequest, mockH)

      expect(mockRequest.yar.set).toHaveBeenCalledWith(
        cacheKeys.vehicleTypeOption,
        '1'
      )
      expect(mockH.redirect).toHaveBeenCalledWith('/arrivalDate')
      expect(clearCacheKeys).toHaveBeenCalledWith(mockRequest, [
        cacheKeys.unloadTypeOption
      ])
    })

    it('should render vehicle unload type view for certain vehicle types', () => {
      mockRequest.method = 'post'
      mockRequest.payload = { vehicleTypeOption: '3', route: '' }

      vehicleDetailsController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith(
        'vehicleDetails/vehicleUnloadType',
        {
          pageTitle: 'Vehicle unload type - Book a live animal inspection',
          heading: 'Book a live animal inspection',
          vehicleUnloadTypes: optionsData.vehicleUnloadTypes,
          unloadTypeOption: undefined,
          error: '',
          backUrl: '/vehicleDetails',
          breadcrumbs: [{ text: 'Back', href: '/' }, { text: 'Home' }]
        }
      )
    })
  })
})

describe('Vehicle Unload Type Controller', () => {
  let mockRequest, mockH

  beforeEach(() => {
    mockRequest = {
      method: 'get',
      payload: {},
      yar: {
        set: jest.fn(),
        get: jest.fn()
      },
      query: {}
    }
    mockH = {
      view: jest.fn(),
      redirect: jest.fn()
    }
  })

  describe('vehicleUnloadTypeController', () => {
    it('should render unload type view for GET request', () => {
      mockRequest.yar.get.mockReturnValueOnce('')

      vehicleUnloadTypeController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith(
        'vehicleDetails/vehicleUnloadType',
        {
          pageTitle: 'Vehicle unload type - Book a live animal inspection',
          heading: 'Book a live animal inspection',
          vehicleUnloadTypes: optionsData.vehicleUnloadTypes,
          unloadTypeOption: '',
          error: '',
          backUrl: '/vehicleDetails',
          route: undefined
        }
      )
    })

    it('should handle POST request with no unload type selected', () => {
      mockRequest.method = 'post'
      mockRequest.payload = { unloadTypeOption: '', route: '' }

      vehicleUnloadTypeController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith(
        'vehicleDetails/vehicleUnloadType',
        expect.objectContaining({
          error: errorMessages.vehicleUnloadSelectionRequired
        })
      )
    })

    it('should handle POST request with valid unload type and redirect', () => {
      mockRequest.method = 'post'
      mockRequest.payload = { unloadTypeOption: '1', route: '' }

      vehicleUnloadTypeController.handler(mockRequest, mockH)

      expect(mockRequest.yar.set).toHaveBeenCalledWith(
        cacheKeys.unloadTypeOption,
        '1'
      )
      expect(mockH.redirect).toHaveBeenCalledWith('/arrivalDate')
    })
  })
})
