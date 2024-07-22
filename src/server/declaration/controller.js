import { optionsData } from '~/src/server/common/data/optionsData.js'
import { errorMessages } from '~/src/server/common/validations/errorMessages.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const declarationController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { declarationOption } = request.payload
      if (!declarationOption || declarationOption.trim() === '') {
        error = errorMessages.declarationOptionRequired
      } else {
        request.yar.set(cacheKeys.declarationOption, declarationOption)
        if (declarationOption === '1') {
          return h.redirect('/location')
        } else {
          return h.redirect('/upcomingBookings')
        }
      }
    }

    return h.view('declaration/index', {
      pageTitle: 'Declaration - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      declarationOptions: optionsData.declarationOptions,
      error,
      declarationOption: request.yar.get(cacheKeys.declarationOption),
      backUrl: '/upcomingBookings'
    })
  }
}

export { declarationController }
