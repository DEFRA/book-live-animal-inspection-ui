import inert from '@hapi/inert'

import { health } from '~/src/server/health'
import { home } from '~/src/server/home'
import { about } from '~/src/server/about'
import { signIn } from '~/src/server/signIn'
import { vehicleDetails } from '~/src/server/vehicleDetails'
import { location } from '~/src/server/location'
import { animalSelection } from '~/src/server/animalSelection'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files'

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
        serveStaticFiles
      ])
    }
  }
}

export { router }
