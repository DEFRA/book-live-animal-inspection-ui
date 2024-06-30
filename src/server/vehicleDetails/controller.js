import { buildRedisClient } from '~/src/server/common/helpers/redis-client.js'
const vehicleUnloadTypes = [
  { value: 1, text: 'Rear-unloading vehicle' },
  { value: 2, text: 'Side-unloading vehicle' },
  { value: 3, text: 'Vehicle can be unloaded from the rear or the side' }
]
const vehicleDetailsController = {
  handler: (request, h) => {
    const vehicleTypes = [
      { value: 1, text: 'Class B: car or small van' },
      { value: 2, text: 'Class C1: large van up to 7.5 tonnes' },
      { value: 3, text: 'Class C: heavy goods vehicle over 7.5 tonnes' },
      {
        value: 4,
        text: 'Class CE: heavy goods vehicle over 7.5 tonnes towing a trailer'
      }
    ]

    let error = ''
    if (request.method === 'post') {
      const { vehicleTypeOption } = request.payload
      if (!vehicleTypeOption || vehicleTypeOption.trim() === '') {
        error = 'Select a vehicle type'
      } else {
        if (vehicleTypeOption === '3' || vehicleTypeOption === '4') {
          return h.view('vehicleDetails/vehicleUnloadType', {
            pageTitle: 'Vehicle unload type - Book a live animal inspection',
            heading: 'Book a live animal inspection',
            vehicleUnloadTypes,
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
      vehicleTypes,
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
        error = 'Select a vehicle unload type'
      } else {
        const redisClient = buildRedisClient()
        redisClient.set('unloadTypeOption', unloadTypeOption)
        return h.redirect('/')
      }
    }

    return h.view('vehicleDetails/vehicleUnloadType', {
      pageTitle: 'Vehicle unload type - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      vehicleUnloadTypes,
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
