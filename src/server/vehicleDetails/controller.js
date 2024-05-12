const vehicleDetailsController = {
  handler: (request, h) => {
    return h.view('vehicleDetails/index', {
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

export { vehicleDetailsController }
