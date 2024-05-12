const animalSelectionController = {
  handler: (request, h) => {
    return h.view('animalSelection/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
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

export { animalSelectionController }
