const users = require('./users')

module.exports = [
    ...users,
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            request.plugins.good = {
                suppressResponseEvent: true
            };        
          reply('hello hapi');
        },
        config: {
          tags: ['api', 'tests'],
          description: '测试hello-hapi',
          plugins: {
            good: {
                suppressResponseEvent: true
                }
            }
        },
      },
  ]