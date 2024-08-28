const signInController = {
  handler: (request, h) => {
    return h.view('signIn/index', {
      pageTitle: 'SignIn',
      heading: 'SignIn',
      breadcrumbs: [
        {
          text: 'SignIn',
          href: '/'
        },
        {
          text: 'Example'
        }
      ]
    })
  }
}

export { signInController }
