import { optionsData } from '~/src/server/common/data/optionsData.js'
import { errorMessages } from '~/src/server/common/data/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const vehicleDetailsController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { vehicleTypeOption } = request.payload
      if (!vehicleTypeOption || vehicleTypeOption.trim() === '') {
        error = errorMessages.vehicleSelectionRequired
      } else {
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
        return h.redirect('/')
      }
    }

    return h.view('vehicleDetails/index', {
      pageTitle: 'VehicleDetails - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      vehicleTypes: optionsData.vehicleTypes,
      vehicleTypeOption: request.yar.get(cacheKeys.vehicleTypeOption),
      error,
      backUrl: '/animalCount',
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
        return h.redirect('/')
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
