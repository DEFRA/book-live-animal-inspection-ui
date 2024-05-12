import { animalSelectionController } from '~/src/server/animalSelection/controller'

const animalSelection = {
  plugin: {
    name: 'animalSelection',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/animalSelection',
          ...animalSelectionController
        }
      ])
    }
  }
}

export { animalSelection }
