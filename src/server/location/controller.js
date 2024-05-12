const locationController = {
  handler: (request, h) => {
    return h.view('location/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
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

export { locationController }
