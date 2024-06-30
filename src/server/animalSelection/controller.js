import { buildRedisClient } from '~/src/server/common/helpers/redis-client.js'
import { errorMessages } from '~/src/server/data/errorMessages.js'

const animalSelectionController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { animalSelection } = request.payload
      if (!animalSelection || animalSelection.trim() === '') {
        error = errorMessages.animalNameSelectionRequired
      } else {
        const redisClient = buildRedisClient()
        redisClient.set('animalSelection', animalSelection)
        return h.redirect('/vehicleDetails')
      }
    }

    return h.view('animalSelection/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'animalSelection',
      error,
      backUrl: '/location',
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
