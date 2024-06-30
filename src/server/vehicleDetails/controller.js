import { buildRedisClient } from '~/src/server/common/helpers/redis-client.js'

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

export { vehicleDetailsController }
