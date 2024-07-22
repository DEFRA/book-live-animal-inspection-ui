import inert from '@hapi/inert'
import yar from '@hapi/yar'
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
import { declaration } from '~/src/server/declaration'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files'
import { config } from '~/src/config'

const sessionCookiePassword = config.get('sessionCookiePassword')
const options = {
  storeBlank: false,
  cookieOptions: {
    password: sessionCookiePassword,
    isSecure: true
  },
  errorOnCacheNotReady: true,
  maxCookieSize: 0,
  cache: {
    cache: 'session',
    expiresIn: 24 * 60 * 60 * 1000 // 1 day in milliseconds
  }
}

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])
      await server.register([
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
        serveStaticFiles
      ])
      await server.register({
        plugin: yar,
        options
      })
    }
  }
}

export { router }
