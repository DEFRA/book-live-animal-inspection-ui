import { buildRedisClient } from '~/src/server/common/helpers/redis-client.js'
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

        const redisClient = buildRedisClient()
        redisClient.set('vehicleTypeOption', vehicleTypeOption)
        return h.redirect('/')
      }
    }

    return h.view('vehicleDetails/index', {
      pageTitle: 'VehicleDetails - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      vehicleTypes: optionsData.vehicleTypes,
      error,
      backUrl: '/animalSelection',
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
        const redisClient = buildRedisClient()
        redisClient.set('unloadTypeOption', unloadTypeOption)
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
