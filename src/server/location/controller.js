const locationController = {
  handler: (request, h) => {
    const locations = [
      { value: 1, text: 'Sevington, England' },
      { value: 2, text: 'Fishguard, Wales' },
      { value: 3, text: 'Pembroke Dock, Wales' },
      { value: 4, text: 'Holyhead, Wales' }
    ]
    return h.view('location/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK',
      heading: 'Book a live animal inspection',
      locations,
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
