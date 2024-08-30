import { validators } from '~/src/server/common/validations/validations'
import { cacheKeys } from '~/src/server/common/data/cacheKeys'
import { errorMessages } from '~/src/server/common/validations/errorMessages'
import { clearCacheKeys } from '~/src/server/common/helpers/cache-management'

const arrivalDateController = {
  handler: (request, h) => {
    let error = ''
    let redirectRoute = request.query.route
    let arrivalDate = { day: '', month: '', year: '' }
    if (request.method === 'post') {
      const payload = request.payload

      redirectRoute = payload.route

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
        if (redirectRoute === 'checkBookingDetails') {
          clearCacheKeys(request, [
            cacheKeys.inspectionDateOption,
            cacheKeys.inspectionTimeOption,
            cacheKeys.inspectionDateTextOption,
            cacheKeys.inspectionTimeTextOption
          ])
        }
        request.yar.set(cacheKeys.arrivalDay, arrivalDate.day)
        request.yar.set(cacheKeys.arrivalMonth, arrivalDate.month)
        request.yar.set(cacheKeys.arrivalYear, arrivalDate.year)
        // To-do - Get slots from the database
        return h.redirect('/inspectionDate')
      }
    }

    if (!arrivalDate.day) {
      arrivalDate.day = request.yar.get(cacheKeys.arrivalDay)
    }
    if (!arrivalDate.month) {
      arrivalDate.month = request.yar.get(cacheKeys.arrivalMonth)
    }
    if (!arrivalDate.year) {
      arrivalDate.year = request.yar.get(cacheKeys.arrivalYear)
    }

    return h.view('arrivalDate/index', {
      pageTitle: 'Arrival time - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      arrivalDate,
      error,
      errorClass: '',
      backUrl: redirectRoute != null ? redirectRoute : '/vehicleDetails',
      route: redirectRoute
    })
  }
}

const inspectionDateController = {
  handler: (request, h) => {
    let error = ''
    // To-do - Get Inspection date from API call.
    const inspectionDateOptionCollection = [
      { value: '1', text: 'Tuesday 28 May 2024: 4 available inspections' },
      { value: '2', text: 'Thursday 30 May 2024: 12 available inspections' },
      { value: '3', text: 'Friday 1 June 2024: 12 available inspections' },
      { value: '4', text: 'Tuesday 5 June 2024: 3 available inspections' }
    ]

    if (request.method === 'post') {
      const { inspectionDateOption } = request.payload
      if (!inspectionDateOption || inspectionDateOption.trim() === '') {
        error = errorMessages.inspectionDateRequired
      } else {
        request.yar.set(cacheKeys.inspectionDateOption, inspectionDateOption)
        const inspectionDateTextOption =
          inspectionDateOptionCollection.find(
            (obj) => obj.value === inspectionDateOption
          )?.text || null
        request.yar.set(
          cacheKeys.inspectionDateTextOption,
          ((str) => (str ? str.split(':')[0] : null))(inspectionDateTextOption)
        )
        return h.redirect('/inspectionTime')
      }
    }

    return h.view('arrivalDate/inspectionDate', {
      pageTitle: 'Inspection date - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      inspectionDateOptions: inspectionDateOptionCollection,
      inspectionDateOption: request.yar.get(cacheKeys.inspectionDateOption),
      error,
      backUrl: '/arrivalDate'
    })
  }
}

const inspectionTimeController = {
  handler: (request, h) => {
    let error = ''
    // To-do - Get Inspection Time from API call.
    const inspectionTimeOptionCollection = [
      { value: '1', text: '9am to 11am' },
      { value: '2', text: '11:30am to 12:30pm' },
      { value: '3', text: '2pm to 3pm' },
      { value: '4', text: '3:30pm to 4:30pm' }
    ]

    if (request.method === 'post') {
      const { inspectionTimeOption } = request.payload
      if (!inspectionTimeOption || inspectionTimeOption.trim() === '') {
        error = errorMessages.inspectionTimeRequired
      } else {
        request.yar.set(cacheKeys.inspectionTimeOption, inspectionTimeOption)
        const inspectionTimeTextOption =
          inspectionTimeOptionCollection.find(
            (obj) => obj.value === inspectionTimeOption
          )?.text || null
        request.yar.set(
          cacheKeys.inspectionTimeTextOption,
          inspectionTimeTextOption
        )
        return h.redirect('/checkBookingDetails')
      }
    }

    return h.view('arrivalDate/inspectionTime', {
      pageTitle: 'Inspection Time - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      inspectionTimeOptions: inspectionTimeOptionCollection,
      inspectionTimeOption: request.yar.get(cacheKeys.inspectionTimeOption),
      error,
      backUrl: '/inspectionDate',
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

export {
  arrivalDateController,
  inspectionDateController,
  inspectionTimeController
}
