import { validators } from '~/src/server/common/validations/validations.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const animalCountController = {
  handler: (request, h) => {
    let error = ''
    let redirectRoute = request.query.route
    if (request.method === 'post') {
      const { animalCount, route } = request.payload
      redirectRoute = route
      error = validators.validateAnimalCount(animalCount)

      if (error === null) {
        request.yar.set(cacheKeys.animalCount, animalCount)
        if (route === 'checkBookingDetails') {
          return h.redirect('/checkBookingDetails')
        } else {
          return h.redirect('/vehicleDetails')
        }
      }
    }

    return h.view('animalCount/index', {
      pageTitle:
        'Animal species count - Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'animalCount',
      error,
      errorClass: '',
      animalCount: request.yar.get(cacheKeys.animalCount),
      backUrl: redirectRoute != null ? redirectRoute : '/animalSelection',
      route: redirectRoute
    })
  }
}

export { animalCountController }
