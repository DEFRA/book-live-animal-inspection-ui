import { aboutController } from '~/src/server/about/controller'

describe('aboutController', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    // Mock the request object
    mockRequest = {}

    // Mock the h toolkit with a spy on the view function
    mockH = {
      view: jest.fn()
    }
  })

  it('should return the about view with correct parameters', () => {
    // Call the handler
    aboutController.handler(mockRequest, mockH)

    // Check if the view function was called with the correct template and data
    expect(mockH.view).toHaveBeenCalledWith('about/index', {
      pageTitle: 'About',
      heading: 'About',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'About'
        }
      ]
    })
  })
})
