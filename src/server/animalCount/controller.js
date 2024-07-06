import { errorMessages } from '~/src/server/common/data/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const animalCountController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { animalCount } = request.payload
      if (!animalCount || animalCount.trim() === '') {
        error = errorMessages.animalCountRequired
      } else {
        request.yar.set(cacheKeys.animalCount, animalCount)
        return h.redirect('/vehicleDetails')
      }
    }

    return h.view('animalCount/index', {
      pageTitle:
        'Animal species count - Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'animalCount',
      error,
      animalCount: request.yar.get(cacheKeys.animalCount),
      backUrl: '/animalSelection',
      breadcrumbs: [
        {
          text: 'Back',
          href: '/'
        },
        {
          text: 'Example'
        }
      ]
    })
  }
}

export { animalCountController }
