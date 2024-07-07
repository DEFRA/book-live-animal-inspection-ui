import { optionsData } from '~/src/server/common/data/optionsData.js'
import { errorMessages } from '~/src/server/common/validations/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const locationController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { locationOption } = request.payload
      if (!locationOption || locationOption.trim() === '') {
        error = errorMessages.siteSelectionRequired
      } else {
        request.yar.set(cacheKeys.locationOption, locationOption)
        return h.redirect('/animalSelection')
      }
    }

    return h.view('location/index', {
      pageTitle: 'Location - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      locations: optionsData.locations,
      error,
      locationOption: request.yar.get(cacheKeys.locationOption),
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
