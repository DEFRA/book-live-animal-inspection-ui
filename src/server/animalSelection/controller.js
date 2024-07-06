import { errorMessages } from '~/src/server/common/data/errorMessages.js'

const animalSelectionController = {
  handler: (request, h) => {
    let error = ''
    if (request.method === 'post') {
      const { 'input-autocomplete': animalSelection } = request.payload
      if (!animalSelection || animalSelection.trim() === '') {
        error = errorMessages.animalNameSelectionRequired
      } else {
        request.yar.set('animalSelection', animalSelection)
        return h.redirect('/animalCount')
      }
    }

    return h.view('animalSelection/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'animalSelection',
      error,
      animalSelection: request.yar.get('animalSelection'),
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
