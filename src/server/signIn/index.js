import { signInController } from '~/src/server/signIn/controller'

const signIn = {
  plugin: {
    name: 'signIn',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/signIn',
          ...signInController
        }
      ])
    }
  }
}

export { signIn }
