import { animalCountController } from '~/src/server/animalCount/controller'

const animalCount = {
  plugin: {
    name: 'animalCount',
    register: async (server) => {
      server.route([
        {
          method: ['GET', 'POST'],
          path: '/animalCount',
          ...animalCountController
        }
      ])
    }
  }
}

export { animalCount }
