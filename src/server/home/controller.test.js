import { homeController } from '~/src/server/home/controller'

describe('homeController', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {}
    mockH = {
      view: jest.fn()
    }
  })

  it('should return the home view with correct parameters', () => {
    homeController.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalledWith('home/index', {
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
  })
})
