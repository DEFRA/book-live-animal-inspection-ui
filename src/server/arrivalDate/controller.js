import { validators } from '~/src/server/common/validations/validations.js'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'

const arrivalDateController = {
  handler: (request, h) => {
    let error = ''
    let arrivalDate = { day: '', month: '', year: '' }
    if (request.method === 'post') {
      const payload = request.payload

      arrivalDate = {
        day: payload.day || '',
        month: payload.month || '',
        year: payload.year || ''
      }

      error = validators.validateDate(
        arrivalDate.day,
        arrivalDate.month,
        arrivalDate.year
      )

      if (error === null) {
        request.yar.set(cacheKeys.arrivalDay, arrivalDate.day)
        request.yar.set(cacheKeys.arrivalMonth, arrivalDate.month)
        request.yar.set(cacheKeys.arrivalYear, arrivalDate.year)
        // To-do - Get slots from the database
        return h.redirect('/')
      }
    }

    return h.view('arrivalDate/index', {
      pageTitle: 'Arrival time - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      arrivalDate,
      error,
      errorClass: '',
      backUrl: '/animalCount',
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

// const vehicleUnloadTypeController = {
//   handler: (request, h) => {
//     let error = ''
//     if (request.method === 'post') {
//       const { unloadTypeOption } = request.payload
//       if (!unloadTypeOption || unloadTypeOption.trim() === '') {
//         error = errorMessages.vehicleUnloadSelectionRequired
//       } else {
//         request.yar.set(cacheKeys.unloadTypeOption, unloadTypeOption)
//         return h.redirect('/')
//       }
//     }

//     return h.view('vehicleDetails/vehicleUnloadType', {
//       pageTitle: 'Vehicle unload type - Book a live animal inspection',
//       heading: 'Book a live animal inspection',
//       vehicleUnloadTypes: optionsData.vehicleUnloadTypes,
//       unloadTypeOption: request.yar.get(cacheKeys.unloadTypeOption),
//       error,
//       backUrl: '/vehicleDetails',
//       breadcrumbs: [
//         {
//           text: 'Back',
//           href: '/'
//         },
//         {
//           text: 'Home'
//         }
//       ]
//     })
//   }
// }

export { arrivalDateController }
