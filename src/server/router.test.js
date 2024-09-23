import inert from '@hapi/inert'
import { health } from '~/src/server/health'
import { home } from '~/src/server/home'
import { about } from '~/src/server/about'
import { signIn } from '~/src/server/signIn'
import { vehicleDetails } from '~/src/server/vehicleDetails'
import { location } from '~/src/server/location'
import { animalSelection } from '~/src/server/animalSelection'
import { animalCount } from '~/src/server/animalCount'
import { arrivalDate } from '~/src/server/arrivalDate'
import { bookings } from '~/src/server/bookings'
import { checkBookingDetails } from '~/src/server/checkBookingDetails'
import { declaration } from '~/src/server/declaration'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files'
import { config } from '~/src/config'
import { router } from '~/src/server/router'

jest.mock('@hapi/inert')
jest.mock('@hapi/yar')
jest.mock('~/src/server/health')
jest.mock('~/src/server/home')
jest.mock('~/src/server/about')
jest.mock('~/src/server/signIn')
jest.mock('~/src/server/vehicleDetails')
jest.mock('~/src/server/location')
jest.mock('~/src/server/animalSelection')
jest.mock('~/src/server/animalCount')
jest.mock('~/src/server/arrivalDate')
jest.mock('~/src/server/bookings')
jest.mock('~/src/server/checkBookingDetails')
jest.mock('~/src/server/declaration')
jest.mock('~/src/server/common/helpers/serve-static-files')
jest.mock('~/src/config')

describe('router plugin', () => {
  let mockServer

  beforeEach(() => {
    mockServer = {
      register: jest.fn()
    }

    config.get = jest.fn().mockImplementation((key) => {
      if (key === 'sessionCookiePassword') {
        return 'supersecretpassword' // Mocked password
      }
    })
  })

  it('should register the correct plugins and routes', async () => {
    await router.plugin.register(mockServer)

    // Verify that `server.register` is called with `inert`
    expect(mockServer.register).toHaveBeenCalledWith([inert])

    // Verify that `server.register` is called with all the necessary routes
    expect(mockServer.register).toHaveBeenCalledWith([
      health,
      home,
      about,
      signIn,
      vehicleDetails,
      location,
      animalSelection,
      animalCount,
      arrivalDate,
      bookings,
      declaration,
      checkBookingDetails,
      serveStaticFiles
    ])
  })
})
