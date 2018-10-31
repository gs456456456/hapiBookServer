const users = require('./users')
const books = require('./books')


module.exports = [
    ...users,
    ...books,
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