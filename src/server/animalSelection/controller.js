const animalSelectionController = {
  handler: (request, h) => {
    return h.view('animalSelection/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      page: 'animalSelection',
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
      'Apple',
      'Banana',
      'Orange',
      'Mango',
      'Grapes',
      'Pineapple',
      'Strawberry'
    ]

    const query = request.query.q.toLowerCase()
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query)
    )
    return filteredData
  }
}

export { animalSelectionController, animalReferenceDataController }
