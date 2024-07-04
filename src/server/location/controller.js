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
        request.yar.set('locationOption', locationOption)
        return h.redirect('/animalSelection')
      }
    }

    return h.view('location/index', {
      pageTitle: 'Location - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      locations: optionsData.locations,
      error,
      locationOption: request.yar.get('locationOption'),
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
