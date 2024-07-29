import { optionsData } from '~/src/server/common/data/optionsData.js'
import { errorMessages } from '~/src/server/common/validations/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'
import { clearCacheKeys } from '~/src/server/common/helpers/cache-management'

const vehicleDetailsController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { vehicleTypeOption, route } = request.payload
      if (!vehicleTypeOption || vehicleTypeOption.trim() === '') {
        error = errorMessages.vehicleSelectionRequired
      } else {
        if (route === 'checkBookingDetails') {
          clearCacheKeys(request, [
            cacheKeys.arrivalDay,
            cacheKeys.arrivalMonth,
            cacheKeys.arrivalYear,
            cacheKeys.inspectionDateOption,
            cacheKeys.inspectionTimeOption
          ])
        }
        request.yar.set(cacheKeys.vehicleTypeOption, vehicleTypeOption)
        if (vehicleTypeOption === '3' || vehicleTypeOption === '4') {
          return h.view('vehicleDetails/vehicleUnloadType', {
            pageTitle: 'Vehicle unload type - Book a live animal inspection',
            heading: 'Book a live animal inspection',
            vehicleUnloadTypes: optionsData.vehicleUnloadTypes,
            unloadTypeOption: request.yar.get(cacheKeys.unloadTypeOption),
            error,
            backUrl: '/vehicleDetails',
            breadcrumbs: [
              {
                text: 'Back',
                href: '/'
              },
              {
                text: 'Home'
              }
            ]
          })
        }

        return h.redirect('/arrivalDate')
      }
    }

    return h.view('vehicleDetails/index', {
      pageTitle: 'VehicleDetails - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      vehicleTypes: optionsData.vehicleTypes,
      vehicleTypeOption: request.yar.get(cacheKeys.vehicleTypeOption),
      error,
      backUrl: '/animalCount',
      route: request.query.route,
      breadcrumbs: [
        {
          text: 'Back',
          href: '/'
        },
        {
          text: 'Home'
        }
      ]
    })
  }
}

const vehicleUnloadTypeController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { unloadTypeOption } = request.payload
      if (!unloadTypeOption || unloadTypeOption.trim() === '') {
        error = errorMessages.vehicleUnloadSelectionRequired
      } else {
        request.yar.set(cacheKeys.unloadTypeOption, unloadTypeOption)
        return h.redirect('/arrivalDate')
      }
    }

    return h.view('vehicleDetails/vehicleUnloadType', {
      pageTitle: 'Vehicle unload type - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      vehicleUnloadTypes: optionsData.vehicleUnloadTypes,
      unloadTypeOption: request.yar.get(cacheKeys.unloadTypeOption),
      error,
      backUrl: '/vehicleDetails',
      breadcrumbs: [
        {
          text: 'Back',
          href: '/'
        },
        {
          text: 'Home'
        }
      ]
    })
  }
}

export { vehicleDetailsController, vehicleUnloadTypeController }
