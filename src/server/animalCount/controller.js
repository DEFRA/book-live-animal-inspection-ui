import { validators } from '~/src/server/common/validations/validations.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const animalCountController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { animalCount } = request.payload

      error = validators.validateAnimalCount(animalCount)

      if (error === null) {
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
      errorClass: '',
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
