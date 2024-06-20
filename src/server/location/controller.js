const locationController = {
  handler: (request, h) => {
    const locations = [
      { value: 1, text: 'Sevington, England' },
      { value: 2, text: 'Fishguard, Wales' },
      { value: 3, text: 'Pembroke Dock, Wales' },
      { value: 4, text: 'Holyhead, Wales' }
    ]

    let error
    if (request.method === 'post') {
      const { locationOption } = request.payload
      if (!locationOption || locationOption.trim() === '') {
        error = 'Select a border control post'
      } else {
        return h.redirect('/vehicleDetails')
      }
    }

    return h.view('location/index', {
      pageTitle: 'Location - Book a live animal inspection',
      heading: 'Book a live animal inspection',
      locations,
      error,
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
