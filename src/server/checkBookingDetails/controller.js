import { cacheKeys } from '~/src/server/common/data/cacheKeys'
import { optionsData } from '~/src/server/common/data/optionsData.js'

const checkBookingDetailsController = {
  handler: (request, h) => {
    const bookingSelectedParameters = {
      location:
        optionsData.locations.find(
          (obj) =>
            obj.value === parseInt(request.yar.get(cacheKeys.locationOption))
        )?.text || null,
      animalSpecies: request.yar.get(cacheKeys.animalSelection),
      animalCount: request.yar.get(cacheKeys.animalCount),
      vehicleTypeOption:
        optionsData.vehicleTypes.find(
          (obj) =>
            obj.value === parseInt(request.yar.get(cacheKeys.vehicleTypeOption))
        )?.text || null,
      unloadTypeOption:
        optionsData.vehicleUnloadTypes.find(
          (obj) =>
            obj.value === parseInt(request.yar.get(cacheKeys.unloadTypeOption))
        )?.text || null,
      arrivalDay: 'arrivalDay',
      arrivalMonth: 'arrivalMonth',
      arrivalYear: 'arrivalYear'
    }
    return h.view('checkBookingDetails/index', {
      pageTitle:
        'Check booking details - Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'checkBookingDetails',
      bookingSelectedParameters: bookingSelectedParameters,
      backUrl: '/'
    })
  }
}

export { checkBookingDetailsController }
