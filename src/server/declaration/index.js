import { declarationController } from '~/src/server/declaration/controller'

const declaration = {
  plugin: {
    name: 'declaration',
    register: async (server) => {
      server.route([
        {
          method: ['GET', 'POST'],
          path: '/declaration',
          ...declarationController
        }
      ])
    }
  }
}

export { declaration }
