import { errorMessages } from '~/src/server/common/validations/errorMessages.js'
import { clearCacheKeys } from '~/src/server/common/helpers/cache-management'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const animalSelectionController = {
  handler: (request, h) => {
    let error = ''
    let redirectRoute = request.query.route
    if (request.method === 'post') {
      const { 'input-autocomplete': animalSelection, route } = request.payload
      redirectRoute = route
      if (!animalSelection || animalSelection.trim() === '') {
        error = errorMessages.animalNameSelectionRequired
      } else {
        request.yar.set('animalSelection', animalSelection)

        if (redirectRoute === 'checkBookingDetails') {
          clearCacheKeys(request, [
            cacheKeys.arrivalDay,
            cacheKeys.arrivalMonth,
            cacheKeys.arrivalYear,
            cacheKeys.inspectionDateOption,
            cacheKeys.inspectionTimeOption
          ])
          return h.redirect('/arrivalDate')
        } else {
          return h.redirect('/animalCount')
        }
      }
    }

    return h.view('animalSelection/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'animalSelection',
      error,
      animalSelection: request.yar.get('animalSelection'),
      backUrl: '/location',
      route: redirectRoute
    })
  }
}

const animalReferenceDataController = {
  handler: (request, h) => {
    const data = [
      'horses',
      'Chicken',
      'Swine',
      'Sheep',
      'Goat',
      'Pigeons',
      'Cows',
      'Turkeys',
      'Ducks',
      'Geese',
      'Fish',
      'hinnies',
      'asses'
    ]

    const query = request.query.q.toLowerCase()
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query)
    )
    return filteredData
  }
}

export { animalSelectionController, animalReferenceDataController }
