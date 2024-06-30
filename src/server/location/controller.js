import { buildRedisClient } from '~/src/server/common/helpers/redis-client.js'
import { optionsData } from '~/src/server/data/optionsData.js'
import { errorMessages } from '~/src/server/data/errorMessages.js'

const locationController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { locationOption } = request.payload
      if (!locationOption || locationOption.trim() === '') {
        error = errorMessages.siteSelectionRequired
      } else {
        const redisClient = buildRedisClient()
        redisClient.set('locationOption', locationOption)
        return h.redirect('/animalSelection')
      }
    }

    return h.view('location/index', {
      pageTitle: 'Location - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      locations: optionsData.locations,
      error,
      backUrl: '/',
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

export { locationController }
