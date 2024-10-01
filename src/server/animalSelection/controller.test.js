import {
  animalSelectionController,
  animalReferenceDataController
} from '~/src/server/animalSelection/controller.js'
import { errorMessages } from '~/src/server/common/validations/errorMessages'
import { clearCacheKeys } from '~/src/server/common/helpers/cache-management'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

jest.mock('~/src/server/common/helpers/cache-management', () => ({
  clearCacheKeys: jest.fn()
}))

describe('Animal Controllers', () => {
  describe('animalSelectionController', () => {
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
        'input-autocomplete': 'Horse',
        route: 'checkBookingDetails'
      },
      query: {},
      yar: mockYar
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should redirect to arrivalDate if animalSelection is valid and route is checkBookingDetails', () => {
      animalSelectionController.handler(mockRequest, mockH)

      expect(mockYar.set).toHaveBeenCalledWith('animalSelection', 'Horse')
      expect(clearCacheKeys).toHaveBeenCalledWith(mockRequest, [
        cacheKeys.arrivalDay,
        cacheKeys.arrivalMonth,
        cacheKeys.arrivalYear,
        cacheKeys.inspectionDateOption,
        cacheKeys.inspectionTimeOption
      ])
      expect(mockH.redirect).toHaveBeenCalledWith('/arrivalDate')
    })

    it('should redirect to animalCount if animalSelection is valid and route is not checkBookingDetails', () => {
      mockRequest.payload.route = 'someOtherRoute'

      animalSelectionController.handler(mockRequest, mockH)

      expect(mockYar.set).toHaveBeenCalledWith('animalSelection', 'Horse')
      expect(mockH.redirect).toHaveBeenCalledWith('/animalCount')
    })

    it('should return view with error if animalSelection is empty', () => {
      mockRequest.payload['input-autocomplete'] = ''
      animalSelectionController.handler(mockRequest, mockH)

      expect(mockYar.set).not.toHaveBeenCalled()
      expect(mockH.view).toHaveBeenCalledWith(
        'animalSelection/index',
        expect.objectContaining({
          error: errorMessages.animalNameSelectionRequired,
          animalSelection: undefined,
          backUrl: 'someOtherRoute',
          route: 'someOtherRoute'
        })
      )
    })

    it('should return view with previous animal selection from cache', () => {
      mockYar.get.mockReturnValue('Horse') // Cached animal selection

      animalSelectionController.handler(
        { ...mockRequest, method: 'get' },
        mockH
      )

      expect(mockH.view).toHaveBeenCalledWith(
        'animalSelection/index',
        expect.objectContaining({
          animalSelection: 'Horse'
        })
      )
    })
  })

  describe('animalReferenceDataController', () => {
    it('should return filtered data based on the query', () => {
      const mockRequest = {
        query: { q: 'h' }
      }

      const result = animalReferenceDataController.handler(mockRequest)

      expect(result).toEqual(
        expect.arrayContaining([
          'horses',
          'Chicken',
          'Sheep',
          'Fish',
          'hinnies',
          'shrews'
        ])
      )
      expect(result).toHaveLength(6) // Ensure it only returns matching items
    })

    it('should return an empty array if no matches found', () => {
      const mockRequest = {
        query: { q: 'xyz' }
      }

      const result = animalReferenceDataController.handler(mockRequest)

      expect(result).toEqual([]) // No matches found
    })
  })
})
