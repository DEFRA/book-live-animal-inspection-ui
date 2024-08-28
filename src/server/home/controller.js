const homeController = {
  handler: (request, h) => {
    return h.view('home/index', {
      pageTitle: 'Book a live animal inspection - GOV.UK ',
      heading: 'Book a live animal inspection',
      page: 'home',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Example'
        }
      ]
    })
  }
}

export { homeController }
