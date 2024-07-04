import { optionsData } from '~/src/server/data/optionsData.js'
import { errorMessages } from '~/src/server/data/errorMessages.js'

const vehicleDetailsController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { vehicleTypeOption } = request.payload
      if (!vehicleTypeOption || vehicleTypeOption.trim() === '') {
        error = errorMessages.vehicleSelectionRequired
      } else {
        request.yar.set('vehicleTypeOption', vehicleTypeOption)
        if (vehicleTypeOption === '3' || vehicleTypeOption === '4') {
          return h.view('vehicleDetails/vehicleUnloadType', {
            pageTitle: 'Vehicle unload type - Book a live animal inspection',
            heading: 'Book a live animal inspection',
            vehicleUnloadTypes: optionsData.vehicleUnloadTypes,
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
        request.yar.set('unloadTypeOption', unloadTypeOption)
        return h.redirect('/')
      }
    }

    return h.view('vehicleDetails/vehicleUnloadType', {
      pageTitle: 'Vehicle unload type - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      vehicleUnloadTypes: optionsData.vehicleUnloadTypes,
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
