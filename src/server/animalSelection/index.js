import {
  animalSelectionController,
  animalReferenceDataController
} from '~/src/server/animalSelection/controller'

const animalSelection = {
  plugin: {
    name: 'animalSelection',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/animalSelection',
          ...animalSelectionController
        },
        {
          method: 'GET',
          path: '/animalReferenceData',
          ...animalReferenceDataController
        }
      ])
    }
  }
}

export { animalSelection }
