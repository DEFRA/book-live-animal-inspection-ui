import { signInController } from '~/src/server/signIn/controller'

describe('signInController', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {}
    mockH = {
      view: jest.fn()
    }
  })

  it('should return the sign in view with correct parameters', () => {
    signInController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('signIn/index', {
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
  })
})
